<template>
  <select :value="modelValue" @change="changeOption" class="my-selector">
    <option disabled value="">{{ defaultTitle }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'mySelect',
  props: {
    modelValue: {
      type: [String, Number]
    },
    options: {
      type: Array,
      default: () => []
    },
    defaultTitle: {
      type: String,
      default: 'Выберите из списка'
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.my-selector {
  font-size: 15px;
  padding: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
}
</style>
