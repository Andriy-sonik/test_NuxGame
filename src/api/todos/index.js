import axios from '@/helpers/axios'
const baseURL = 'todos'

export default {
  todos(params) {
    return axios.get(baseURL, params)
  },
  addNewTodo(params) {
    return axios.post(baseURL, params)
  }
}
