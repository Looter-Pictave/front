<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/base/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})
const saved = ref(false)
const localError = ref(null)

// Hydrate le formulaire depuis le user courant à chaque changement.
watch(
  currentUser,
  (u) => {
    if (u) {
      form.value = {
        firstName: u.firstName ?? '',
        lastName: u.lastName ?? '',
        email: u.email ?? '',
        phone: u.phone ?? '',
      }
    }
  },
  { immediate: true },
)

async function submit() {
  saved.value = false
  localError.value = null
  try {
    await auth.updateProfile({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
    })
    saved.value = true
    setTimeout(() => (saved.value = false), 2500)
  } catch (e) {
    localError.value = e.message
  }
}
</script>

<template>
  <section class="page">
    <header class="page__head">
      <h1 class="page__title text-stamp">Mon profil</h1>
      <p class="page__sub">
        Les infos qu'on utilisera pour te contacter et préparer tes commandes.
      </p>
    </header>

    <form class="form" @submit.prevent="submit">
      <div class="form__row">
        <label class="form__field">
          <span>Prénom</span>
          <input v-model="form.firstName" type="text" required />
        </label>
        <label class="form__field">
          <span>Nom</span>
          <input v-model="form.lastName" type="text" required />
        </label>
      </div>

      <label class="form__field">
        <span>Email</span>
        <input v-model="form.email" type="email" required />
      </label>

      <label class="form__field">
        <span>Téléphone</span>
        <input v-model="form.phone" type="tel" placeholder="+33 6 12 34 56 78" />
      </label>

      <p v-if="localError" class="form__error" role="alert">⚠️ {{ localError }}</p>
      <p v-if="saved" class="form__success" role="status">
        ✅ Profil mis à jour.
      </p>

      <div class="form__actions">
        <BaseButton type="submit" :disabled="auth.isLoading">
          Enregistrer
        </BaseButton>
      </div>
    </form>

    <aside class="meta">
      <p>
        Compte créé le
        <strong>{{
          new Date(currentUser.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        }}</strong>
      </p>
      <p>
        Identifiant interne : <code>{{ currentUser.id }}</code>
      </p>
    </aside>
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

.form {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-stamp);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 600px) {
  .form__row {
    grid-template-columns: 1fr 1fr;
  }
}
.form__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 700;
  font-size: 0.85rem;
}
.form__field input {
  padding: 0.65rem 0.9rem;
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  background: var(--color-brand-paper);
}
.form__field input:focus {
  outline: 2px solid var(--color-brand-yellow);
  outline-offset: 2px;
}
.form__error {
  background: rgb(198 40 40 / 0.1);
  border: 2px solid var(--color-stock-out);
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.8rem;
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-stock-out);
  font-weight: 700;
}
.form__success {
  background: rgb(46 125 50 / 0.1);
  border: 2px solid var(--color-stock-in);
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.8rem;
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-stock-in);
  font-weight: 700;
}
.form__actions {
  display: flex;
  justify-content: flex-end;
}

.meta {
  margin-top: 1.5rem;
  padding: 1rem 1.2rem;
  background: var(--color-brand-cream);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  color: var(--color-ink-muted);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.meta p {
  margin: 0;
}
.meta code {
  background: var(--color-brand-paper);
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  font-size: 0.78rem;
}
</style>
