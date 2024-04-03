<template>
  <div class="my-cart">
    <header class="my-cart--head">
      <slot name="head" />
    </header>
    <div class="my-cart--body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCart'
}
</script>

<style lang="scss" scoped>
.my-cart {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  &--head {
    background-color: #a5a5a5;
    padding: 15px;
    text-align: center;
    color: #5f5f5f;
  }
  &--body {
    padding: 15px 25px 30px;
    background-color: #c3c3c3;
  }
}
</style>
