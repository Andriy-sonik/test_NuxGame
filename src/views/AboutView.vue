<template>
  <div>
    <table>
      <tr v-for="(value, nameKey) in currentUser" :key="value">
        <th>{{ nameKey }}</th>
        <th v-if="typeof value === 'object'">
          <tr v-for="(sub_value, sub_nameKey) in value" :key="sub_value">
            <th>{{ sub_nameKey }}</th>
            <th>{{ sub_value }}</th>
          </tr>
        </th>
        <th v-else>{{ value }}</th>
      </tr>
    </table>
    <div>
      <h1>TODO</h1>
    </div>
    <select :value="selectedFilter" @change="changeOption">
      <option :value="filterItem" v-for="filterItem of optionFilter" :key="filterItem">
        {{ filterItem }}
      </option>
    </select>
    <todo-item v-for="todoItem of todosFiltered" :key="todoItem.id" :item="todoItem" />
  </div>
</template>

<script>
import axios from '@/api'
import TodoItem from '@/components/ui/TodoItem.vue'
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'

const optionFilter = ['completed', 'uncompleted', 'favorites']

export default {
  components: { TodoItem },
  data() {
    return {
      todos: [],
      selectedFilter: null
    }
  },
  computed: {
    ...mapState(useUsersStore, ['users', 'currentUser']),

    optionFilter() {
      console.log('optionFilter', optionFilter)
      return optionFilter
    },
    todosFiltered() {
      let lol = undefined
      if (this.selectedFilter === 'completed') {
        lol = (el) => el.completed
      } else if (this.selectedFilter === 'uncompleted') {
        lol = (el) => !el.completed
      }

      return lol ? [...this.todos].filter(lol) : this.todos
    }
  },
  methods: {
    ...mapActions(useUsersStore, ['getAllUsers']),
    async getUsers() {
      const responce = await axios.users.users({ params: { id: this.$route.params.userId } })
      console.log('responce', responce)
      return responce.data
    },
    async getTodos() {
      const responce = await axios.todos.todos()
      console.log('responce', responce)
      return responce.data
    },

    changeOption(event) {
      console.log('event', event.target.value)
      this.selectedFilter = event.target.value
    }
  },
  async mounted() {
    await this.getAllUsers()
    this.todos = await this.getTodos()
  }
}
</script>

<style lang="scss" scoped>
table {
  text-align: left;
}
</style>
