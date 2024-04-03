<template>
  <form @submit.prevent="createTask" class="form-create-task">
    <my-input v-model="userId" placeholder="Input userID" />
    <my-input v-model="title" placeholder="Input title" />
    <my-button class="success">Create</my-button>
  </form>
</template>

<script>
import { mapActions } from 'pinia'
import { useTodosStore } from '@/stores/todos'
export default {
  name: 'FormCreateTask',
  data() {
    return {
      title: '',
      userId: ''
    }
  },
  methods: {
    ...mapActions(useTodosStore, ['addTodo']),
    async createTask() {
      await this.addTodo({ userId: +this.userId, title: this.title })
      this.clearForm()
    },

    clearForm() {
      this.title = ''
      this.userId = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-create-task {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
