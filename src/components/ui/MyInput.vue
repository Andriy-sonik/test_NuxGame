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
import { ref } from 'vue'
export default {
  name: 'MyInput',
  props: {
    modelValue: [String, Number]
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const errorMessage = ref('')

    const updateInput = (event) => emit('update:modelValue', event.target.value)

    const validateInput = (event) => {
      let pattern = attrs?.regexp && new RegExp(attrs.regexp)

      if (!pattern) return

      if (!pattern.test(event.key)) {
        event.preventDefault()
        errorMessage.value = 'Недопустимий символ'
      } else {
        errorMessage.value = ''
      }
    }

    return { errorMessage, updateInput, validateInput }
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
