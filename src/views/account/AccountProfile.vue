<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseField from '@/components/base/BaseField.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import FormMessage from '@/components/ui/FormMessage.vue'
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
  <section>
    <PageHeader
      title="Mon profil"
      subtitle="Les infos qu'on utilisera pour te contacter et préparer tes commandes."
    />

    <form class="form panel" @submit.prevent="submit">
      <div class="form__row">
        <BaseField v-model="form.firstName" label="Prénom" type="text" required />
        <BaseField v-model="form.lastName" label="Nom" type="text" required />
      </div>

      <BaseField v-model="form.email" label="Email" type="email" required />

      <BaseField
        v-model="form.phone"
        label="Téléphone"
        type="tel"
        placeholder="+33 6 12 34 56 78"
      />

      <FormMessage v-if="localError" variant="error">⚠️ {{ localError }}</FormMessage>
      <FormMessage v-if="saved" variant="success">✅ Profil mis à jour.</FormMessage>

      <div class="form__actions">
        <BaseButton type="submit" :disabled="auth.isLoading">Enregistrer</BaseButton>
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
/* surface fournie par .panel */
.form {
  padding: 1.5rem;
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
