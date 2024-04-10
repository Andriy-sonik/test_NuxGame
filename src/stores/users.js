import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'
import { getUserIdFromUrl } from '@/helpers/index'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])

  const usersList = computed(() => users)
  const currentUser = computed(() =>
    users.value.find((user) => +user.id === +getUserIdFromUrl(window.location.href))
  )
  const usersListIds = computed(() => [
    { value: 0, name: 'All users' },
    ...users.value.map((user) => ({ value: user.id, name: user.id }))
  ])

  async function getAllUsers() {
    if (users.value.length) return
    try {
      const { data } = await api.users.getAllUsersData()
      users.value = data
    } catch (error) {
      console.log('error->', { error })
    }
  }

  return { users, usersList, currentUser, usersListIds, getAllUsers }
})
