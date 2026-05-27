<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <!--
      Pas de <Transition mode="out-in"> ici, volontairement.
      Raison : la combo Transition + RouterView + composants à plusieurs root
      nodes (ou même un seul) crée régulièrement des bugs de page blanche au
      premier passage sur une route. Si on veut réintroduire un effet de
      transition, il faudra le wrapper dans <Suspense> avec un fallback et
      garantir qu'aucune vue n'a de fragment racine.
    -->
    <RouterView />
  </DefaultLayout>
</template>
