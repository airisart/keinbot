<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import FreezeCourse from '@/components/FreezeCourse.vue'
import TimeSlot from '@/components/slot/TimeSlot.vue'
import SelectManager from '@/components/manager/SelectManager.vue'
import CalendarIcon from '@/components/icons/calendarIcon.vue'
import ChevronDown from '@/components/icons/chevronDown.vue'
const emit = defineEmits(['next', 'prev'])
const form = defineModel({ required: true })
const date = ref()
const show = ref(false)

const toggleShow = () => {
  show.value = !show.value
}
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
  <div class="step2">
    <form @submit="onSubmit" class="flex flex-col jus-beet h-full">
      <div class="row">
        <FreezeCourse :direct="form.direct" />
        <template v-if="form.type === 1">
          <div class="select-kalendar">
            <div class="select-kalendar-content" @click="toggleShow">
              <span>
                <Calendar-Icon class="icon-kalendar" />
                Выберите дату
              </span>
              <ChevronDown :class="show && 'rotate-180'" class="chevron-down" />
            </div>

            <div class="w-full flex jus-cen" v-if="show">
              <Calendar
                v-model="date"
                date-format="yy-mm-dd"
                :min-date="new Date()"
                @update:model-value="() => (form.date = date)"
                inline
                touchUI
              />
            </div>
          </div>
          <TimeSlot
            v-if="show"
            v-model="slot"
            :date="form.date"
            :office="form.office"
            :manager="selected_manager"
          />
          <small class="error">{{ errors.slot }}</small>

          <div class="col-12">
            <SelectManager
              v-model="selected_manager"
              :office="form.office"
              @onSelect="(val) => (form.selected_manager = val)"
            />
          </div>
        </template>
        <div class="col-12" v-else-if="form.type === 2">
          <div class="col-12 w-100">
            <Calendar v-model="form.date" inline touchUI />
          </div>
          <div class="col-12 w-full loc_input">
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
      <div class="d-flex pt-4">
        <div>
          <Button
            label="Назад"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="emit('prev')"
            class="bg-main bor-main"
          />
        </div>
        <div style="margin-left: auto">
          <Button label="Далее" icon="pi pi-arrow-right" iconPos="right" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.step2 {
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 24px;
}

.select-kalendar {
  width: 100%;
  border: 1px solid #e5e3ff;
  border-radius: 6px;
  background: #f9f7ff;
  margin-top: 24px;
}
.select-kalendar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: 40px;
  width: 100%;
  border-radius: 6px;
  color: #4f4f4f;
}

.select-kalendar-content span {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon-kalendar {
  color: #29265b;
  font-size: 20px;
}
.rotate-180 {
  transform: rotate(180deg);
}
.chevron-down {
  transition: all 0.3s ease;
}
.pt-4 {
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
