<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import BaseChip from '@/components/base/BaseChip.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { displayName } = storeToRefs(auth)

/**
 * Pannel admin — page placeholder.
 *
 * Les modules listés ci-dessous ne sont PAS encore implémentés. Cette page
 * sert juste de point d'entrée et de carte de route visuelle pour les
 * fonctionnalités admin qu'on développera ensemble plus tard, une fois
 * que le back Spring Boot sera branché.
 *
 * Chaque carte est volontairement grisée et non-cliquable tant que le
 * module correspondant n'existe pas.
 */
const modules = [
  {
    key: 'products',
    title: 'Produits',
    description:
      'Ajouter, modifier, supprimer les produits du catalogue. Gérer les stocks et les images.',
    icon: '📦',
  },
  {
    key: 'orders',
    title: 'Commandes',
    description:
      'Suivi de toutes les commandes : préparation, expédition, gestion des retours.',
    icon: '🧾',
  },
  {
    key: 'customers',
    title: 'Clients',
    description:
      'Base utilisateurs : consultation des comptes, historique d\'achats, gestion des adresses.',
    icon: '👥',
  },
  {
    key: 'stats',
    title: 'Statistiques',
    description:
      'Chiffre d\'affaires, top produits, taux de conversion, panier moyen.',
    icon: '📊',
  },
  {
    key: 'settings',
    title: 'Réglages boutique',
    description:
      'Horaires, modes de livraison, taux de TVA, intégrations (JDC, CAWL).',
    icon: '⚙️',
  },
  {
    key: 'integrations',
    title: 'Intégrations',
    description:
      'Connexion caisse JDC (stock + ventes en magasin), passerelle paiement CAWL.',
    icon: '🔌',
  },
]
</script>

<template>
  <div class="admin">
    <header class="admin__head">
      <BaseChip variant="yellow" size="md">Pannel admin</BaseChip>
      <h1 class="admin__title text-stamp">Bienvenue {{ displayName }}</h1>
      <p class="admin__sub">
        Vue d'ensemble des modules d'administration. Tu peux revenir sur le
        <RouterLink :to="{ name: 'account-orders' }">site client</RouterLink>
        à tout moment depuis le menu.
      </p>
    </header>

    <div class="warn">
      🚧 <strong>Pannel en construction.</strong> Les modules ci-dessous sont
      des cartes de route — ils seront développés au fur et à mesure une fois
      le back Spring Boot opérationnel et la caisse JDC branchée.
    </div>

    <div class="grid">
      <article
        v-for="m in modules"
        :key="m.key"
        class="module"
        aria-disabled="true"
      >
        <div class="module__icon" aria-hidden="true">{{ m.icon }}</div>
        <div class="module__body">
          <h2 class="module__title">{{ m.title }}</h2>
          <p class="module__desc">{{ m.description }}</p>
        </div>
        <BaseChip variant="outline" size="sm" class="module__status">
          Bientôt
        </BaseChip>
      </article>
    </div>
  </div>
</template>

<style scoped>
.admin {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.admin__head {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-start;
}
.admin__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin: 0;
}
.admin__sub {
  margin: 0;
  color: var(--color-ink-muted);
  font-size: 0.95rem;
}
.admin__sub a {
  color: var(--color-brand-ink);
  font-weight: 700;
  text-decoration: underline;
}

.warn {
  background: var(--color-brand-yellow);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 1rem 1.2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-stamp);
  font-size: 0.95rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.2rem;
}

.module {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 1.4rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  /* Effet "désactivé" subtil */
  opacity: 0.85;
  filter: saturate(0.7);
}
.module__icon {
  font-size: 2.4rem;
  line-height: 1;
}
.module__body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.module__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
}
.module__desc {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-ink-muted);
}
.module__status {
  align-self: flex-start;
  margin-top: 0.2rem;
}
</style>
