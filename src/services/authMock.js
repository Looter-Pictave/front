/**
 * ⚠️⚠️⚠️ MOCK AUTH — NE PAS UTILISER EN PROD ⚠️⚠️⚠️
 *
 * Ce service simule un backend d'authentification pour permettre de
 * développer toute l'UX de l'espace client (login, register, dashboard,
 * commandes, admin) sans attendre que le back Spring Boot soit prêt.
 *
 * Le jour où le back sera prêt, ce fichier doit être REMPLACÉ par des
 * appels HTTP réels (via services/api.js) :
 *   - POST /api/auth/login
 *   - POST /api/auth/register
 *   - POST /api/auth/logout
 *   - GET  /api/auth/me
 *   - PATCH /api/users/me
 *
 * Tout le reste de l'app (store auth, vues, guards) restera identique
 * grâce à cette indirection.
 *
 * Limitations volontaires :
 *   - Mots de passe en clair dans users.json (jamais en vrai bien sûr)
 *   - Pas de hash, pas de JWT, pas de protection CSRF/XSRF
 *   - Persistance localStorage = facile à manipuler côté client
 *   - Pas de validation côté serveur (toute la validation est côté front)
 */

import seedUsers from '@/data/users.json'

const STORAGE_USERS = 'lp_mock_users'
const STORAGE_SESSION = 'lp_mock_session'

// "Base de données" en mémoire : hydratée depuis localStorage (users créés
// via inscription) + fusionnée avec les comptes seed du JSON.
function loadUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_USERS) ?? '[]')
    // On dédoublonne par email : seed gagne en cas de conflit
    const seedEmails = new Set(seedUsers.map((u) => u.email))
    const customUsers = stored.filter((u) => !seedEmails.has(u.email))
    return [...seedUsers, ...customUsers]
  } catch {
    return [...seedUsers]
  }
}

function persistCustomUsers(users) {
  // On ne persiste QUE les users créés via register (pas les seed)
  const seedEmails = new Set(seedUsers.map((u) => u.email))
  const custom = users.filter((u) => !seedEmails.has(u.email))
  localStorage.setItem(STORAGE_USERS, JSON.stringify(custom))
}

let users = loadUsers()

// Petit délai artificiel pour donner l'impression d'un appel réseau
const fakeDelay = (ms = 250) => new Promise((r) => setTimeout(r, ms))

/**
 * Retire le mot de passe avant d'exposer un user vers l'UI.
 * (En prod, le mdp ne reviendrait JAMAIS du serveur de toute façon.)
 */
function stripPassword(user) {
  if (!user) return null
  // eslint-disable-next-line no-unused-vars
  const { password, ...safe } = user
  return safe
}

export const authMock = {
  /**
   * Essaie de connecter un user. Retourne le user sans mdp, ou throw.
   */
  async login(email, password) {
    await fakeDelay()
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!user) {
      throw new Error('Email ou mot de passe incorrect.')
    }
    const safe = stripPassword(user)
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(safe))
    return safe
  },

  /**
   * Inscrit un nouvel utilisateur. Email unique requis.
   */
  async register({ email, password, firstName, lastName, phone }) {
    await fakeDelay()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Un compte existe déjà avec cet email.')
    }
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      firstName,
      lastName,
      phone: phone ?? '',
      createdAt: new Date().toISOString().slice(0, 10),
      role: 'customer',
      addresses: [],
      preferences: { newsletter: false },
    }
    users = [...users, newUser]
    persistCustomUsers(users)
    const safe = stripPassword(newUser)
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(safe))
    return safe
  },

  /**
   * Déconnexion : vide la session côté client.
   */
  async logout() {
    await fakeDelay(100)
    localStorage.removeItem(STORAGE_SESSION)
  },

  /**
   * Retourne l'utilisateur actuellement connecté (depuis localStorage),
   * ou null. Utilisé au boot du store auth pour restaurer la session.
   */
  getCurrentSession() {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  /**
   * Met à jour le profil du user courant (en mémoire + storage).
   */
  async updateUser(userId, updates) {
    await fakeDelay()
    const idx = users.findIndex((u) => u.id === userId)
    if (idx === -1) throw new Error('Utilisateur introuvable.')
    users[idx] = { ...users[idx], ...updates }
    persistCustomUsers(users)
    const safe = stripPassword(users[idx])
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(safe))
    return safe
  },

  /**
   * Ajoute une adresse au user.
   */
  async addAddress(userId, address) {
    await fakeDelay()
    const idx = users.findIndex((u) => u.id === userId)
    if (idx === -1) throw new Error('Utilisateur introuvable.')
    const newAddress = { ...address, id: `addr-${Date.now()}` }
    users[idx] = {
      ...users[idx],
      addresses: [...users[idx].addresses, newAddress],
    }
    persistCustomUsers(users)
    const safe = stripPassword(users[idx])
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(safe))
    return safe
  },

  /**
   * Supprime une adresse.
   */
  async removeAddress(userId, addressId) {
    await fakeDelay()
    const idx = users.findIndex((u) => u.id === userId)
    if (idx === -1) throw new Error('Utilisateur introuvable.')
    users[idx] = {
      ...users[idx],
      addresses: users[idx].addresses.filter((a) => a.id !== addressId),
    }
    persistCustomUsers(users)
    const safe = stripPassword(users[idx])
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(safe))
    return safe
  },
}
