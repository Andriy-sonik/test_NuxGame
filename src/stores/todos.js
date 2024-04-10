import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'
import { LS } from '@/constants/index.js'

export const useTodosStore = defineStore('todos', () => {
  // store
  const todos = ref([])

  // actions
  const getAllTodos = async () => {
    try {
      const { data } = await api.todos.todos()
      const favoriteTodos = JSON.parse(localStorage.getItem(LS.FAVORITE_TODOS)) || []

      todos.value = data.map((task) => ({
        ...task,
        favorite: favoriteTodos.includes(task.id)
      }))
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async (params) => {
    try {
      const { data } = await api.todos.addNewTodo(params)
      todos.value.push({ ...data, favorite: false })
      todos.value.sort((a, b) => a.userId - b.userId)
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const onChangeStatusTask = (id) => {
    const task = todos.value.find((task) => task.id === +id)
    if (task) {
      task.completed = !task.completed
    }
  }

  const toggleFavoriteStatus = (id) => {
    const task = todos.value.find((task) => task.id === +id)
    if (task) {
      task.favorite = !task.favorite
      const favoriteTodos = new Set(JSON.parse(localStorage.getItem(LS.FAVORITE_TODOS)) || [])

      if (task.favorite) {
        favoriteTodos.add(id)
      } else {
        favoriteTodos.delete(id)
      }
      localStorage.setItem(LS.FAVORITE_TODOS, JSON.stringify(Array.from(favoriteTodos)))
    }
  }

  return { todos, getAllTodos, addTodo, onChangeStatusTask, toggleFavoriteStatus }
})
