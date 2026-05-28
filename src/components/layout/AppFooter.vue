<script setup>
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/base/BrandLogo.vue'
import { SHOP } from '@/config/shop'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__decor" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,120 L0,80 Q60,40 120,70 T240,60 L300,30 L360,80 L420,45 L470,90 L520,40 L590,75 L660,55 L720,90 L780,30 L840,70 L900,50 L970,85 L1040,40 L1100,80 L1160,55 L1220,90 L1280,50 L1340,75 L1400,45 L1440,80 L1440,120 Z"
          fill="#1d1d1b"
        />
      </svg>
    </div>

    <div class="footer__main">
      <div class="footer__col footer__col--brand">
        <BrandLogo :size="72" />
        <p class="footer__pitch">
          70m² de pop culture, mangas et figurines en plein cœur de Poitiers.
        </p>
      </div>

      <div class="footer__col">
        <h3 class="footer__title">Boutique</h3>
        <p>
          {{ SHOP.address.street }}<br />
          {{ SHOP.address.postalCode }} {{ SHOP.address.city }}
        </p>
        <p v-for="h in SHOP.hours" :key="h.days">
          {{ h.days }}<br />{{ h.slots.join(' / ') }}
        </p>
      </div>

      <div class="footer__col">
        <h3 class="footer__title">Liens</h3>
        <ul class="footer__list">
          <li><RouterLink to="/catalogue">Catalogue</RouterLink></li>
          <li><RouterLink to="/a-propos">La boutique</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__title">Suivez-nous</h3>
        <div class="footer__socials">
          <a
            :href="SHOP.social.facebook"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.83c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93Z"/>
            </svg>
          </a>
          <a
            :href="SHOP.social.instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer__legal">
      © {{ year }} {{ SHOP.name }} — Tous droits réservés.
      <span>·</span>
      <RouterLink :to="{ name: 'legal' }">Mentions légales</RouterLink>
      <span>·</span>
      <RouterLink :to="{ name: 'terms' }">CGV</RouterLink>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-brand-ink);
  color: var(--color-brand-paper);
  margin-top: auto;
  position: relative;
}
.footer__decor {
  background: var(--color-brand-yellow);
  line-height: 0;
}
.footer__decor svg {
  width: 100%;
  height: 80px;
  display: block;
}
.footer__main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 1.25rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 720px) {
  .footer__main {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
}
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 0.9rem;
  line-height: 1.5;
}
.footer__col--brand {
  gap: 1rem;
}
.footer__pitch {
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.3;
  color: var(--color-brand-yellow);
  margin: 0;
}
.footer__title {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.95rem;
  color: var(--color-brand-yellow);
  letter-spacing: 0.04em;
  margin: 0 0 0.4rem;
}
.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.footer__list a,
.footer__col a {
  color: var(--color-brand-paper);
  text-decoration: none;
  transition: color 0.15s ease;
}
.footer__list a:hover,
.footer__col a:hover {
  color: var(--color-brand-yellow);
}
.footer__socials {
  display: flex;
  gap: 0.5rem;
}
.footer__socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  border: 2px solid var(--color-brand-yellow);
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: var(--color-brand-yellow);
}
.footer__socials a:hover {
  background: var(--color-brand-yellow);
  color: var(--color-brand-ink);
}
.footer__legal {
  text-align: center;
  font-size: 0.75rem;
  padding: 1.25rem 1rem;
  border-top: 1px solid rgb(255 255 255 / 0.1);
  color: rgb(255 255 255 / 0.7);
}
.footer__legal a {
  color: rgb(255 255 255 / 0.85);
  text-decoration: none;
}
.footer__legal a:hover {
  color: var(--color-brand-yellow);
}
.footer__legal span {
  margin: 0 0.4rem;
  opacity: 0.5;
}

/* ===== Patch dark mode =====
   Footer noir neutre en dark (#0a0a0b = zinc-950, plus sombre que le
   body #18181b pour bien se distinguer). Le bandeau zigzag jaune au-dessus
   reste jaune (token brand fixe) et assure la transition page → footer. */
[data-theme="dark"] .footer {
  background: #0a0a0b;
  color: #e4e4e7;
}
[data-theme="dark"] .footer__list a,
[data-theme="dark"] .footer__col a {
  color: #e4e4e7;
}
[data-theme="dark"] .footer__list a:hover,
[data-theme="dark"] .footer__col a:hover {
  color: var(--color-brand-yellow);
}
</style>
