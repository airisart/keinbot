<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { MeApi } from '@/api/auth'
import { RouterLink } from 'vue-router'

// const { isPending, isError, data, error } = useQuery({
//   queryKey: ['me'],
//   queryFn: MeApi
// })

const reload = () => location.reload()
</script>
<template>
  <div class="row home">
    <!-- <div class="col-12 center">
      <ProgressSpinner v-if="isPending" />
      <Button v-if="isError" label="Перезагрузить" severity="danger" @click="reload" />
    </div> -->
    <!-- <div class="col-12">
      <h5>Курсы обмена:</h5>
      <div>UDST-RUB: 95 &#8381;</div>
      <div>RUB-USDT: 100 &#8381;</div>
    </div> -->
    <div class="col-12 m-0">
      <img alt="Vue logo" class="logo center" src="@/assets/img/logo.png" height="54" />
    </div>
    <div class="col-12 cash m-0">
      <img alt="" class=" " src="@/assets/img/cash.png" />
    </div>
    <div class="col-12 m-0">
      <p>
        <RouterLink to="/order">
          <Button label="Оформить обмен" class="" />
        </RouterLink>
      </p>
      <p>
        <RouterLink to="/orders">
          <Button label="Мои заявки на обмен" />
        </RouterLink>
      </p>
      <p>
        <RouterLink to="/kurs">
          <Button label="Курс USDT" />
        </RouterLink>
      </p>
    </div>
  </div>
</template>
<style>
a {
  text-decoration: none;
}
.m-0 {
  margin: 0;
}
.row {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  position: static;
}
.col-12 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
p {
  margin: 0;
}
.cash {
  height: 237px;
  margin-bottom: 28px !important;
}

.cash img {
  position: absolute;
  right: 0;
  height: 237px;
}
</style>
