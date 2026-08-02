const BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, { method = 'GET', body, headers, signal } = {}) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}), ...headers },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('Impossible de joindre le serveur. Vérifiez que le backend est démarré.', 0)
  }

  if (!response.ok) {
    throw new ApiError(
      response.status === 404 ? 'Ressource introuvable.' : `Le serveur a répondu avec l’erreur ${response.status}.`,
      response.status,
    )
  }
  return response.status === 204 ? null : response.json()
}

function queryString(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.append(key, String(value))
  })
  const suffix = query.toString()
  return suffix ? `?${suffix}` : ''
}

export const productsApi = {
  list: (params, options) => request(`/api/v1/products${queryString(params)}`, options),
  bySlug: (slug, options) => request(`/api/v1/products/${encodeURIComponent(slug)}`, options),
  byId: (id, options) => request(`/api/v1/products/id/${id}`, options),
  create: (product) => request('/api/v1/products', { method: 'POST', body: product }),
  update: (id, product) => request(`/api/v1/products/${id}`, { method: 'PUT', body: product }),
  remove: (id) => request(`/api/v1/products/${id}`, { method: 'DELETE' }),
}

const allowedResources = new Set(['categories', 'brands', 'franchises', 'sub-franchises', 'tags'])

export const catalogApi = {
  list(resource, params, options) {
    if (!allowedResources.has(resource)) throw new Error(`Ressource catalogue invalide: ${resource}`)
    return request(`/api/v1/${resource}${queryString(params)}`, options)
  },
}
