<script setup lang="ts">
import { toRefs } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { OrderFreezeInfoApi } from '@/api/order'

const props = defineProps(['direct'])
const { direct } = toRefs(props)

const { data, isSuccess } = useQuery({
  queryKey: ['rate_freeze', direct],
  //@ts-ignore
  queryFn: () => OrderFreezeInfoApi(direct.value),
  select: (response) => response.data
})
</script>
<template>
  <div v-if="data">
    Для фиксации курса, переведите сумму на
    <span v-if="data.wallet_address"> кошелек: {{ data.wallet_address }}</span>
    <span v-if="data.card_number"> или карту: {{ data.card_number }}</span>
  </div>
</template>
