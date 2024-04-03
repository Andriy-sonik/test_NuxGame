import axios from '@/helpers/axios'
const baseURL = 'todos'

export default {
  todos(params) {
    console.log(params)
    return axios.get(baseURL, params)
  },
  addNewTodo(params) {
    console.log('addNewTodo', params)
    return axios.post(baseURL, params)
  }
}
