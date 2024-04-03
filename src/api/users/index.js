import axios from '@/helpers/axios'
const baseURL = 'users'

export default {
  getAllUsersData(params) {
    return axios.get(baseURL, params)
  }
}
