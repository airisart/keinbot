import api from '@/plugins/api'
import type { LoginWidgetUser } from 'vue-tg'

export const MeApi = () => api.get('/me')
export const LoginApi = (user: LoginWidgetUser) => api.post('/client/auth', { ...user })
export const ValidationApi = (data: string) => api.post('/client/auth', { data })
// export const ValidationApi = (data: string) => api.post('/client/auth', { data: 'query_id=AAGQCL9TAgAAAJAIv1N9Qe2c&user=%7B%22id%22%3A5699995792%2C%22first_name%22%3A%22Nodirbek%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Nbekweb%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725982895&hash=4399a267c16e8b27e484370e255528c24a831d249d59b67d854026c84da79a73' })
export const RefreshApi = () => api.post('/client/auth/refresh')