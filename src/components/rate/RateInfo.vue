<script setup>
import { watch, toRefs } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { OrderRateApi } from '@/api/order'
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['direct', 'office', 'delivery', 'type'])
const model = defineModel({ required: true })

const { direct, office, delivery, type } = toRefs(props)

console.log('props', props)

const { data, isFetched, refetch } = useQuery({
  queryKey: ['rate', direct, office, delivery, type],
  queryFn: () => OrderRateApi(direct.value, office.value, delivery.value, type.value),
  select: (response) => response.data,
  enabled: false,
  onSuccess: (data) => {
    console.log('onSuccess', data)
  }
})

watch(
  [direct, office, delivery, type],
  () => {
    refetch()
  },
  { immediate: true }
)

watch(
  () => isFetched.value,
  () => {
    data.value && console.log('ok', data.value)
    data.value && emit('update:modelValue', data.value)
  }
)
</script>
<template>
  <div v-if="data">
    <div>Комиссия: {{ data.comission }}%, курс: {{ data.rate }}</div>
  </div>
</template>
