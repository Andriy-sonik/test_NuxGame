<template>
  <div class="user-page">
    <section class="card">
      <h2 class="card-title">User information</h2>
      <div class="card-body">
        <user-info :user-info="currentUser" />
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
            :options="usersListIds"
          />

          <my-select
            :model-value="FilterStatus"
            @update:model-value="onSelectFilterStatus"
            :options="optionFilterStatus"
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

<script>
import UserInfo from '@/pages/UserInfoPage/components/UserInfo.vue'
import FormCreateTask from '@/pages/UserInfoPage/components/FormCreateTask.vue'
import TodoItem from '@/components/TodoItem.vue'
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { useTodosStore } from '@/stores/todos'

const optionFilter = [
  { value: 0, name: 'All' },
  { value: 'completed', name: 'Completed' },
  { value: 'uncompleted', name: 'Uncompleted' },
  { value: 'favorites', name: 'Favorites' }
]
export default {
  name: 'UserInfoPage',
  components: {
    UserInfo,
    TodoItem,
    FormCreateTask
  },
  data() {
    return {
      FilterStatus: 0,
      FilterUser: 0,
      search: ''
    }
  },
  computed: {
    ...mapState(useUsersStore, ['users', 'currentUser', 'usersListIds']),
    ...mapState(useTodosStore, ['todos']),

    optionFilterStatus() {
      return optionFilter
    },

    sortedAndSearchedTodos() {
      return this.sortedTodos.filter((task) =>
        task.title.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    sortedTodos() {
      const { FilterStatus, FilterUser, todos } = this

      if (!FilterStatus && !FilterUser) return todos

      if (FilterUser && FilterStatus) {
        return todos.filter((task) => {
          return (
            task.userId === +FilterUser &&
            (FilterStatus === 'completed'
              ? task.completed
              : FilterStatus === 'uncompleted'
                ? !task.completed
                : task?.favorite)
          )
        })
      }

      if (FilterUser) {
        return todos.filter((task) => task.userId === +FilterUser)
      }

      if (FilterStatus) {
        return todos.filter((task) => {
          return FilterStatus === 'completed'
            ? task.completed
            : FilterStatus === 'uncompleted'
              ? !task.completed
              : task?.favorite
        })
      }

      return todos
    }
  },
  methods: {
    ...mapActions(useUsersStore, ['getAllUsers']),
    ...mapActions(useTodosStore, ['getAllTodos', 'changeStatusFavorite', 'onChangeStatustask']),

    onSelectFilterStatus(value) {
      this.FilterStatus = !isNaN(value) ? +value : value
    },

    onSelectFilterUser(value) {
      this.FilterUser = +value
    },

    addToFavorite(id) {
      this.changeStatusFavorite(id)
    }
  },

  async mounted() {
    await this.getAllUsers()
    await this.getAllTodos()
  }
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
