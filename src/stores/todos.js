import { defineStore } from 'pinia'
import api from '@/api'
const FAVORITE_TODOS = 'FAVORITE_TODOS'

export const useTodosStore = defineStore('todos', {
  state: () => ({ todos: [] }),
  getters: {
    todosList: (state) => state.todos
  },
  actions: {
    async getAllTodos() {
      try {
        const { data } = await api.todos.todos()
        const favoriteTodos = JSON.parse(localStorage.getItem(FAVORITE_TODOS)) || []

        this.todos = [...data].map((task) => ({
          ...task,
          favorite: favoriteTodos.length && favoriteTodos.includes(task.id)
        }))
      } catch (error) {
        console.log('error->', { error })
      }
    },
    async addTodo(params) {
      try {
        const { data } = await api.todos.addNewTodo(params)
        this.todos.push({ ...data, favorite: false })
        this.todos.sort((a, b) => a.userId - b.userId)
      } catch (error) {
        console.log('error->', { error })
      }
    },
    changeStatusFavorite(id) {
      const currentTask = this.todos.find((task) => task.id === +id)
      currentTask.favorite = !currentTask.favorite
      let favoriteTodos = JSON.parse(localStorage.getItem(FAVORITE_TODOS)) || []

      if (!favoriteTodos.includes(id)) {
        favoriteTodos.push(id)
      } else {
        favoriteTodos = favoriteTodos.filter((fav) => fav !== id)
      }

      localStorage.setItem(FAVORITE_TODOS, JSON.stringify(favoriteTodos))
    },
    onChangeStatustask(id) {
      const currentTask = this.todos.find((task) => task.id === +id)
      currentTask.completed = !currentTask.completed
    }
  }
})
