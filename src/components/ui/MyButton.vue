<template>
  <button class="btn" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style lang="scss" scoped></style>
