<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <h1 class="login-form--title">description</h1>
    <fieldset class="login-form--body">
      <h3 class="login-form--caption">description</h3>
      <my-input
        v-model="username"
        placeholder="Username"
        :regexp="ALPHA_SPACE_REGEX"
        autofocus
        class="login-form--input mb-20"
      />
      <my-input
        v-model="phoneNumber"
        placeholder="Phone Number"
        :regexp="NON_ALPHA_REGEX"
        class="login-form--input"
      />
      <my-button class="login-form--submit">Register</my-button>
    </fieldset>

    <p class="login-form--message" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { REGEXP } from '@/constants/index.js'
import { useUsersStore } from '@/stores/users.js'

const { ALPHA_SPACE_REGEX, NON_ALPHA_REGEX } = REGEXP
const router = useRouter()
const username = ref('Leanne Graham')
const phoneNumber = ref('1-770-736-8031 x56442')
const errorMessage = ref('')
const store = useUsersStore()
onMounted(async () => await store.getAllUsers())

const chackIsUser = () => {
  if (!store.users.length) return false

  return store.users.find(
    (user) => user.name === username.value && user.phone === phoneNumber.value
  )
}

const clearFieldsInForm = () => {
  username.value = ''
  phoneNumber.value = ''
  errorMessage.value = ''
}

const onSubmit = () => {
  const currentUser = chackIsUser()

  if (currentUser) {
    router.push({
      name: 'user',
      params: { userId: currentUser.id }
    })
    clearFieldsInForm()
  } else {
    errorMessage.value = 'Такого  користувача не існує!!'
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
  overflow: hidden;

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
