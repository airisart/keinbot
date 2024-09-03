<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import RateInfo from '@/components/rate/RateInfo.vue'

const emit = defineEmits(['next'])
let form = defineModel()

const items = [
  { id: 1, label: 'USDT - RUB' },
  { id: 2, label: 'RUB - USDT' }
]
const types = [
  { id: 1, label: 'В офисе' },
  { id: 2, label: 'Доставка' }
]
const offices = [
  { id: 1, label: 'Москва Сити Федерация' },
  { id: 2, label: 'Москва, Неглинная 17с2' }
]

const delivery_direction = [
  { id: 1, label: 'В пределах Садового Кольца' },
  { id: 2, label: 'В пределах ТТК' },
  { id: 3, label: 'В пределах МКАД' },
  { id: 4, label: 'За МКАД' }
]

const { errors, defineField, handleSubmit } = useForm({
  initialValues: {
    type: 1,
    delivery: null,
    office: null
  },
  validationSchema: toTypedSchema(
    z
      .object({
        type: z.coerce.number(),
        count: z.coerce.number({ invalid_type_error: 'Укажите сумму' }),
        direct: z.coerce.number({ invalid_type_error: 'Выберите направление обмена' }),
        office: z.coerce.number().optional(),
        delivery: z.coerce.number().optional()
      })
      .superRefine(({ type, office }, ctx) => {
        if (type === 1 && office === undefined) {
          ctx.addIssue({
            code: 'custom',
            message: 'Выберите офис',
            path: ['office']
          })
        }
        if (type === 2 && delivery === undefined) {
          ctx.addIssue({
            code: 'custom',
            message: 'Выберите удаленность',
            path: ['delivery']
          })
        }
      })
  )
})
const [count] = defineField('count')
const [direct] = defineField('direct')
const [type] = defineField('type')
const [office] = defineField('office')
const [delivery] = defineField('delivery')

const onSubmit = handleSubmit((values) => {
  form.value = {
    ...form.value,
    ...values
  }
  emit('next')
})
</script>
<template>
  <div class="">
    <form @submit="onSubmit">
      <div class="row">
        <div class="col-12">
          <Dropdown
            style="width: 100%"
            v-model="direct"
            :options="items"
            option-value="id"
            option-label="label"
            placeholder="Направление обмена"
          />
          <small class="error">{{ errors.direct }}</small>
        </div>
        <div class="col-12">
          <InputText v-model="count" placeholder="Сумма" style="width: 100%" />
          <small class="error">{{ errors.count }}</small>
        </div>
        <div class="col-12">
          <SelectButton
            v-model="type"
            :options="types"
            option-label="label"
            option-value="id"
            aria-labelledby="basic"
            style="width: 100%"
          />
        </div>
        <div class="col-12" v-if="type === 1">
          <Dropdown
            v-model="office"
            :options="offices"
            option-value="id"
            option-label="label"
            placeholder="Выберите офис"
            style="width: 100%"
          />
          <small class="error">{{ errors.office }}</small>
        </div>
        <div class="col-12" v-if="type === 2">
          <Dropdown
            v-model="delivery"
            :options="delivery_direction"
            option-value="id"
            option-label="label"
            placeholder="Выберите зону доставки"
            style="width: 100%"
          />
          <small class="error">{{ errors.office }}</small>
        </div>
        <div class="col-12" v-if="(office && type === 1) || (delivery && type === 2)">
          <RateInfo
            :direct="direct"
            :office="office"
            :delivery="delivery"
            :type="type"
            v-model="form.rate"
            @update:modelValue="
              ($event) => {
                form.rate = $event
              }
            "
          />
        </div>
      </div>
      <div class="d-flex">
        <Button label="Далее" icon="pi pi-arrow-right" iconPos="right" type="submit" />
      </div>
    </form>
  </div>
</template>
