<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const localError = ref(null)

async function submit() {
  localError.value = null
  try {
    await auth.login(email.value, password.value)
    // Redirige vers la page d'origine (?redirect=...) ou par défaut sur les commandes
    const target = route.query.redirect || { name: 'account-orders' }
    router.push(target)
  } catch (e) {
    localError.value = e.message
  }
}
</script>

<template>
  <div class="page">
    <div class="auth-card">
      <h1 class="auth-card__title text-stamp">Connexion</h1>
      <p class="auth-card__lead">
        Bon retour parmi nous ! Connecte-toi pour accéder à ton compte et
        suivre tes commandes.
      </p>

      <form class="form" @submit.prevent="submit">
        <label class="form__field">
          <span>Email</span>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="ton.email@exemple.fr"
          />
        </label>

        <label class="form__field">
          <span>Mot de passe</span>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
          />
        </label>

        <p v-if="localError" class="form__error" role="alert">
          ⚠️ {{ localError }}
        </p>

        <BaseButton type="submit" size="lg" block :disabled="auth.isLoading">
          {{ auth.isLoading ? 'Connexion…' : 'Se connecter' }}
        </BaseButton>

        <p class="form__switch">
          Pas encore de compte ?
          <RouterLink :to="{ name: 'register' }">Crée le tien</RouterLink>
        </p>
      </form>

      <!-- ⚠️ Bloc dev uniquement : affiche les comptes mockés disponibles.
           À retirer le jour où on branchera la vraie auth Spring. -->
      <aside class="dev-hint">
        <strong>🧪 Comptes de test</strong>
        <ul>
          <li>Client : <code>client@test.fr</code> / <code>client</code></li>
          <li>Admin : <code>admin@test.fr</code> / <code>admin</code></li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 500px;
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
.form__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 700;
  font-size: 0.85rem;
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

.dev-hint {
  margin-top: 1.8rem;
  padding: 0.9rem 1.1rem;
  background: var(--color-brand-cream);
  border: 2px dashed var(--color-brand-ink);
  border-radius: var(--radius-md);
  font-size: 0.8rem;
}
.dev-hint strong {
  display: block;
  font-family: var(--font-display);
  margin-bottom: 0.4rem;
}
.dev-hint ul {
  margin: 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.dev-hint code {
  background: var(--color-brand-yellow);
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
  font-size: 0.78rem;
}
</style>
