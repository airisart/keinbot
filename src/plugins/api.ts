import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://keine-bot.ru/',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (originalConfig.url !== '/login' && err.response) {
      if ([401, 403].includes(err.response.status) && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const rs = await axiosInstance.post('/refreshtoken', {
            refreshToken: Cookies.get()
          })

          const { token } = rs.data
          Cookies.set('token', token)
          return axiosInstance(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }
    return Promise.reject(err)
  }
)

export default axiosInstance
