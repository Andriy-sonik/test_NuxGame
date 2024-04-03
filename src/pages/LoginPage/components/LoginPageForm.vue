<template>
  <form @submit.prevent="onSubmit">
    <h1>description</h1>
    <fieldset>
      <legend>description</legend>
      <my-input
        v-model="username"
        placeholder="username"
        :regexp="/^[a-zA-Zа-яА-ЯёЁґҐіІїЇєЄ ]*$/"
        autofocus
      />
      <my-input
        v-model="phoneNumber"
        placeholder="phone number"
        :regexp="/[^a-zA-Zа-яА-ЯёЁґҐіІїЇєЄ]/"
      />
      <my-button>Add</my-button>
    </fieldset>
    <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'

export default {
  name: 'LoginPageForm',
  data() {
    return {
      username: '',
      phoneNumber: '',
      errorMessage: ''
    }
  },
  computed: {
    ...mapState(useUsersStore, ['users'])
  },

  async mounted() {
    await this.getAllUsers()
  },

  methods: {
    ...mapActions(useUsersStore, ['getAllUsers']),

    chackIsUser() {
      if (!this.users.length) return false

      return this.users.find(
        (user) => user.name === this.username && user.phone === this.phoneNumber
      )
    },

    clearFieldsInForm() {
      this.username = ''
      this.phoneNumber = ''
      this.errorMessage = ''
    },

    onSubmit() {
      const currentUser = this.chackIsUser()

      if (currentUser) {
        this.$router.push({
          name: 'user',
          params: { userId: currentUser.id }
        })
        this.clearFieldsInForm()
      } else {
        this.errorMessage = 'Такого  користувача не існує!!'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  width: 447px;
}
fieldset {
  border: 0;
  padding: 0;
}
</style>
