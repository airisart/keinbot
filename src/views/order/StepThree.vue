<script setup>
import moment from 'moment'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { useConfirm } from 'primevue/useconfirm'
import { OrderApi } from '@/api/order'
import { OFFICE_LABEL } from '@/const/office'

//import type { Order } from './interfaces'

const emit = defineEmits(['prev'])
const form = defineModel({ required: true })
const router = useRouter()
const confirm = useConfirm()
const confirmDialog = () => {
  confirm.require({
    message: 'Заказ на обмен успешно добавлен',
    header: 'Запись на обмен',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Готово',
    accept: () => {
      router.push('/home')
    }
  })
}

const succes = () => {
  router.push({ path: '/succes' })
}

const { error, mutate } = useMutation({
  mutationFn: (data) => OrderApi(data),
  onSuccess: succes
})

const validationForm = () => mutate(form.value)
</script>
<template>
  <div class="step3">
    <div class="step3-main">
      <div class="col-12" v-if="!error">
        <p class="steps-col">
          Сумма:

          <span>
            {{ form.count }}
          </span>
        </p>
        <p class="steps-col">
          Направление обмена:
          <span>
            <template v-if="form.direct === 1">USDT - RUB</template>
            <template v-if="form.direct === 2">RUB - USDT</template>
          </span>
        </p>
        <p v-if="form.rate" class="steps-col">
          Комиссия:

          <span> {{ form.rate.comission }}%, курс: {{ form.rate.rate }} </span>
        </p>
        <p class="steps-col">
          Дата и время:
          <span>
            {{ moment(form.date).format('YYYY-MM-DD') }}

            <template v-if="form.slot"> , {{ form.slot }} </template>
          </span>
        </p>
        <p v-if="form?.office" class="steps-col">
          Офис:
          <span>
            {{ OFFICE_LABEL[form.office] }}
          </span>
        </p>
        <p v-if="form?.delivery_address" class="steps-col">
          Адрес доставки:

          <span>
            {{ form?.delivery_address }}
          </span>
        </p>
      </div>
      <div v-else class="bor h-full step3-error">
        <img src="@/assets/img/error.png" />
        <div>
          <span>Что-то пошло не так</span>
          <span> Код ошибки: {{ error.message }}</span>
        </div>
      </div>
      <ConfirmDialog>
        <template #container="{ message, acceptCallback }">
          <div class="p-dialog-header" data-pc-section="header">
            <span id="pv_id_16_header" class="p-dialog-title" data-pc-section="title">
              Запись на обмен
            </span>
          </div>
          <div class="p-dialog-content" data-pc-section="content">
            <!-- <span class="pi pi-exclamation-triangle p-confirm-dialog-icon" data-pc-section="icon"></span> -->
            <span class="p-confirm-dialog-message" data-pc-section="message">
              {{ message.message }}
            </span>
          </div>

          <div class="p-dialog-footer" data-pc-section="footer">
            <Button label="Отлично" @click="acceptCallback"></Button>
          </div>
        </template>
      </ConfirmDialog>
    </div>
    <div class="d-flex pt-2" :class="error && 'jus-cen'">
      <div>
        <Button
          label="Назад"
          severity="secondary"
          icon="pi pi-arrow-left"
          @click="emit('prev')"
          class="bg-main bor-main"
        />
      </div>
      <div style="margin-left: auto" v-if="!error">
        <Button label="Оформить" icon="pi pi-arrow-right" iconPos="right" @click="validationForm" />
      </div>
    </div>
  </div>
</template>
<style>
.step3 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.step3-main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  text-align: center;
}

.step3-main .col-12 {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.steps-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #4f4f4f;
}

.steps-col span {
  font-weight: 600;
  color: #4f4f4f;
}
.step3-error {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
}
.step3-error img {
  width: 60px;
  margin-bottom: 25px;
}

.step3-error div {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 500;
}
.pt-2 {
  padding-top: 24px !important;
}
</style>
