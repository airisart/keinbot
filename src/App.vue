<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ExpandedViewport } from 'vue-tg'
//import BottomMenu from '@/components/menu/BottomMenu.vue'
</script>

<template>
  <ExpandedViewport />
  <div class="h-full wrapper">
    <div class="container h-full">
      <!-- <div class="row">
        <div class="col-12">
          <img alt="Vue logo" class="logo center" src="@/assets/keine.png" height="64" />
        </div>
      </div> -->
      <RouterView />
    </div>
  </div>
  <!-- <BottomMenu /> -->
</template>
<style scoped>
.logo {
  display: block;
}
.wrapper{
  background: #F9F7FF;
}
</style>
