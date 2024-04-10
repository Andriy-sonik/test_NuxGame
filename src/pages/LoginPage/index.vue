<template>
  <div class="login-page">
    <login-page-form />
  </div>
</template>

<script setup>
import LoginPageForm from '@/pages/LoginPage/components/LoginPageForm.vue'
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
