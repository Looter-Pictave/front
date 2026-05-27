<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)

const preferences = ref({ newsletter: false })
const saved = ref(false)

watch(
  currentUser,
  (u) => {
    if (u) preferences.value = { ...u.preferences }
  },
  { immediate: true },
)

async function savePreferences() {
  await auth.updateProfile({ preferences: preferences.value })
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}

async function handleLogout() {
  await auth.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <section class="page">
    <header class="page__head">
      <h1 class="page__title text-stamp">Paramètres</h1>
      <p class="page__sub">
        Préférences de communication et gestion de ton compte.
      </p>
    </header>

    <div class="card">
      <h2 class="card__title">Communications</h2>
      <label class="check">
        <input v-model="preferences.newsletter" type="checkbox" />
        <span>
          Je souhaite recevoir la newsletter Looter Pictave (nouveautés,
          précommandes, événements en boutique). Aucun spam, désinscription
          en 1 clic.
        </span>
      </label>
      <p v-if="saved" class="card__success" role="status">
        ✅ Préférences enregistrées.
      </p>
      <div class="card__actions">
        <BaseButton @click="savePreferences" :disabled="auth.isLoading">
          Enregistrer
        </BaseButton>
      </div>
    </div>

    <div class="card">
      <h2 class="card__title">Session</h2>
      <p class="card__lead">
        Tu peux te déconnecter de cet appareil — tu pourras te reconnecter
        plus tard avec tes identifiants.
      </p>
      <div class="card__actions">
        <BaseButton variant="ghost" @click="handleLogout">
          Me déconnecter
        </BaseButton>
      </div>
    </div>

    <div class="card card--danger">
      <h2 class="card__title">Zone dangereuse</h2>
      <p class="card__lead">
        Suppression du compte : non disponible pour le moment (sera ajouté
        avec l'intégration backend). Pour toute demande, contacte-nous à
        <a :href="`mailto:contact@looter-pictave.fr`">contact@looter-pictave.fr</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.page__head {
  margin-bottom: 1.5rem;
}
.page__title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  margin: 0 0 0.4rem;
}
.page__sub {
  margin: 0;
  color: var(--color-ink-muted);
  font-size: 0.95rem;
}

.card {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-stamp);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}
.card--danger {
  border-style: dashed;
  background: rgb(198 40 40 / 0.05);
}
.card__title {
  font-family: var(--font-display);
  margin: 0;
  font-size: 1.1rem;
}
.card__lead {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}
.card__lead a {
  color: var(--color-brand-ink);
  font-weight: 700;
}
.card__success {
  background: rgb(46 125 50 / 0.1);
  border: 2px solid var(--color-stock-in);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.8rem;
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-stock-in);
  font-weight: 700;
}
.card__actions {
  display: flex;
  justify-content: flex-end;
}
.check {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.9rem;
  line-height: 1.4;
}
.check input {
  margin-top: 0.2rem;
  width: 18px;
  height: 18px;
  accent-color: var(--color-brand-ink);
}
</style>
