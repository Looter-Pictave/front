/**
 * Placeholder API client.
 *
 * Au jalon 1, l'app utilise uniquement les données mockées (src/data/*.json).
 * Quand le back Spring Boot sera prêt et que JDC sera branché, on remplacera
 * les imports JSON dans les stores Pinia par des appels à ces helpers.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    throw new Error(`API ${method} ${path} → ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  hello: () => request('/hello'),
  // products: () => request('/products'),
  // product: (slug) => request(`/products/${slug}`),
}
