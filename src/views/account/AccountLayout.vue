<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const { currentUser, displayName, isAdmin } = storeToRefs(auth)

async function handleLogout() {
  await auth.logout()
  router.push({ name: 'home' })
}

// Items de la nav latérale — pictos en SVG inline pour rester léger.
// Ajout d'un item Admin uniquement si le user est admin.
</script>

<template>
  <div class="account" v-if="currentUser">
    <aside class="account__side panel">
      <div class="account__hello">
        <p class="account__hello-label">Bonjour</p>
        <p class="account__hello-name">{{ displayName }}</p>
        <p class="account__hello-email">{{ currentUser.email }}</p>
      </div>

      <nav class="account__nav" aria-label="Espace client">
        <RouterLink
          :to="{ name: 'account-orders' }"
          class="account__link"
          active-class="account__link--active"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M16 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0-1 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 16 16z" transform="translate(4 0)" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span>Mes commandes</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'account-profile' }"
          class="account__link"
          active-class="account__link--active"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Mon profil</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'account-addresses' }"
          class="account__link"
          active-class="account__link--active"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Mes adresses</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'account-settings' }"
          class="account__link"
          active-class="account__link--active"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>Paramètres</span>
        </RouterLink>

        <RouterLink
          v-if="isAdmin"
          :to="{ name: 'admin' }"
          class="account__link account__link--admin"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Pannel admin</span>
        </RouterLink>
      </nav>

      <button type="button" class="account__logout" @click="handleLogout">
        Déconnexion
      </button>
    </aside>

    <main class="account__main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.account {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 880px) {
  .account {
    grid-template-columns: 260px 1fr;
    align-items: start;
  }
}

/* surface fournie par .panel */
.account__side {
  padding: 1.4rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 90px;
}

.account__hello {
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-brand-ink);
}
.account__hello-label {
  margin: 0;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-ink-muted);
  font-weight: 700;
}
.account__hello-name {
  margin: 0.2rem 0 0.1rem;
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.1;
}
.account__hello-email {
  margin: 0;
  font-size: 0.78rem;
  color: var(--color-ink-muted);
  word-break: break-all;
}

.account__nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.account__link {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.8rem;
  text-decoration: none;
  color: var(--color-brand-ink);
  font-weight: 700;
  font-size: 0.88rem;
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  transition: background 0.12s ease, border-color 0.12s ease;
}
.account__link:hover {
  background: var(--color-brand-cream);
}
.account__link--active {
  background: var(--color-brand-yellow);
  border-color: var(--color-brand-ink);
}
.account__link--admin {
  margin-top: 0.5rem;
  border-color: var(--color-brand-ink);
  background: var(--color-brand-ink);
  color: var(--color-brand-yellow);
}
.account__link--admin:hover {
  background: #000;
}

.account__logout {
  margin-top: 0.5rem;
  background: none;
  border: 2px dashed var(--color-brand-ink);
  border-radius: var(--radius-sm);
  padding: 0.55rem 0.8rem;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  color: var(--color-brand-ink);
  transition: background 0.12s ease;
}
.account__logout:hover {
  background: var(--color-brand-cream);
}

.account__main {
  min-width: 0;
}
</style>
