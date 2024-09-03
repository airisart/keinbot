import api from '@/plugins/api'
import type { LoginWidgetUser } from 'vue-tg'

export const MeApi = () => api.get('/me')
export const LoginApi = (user: LoginWidgetUser) => api.post('/client/auth', { ...user })
export const ValidationApi = (data: string) => api.post('/client/auth', { data: "query_id=AAEF26U9AgAAAAXbpT3OckL1&user=%7B%22id%22%3A5329246981%2C%22first_name%22%3A%22Nodirbek%22%2C%22last_name%22%3A%22Najmiddinov%22%2C%22username%22%3A%22Rare_Oligarch%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725041946&hash=88a2b83462b12285c27dc3efc6a5f65a1add25f425459b605281fb4fb7951a47" })
export const RefreshApi = () => api.post('/client/auth/refresh')
