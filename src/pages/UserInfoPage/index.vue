<template>
  <div class="user-page">
    <section class="card">
      <h2 class="card-title">User information</h2>
      <div class="card-body">
        <user-info :user-info="storeUsers.currentUser" />
      </div>
    </section>

    <section class="card">
      <h2 class="card-title">Create task</h2>
      <div class="card-body">
        <form-create-task />
      </div>
    </section>

    <section class="card">
      <h2 class="card-title">TODO tools</h2>
      <div class="card-body">
        <my-input v-model="search" placeholder="Search" />
        <hr />

        <div class="card-body--filters">
          <my-select
            :model-value="FilterUser"
            @update:model-value="onSelectFilterUser"
            :options="storeUsers.usersListIds"
          />

          <my-select
            :model-value="FilterStatus"
            @update:model-value="onSelectFilterStatus"
            :options="OPTION_FILTER"
          />
        </div>
      </div>
    </section>

    <section class="card">
      <h2 class="card-title">TODO list</h2>
      <div class="card-body">
        <p v-if="!sortedAndSearchedTodos.length">No data</p>
        <todo-item
          v-for="todoItem of sortedAndSearchedTodos"
          :key="todoItem.id"
          :item="todoItem"
          @on-change="onChangeStatustask(todoItem.id)"
          @addToFavorite="addToFavorite"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUsersStore } from '@/stores/users.js'
import { useTodosStore } from '@/stores/todos.js'
import UserInfo from '@/pages/UserInfoPage/components/UserInfo.vue'
import FormCreateTask from '@/pages/UserInfoPage/components/FormCreateTask.vue'
import TodoItem from '@/components/TodoItem.vue'

const OPTION_FILTER = [
  { value: 0, name: 'All' },
  { value: 'completed', name: 'Completed' },
  { value: 'uncompleted', name: 'Uncompleted' },
  { value: 'favorites', name: 'Favorites' }
]

const FilterStatus = ref(0)
const FilterUser = ref(0)
const search = ref('')

const storeUsers = useUsersStore()
const storeTodos = useTodosStore()

onMounted(async () => await storeUsers.getAllUsers())
onMounted(async () => await storeTodos.getAllTodos())

const onChangeStatustask = storeTodos.onChangeStatustask

const sortedTodos = computed(() => {
  if (!FilterStatus.value && !FilterUser.value) return storeTodos.todos

  if (FilterUser.value && FilterStatus.value) {
    return storeTodos.todos.filter((task) => {
      return (
        task.userId === +FilterUser.value &&
        (FilterStatus.value === 'completed'
          ? task.completed
          : FilterStatus.value === 'uncompleted'
            ? !task.completed
            : task?.favorite)
      )
    })
  }

  if (FilterUser.value) {
    return storeTodos.todos.filter((task) => task.userId === +FilterUser.value)
  }

  if (FilterStatus.value) {
    return storeTodos.todos.filter((task) => {
      return FilterStatus.value === 'completed'
        ? task.completed
        : FilterStatus.value === 'uncompleted'
          ? !task.completed
          : task?.favorite
    })
  }

  return storeTodos.todos
})

const sortedAndSearchedTodos = computed(() =>
  sortedTodos.value.filter((task) => task.title.toLowerCase().includes(search.value.toLowerCase()))
)

const addToFavorite = (ID) => {
  storeTodos.changeStatusFavorite(ID)
}

const onSelectFilterUser = (value) => {
  FilterUser.value = +value
}

const onSelectFilterStatus = (value) => {
  FilterStatus.value = !isNaN(value) ? +value : value
}
</script>

<style lang="scss" scoped>
.user-page {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card {
  background-color: #c3c3c3;
  border-radius: 5px;
  overflow: hidden;

  &-title {
    background-color: #a5a5a5;
    font-size: 17px;
    line-height: 21px;
    color: #5f5f5f;
    text-align: center;
    padding: 15px;
  }
  &-body {
    padding: 15px 25px 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &--filters {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      select {
        flex: 1;
      }
    }
  }
}
</style>
