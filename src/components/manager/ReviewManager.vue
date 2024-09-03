<script setup>
import { ref } from 'vue'
import moment from 'moment'
import { useQuery } from '@tanstack/vue-query'
import { ManagerReviewApi } from '@/api/order'

const visible = ref(false)
const manager = defineModel({ required: true })
console.log('manager', manager)

const { data, isPending, isError } = useQuery({
  queryKey: ['manager', manager],
  //@ts-ignore
  queryFn: () => ManagerReviewApi(manager.value),
  select: (response) => response.data,
  enabled: visible
})
</script>
<template>
  <div>
    <a v-if="manager" href="#" style="padding: 3px 4px" @click.stop="() => (visible = true)">
      смотреть отзывы
    </a>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ProgressSpinner v-if="isPending" style="width: 48px; height: 48px" />
    <div v-if="isError">Ошибка загрузки</div>
    <div v-else-if="data">
      <DataView :value="data">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="item col-12 py-2">
              <div><b>Клиент</b>: {{ item.user }}</div>
              <div>
                Оценка:
                <div style="display: inline-block">
                  <Rating v-model="item.points" readonly :cancel="false" />
                </div>
              </div>
              <div>Дата: {{ moment(item.created).format('YYYY-MM-DD') }}</div>
              <div v-if="item.text">Сообщение: {{ item.text }}</div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </Dialog>
</template>
<style scoped>
.item {
  border-bottom: 1px solid #ccc;
}
</style>
