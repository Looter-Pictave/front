const formatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

/**
 * Formate un prix au format { amount (cents), currency } en chaîne lisible.
 * formatPrice({ amount: 8990, currency: 'EUR' }) → "89,90 €"
 */
export function formatPrice(price) {
  if (!price || typeof price.amount !== 'number') return ''
  return formatter.format(price.amount / 100)
}
