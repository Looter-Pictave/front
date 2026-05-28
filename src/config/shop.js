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
  name: "Looter Pictave",
  tagline: "Pop Culture & Collections",

  address: {
    street: "19 rue de la Regratterie",
    postalCode: "86000",
    city: "Poitiers",
    country: "France",
  },

  contact: {
    email: "contact@looter-pictave.fr",
  },

  /**
   * Horaires structurés : un groupe de jours + une liste de créneaux du jour.
   * Format choisi pour permettre une transformation future en JSON-LD
   * `openingHoursSpecification` (Schema.org LocalBusiness).
   */
  hours: [
    { days: "Lundi – Samedi", slots: ["10h30 – 13h30", "14h30 – 19h30"] },
    { days: "Dimanche", slots: ["Fermé"] },
  ],

  social: {
    facebook: "https://www.facebook.com/people/Looter-Pictave/61578506021279/",
    instagram: "https://www.instagram.com/looterpictave/",
  },

  /**
   * Informations légales — utilisées par LegalView (Mentions légales).
   *
   * ⚠️ TODO AVANT MISE EN PROD : remplacer toutes les valeurs `'TODO …'`
   *    par les vraies infos. Source : extrait Kbis / avis INSEE / contrat
   *    d'hébergement. Les pages /mentions-legales et /cgv affichent ces
   *    valeurs avec un style "warning" jaune fluo tant qu'elles valent TODO,
   *    impossible à louper visuellement.
   *
   * Mentions obligatoires (LCEN art. 6 III) :
   *   - nom (perso ou raison sociale)
   *   - forme juridique + capital si société
   *   - SIRET / RCS
   *   - directeur de publication
   *   - hébergeur (nom, adresse, téléphone)
   */
  legal: {
    legalForm: "TODO — forme juridique (EI / EURL / SARL / SAS…)",
    capital: null, // si société : { amount: 1000, currency: 'EUR' }
    siret: "TODO — numéro SIRET (14 chiffres)",
    rcs: "TODO — ex: RCS Poitiers B 123 456 789",
    vatNumber: null, // optionnel — n° TVA intracommunautaire
    publicationDirector: "TODO — nom du directeur de publication",
    host: {
      name: "TODO — nom de l'hébergeur (ex: OVH SAS, Vercel Inc.)",
      address: "TODO — adresse postale de l'hébergeur",
      phone: "TODO — téléphone de l'hébergeur",
    },
  },
};

/**
 * Helper : détecte si une valeur est encore un TODO non rempli.
 * Permet aux pages légales d'afficher un styling "warning" visible
 * tant que les vraies données n'ont pas été saisies.
 */
export const isTodo = (value) =>
  typeof value === "string" && value.startsWith("TODO");

// ----------------------------------------------------------------------------
// Helpers dérivés
// ----------------------------------------------------------------------------

/**
 * Adresse formatée en une ligne (utile pour structured data ou tooltips).
 */
export const formattedAddress = () =>
  `${SHOP.address.street}, ${SHOP.address.postalCode} ${SHOP.address.city}`;

/**
 * Query Google Maps : adresse url-encodée.
 */
const mapsQuery = encodeURIComponent(formattedAddress());

/**
 * URL d'embed Google Maps (iframe simple sans clé API).
 *
 * ⚠️ RGPD : charge des cookies tiers Google dès l'affichage. Avant la mise en
 *    prod, soit on passe à un pattern click-to-load, soit on ajoute un
 *    bandeau de consentement.
 */
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${mapsQuery}&hl=fr&z=16&output=embed`;

/**
 * URL d'ouverture de Google Maps en mode itinéraire vers la boutique.
 * S'ouvre dans l'app Maps native sur mobile, dans le navigateur sur desktop.
 */
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
