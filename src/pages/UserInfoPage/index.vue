<template>
  <div>
    <section>
      <h2>user information</h2>
      <user-info :user-info="currentUser" />
    </section>
    <section>
      <h2>Create todo"</h2>
      <form @submit.prevent="submitNewTodo">
        <input type="text" v-model="user.title" placeholder="title" />
        <input type="text" v-model="user.id" placeholder="id" />
        <button>ok</button>
      </form>
    </section>
    <section>
      <h2>TODO</h2>
      <div class="todo-wrapper">
        <aside class="todo-toolbar">
          <select :value="selectedStatus" @change="changeOption">
            <option :value="filterItem" v-for="filterItem of optionFilter" :key="filterItem">
              {{ filterItem }}
            </option>
          </select>

          <select :value="selectedAutor" @change="changeOptionAutor">
            <option value="">All Users</option>
            <option :value="filterItem" v-for="filterItem of usersListIds" :key="filterItem">
              {{ filterItem }}
            </option>
          </select>
          <input type="text" v-model="search" />
        </aside>

        <div class="todo-list">
          <todo-item v-for="todoItem of todosSearch" :key="todoItem.id" :item="todoItem" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UserInfo from '@/pages/UserInfoPage/components/UserInfo.vue'
import api from '@/api'
import TodoItem from '@/components/ui/TodoItem.vue'
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'
const optionFilter = ['completed', 'uncompleted', 'favorites']
export default {
  name: 'UserInfoPage',
  components: {
    UserInfo,
    TodoItem
  },
  data() {
    return {
      todos: [],
      selectedStatus: null,
      selectedAutor: null,
      search: '',
      user: {
        title: '',
        id: null
      }
    }
  },
  computed: {
    ...mapState(useUsersStore, ['users', 'currentUser', 'usersListIds']),

    optionFilter() {
      console.log('optionFilter', optionFilter)
      return optionFilter
    },
    todosSearch() {
      return this.todosFiltered.filter((task) =>
        task.title.toLowerCase().includes(this.search.toLowerCase())
      )
    },

    todosFiltered() {
      return this.todos.filter((task) => {
        // Фільтр за обраною автором
        const filterByAutor = !this.selectedAutor || task.userId === +this.selectedAutor

        // Фільтр за статусом
        const filterByStatus =
          !this.selectedStatus ||
          (this.selectedStatus === 'completed' && task.completed) ||
          (this.selectedStatus === 'uncompleted' && !task.completed)

        // Повертаємо true, якщо обидва фільтри виконуються
        return filterByAutor && filterByStatus
      })
    }
  },
  methods: {
    ...mapActions(useUsersStore, ['getAllUsers']),
    async getUsers() {
      const responce = await api.users.users({ params: { id: this.$route.params.userId } })
      console.log('responce', responce)
      return responce.data
    },
    async getTodos() {
      const responce = await api.todos.todos()
      console.log('responce', responce)
      return responce.data
    },

    changeOption(event) {
      this.selectedStatus = event.target.value
    },
    changeOptionAutor(event) {
      this.selectedAutor = event.target.value
      console.log(this.selectedAutor)
    },

    async submitNewTodo() {
      const { data } = await api.todos.addNewTodo({ userId: +this.user.id, title: this.user.title })
      console.log('responce', data)
      this.todos.push(data)
      this.user.title = ''
      this.user.id = ''
    }
  },
  async mounted() {
    await this.getAllUsers()
    this.todos = await this.getTodos()
    console.log('usersListIds', this.usersListIds)
  }
}
</script>

<style lang="scss" scoped>
.todo-wrapper {
  display: flex;
  gap: 15px;
}
</style>
