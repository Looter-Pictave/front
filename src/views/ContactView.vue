<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { SHOP } from '@/config/shop'

const form = ref({ name: '', email: '', message: '' })
const sent = ref(false)

function submit() {
  sent.value = true
  form.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <div class="page">
    <h1 class="page__title text-stamp">Contact</h1>

    <div class="grid">
      <section class="info">
        <h2>La boutique</h2>
        <address>
          {{ SHOP.name }}<br />
          {{ SHOP.address.street }}<br />
          {{ SHOP.address.postalCode }} {{ SHOP.address.city }}
        </address>

        <h3>Horaires</h3>
        <ul class="hours">
          <li v-for="h in SHOP.hours" :key="h.days">
            <span>{{ h.days }}</span>
            <span>{{ h.slots.join(' / ') }}</span>
          </li>
        </ul>

        <h3>Nous joindre</h3>
        <p>
          ✉️
          <a :href="`mailto:${SHOP.contact.email}`">{{ SHOP.contact.email }}</a>
        </p>

        <h3>Réseaux</h3>
        <p>
          <a :href="SHOP.social.facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
          ·
          <a :href="SHOP.social.instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
      </section>

      <section class="form-wrap">
        <h2>Un message ?</h2>
        <form v-if="!sent" class="form" @submit.prevent="submit">
          <label>
            <span>Nom</span>
            <input v-model="form.name" type="text" required />
          </label>
          <label>
            <span>Email</span>
            <input v-model="form.email" type="email" required />
          </label>
          <label>
            <span>Message</span>
            <textarea v-model="form.message" rows="6" required></textarea>
          </label>
          <BaseButton type="submit" size="lg" block>Envoyer</BaseButton>
          <p class="form__note">
            (Jalon 1 — le formulaire est factice, on branchera le back ensuite.)
          </p>
        </form>
        <div v-else class="form-sent">
          <p>✅ Merci, message bien reçu (faux pour l'instant).</p>
          <BaseButton variant="ghost" @click="sent = false">Renvoyer un message</BaseButton>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}
.page__title {
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 2rem;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 880px) {
  .grid {
    grid-template-columns: 1fr 1.2fr;
  }
}
.info {
  background: var(--color-brand-cream);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.8rem;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.info h2 {
  font-family: var(--font-display);
  font-size: 1.4rem;
  margin: 0;
}
.info h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  margin: 0.8rem 0 0;
}
.info address {
  font-style: normal;
  line-height: 1.6;
}
.hours {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.hours li {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  padding: 0.2rem 0;
  border-bottom: 1px dashed var(--color-line);
}
.form-wrap {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.8rem;
  padding: 1.8rem;
  box-shadow: var(--shadow-stamp);
}
.form-wrap h2 {
  font-family: var(--font-display);
  font-size: 1.4rem;
  margin: 0 0 1rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-weight: 700;
  font-size: 0.85rem;
}
.form input,
.form textarea {
  padding: 0.6rem 0.8rem;
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  background: var(--color-brand-paper);
  resize: vertical;
}
.form__note {
  margin: 0;
  font-size: 0.75rem;
  font-style: italic;
  color: var(--color-ink-muted);
  text-align: center;
}
.form-sent {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 2rem 0;
}
</style>
