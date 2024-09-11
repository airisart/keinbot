<script setup>
import { BackButton } from 'vue-tg'
import Logo from '@/components/LogoComp.vue'
</script>
<template>
  <BackButton @click="handleBackButton" />
  <div class="h-screen wrapper_full kurs">
    <Logo />
    <div class="flex-grow kurs_content">
      <div class="main_kurs_wrapper">
        <div class="col-12">
          <h5 class="font-unbounded main_content_title">Курс USDT</h5>
        </div>
        <div class="w-full kurs_item">
          <div class="font-unbounded">
            <span class="title">Покупка</span>
            <span>92.56</span>
          </div>
          <div class="font-unbounded">
            <span class="title">Продажа</span>
            <span>92.16</span>
          </div>
        </div>
        <div class="kurs_foot">
          <img src="@/assets/img/icon.png" />
          <span> Данный курс является биржевым и меняется каждую минуту </span>
          <p>Мы не берем никаких дополнительных комиссий с Вас.</p>
          <p>Создайте заявку на получение пропуска в наш офис и покупки USDT.</p>
        </div>
      </div>
      <p>
        <RouterLink to="/">
          <Button label="В начало" />
        </RouterLink>
      </p>
    </div>
  </div>
</template>
<style scoped>
.kurs_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 22px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 20px;
  padding-top: 36px;
}
.main_kurs_wrapper {
  width: 100%;
}


.kurs_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}
.kurs_item div {
  width: calc(50% - 4px);
  border: 1px solid #e5e3ff;
  background: #f9f7ff;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
  border-radius: 8px;
}
.kurs_item div span {
  color: #010205;
  font-weight: 500;
  font-size: 26px;
}
.kurs_item div .title {
  color: #4f4f4f;
  font-weight: 500;
  font-size: 14px;
}
.kurs_foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  text-align: center;
}
.kurs_foot img {
  width: 18px;
  margin-bottom: 15px;
}
.kurs_foot span {
  font-size: 14px;
  font-weight: 500;
  color: #4f4f4f;
  margin-bottom: 25px;
  max-width: 300px;
}
.kurs_foot p {
  color: #222b45;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 400;
  max-width: 300px;
}
</style>
