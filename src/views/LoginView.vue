<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseField from '@/components/base/BaseField.vue'
import FormMessage from '@/components/ui/FormMessage.vue'
import PageContainer from '@/components/ui/PageContainer.vue'
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
  <PageContainer width="narrow">
    <div class="auth-card panel panel--lg">
      <h1 class="auth-card__title text-stamp">Connexion</h1>
      <p class="auth-card__lead">
        Bon retour parmi nous ! Connecte-toi pour accéder à ton compte et
        suivre tes commandes.
      </p>

      <form class="form" @submit.prevent="submit">
        <BaseField
          v-model="email"
          label="Email"
          type="email"
          required
          autocomplete="email"
          placeholder="ton.email@exemple.fr"
        />

        <BaseField
          v-model="password"
          label="Mot de passe"
          type="password"
          required
          autocomplete="current-password"
          placeholder="••••••••"
        />

        <FormMessage v-if="localError" variant="error">
          ⚠️ {{ localError }}
        </FormMessage>

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
