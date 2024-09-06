<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import { useQuery } from '@tanstack/vue-query'
import { DIRECT_LABEL, STATUS_LABEL } from '@/const'
import { OrderListApi } from '@/api/order'
import Logo from '@/components/LogoComp.vue'

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
  <div class="h-full wrapper_full orders">
    <Logo />
    <div class="flex-grow main_content">
      <div class="col-12">
        <h5 class="font-unbounded main_content_title">Мои заявки</h5>
      </div>
      <div class="col-12">
        <ProgressSpinner v-if="isPending" style="width: 48px; height: 48px" />
        <div v-if="isError">Ошибка загрузки</div>
        <div v-else-if="data" class="">
          <!-- @click="() => onClick(order.id)" -->
          <div v-for="order in data" :key="order.id" class="item">
            <div>
              Заказа №:
              <span>
                {{ order.id }}
              </span>
            </div>
            <div>
              Статус:

              <span>
                {{ STATUS_LABEL[order.status] }}
              </span>
            </div>
            <div>
              Направление обмена:
              <span>
                {{ DIRECT_LABEL[order.direct] }}
              </span>
            </div>
            <div>
              Сумма:
              <span>
                {{ order.count }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.orders .item {
  border: 1px solid #e5e3ff;
  border-radius: 6px;
  /* cursor: pointer; */
  padding: 20px;
  margin-bottom: 6px;
  background: #f9f7ff;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.orders .item div{
  color:#4F4F4F;
  font-weight: 600;
  font-size: 14px;
}
.orders .item div span{
  font-weight: 400 !important;
}

.bor {
  border: 1px solid red;
}
</style>
