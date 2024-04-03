<template>
  <select :value="modelValue" @change="changeOption">
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

<style scoped></style>
