<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  productName: { type: String, default: 'Produit' },
})

const activeIndex = ref(0)
const activeImage = computed(() => props.images[activeIndex.value])
</script>

<template>
  <div class="gallery">
    <div class="gallery__main">
      <img v-if="activeImage" :src="activeImage.url" :alt="activeImage.alt || productName" />
      <div v-else class="gallery__placeholder">Image indisponible</div>
    </div>
    <div v-if="images.length > 1" class="gallery__thumbs">
      <button
        v-for="(img, i) in images"
        :key="i"
        type="button"
        class="gallery__thumb"
        :class="{ 'gallery__thumb--active': i === activeIndex }"
        :aria-label="`Voir image ${i + 1}`"
        @click="activeIndex = i"
      >
        <img :src="img.url" :alt="img.alt" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.gallery__main {
  aspect-ratio: 1 / 1;
  background: var(--color-brand-cream);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.8rem;
  overflow: hidden;
}
.gallery__main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.gallery__placeholder { width:100%;height:100%;display:grid;place-items:center;color:var(--color-ink-muted);font-weight:700 }
.gallery__thumbs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.gallery__thumb {
  width: 72px;
  height: 72px;
  border-radius: 0.4rem;
  border: 2px solid transparent;
  background: var(--color-brand-cream);
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.15s ease;
}
.gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.gallery__thumb--active {
  border-color: var(--color-brand-ink);
}
</style>
