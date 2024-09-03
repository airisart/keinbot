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

const { error, mutate } = useMutation({
  mutationFn: (data) => OrderApi(data),
  onSuccess: confirmDialog
})

const confirm = useConfirm()
const router = useRouter()

const validationForm = () => mutate(form.value)
</script>
<template>
  <div class="col-12">
    <p>Сумма: {{ form.count }}</p>
    <p>
      Направление обмена:
      <template v-if="form.direct === 1">USDT - RUB</template>
      <template v-if="form.direct === 2">RUB - USDT</template>
    </p>
    <p v-if="form.rate">Комиссия: {{ form.rate.comission }}%, курс: {{ form.rate.rate }}</p>
    <p>
      Дата и время: {{ moment(form.date).format('YYYY-MM-DD') }}
      <template v-if="form.slot"> , {{ form.slot }} </template>
    </p>
    <p v-if="form?.office">Офис: {{ OFFICE_LABEL[form.office] }}</p>
    <p v-if="form?.delivery_address">Адрес доставки: {{ form?.delivery_address }}</p>
  </div>
  <div v-if="error">
    <small class="error">{{ error.message }}</small>
  </div>
  <div class="d-flex">
    <div>
      <Button label="Назад" severity="secondary" icon="pi pi-arrow-left" @click="emit('prev')" />
    </div>
    <div style="margin-left: auto">
      <Button label="Оформить" icon="pi pi-arrow-right" iconPos="right" @click="validationForm" />
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
</template>
