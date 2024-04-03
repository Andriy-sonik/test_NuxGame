import { defineStore } from 'pinia'
import api from '@/api'
import { getUserIdFromUrl } from '@/helpers/index'

export const useUsersStore = defineStore('users', {
  state: () => ({ users: [] }),
  getters: {
    usersList: (state) => state.users,
    currentUser: (state) => {
      return state.users.find((user) => +user.id === +getUserIdFromUrl(window.location.href))
    },
    usersListIds: (state) => {
      return state.users.map((user) => user.id)
    }
  },
  actions: {
    async getAllUsers() {
      if (this.users.length) return
      try {
        const { data } = await api.users.getAllUsersData()
        this.users = data
      } catch (error) {
        console.log('error->', { error })
      }
    }
  }
})
