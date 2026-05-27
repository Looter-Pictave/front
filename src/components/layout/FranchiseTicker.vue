<script setup>
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '@/stores/catalog'

const catalog = useCatalogStore()
const { franchises } = storeToRefs(catalog)
</script>

<template>
  <div class="ticker" aria-label="Licences disponibles en boutique Looter Pictave">
    <div class="ticker__track">
      <!--
        On duplique le contenu N fois. Le 1er groupe est lu par les lecteurs
        d'écran, les copies suivantes sont purement visuelles (aria-hidden).
      -->
      <ul
        v-for="set in 4"
        :key="set"
        class="ticker__group"
        :aria-hidden="set > 1 ? 'true' : null"
      >
        <li
          v-for="f in franchises"
          :key="`${set}-${f.id}`"
          class="ticker__item"
        >
          {{ f.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* ----------------------------------------------------------------------------
 * Bandeau défilant des franchises (ticker / marquee).
 *
 * Technique : on duplique la liste N fois dans le DOM (N = 4 ici) puis on
 * translate le track de -1/N (= -25%) en linéaire infini. Comme chaque copie
 * est identique, la fin de l'animation tombe pixel-perfect sur le début d'une
 * autre copie → boucle invisible, sans saut.
 *
 * Pourquoi N=4 et pas N=2 : la largeur d'une copie (~1600px) doit toujours
 * être ≥ largeur du viewport, sinon on voit du VIDE pendant l'animation.
 * 4 copies = ~6400px de track → safe jusqu'à des écrans 4K.
 *
 * Plus tard, on remplacera chaque <li>{{ f.name }}</li> par un <img> du logo
 * officiel de la franchise (SVG ou PNG transparent), sans changer le reste.
 * -------------------------------------------------------------------------- */
.ticker {
  position: relative;
  background: var(--color-brand-ink);
  border-top: 3px solid var(--color-brand-ink);
  border-bottom: 3px solid var(--color-brand-ink);
  overflow: hidden;
}

/* Fondu sur les bords gauche/droit, mais vers le NOIR du ticker (pas vers
   du transparent) : on garde l'effet de fondu doux sans laisser passer la
   couleur de la page derrière, ce qui évitait l'effet "flash blanc". */
.ticker::before,
.ticker::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 5rem;
  pointer-events: none;
  z-index: 2;
}
.ticker::before {
  left: 0;
  background: linear-gradient(
    to right,
    var(--color-brand-ink),
    rgba(29, 29, 27, 0)
  );
}
.ticker::after {
  right: 0;
  background: linear-gradient(
    to left,
    var(--color-brand-ink),
    rgba(29, 29, 27, 0)
  );
}

.ticker__track {
  display: flex;
  width: max-content;
  animation: ticker-scroll 40s linear infinite;
}

/* Pause au hover : le visiteur peut lire un nom de franchise s'il veut. */
.ticker:hover .ticker__track {
  animation-play-state: paused;
}

.ticker__group {
  list-style: none;
  padding: 1rem 0.75rem;
  margin: 0;
  display: flex;
  gap: 1rem;
}

/* Cases CARRÉES et UNIFORMES : taille fixe identique pour toutes les
   franchises, peu importe la longueur du nom. Le texte se centre dedans
   et passe sur 2-3 lignes pour les noms longs (My Hero Academia, etc.). */
.ticker__item {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-brand-yellow);
  border: 2px solid var(--color-brand-yellow);
  border-radius: 0.6rem;
  padding: 0.5rem 0.4rem;
  line-height: 1.1;
}

@keyframes ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    /* -25% = la largeur d'UNE copie (on en a 4 dans le track).
       À cet instant, la copie #2 occupe pile la position de départ de la #1
       → reset invisible, on repart. La vitesse visuelle reste identique à
       N=2 puisque (1/N) × N = 1 copie défilée par cycle dans tous les cas. */
    transform: translateX(-25%);
  }
}

/* Accessibilité : on désactive l'animation pour les utilisateurs qui ont
   activé "réduire les mouvements" dans leur OS (épileptiques, vertige). */
@media (prefers-reduced-motion: reduce) {
  .ticker__track {
    animation: none;
  }
}
</style>
