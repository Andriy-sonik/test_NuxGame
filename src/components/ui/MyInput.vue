<template>
  <div>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="updateInput"
      @keypress="validateInput"
      class="input"
    />
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
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

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
.error-message {
  color: red;
  margin-top: 5px;
}
</style>
