<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseChip from '@/components/base/BaseChip.vue'
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
  <section class="page">
    <header class="page__head">
      <h1 class="page__title text-stamp">Mes adresses</h1>
      <p class="page__sub">
        Tes adresses de livraison et de facturation pour passer commande plus
        rapidement.
      </p>
    </header>

    <div v-if="currentUser.addresses.length === 0 && !showForm" class="empty">
      <p>Tu n'as pas encore enregistré d'adresse.</p>
      <BaseButton @click="showForm = true">Ajouter une adresse</BaseButton>
    </div>

    <div v-else class="grid">
      <article
        v-for="addr in currentUser.addresses"
        :key="addr.id"
        class="addr"
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

    <form v-if="showForm" class="form" @submit.prevent="submit">
      <h3 class="form__title">Nouvelle adresse</h3>

      <label class="form__field">
        <span>Libellé</span>
        <input
          v-model="newAddress.label"
          type="text"
          required
          placeholder="Domicile, Bureau…"
        />
      </label>

      <div class="form__row">
        <label class="form__field">
          <span>Prénom</span>
          <input v-model="newAddress.firstName" type="text" required />
        </label>
        <label class="form__field">
          <span>Nom</span>
          <input v-model="newAddress.lastName" type="text" required />
        </label>
      </div>

      <label class="form__field">
        <span>Rue</span>
        <input
          v-model="newAddress.street"
          type="text"
          required
          placeholder="Numéro et nom de rue"
        />
      </label>

      <div class="form__row">
        <label class="form__field form__field--small">
          <span>Code postal</span>
          <input
            v-model="newAddress.postalCode"
            type="text"
            required
            inputmode="numeric"
          />
        </label>
        <label class="form__field">
          <span>Ville</span>
          <input v-model="newAddress.city" type="text" required />
        </label>
      </div>

      <label class="form__field">
        <span>Pays</span>
        <input v-model="newAddress.country" type="text" required />
      </label>

      <label class="form__field">
        <span>Téléphone (optionnel)</span>
        <input v-model="newAddress.phone" type="tel" />
      </label>

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

      <p v-if="localError" class="form__error" role="alert">
        ⚠️ {{ localError }}
      </p>

      <div class="form__actions">
        <BaseButton variant="ghost" type="button" @click="showForm = false">
          Annuler
        </BaseButton>
        <BaseButton type="submit" :disabled="auth.isLoading">
          Enregistrer
        </BaseButton>
      </div>
    </form>
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

.empty {
  background: var(--color-brand-cream);
  border: 2px dashed var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

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

.addr {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 1.2rem;
  box-shadow: var(--shadow-stamp);
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

.form {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-stamp);
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
.form__field--small {
  max-width: 160px;
}
.form__field input {
  padding: 0.6rem 0.85rem;
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
.form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
}
</style>
