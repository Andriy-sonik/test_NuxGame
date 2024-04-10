<template>
  <form @submit.prevent="createTask" class="form-create-task">
    <my-input v-model="userId" placeholder="Input userID" :regexp="NUMBER_REGEX" />
    <my-input v-model="title" placeholder="Input title" />
    <my-button class="success">Create</my-button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { REGEXP } from '@/constants/index.js'
import { useTodosStore } from '@/stores/todos.js'

const title = ref('')
const userId = ref('')
const { NUMBER_REGEX } = REGEXP

const store = useTodosStore()

const clearForm = () => {
  title.value = ''
  userId.value = ''
}

const createTask = () => {
  store.addTodo({ userId: +userId.value, title: title.value })
  clearForm()
}
</script>

<style lang="scss" scoped>
.form-create-task {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
