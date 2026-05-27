/**
 * Configuration boutique Looter Pictave — source unique de vérité.
 *
 * Utilisée par :
 *   - components/contact/ShopLocation.vue (Home + Contact)
 *   - views/ContactView.vue
 *   - components/layout/AppFooter.vue (à brancher)
 *   - Plus tard : structured data SEO (JSON-LD LocalBusiness pour Google)
 *
 * 🛠 Pour modifier une info boutique (horaires, email, adresse, réseaux),
 *    c'est UNIQUEMENT ici. Évite les copies dans les composants.
 */

export const SHOP = {
  name: 'Looter Pictave',
  tagline: 'Pop Culture & Collections',

  address: {
    street: '19 rue de la Regratterie',
    postalCode: '86000',
    city: 'Poitiers',
    country: 'France',
  },

  contact: {
    email: 'contact@looter-pictave.fr',
    // phone: '+33 X XX XX XX XX',  // à remplir si pertinent
  },

  /**
   * Horaires structurés : un groupe de jours + une liste de créneaux du jour.
   * Format choisi pour permettre une transformation future en JSON-LD
   * `openingHoursSpecification` (Schema.org LocalBusiness).
   */
  hours: [
    { days: 'Lundi – Samedi', slots: ['10h30 – 13h30', '14h30 – 19h30'] },
    { days: 'Dimanche', slots: ['Fermé'] },
  ],

  social: {
    facebook: 'https://www.facebook.com/people/Looter-Pictave/61578506021279/',
    instagram: 'https://www.instagram.com/looterpictave/',
  },
}

// ----------------------------------------------------------------------------
// Helpers dérivés
// ----------------------------------------------------------------------------

/**
 * Adresse formatée en une ligne (utile pour structured data ou tooltips).
 */
export const formattedAddress = () =>
  `${SHOP.address.street}, ${SHOP.address.postalCode} ${SHOP.address.city}`

/**
 * Query Google Maps : adresse url-encodée.
 */
const mapsQuery = encodeURIComponent(formattedAddress())

/**
 * URL d'embed Google Maps (iframe simple sans clé API).
 *
 * ⚠️ RGPD : charge des cookies tiers Google dès l'affichage. Avant la mise en
 *    prod, soit on passe à un pattern click-to-load, soit on ajoute un
 *    bandeau de consentement.
 */
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${mapsQuery}&hl=fr&z=16&output=embed`

/**
 * URL d'ouverture de Google Maps en mode itinéraire vers la boutique.
 * S'ouvre dans l'app Maps native sur mobile, dans le navigateur sur desktop.
 */
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`
