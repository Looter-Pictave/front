<script setup>
import { computed } from 'vue'
import { SHOP, isTodo, formattedAddress } from '@/config/shop'

/**
 * Page "Mentions légales" — obligatoire en France pour tout site internet
 * (LCEN du 21 juin 2004, article 6 III).
 *
 * 🟡 Les valeurs encore au statut TODO dans @/config/shop.legal s'affichent
 *    avec un fond jaune impossible à louper. Tant que cette page contient
 *    du jaune, c'est qu'il manque des infos à saisir avant la mise en prod.
 */
const legal = SHOP.legal

const hasMissingInfo = computed(() => {
  const values = [
    legal.legalForm,
    legal.siret,
    legal.rcs,
    legal.publicationDirector,
    legal.host.name,
    legal.host.address,
    legal.host.phone,
  ]
  return values.some(isTodo)
})
</script>

<template>
  <div class="page">
    <h1 class="page__title text-stamp">Mentions légales</h1>

    <p class="page__lead">
      Conformément aux dispositions des articles 6-III et 19 de la Loi pour la
      Confiance dans l'Économie Numérique, nous portons à la connaissance des
      visiteurs du site les informations suivantes.
    </p>

    <div v-if="hasMissingInfo" class="page__warn" role="status">
      ⚠️ Page en cours de finalisation — certaines mentions légales ne sont
      pas encore renseignées (affichées en jaune ci-dessous).
    </div>

    <section class="block">
      <h2>1. Éditeur du site</h2>
      <dl>
        <div>
          <dt>Dénomination</dt>
          <dd>{{ SHOP.name }}</dd>
        </div>
        <div>
          <dt>Forme juridique</dt>
          <dd :class="{ 'is-todo': isTodo(legal.legalForm) }">
            {{ legal.legalForm }}
          </dd>
        </div>
        <div v-if="legal.capital">
          <dt>Capital social</dt>
          <dd>{{ legal.capital.amount }} {{ legal.capital.currency }}</dd>
        </div>
        <div>
          <dt>Siège social</dt>
          <dd>{{ formattedAddress() }}</dd>
        </div>
        <div>
          <dt>SIRET</dt>
          <dd :class="{ 'is-todo': isTodo(legal.siret) }">{{ legal.siret }}</dd>
        </div>
        <div>
          <dt>Inscription RCS</dt>
          <dd :class="{ 'is-todo': isTodo(legal.rcs) }">{{ legal.rcs }}</dd>
        </div>
        <div v-if="legal.vatNumber">
          <dt>TVA intracommunautaire</dt>
          <dd>{{ legal.vatNumber }}</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>
            <a :href="`mailto:${SHOP.contact.email}`">{{ SHOP.contact.email }}</a>
          </dd>
        </div>
        <div>
          <dt>Directeur de la publication</dt>
          <dd :class="{ 'is-todo': isTodo(legal.publicationDirector) }">
            {{ legal.publicationDirector }}
          </dd>
        </div>
      </dl>
    </section>

    <section class="block">
      <h2>2. Hébergement</h2>
      <dl>
        <div>
          <dt>Hébergeur</dt>
          <dd :class="{ 'is-todo': isTodo(legal.host.name) }">
            {{ legal.host.name }}
          </dd>
        </div>
        <div>
          <dt>Adresse</dt>
          <dd :class="{ 'is-todo': isTodo(legal.host.address) }">
            {{ legal.host.address }}
          </dd>
        </div>
        <div>
          <dt>Téléphone</dt>
          <dd :class="{ 'is-todo': isTodo(legal.host.phone) }">
            {{ legal.host.phone }}
          </dd>
        </div>
      </dl>
    </section>

    <section class="block">
      <h2>3. Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments composant le site {{ SHOP.name }} (textes,
        graphismes, logos, icônes, photographies, vidéos, sons, mascotte) sont
        la propriété exclusive de {{ SHOP.name }} ou de ses partenaires, et
        sont protégés par les lois françaises et internationales relatives à
        la propriété intellectuelle.
      </p>
      <p>
        Les marques, noms, logos et univers des franchises présentées sur ce
        site (Dragon Ball, One Piece, Naruto, Pokémon, Marvel, Star Wars,
        Studio Ghibli, etc.) restent la propriété de leurs ayants droit
        respectifs. Leur mention sur ce site a pour seul but d'informer la
        clientèle sur les produits sous licence officielle proposés en
        boutique, sans préjudice des droits de leurs titulaires.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication ou
        adaptation, totale ou partielle, des éléments du site est interdite
        sans autorisation écrite préalable de {{ SHOP.name }}.
      </p>
    </section>

    <section class="block">
      <h2>4. Données personnelles</h2>
      <p>
        {{ SHOP.name }} respecte la vie privée de ses visiteurs et clients
        conformément au Règlement Général sur la Protection des Données (RGPD,
        règlement UE 2016/679) et à la Loi Informatique et Libertés.
      </p>
      <p>
        Les données collectées via le formulaire de contact, la création de
        compte ou la passation de commande sont utilisées uniquement pour
        traiter les demandes des utilisateurs et la gestion de la relation
        commerciale. Elles ne sont jamais revendues à des tiers.
      </p>
      <p>
        Conformément aux articles 15 à 22 du RGPD, tout utilisateur dispose
        d'un droit d'accès, de rectification, d'effacement, de portabilité,
        d'opposition et de limitation du traitement de ses données. Pour
        exercer ces droits, contacter
        <a :href="`mailto:${SHOP.contact.email}`">{{ SHOP.contact.email }}</a>.
      </p>
    </section>

    <section class="block">
      <h2>5. Cookies</h2>
      <p>
        Ce site utilise des cookies techniques nécessaires à son
        fonctionnement (panier, préférences). L'affichage de la carte Google
        Maps en page d'accueil charge également des cookies tiers déposés par
        Google. Le visiteur peut à tout moment configurer son navigateur pour
        accepter ou refuser ces cookies.
      </p>
    </section>

    <section class="block">
      <h2>6. Loi applicable</h2>
      <p>
        Les présentes mentions légales sont soumises au droit français. Tout
        litige relatif à leur interprétation ou à leur exécution relève de la
        compétence exclusive des tribunaux français.
      </p>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 820px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}
.page__title {
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 1.5rem;
}
.page__lead {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-ink-soft);
  margin: 0 0 1.5rem;
}
.page__warn {
  background: var(--color-brand-yellow);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 0.8rem 1rem;
  font-weight: 700;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-stamp);
}

.block {
  margin-bottom: 2.5rem;
}
.block h2 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin: 0 0 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--color-brand-ink);
}
.block p {
  line-height: 1.65;
  margin: 0 0 0.8rem;
}
.block p a {
  color: var(--color-brand-ink);
  font-weight: 700;
  text-decoration: underline;
}

dl {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem 1rem;
  margin: 0;
}
@media (min-width: 600px) {
  dl {
    grid-template-columns: 200px 1fr;
  }
  dl > div {
    display: contents;
  }
}
dl > div {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  padding: 0.4rem 0;
  border-bottom: 1px dashed var(--color-line);
}
dt {
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-ink-muted);
}
dd {
  margin: 0;
  word-break: break-word;
}

/* Marquage visible des données encore non renseignées (TODO).
   Tant qu'il y a du jaune sur cette page, c'est qu'il y a du boulot. */
.is-todo {
  background: var(--color-brand-yellow);
  border: 2px dashed var(--color-brand-ink);
  padding: 0.15rem 0.5rem;
  font-weight: 700;
  border-radius: var(--radius-sm);
  display: inline-block;
}
</style>
