<script setup lang="ts">
import { useRouter } from 'vue-router'
import LogoComp from '../components/LogoComp.vue'
const router = useRouter()

const toHome = () => {
  router.push({ path: 'home' })
}
</script>

<template>
  <div class="wrapper_full h-full">
    <LogoComp />
    <div class="flex-grow main_content succes-col">
      <div class="flex jus-cen">
        <h5 class="font-unbounded main_content_title">Ваша заявка на обмен создана</h5>
      </div>
      <div class="flex jus-cen mt-btn">
        <img src="@/assets/img/succes.png" />
      </div>
      <div class="flex jus-cen mt-btn">
        <Button label="В начало" type="submit" @click="toHome" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.mt-btn {
  margin-top: 40px;
}
.h-full {
  height: 100vh;

}
.succes-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-bottom: 20px;
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
