<script setup>
const props = defineProps(['data'])
</script>
<template>
  <div class="row" style="padding-top: 6px">
    Оценка:
    <Rating v-model="data.points" readonly :cancel="false" />
  </div>
  <div class="row py-1">
    Отзыв:
    {{ data.text }}
  </div>
</template>
