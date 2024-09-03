<script setup>
import { useRoute, useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import { useQuery } from '@tanstack/vue-query'
import { OrderDetailApi } from '@/api/order'
import { DIRECT_LABEL, STATUS_LABEL } from '@/const'
import CommentForm from '@/components/comment/CommentForm.vue'
import CommentView from '@/components/comment/CommentView.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
console.log(id)

const { data, isPending, isError, error } = useQuery({
  queryKey: ['order-detail', id],
  //@ts-ignore
  queryFn: () => OrderDetailApi(id),
  select: (response) => response.data
})

const handleBackButton = () => router.back()
</script>
<template>
  <BackButton @click="handleBackButton" />
  <div v-if="isError">{{ error }}</div>
  <div v-if="data">
    <div>Номер: {{ data.id }}</div>
    <div>Кол-во: {{ data.count }}</div>
    <div>Статус: {{ STATUS_LABEL[data.status] }}</div>
    <div>Направление обмена: {{ DIRECT_LABEL[data.direct] }}</div>
    <div>Дата: {{ data.date }}</div>
    <div>Курс: {{ data.rate }}</div>
    <CommentForm v-if="data.comment === null && data.status === 1" :order="data.id" />
    <CommentView v-if="data.comment !== null" :data="data.comment" />
  </div>
</template>
<style scoped>
.warn {
  border: 1px solid #ccc;
}
</style>
