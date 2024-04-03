<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <h1 class="login-form--title">description</h1>
    <fieldset class="login-form--body">
      <h3 class="login-form--caption">description</h3>
      <my-input
        v-model="username"
        placeholder="Username"
        :regexp="/^[a-zA-Zа-яА-ЯёЁґҐіІїЇєЄ ]*$/"
        autofocus
        class="login-form--input mb-20"
      />
      <my-input
        v-model="phoneNumber"
        placeholder="Phone Number"
        :regexp="/[^a-zA-Zа-яА-ЯёЁґҐіІїЇєЄ]/"
        class="login-form--input"
      />
      <my-button class="login-form--submit">Register</my-button>
    </fieldset>
    <p class="login-form--message" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'

export default {
  name: 'LoginPageForm',
  data() {
    return {
      username: 'Leanne Graham',
      phoneNumber: '1-770-736-8031 x56442',
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
.login-form {
  max-width: 447px;
  width: 100%;
  margin: 0 auto;
  background-color: #c3c3c3;
  border-radius: 5px;

  &--title,
  &--caption {
    line-height: 21px;
    color: #5f5f5f;
  }

  &--title {
    background-color: #a5a5a5;
    font-size: 17px;
    text-align: center;
    padding: 15px;
  }

  &--body {
    padding: 15px 25px 30px;
  }

  &--caption {
    font-size: 15px;
    margin-bottom: 14px;
  }

  &--input {
    &.mb-20 {
      margin-bottom: 20px;
    }
  }

  &--submit {
    margin-top: 25px;
    background-color: #519945;
    font-size: 17px;
    line-height: 21px;
    font-weight: 600;
  }

  &--message {
    color: red;
    margin-top: 5px;
    font-size: 15px;
    text-align: center;
  }
}
</style>
