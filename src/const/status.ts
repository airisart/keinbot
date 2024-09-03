export const STATUS_CREATED = 0
export const STATUS_COMPLETED = 1
export const STATUS_CANCELED = -1

type TYPE_STATUS_LABEL = {
  [key: number]: string
}

export const STATUS_LABEL: TYPE_STATUS_LABEL = {
  [STATUS_CANCELED]: 'Отменен',
  [STATUS_COMPLETED]: 'Выполнен',
  [STATUS_CREATED]: 'Создан'
}
