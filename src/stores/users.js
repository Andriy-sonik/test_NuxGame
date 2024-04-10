import api from '@/api'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export const useUsersStore = defineStore('users', () => {
  const route = useRoute()

  // state
  const users = ref([])

  // getters
  const currentUser = computed(() => users.value.find((user) => +user.id === +route.params.userId))

  const usersListIds = computed(() => [
    { value: 0, name: 'All' },
    ...users.value.map((user) => ({ value: user.id, name: user.id }))
  ])

  // actions
  const getAllUsers = async () => {
    if (users.value.length) return
    try {
      const { data } = await api.users.getAllUsersData()
      users.value = data
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return { users, currentUser, usersListIds, getAllUsers }
})
