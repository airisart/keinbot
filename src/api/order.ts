import moment from 'moment'
import api from '../plugins/api'

export const OrderApi = (data: any) => {
  const { office, slot, ...other } = data
  data = {
    ...other,
    rate: data.rate.rate,
    date: moment(data.date).format('YYYY-MM-DD')
  }
  if (office !== 0) {
    data['office'] = office
  }
  if (slot) {
    data['start_time'] = slot
  }
  return api.post('/exchange/', { ...data })
}
export const OrderDetailApi = (id: string) => api.get(`/exchange/${id}`)
export const OrderRateApi = (direct: string, office: string, delivery: number, type: number) => {
  const data = {
    type,
    direct
  }
  if (type === 1) {
    //@ts-ignore
    data['office'] = office
  } else if (type === 2) {
    //@ts-ignore
    data['delivery'] = delivery
  }
  //@ts-ignore
  return api.get(`/exchange/rate?${new URLSearchParams(data).toString()}`)
}

export const OrderFreezeInfoApi = (direct: number) =>
  api.get(`/exchange/freeze-info?direct=${direct}`)
export const OrderCourseApi = () => api.post('/order/course')
export const OrderOfficeSlotApi = (office: number, date: string, manager: string) => {
  let url = `/office/${office}/${date}/slots`
  if (manager) {
    url += `?manager=${manager}`
  }
  return api.get(url)
}
export const OrderListApi = () => api.get('/exchange')
export const OrderOfficeManagerApi = (office: number) => api.get(`/office/${office}/staff`)
export const OrderReviewApi = (id: number, data: any) =>
  api.post(`/exchange/${id}/review`, { ...data })

export const ManagerReviewApi = (id: number) => api.get(`/staff/${id}/review`)
