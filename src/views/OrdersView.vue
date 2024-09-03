<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import { useQuery } from '@tanstack/vue-query'
import { DIRECT_LABEL, STATUS_LABEL } from '@/const'
import { OrderListApi } from '@/api/order'

const { data, isPending, isError } = useQuery({
  queryKey: ['orders'],
  queryFn: () => OrderListApi(),
  select: (response) => response.data
})

const router = useRouter()

const handleBackButton = () => router.back()

const onClick = (id: string) => {
  router.push({ name: 'order-detail', params: { id } })
}
</script>
<template>
  <BackButton @click="handleBackButton" />
  <div class="col-12">
    <h5>Обмены</h5>
  </div>
  <div class="col-12">
    <ProgressSpinner v-if="isPending" style="width: 48px; height: 48px" />
    <div v-if="isError">Ошибка загрузки</div>
    <div v-else-if="data">
      <div v-for="order in data" :key="order.id" class="item" @click="() => onClick(order.id)">
        <div>Заказа №{{ order.id }}</div>
        <div>Статус: {{ STATUS_LABEL[order.status] }}</div>
        <div>Направление обмена: {{ DIRECT_LABEL[order.direct] }}</div>
        <div>Сумма: {{ order.count }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.item {
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px 8px;
  margin-bottom: 6px;
}
</style>
