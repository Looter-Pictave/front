<script setup>
import { SHOP, formattedAddress } from '@/config/shop'

/**
 * Page "Conditions Générales de Vente" — obligatoire pour tout site
 * e-commerce qui vend à des consommateurs (Code de la consommation,
 * articles L.221-5 et suivants).
 *
 * ⚠️ TEMPLATE INDICATIF : ces CGV sont une base de travail standard pour
 *    un commerçant qui vend en ligne. Avant la mise en prod, elles DOIVENT
 *    être relues et validées par un juriste (ou au moins un avocat
 *    spécialisé en droit de la consommation), car :
 *      - les clauses peuvent varier selon le mode de paiement réel (CAWL),
 *        le transporteur retenu, les délais réels de livraison, etc.
 *      - le non-respect du Code de la consommation expose à des sanctions
 *        et à l'inopposabilité de certaines clauses au consommateur.
 *
 * Les passages "[À PRÉCISER]" sont à compléter au moment où les choix
 * opérationnels seront arrêtés.
 */

const currentDate = new Date().toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
</script>

<template>
  <div class="page">
    <h1 class="page__title text-stamp">Conditions Générales de Vente</h1>

    <p class="page__lead">
      En vigueur au {{ currentDate }}. Les présentes Conditions Générales
      de Vente (ci-après "CGV") régissent les ventes de produits réalisées sur
      le site
      <strong>{{ SHOP.name }}</strong> au profit de tout consommateur (ci-après
      "le Client") effectuant une commande en ligne.
    </p>

    <div class="page__warn" role="status">
      ⚠️ Ces CGV sont un <strong>template indicatif</strong>. Elles doivent
      être relues et validées par un juriste avant la mise en production du
      site marchand.
    </div>

    <section class="block">
      <h2>1. Identité du vendeur</h2>
      <p>
        Les produits proposés à la vente sont commercialisés par
        <strong>{{ SHOP.name }}</strong>, dont le siège social est situé
        {{ formattedAddress() }}. Pour toute question concernant une commande,
        contactez-nous par email à
        <a :href="`mailto:${SHOP.contact.email}`">{{ SHOP.contact.email }}</a>.
      </p>
    </section>

    <section class="block">
      <h2>2. Objet</h2>
      <p>
        Les présentes CGV ont pour objet de définir les droits et obligations
        des parties dans le cadre de la vente en ligne de produits proposés
        par {{ SHOP.name }} (figurines, mangas, statues résine, mugs, t-shirts,
        cartes à collectionner, goodies, etc.).
      </p>
    </section>

    <section class="block">
      <h2>3. Acceptation des CGV</h2>
      <p>
        Le Client déclare avoir pris connaissance et accepté sans réserve les
        présentes CGV avant la passation de sa commande. La validation de la
        commande vaut acceptation des CGV en vigueur au jour de la commande.
      </p>
    </section>

    <section class="block">
      <h2>4. Produits</h2>
      <p>
        Les produits proposés à la vente sont décrits et présentés avec la
        plus grande exactitude possible. Toutefois, en cas d'erreurs ou
        d'omissions dans la présentation, la responsabilité de {{ SHOP.name }}
        ne pourrait en être engagée.
      </p>
      <p>
        Les produits sont proposés dans la limite des stocks disponibles. En
        cas d'indisponibilité d'un produit après passation de la commande, le
        Client en sera informé par email dans les meilleurs délais et pourra
        choisir entre le remboursement ou l'échange.
      </p>
    </section>

    <section class="block">
      <h2>5. Prix</h2>
      <p>
        Les prix des produits sont indiqués en euros toutes taxes comprises
        (TTC), hors frais de livraison. Les frais de livraison sont indiqués
        avant la validation de la commande.
      </p>
      <p>
        {{ SHOP.name }} se réserve le droit de modifier ses prix à tout
        moment ; les produits sont toutefois facturés sur la base des tarifs
        en vigueur au moment de l'enregistrement de la commande.
      </p>
    </section>

    <section class="block">
      <h2>6. Commande</h2>
      <p>
        Le Client passe commande en sélectionnant les produits, en validant
        son panier puis en confirmant son adresse de livraison et son mode
        de paiement. La commande est considérée comme définitive après
        confirmation de paiement.
      </p>
      <p>
        Un email récapitulatif de la commande est envoyé au Client à
        l'adresse renseignée lors de la commande.
      </p>
    </section>

    <section class="block">
      <h2>7. Paiement</h2>
      <p>
        Le paiement s'effectue en ligne par carte bancaire via
        [À PRÉCISER : nom de la solution de paiement, ex. Crédit Agricole
        Worldline / CAWL]. La transaction est sécurisée et les données
        bancaires du Client ne sont à aucun moment stockées par
        {{ SHOP.name }}.
      </p>
    </section>

    <section class="block">
      <h2>8. Livraison</h2>
      <p>
        Les produits sont livrés à l'adresse de livraison indiquée par le
        Client lors de la commande. Les livraisons sont assurées par
        [À PRÉCISER : transporteur(s) retenu(s) — La Poste, Mondial Relay,
        Colissimo, etc.] dans un délai indicatif de
        [À PRÉCISER : délai en jours ouvrés] à compter de la validation de la
        commande, pour toute livraison en France métropolitaine.
      </p>
      <p>
        En cas de retard de livraison, le Client est invité à contacter
        {{ SHOP.name }} qui prendra contact avec le transporteur pour
        localiser le colis.
      </p>
      <p>
        Le retrait gratuit en boutique au {{ SHOP.address.street }} à
        {{ SHOP.address.city }} est également proposé.
      </p>
    </section>

    <section class="block">
      <h2>9. Droit de rétractation</h2>
      <p>
        Conformément aux articles L.221-18 et suivants du Code de la
        consommation, le Client dispose d'un délai de
        <strong>14 jours</strong> à compter de la réception des produits pour
        exercer son droit de rétractation, sans avoir à justifier de motifs
        ni à payer de pénalités.
      </p>
      <p>
        Pour exercer ce droit, le Client doit notifier sa décision à
        {{ SHOP.name }} par email à
        <a :href="`mailto:${SHOP.contact.email}`">{{ SHOP.contact.email }}</a>
        avant l'expiration du délai. Les produits doivent être retournés à
        leurs frais, dans leur emballage d'origine et en parfait état, dans
        un délai de 14 jours suivant la notification.
      </p>
      <p>
        Le remboursement intervient dans un délai de 14 jours à compter de la
        réception des produits retournés.
      </p>
      <p>
        Le droit de rétractation ne s'applique pas aux produits descellés par
        le consommateur après livraison et qui ne peuvent être renvoyés pour
        des raisons de protection de la santé ou d'hygiène (articles L.221-28
        du Code de la consommation).
      </p>
    </section>

    <section class="block">
      <h2>10. Garanties légales</h2>
      <p>
        Tous les produits vendus bénéficient de la garantie légale de
        conformité (articles L.217-3 et suivants du Code de la consommation,
        durée de 2 ans à compter de la délivrance du bien) et de la garantie
        contre les vices cachés (articles 1641 et suivants du Code civil).
      </p>
      <p>
        En cas de défaut de conformité, le Client peut demander la
        réparation ou le remplacement du produit. À défaut, il peut obtenir
        la résolution de la vente ou une réduction de prix.
      </p>
    </section>

    <section class="block">
      <h2>11. Service client et médiation</h2>
      <p>
        Pour toute réclamation, le Client peut contacter le service client de
        {{ SHOP.name }} par email à
        <a :href="`mailto:${SHOP.contact.email}`">{{ SHOP.contact.email }}</a>.
      </p>
      <p>
        En cas de litige non résolu, le Client peut recourir gratuitement à
        un médiateur de la consommation conformément aux articles L.611-1 et
        suivants du Code de la consommation :
        [À PRÉCISER : nom et coordonnées du médiateur de la consommation
        choisi — ex. CMAP, Médiateur du e-commerce de la FEVAD, etc.].
      </p>
      <p>
        Le Client peut également recourir à la plateforme européenne de
        Règlement en Ligne des Litiges (RLL) :
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ec.europa.eu/consumers/odr
        </a>.
      </p>
    </section>

    <section class="block">
      <h2>12. Données personnelles</h2>
      <p>
        Les modalités de traitement des données personnelles sont détaillées
        dans nos
        <RouterLink to="/mentions-legales">Mentions légales</RouterLink>.
      </p>
    </section>

    <section class="block">
      <h2>13. Loi applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. Tout litige
        relatif à leur interprétation ou à leur exécution est, à défaut
        d'accord amiable, de la compétence exclusive des tribunaux français.
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
  margin-bottom: 2rem;
  box-shadow: var(--shadow-stamp);
}

.block {
  margin-bottom: 2rem;
}
.block h2 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin: 0 0 0.8rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--color-brand-ink);
}
.block p {
  line-height: 1.65;
  margin: 0 0 0.8rem;
}
.block p a,
.block p strong {
  color: var(--color-brand-ink);
  font-weight: 700;
}
.block p a {
  text-decoration: underline;
}
</style>
