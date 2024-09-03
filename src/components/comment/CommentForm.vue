<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useMutation } from '@tanstack/vue-query'
import { z } from 'zod'
import { OrderReviewApi } from '@/api/order'

const props = defineProps(['order'])

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      points: z.number().optional().default(5),
      text: z.string().optional()
    })
  )
})

const { data, error, mutate, isSuccess } = useMutation({
  mutationFn: (data) => OrderReviewApi(props.order, data)
})

const [points] = defineField('points')
const [text] = defineField('text')

const onSubmit = handleSubmit((values) => mutate(values))
</script>
<template>
  <div v-if="isSuccess" class="py-3">Спасибо, ваш отзыв был отправлен.</div>
  <form v-if="!data" @submit="onSubmit">
    <hr />
    <div class="row">Напишите Ваш отзыв</div>
    <div class="row py-2">Оценка <Rating v-model="points" :cancel="false" /></div>
    <div class="row py-2">
      <Textarea
        v-model="text"
        rows="5"
        cols="30"
        placeholder="Оставьте комментарий"
        style="width: 100%"
      />
      <small class="error">{{ errors.text }}</small>
    </div>
    <div class="row">
      <Button label="Отправить" type="submit" />
    </div>
  </form>
</template>
