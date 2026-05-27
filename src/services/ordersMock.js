/**
 * ⚠️ MOCK ORDERS — voir authMock.js pour le contexte.
 *
 * À remplacer par des appels HTTP réels au back Spring quand il sera prêt :
 *   - GET /api/users/me/orders
 *   - GET /api/orders/:id
 */

import seedOrders from '@/data/orders.json'

const fakeDelay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

export const ordersMock = {
  /**
   * Liste les commandes d'un user, du plus récent au plus ancien.
   */
  async listByUser(userId) {
    await fakeDelay()
    return seedOrders
      .filter((o) => o.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },

  /**
   * Récupère une commande par son id.
   */
  async findById(orderId) {
    await fakeDelay()
    return seedOrders.find((o) => o.id === orderId) ?? null
  },
}

/**
 * Libellé humain + variante visuelle pour un statut de commande.
 * Centralisé pour que tous les composants (OrderCard, OrderDetail, etc.)
 * affichent les statuts de façon cohérente.
 */
export const ORDER_STATUS = {
  pending: { label: 'En attente de paiement', variant: 'outline' },
  confirmed: { label: 'Confirmée', variant: 'ink' },
  preparing: { label: 'En préparation', variant: 'yellow' },
  shipped: { label: 'Expédiée', variant: 'ink' },
  delivered: { label: 'Livrée', variant: 'success' },
  cancelled: { label: 'Annulée', variant: 'outline' },
  refunded: { label: 'Remboursée', variant: 'outline' },
}
