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
            :model-value="filterByUser"
            @update:model-value="onSelectfilterByUser"
            :options="storeUsers.usersListIds"
          />

          <my-select
            :model-value="filterByStatus"
            @update:model-value="onSelectfilterByStatus"
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
          @on-change="storeTodos.onChangeStatusTask(todoItem.id)"
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

const filterByStatus = ref(0)
const filterByUser = ref(0)
const search = ref('')

const storeUsers = useUsersStore()
const storeTodos = useTodosStore()

onMounted(async () => await storeUsers.getAllUsers())
onMounted(async () => await storeTodos.getAllTodos())

const sortedTodos = computed(() => {
  if (!filterByStatus.value && !filterByUser.value) return storeTodos.todos

  if (filterByUser.value && filterByStatus.value) {
    return storeTodos.todos.filter((task) => {
      return (
        task.userId === +filterByUser.value &&
        (filterByStatus.value === 'completed'
          ? task.completed
          : filterByStatus.value === 'uncompleted'
            ? !task.completed
            : task?.favorite)
      )
    })
  }

  if (filterByUser.value) {
    return storeTodos.todos.filter((task) => task.userId === +filterByUser.value)
  }

  if (filterByStatus.value) {
    return storeTodos.todos.filter((task) => {
      return filterByStatus.value === 'completed'
        ? task.completed
        : filterByStatus.value === 'uncompleted'
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
  storeTodos.toggleFavoriteStatus(ID)
}

const onSelectfilterByUser = (value) => {
  filterByUser.value = +value
}

const onSelectfilterByStatus = (value) => {
  filterByStatus.value = !isNaN(value) ? +value : value
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
