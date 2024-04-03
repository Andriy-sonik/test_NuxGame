<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainView from '@/views/MainView.vue'
export default {
  components: {
    MainView
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout}-view`
    }
  }
}
</script>

<style scoped></style>
