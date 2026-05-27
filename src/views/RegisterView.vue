<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
  acceptTerms: false,
})
const localError = ref(null)

const passwordsMatch = computed(
  () =>
    form.value.password.length === 0 ||
    form.value.password === form.value.passwordConfirm,
)

async function submit() {
  localError.value = null
  if (!passwordsMatch.value) {
    localError.value = 'Les mots de passe ne correspondent pas.'
    return
  }
  if (form.value.password.length < 6) {
    localError.value = 'Le mot de passe doit faire au moins 6 caractères.'
    return
  }
  try {
    await auth.register({
      email: form.value.email,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phone: form.value.phone,
    })
    router.push({ name: 'account-orders' })
  } catch (e) {
    localError.value = e.message
  }
}
</script>

<template>
  <div class="page">
    <div class="auth-card">
      <h1 class="auth-card__title text-stamp">Créer un compte</h1>
      <p class="auth-card__lead">
        Quelques infos et c'est fait — tu pourras retrouver tes commandes,
        gérer tes adresses et passer commande plus vite la prochaine fois.
      </p>

      <form class="form" @submit.prevent="submit">
        <div class="form__row">
          <label class="form__field">
            <span>Prénom</span>
            <input
              v-model="form.firstName"
              type="text"
              required
              autocomplete="given-name"
            />
          </label>
          <label class="form__field">
            <span>Nom</span>
            <input
              v-model="form.lastName"
              type="text"
              required
              autocomplete="family-name"
            />
          </label>
        </div>

        <label class="form__field">
          <span>Email</span>
          <input
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            placeholder="ton.email@exemple.fr"
          />
        </label>

        <label class="form__field">
          <span>Téléphone <span class="form__optional">(optionnel)</span></span>
          <input
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            placeholder="+33 6 12 34 56 78"
          />
        </label>

        <label class="form__field">
          <span>Mot de passe</span>
          <input
            v-model="form.password"
            type="password"
            required
            minlength="6"
            autocomplete="new-password"
          />
        </label>

        <label class="form__field">
          <span>Confirmation du mot de passe</span>
          <input
            v-model="form.passwordConfirm"
            type="password"
            required
            autocomplete="new-password"
            :class="{ 'form__input--error': !passwordsMatch }"
          />
        </label>

        <label class="form__check">
          <input v-model="form.acceptTerms" type="checkbox" required />
          <span>
            J'ai lu et accepte les
            <RouterLink :to="{ name: 'terms' }">CGV</RouterLink>
            et les
            <RouterLink :to="{ name: 'legal' }">mentions légales</RouterLink>.
          </span>
        </label>

        <p v-if="localError" class="form__error" role="alert">
          ⚠️ {{ localError }}
        </p>

        <BaseButton type="submit" size="lg" block :disabled="auth.isLoading">
          {{ auth.isLoading ? 'Création…' : 'Créer mon compte' }}
        </BaseButton>

        <p class="form__switch">
          Déjà inscrit ?
          <RouterLink :to="{ name: 'login' }">Connecte-toi</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 560px;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}
.auth-card {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-lg);
  padding: 2rem 1.8rem;
  box-shadow: var(--shadow-stamp-lg);
}
.auth-card__title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  margin: 0 0 0.5rem;
}
.auth-card__lead {
  color: var(--color-ink-muted);
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 480px) {
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
.form__optional {
  color: var(--color-ink-muted);
  font-weight: 400;
  font-size: 0.78rem;
}
.form__field input {
  padding: 0.7rem 0.9rem;
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
.form__input--error {
  border-color: var(--color-stock-out);
}
.form__check {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.85rem;
  line-height: 1.4;
}
.form__check input {
  margin-top: 0.2rem;
  width: 18px;
  height: 18px;
  accent-color: var(--color-brand-ink);
}
.form__check a {
  color: var(--color-brand-ink);
  font-weight: 700;
  text-decoration: underline;
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
.form__switch {
  text-align: center;
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--color-ink-muted);
}
.form__switch a {
  color: var(--color-brand-ink);
  font-weight: 700;
  text-decoration: underline;
}
</style>
