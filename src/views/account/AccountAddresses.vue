<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseChip from '@/components/base/BaseChip.vue'
import BaseField from '@/components/base/BaseField.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import FormMessage from '@/components/ui/FormMessage.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)

const showForm = ref(false)
const newAddress = ref(createEmptyAddress())
const localError = ref(null)

function createEmptyAddress() {
  return {
    label: 'Domicile',
    firstName: currentUser.value?.firstName ?? '',
    lastName: currentUser.value?.lastName ?? '',
    street: '',
    postalCode: '',
    city: '',
    country: 'France',
    phone: currentUser.value?.phone ?? '',
    isShipping: true,
    isBilling: true,
    isDefault: (currentUser.value?.addresses?.length ?? 0) === 0,
  }
}

async function submit() {
  localError.value = null
  try {
    await auth.addAddress(newAddress.value)
    newAddress.value = createEmptyAddress()
    showForm.value = false
  } catch (e) {
    localError.value = e.message
  }
}

async function remove(addressId) {
  if (!confirm('Supprimer cette adresse ?')) return
  try {
    await auth.removeAddress(addressId)
  } catch (e) {
    localError.value = e.message
  }
}
</script>

<template>
  <section>
    <PageHeader
      title="Mes adresses"
      subtitle="Tes adresses de livraison et de facturation pour passer commande plus rapidement."
    />

    <EmptyState
      v-if="currentUser.addresses.length === 0 && !showForm"
      message="Tu n'as pas encore enregistré d'adresse."
    >
      <BaseButton @click="showForm = true">Ajouter une adresse</BaseButton>
    </EmptyState>

    <div v-else class="grid">
      <article
        v-for="addr in currentUser.addresses"
        :key="addr.id"
        class="addr panel"
      >
        <div class="addr__head">
          <h3 class="addr__label">{{ addr.label }}</h3>
          <div class="addr__chips">
            <BaseChip v-if="addr.isDefault" variant="yellow" size="sm">
              Par défaut
            </BaseChip>
            <BaseChip v-if="addr.isShipping" variant="outline" size="sm">
              Livraison
            </BaseChip>
            <BaseChip v-if="addr.isBilling" variant="outline" size="sm">
              Facturation
            </BaseChip>
          </div>
        </div>
        <p class="addr__body">
          {{ addr.firstName }} {{ addr.lastName }}<br />
          {{ addr.street }}<br />
          {{ addr.postalCode }} {{ addr.city }}<br />
          {{ addr.country }}
          <span v-if="addr.phone"><br />📞 {{ addr.phone }}</span>
        </p>
        <div class="addr__actions">
          <button type="button" class="addr__remove" @click="remove(addr.id)">
            Supprimer
          </button>
        </div>
      </article>
    </div>

    <BaseButton
      v-if="currentUser.addresses.length > 0 && !showForm"
      variant="ghost"
      class="add-btn"
      @click="showForm = true"
    >
      + Ajouter une autre adresse
    </BaseButton>

    <form v-if="showForm" class="form panel" @submit.prevent="submit">
      <h3 class="form__title">Nouvelle adresse</h3>

      <BaseField
        v-model="newAddress.label"
        label="Libellé"
        type="text"
        required
        placeholder="Domicile, Bureau…"
      />

      <div class="form__row">
        <BaseField v-model="newAddress.firstName" label="Prénom" type="text" required />
        <BaseField v-model="newAddress.lastName" label="Nom" type="text" required />
      </div>

      <BaseField
        v-model="newAddress.street"
        label="Rue"
        type="text"
        required
        placeholder="Numéro et nom de rue"
      />

      <div class="form__row">
        <BaseField
          v-model="newAddress.postalCode"
          label="Code postal"
          type="text"
          required
          inputmode="numeric"
        />
        <BaseField v-model="newAddress.city" label="Ville" type="text" required />
      </div>

      <BaseField v-model="newAddress.country" label="Pays" type="text" required />

      <BaseField
        v-model="newAddress.phone"
        label="Téléphone"
        hint="(optionnel)"
        type="tel"
      />

      <div class="form__checks">
        <label class="form__check">
          <input v-model="newAddress.isShipping" type="checkbox" />
          <span>Adresse de livraison</span>
        </label>
        <label class="form__check">
          <input v-model="newAddress.isBilling" type="checkbox" />
          <span>Adresse de facturation</span>
        </label>
        <label class="form__check">
          <input v-model="newAddress.isDefault" type="checkbox" />
          <span>Adresse par défaut</span>
        </label>
      </div>

      <FormMessage v-if="localError" variant="error">⚠️ {{ localError }}</FormMessage>

      <div class="form__actions">
        <BaseButton variant="ghost" type="button" @click="showForm = false">
          Annuler
        </BaseButton>
        <BaseButton type="submit" :disabled="auth.isLoading">Enregistrer</BaseButton>
      </div>
    </form>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* surface fournie par .panel */
.addr {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.addr__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.addr__label {
  font-family: var(--font-display);
  margin: 0;
  font-size: 1rem;
}
.addr__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.addr__body {
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
}
.addr__actions {
  display: flex;
  justify-content: flex-end;
}
.addr__remove {
  background: none;
  border: none;
  color: var(--color-stock-out);
  text-decoration: underline;
  font-size: 0.8rem;
  cursor: pointer;
}

.add-btn {
  margin-bottom: 1rem;
}

/* surface fournie par .panel */
.form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
.form__title {
  font-family: var(--font-display);
  margin: 0;
  font-size: 1.1rem;
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
.form__checks {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.form__check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.85rem;
}
.form__check input {
  width: 18px;
  height: 18px;
  accent-color: var(--color-brand-ink);
}
.form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
}
</style>
