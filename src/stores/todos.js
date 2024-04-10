import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'
const FAVORITE_TODOS = 'FAVORITE_TODOS'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])

  const todosList = computed(() => todos)

  async function getAllTodos() {
    try {
      const { data } = await api.todos.todos()
      const favoriteTodos = JSON.parse(localStorage.getItem(FAVORITE_TODOS)) || []

      todos.value = data.map((task) => ({
        ...task,
        favorite: favoriteTodos.length && favoriteTodos.includes(task.id)
      }))
    } catch (error) {
      console.log('error->', { error })
    }
  }

  async function addTodo(params) {
    try {
      const { data } = await api.todos.addNewTodo(params)
      todos.value.push({ ...data, favorite: false })
      todos.value.sort((a, b) => a.userId - b.userId)
    } catch (error) {
      console.log('error->', { error })
    }
  }

  function onChangeStatustask(id) {
    const currentTask = todos.value.find((task) => task.id === +id)
    currentTask.completed = !currentTask.completed
  }

  function changeStatusFavorite(id) {
    const currentTask = todos.value.find((task) => task.id === +id)
    currentTask.favorite = !currentTask.favorite
    let favoriteTodos = JSON.parse(localStorage.getItem(FAVORITE_TODOS)) || []

    if (!favoriteTodos.includes(id)) {
      favoriteTodos.push(id)
    } else {
      favoriteTodos = favoriteTodos.filter((fav) => fav !== id)
    }

    localStorage.setItem(FAVORITE_TODOS, JSON.stringify(favoriteTodos))
  }

  return { todos, todosList, getAllTodos, addTodo, onChangeStatustask, changeStatusFavorite }
})
