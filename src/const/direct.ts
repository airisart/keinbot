export const USDT_RUB = 1
export const RUB_USDT = 2

type TYPE_DIRECT_LABEL = {
  [key: number]: string
}

export const DIRECT_LABEL: TYPE_DIRECT_LABEL = {
  [USDT_RUB]: 'USDT - RUB',
  [RUB_USDT]: 'RUB - USDT'
}
