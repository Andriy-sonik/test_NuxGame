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

<style lang="scss" scoped>
.btn {
  border-radius: 5px;
  padding: 10px 30px;
  border: 0;
  width: 100%;
  color: #fff;
  cursor: pointer;
  &.error {
    background-color: red;
  }
  &.success {
    background-color: #519945;
  }
}
</style>
