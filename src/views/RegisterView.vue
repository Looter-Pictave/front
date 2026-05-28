<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseField from '@/components/base/BaseField.vue'
import FormMessage from '@/components/ui/FormMessage.vue'
import PageContainer from '@/components/ui/PageContainer.vue'
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
  <PageContainer width="narrow">
    <div class="auth-card panel panel--lg">
      <h1 class="auth-card__title text-stamp">Créer un compte</h1>
      <p class="auth-card__lead">
        Quelques infos et c'est fait — tu pourras retrouver tes commandes,
        gérer tes adresses et passer commande plus vite la prochaine fois.
      </p>

      <form class="form" @submit.prevent="submit">
        <div class="form__row">
          <BaseField
            v-model="form.firstName"
            label="Prénom"
            type="text"
            required
            autocomplete="given-name"
          />
          <BaseField
            v-model="form.lastName"
            label="Nom"
            type="text"
            required
            autocomplete="family-name"
          />
        </div>

        <BaseField
          v-model="form.email"
          label="Email"
          type="email"
          required
          autocomplete="email"
          placeholder="ton.email@exemple.fr"
        />

        <BaseField
          v-model="form.phone"
          label="Téléphone"
          hint="(optionnel)"
          type="tel"
          autocomplete="tel"
          placeholder="+33 6 12 34 56 78"
        />

        <BaseField
          v-model="form.password"
          label="Mot de passe"
          type="password"
          required
          minlength="6"
          autocomplete="new-password"
        />

        <BaseField
          v-model="form.passwordConfirm"
          label="Confirmation du mot de passe"
          type="password"
          required
          autocomplete="new-password"
          :error="!passwordsMatch ? 'Les mots de passe ne correspondent pas.' : ''"
        />

        <label class="form__check">
          <input v-model="form.acceptTerms" type="checkbox" required />
          <span>
            J'ai lu et accepte les
            <RouterLink :to="{ name: 'terms' }">CGV</RouterLink>
            et les
            <RouterLink :to="{ name: 'legal' }">mentions légales</RouterLink>.
          </span>
        </label>

        <FormMessage v-if="localError" variant="error">
          ⚠️ {{ localError }}
        </FormMessage>

        <BaseButton type="submit" size="lg" block :disabled="auth.isLoading">
          {{ auth.isLoading ? 'Création…' : 'Créer mon compte' }}
        </BaseButton>

        <p class="form__switch">
          Déjà inscrit ?
          <RouterLink :to="{ name: 'login' }">Connecte-toi</RouterLink>
        </p>
      </form>
    </div>
  </PageContainer>
</template>

<style scoped>
/* surface fournie par .panel.panel--lg */
.auth-card {
  padding: 2rem 1.8rem;
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
@media (min-width: 640px) {
  .form__row {
    grid-template-columns: 1fr 1fr;
  }
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
