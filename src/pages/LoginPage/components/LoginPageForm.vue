<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <h1 class="login-form__title">description</h1>
    <fieldset class="login-form__body">
      <h3 class="login-form__caption">description</h3>
      <my-input
        v-model="username"
        placeholder="Username"
        :regexp="REGEXP.ALPHA_SPACE_REGEX"
        autofocus
        class="login-form__input login-form__input--mb-20"
      />
      <my-input
        v-model="phoneNumber"
        placeholder="Phone Number"
        :regexp="REGEXP.NON_ALPHA_REGEX"
        class="login-form__input"
      />
      <my-button class="login-form__submit">Register</my-button>
    </fieldset>

    <p class="login-form__message" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { REGEXP } from '@/constants/index.js'
import { useUsersStore } from '@/stores/users.js'
import { ROUTE } from '@/router/routeNames.js'

const username = ref('Leanne Graham')
const phoneNumber = ref('1-770-736-8031 x56442')
const errorMessage = ref('')

const router = useRouter()
const usersStore = useUsersStore()
const { getAllUsers } = usersStore
const { users } = storeToRefs(usersStore)

onMounted(async () => await getAllUsers())

const checkIfUserExists = () => {
  if (!users.value.length) return false

  return users.value.find(
    (user) => user.name === username.value && user.phone === phoneNumber.value
  )
}

const clearFieldsInForm = () => {
  username.value = ''
  phoneNumber.value = ''
  errorMessage.value = ''
}

const onSubmit = () => {
  const currentUser = checkIfUserExists()

  if (currentUser) {
    router.push({
      name: ROUTE.USER.name,
      params: { userId: currentUser.id }
    })
    clearFieldsInForm()
  } else {
    errorMessage.value = 'Incorrect data!'
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

  &__title,
  &__caption {
    line-height: 21px;
    color: #5f5f5f;
  }

  &__title {
    background-color: #a5a5a5;
    font-size: 17px;
    text-align: center;
    padding: 15px;
  }

  &__body {
    padding: 15px 25px 30px;
  }

  &__caption {
    font-size: 15px;
    margin-bottom: 14px;
  }

  &__input {
    &--mb-20 {
      margin-bottom: 20px;
    }
  }

  &__submit {
    margin-top: 25px;
    background-color: #519945;
    font-size: 17px;
    line-height: 21px;
    font-weight: 600;
  }

  &__message {
    color: red;
    margin-top: 5px;
    font-size: 15px;
    text-align: center;
  }
}
</style>
