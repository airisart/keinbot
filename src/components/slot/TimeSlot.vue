<script setup>
import moment from 'moment'
import { toRefs, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { OrderOfficeSlotApi } from '@/api/order'

const props = defineProps(['date', 'office', 'manager'])
const slot = defineModel({ required: true })
const { date, office, manager } = toRefs(props)

const { data, isSuccess, refetch } = useQuery({
  queryKey: ['slots', date, office, manager],
  //@ts-ignore
  queryFn: () =>
    OrderOfficeSlotApi(office.value, moment(date.value).format('YYYY-MM-DD'), manager.value),
  select: (response) => response.data,
  enabled: false
})

watch(
  [date, office, manager],
  () => {
    if ((!!office?.value && !!date?.value) || !!manager?.value) {
      refetch()
    }
  },
  { immediate: true }
)
// const x = {
//   nextSlot: 30,
//   breakTime: [
//     //['11:00', '14:00'],
//     //['16:00', '18:00']
//   ],
//   startTime: '8:00',
//   endTime: '20:00'
// }

// let slotTime = moment(x.startTime, 'HH:mm')
// const endTime = moment(x.endTime, 'HH:mm')

// const isInBreak = (slotTime, breakTimes) => {
//   return breakTimes.some((br) => {
//     return slotTime >= moment(br[0], 'HH:mm') && slotTime < moment(br[1], 'HH:mm')
//   })
// }

// let times = []
// while (slotTime < endTime) {
//   if (!isInBreak(slotTime, x.breakTime)) {
//     times.push(slotTime.format('HH:mm'))
//   }
//   slotTime = slotTime.add(x.nextSlot, 'minutes')
// }
</script>
<template>
  <div v-if="data" class="col-12 py-2 " style="display: flex; flex-wrap: wrap;gap:6px; ">
    <template v-for="time in data" :key="time">
      <Tag
        :value="moment(time, 'HH:mm:ss').format('HH:mm')"
        :class="{ active: slot === time }"
        @click="() => (slot = time)"
      />
    </template>
  </div>
</template>
<style scoped>
.p-tag {
  /* margin-right: 6px; */
  width: 75px;
  padding: 8px;
  background: #F9F7FF !important;
  border: 1px solid #E5E3FF;
  color: #4f4f4f;
}
.p-tag.active {
  background-color: #29265b !important;
  color: #fff;
}
.p-tag .p-tag-value {
  line-height: 2 !important;
}
</style>
