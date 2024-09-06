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
  <div v-if="data" class="freeze-course flex jus-cen">
    <p>
      Для фиксации курса, переведите сумму на
      <span v-if="data.wallet_address"> кошелек: {{ data.wallet_address }}</span>
      <span v-if="data.card_number"> или карту: {{ data.card_number }}</span>
    </p>
  </div>
</template>
<style scoped>
.freeze-course {
  width: 100%;

 
  margin-top: 24px;
}
.freeze-course p {
  text-align: center;
  max-width: 250px;
  font-size: 14px;
  font-weight: 500;
  color:#4F4F4F;
}
</style>
