<template>
  <div>
    <section>
      <h2>User information</h2>
      <user-info :user-info="currentUser" />
    </section>

    <section>
      <h2>Create task</h2>
      <form-create-task />
    </section>

    <section>
      <h2>TODO tools</h2>
      <my-input v-model="search" placeholder="Search" />

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
    </section>

    <section>
      <h2>TODO list</h2>
      <div class="todo-list">
        <todo-item
          v-for="todoItem of sortedAndSearchedTodos"
          :key="todoItem.id"
          :item="todoItem"
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
    ...mapActions(useTodosStore, ['getAllTodos', 'changeStatusFavorite']),

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
.todo-wrapper {
  display: flex;
  gap: 15px;
}
</style>
