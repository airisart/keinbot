import api from '@/plugins/api'
import type { LoginWidgetUser } from 'vue-tg'

export const MeApi = () => api.get('/me')
export const LoginApi = (user: LoginWidgetUser) => api.post('/client/auth', { ...user })
export const ValidationApi = (data: string) => api.post('/client/auth', { data })
export const RefreshApi = () => api.post('/client/auth/refresh')