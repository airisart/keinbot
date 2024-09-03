<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import FreezeCourse from '@/components/FreezeCourse.vue'
import TimeSlot from '@/components/slot/TimeSlot.vue'
import SelectManager from '@/components/manager/SelectManager.vue'

const emit = defineEmits(['next', 'prev'])
const form = defineModel({ required: true })
const date = ref()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z
      .object({
        selected_manager: z.number().optional(),
        slot: z.string().optional(),
        delivery_address: z.string().optional()
      })
      .refine((schema) => (form.value.type === 2 ? !!schema.delivery_address : true), {
        message: 'Укажите адрес доставки',
        path: ['delivery_address']
      })
      .refine((schema) => (form.value.type === 1 ? !!schema.slot : true), {
        message: 'Выберите слот',
        path: ['slot']
      })
  )
})
const [selected_manager] = defineField('selected_manager')
const [slot] = defineField('slot')
const [delivery_address] = defineField('delivery_address')

const onSubmit = handleSubmit((values) => {
  console.log('values', values)
  form.value = {
    ...form.value,
    ...values
  }
  emit('next')
})
</script>
<template>
  <form @submit="onSubmit">
    <div class="row">
      <FreezeCourse :direct="form.direct" />
      <template v-if="form.type === 1">
        <div class="col-12 w-100">
          <Calendar
            v-model="date"
            date-format="yy-mm-dd"
            :min-date="new Date()"
            @update:model-value="() => (form.date = date)"
            inline
            touchUI
          />
        </div>
        <div class="col-12">
          <SelectManager
            v-model="selected_manager"
            :office="form.office"
            @onSelect="(val) => (form.selected_manager = val)"
          />
        </div>
        <TimeSlot
          v-model="slot"
          :date="form.date"
          :office="form.office"
          :manager="selected_manager"
        />
        <small class="error">{{ errors.slot }}</small>
      </template>
      <div class="col-12" v-else-if="form.type === 2">
        <div class="col-12 w-100">
          <Calendar v-model="form.date" inline touchUI />
        </div>
        <div class="col-12 w-100">
          <InputText
            v-model="delivery_address"
            type="text"
            placeholder="Укажите адрес доставки"
            style="width: 100%"
          />
        </div>
        <small class="error">{{ errors.address }}</small>
      </div>
    </div>
    <div class="d-flex">
      <div>
        <Button label="Назад" severity="secondary" icon="pi pi-arrow-left" @click="emit('prev')" />
      </div>
      <div style="margin-left: auto">
        <Button label="Далее" icon="pi pi-arrow-right" iconPos="right" type="submit" />
      </div>
    </div>
  </form>
</template>
