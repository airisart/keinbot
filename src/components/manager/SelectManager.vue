<script setup>
import { toRefs, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { OrderOfficeManagerApi } from '@/api/order'
import ReviewManager from './ReviewManager.vue'

const emit = defineEmits(['onSelect'])
const props = defineProps(['slot', 'office', 'date'])
const manager = defineModel({ required: true })
const { office } = toRefs(props)

const { data, refetch } = useQuery({
  queryKey: ['staff', office],
  //@ts-ignore
  queryFn: () => OrderOfficeManagerApi(office.value),
  select: (response) => response.data,
  enabled: false
})

watch(
  [office],
  () => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!office?.value) {
      refetch()
    }
  },
  { immediate: true }
)
</script>
<template>
  <div>
    <Dropdown
      :disabled="!data"
      style="width: 100%"
      v-model="manager"
      @update:model-value="(val) => emit('onSelect', val)"
      :options="data"
      option-value="id"
      option-label="label"
      placeholder="Менеджер офиса"
    />
    <div>
      <ReviewManager v-model="manager" />
    </div>
  </div>
</template>
