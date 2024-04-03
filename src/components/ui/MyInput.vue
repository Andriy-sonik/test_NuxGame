<template>
  <div class="my-input">
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="updateInput"
      @keypress="validateInput"
      class="my-input--field"
      :class="[errorMessage && 'invalid']"
    />
    <span v-if="errorMessage" class="my-input--message">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: [String, Number]
  },
  data() {
    return {
      errorMessage: ''
    }
  },

  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },

    validateInput(event) {
      let pattern = this.$attrs?.regexp && new RegExp(this.$attrs.regexp)

      if (!pattern) return

      if (!pattern.test(event.key)) {
        event.preventDefault()
        this.errorMessage = 'Недопустимий символ'
      } else {
        this.errorMessage = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.my-input {
  &--field {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    &.invalid {
      border-color: red;
    }
  }

  &--message {
    color: red;
    margin-top: 5px;
    font-size: 15px;
  }
}
</style>
