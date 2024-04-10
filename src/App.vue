<template>
  <component :is="MainView">
    <router-view />
  </component>
</template>

<script setup>
import MainView from '@/views/MainView.vue'
// import { LAYOUTS } from '@/constants/index.js'
// import { computed } from 'vue'
// import { useRoute } from 'vue-router'
// const { meta } = useRoute()

// const layout = computed(() => (meta.layout === LAYOUTS.MAIN ? MainView : MainView))
</script>

<style scoped></style>
