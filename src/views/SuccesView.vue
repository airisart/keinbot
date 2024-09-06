<script setup>
import Logo from '@/components/Logo.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const toHome = () => {
  router.push({ path: 'home' })
}
</script>

<template>
  <div class="wrapper_full h-full">
    <Logo />
    <div class="flex-grow main_content succes-col">
      <div class="flex jus-cen">
        <h5 class="font-unbounded main_content_title">Ваша заявка на обмен создана</h5>
      </div>
      <div class="flex jus-cen">
        <img src="@/assets/img/succes.png" />
      </div>
      <div class="flex jus-cen">
        <Button label="В начало" type="submit" @click="toHome" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.succes-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.succes-col img {
  width: 237px;
  height: auto;
}
.main_content_title {
  max-width: 275px;
  text-align: center;
}
</style>
