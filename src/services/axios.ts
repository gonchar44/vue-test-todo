import axios from 'axios'

const axiosService = axios.create({
  baseURL: `${process.env.VUE_APP_API}/api`
})

export default axiosService
