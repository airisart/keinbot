<script setup>
import { RouterLink } from 'vue-router'
const items = [
  { link: '/', icon: '', title: 'Главная' },
  { link: '/order', icon: '', title: 'Обмен' },
  // { link: '/orders', icon: '', title: 'История' },
  { link: '/help', icon: '', title: 'Помощь' }
]
</script>
<template>
  <Dock :model="items">
    <template #item="{ item }">
      <RouterLink :to="item.link" class="item">{{ item.title }}</RouterLink>
    </template>
  </Dock>
</template>
<style scoped>
.bottom_menu {
  position: absolute;
  bottom: 10px;
  height: 32px;
  width: 90%;
}
.bottom_menu .menu {
  text-align: center;
}
.bottom_menu .item {
  line-height: 40px;
  padding: 4px 8px;
  text-decoration: none;
}
.bottom_menu .plus {
  font-size: 32px;
}
</style>
