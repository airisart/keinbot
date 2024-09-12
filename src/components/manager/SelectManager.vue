<script setup>
import { toRefs, watch, ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { OrderOfficeManagerApi } from '@/api/order'
import { ManagerReviewApi } from '@/api/order'
import dayjs from 'dayjs'
import ReviewManager from './ReviewManager.vue'
import CancelIcon from '../icons/cancelIcon.vue'

const emit = defineEmits(['onSelect'])
const props = defineProps(['slot', 'office', 'date'])
const manager = defineModel({ required: true })

const showManager = ref(null)

const comments = ref()
const visible = ref(false)
const selected = ref(-1)
const { office } = toRefs(props)

const { data, refetch } = useQuery({
  queryKey: ['staff', office],
  //@ts-ignore
  queryFn: () => OrderOfficeManagerApi(office.value),
  select: (response) => response.data,
  enabled: false
})

function extractRating(text) {
  const match = text.match(/\((\d+(\.\d+)?)\/\d+\)/)
  return match ? +match[1] : null
}
function extractLabel(text) {
  return text.replace(/\s\(\d+(\.\d+)?\/\d+\)$/, '').trim()
}
const managerRatings = computed(() => {
  return data.value
    ? data.value.map((manager) => ({
        ...manager,
        rating: extractRating(manager.label),
        label: extractLabel(manager.label)
      }))
    : []
})

function openCom(id, manager) {
  ManagerReviewApi(id)
    .then((response) => {
      comments.value = response.data
      visible.value = true
      showManager.value = manager
    })
    .catch((error) => {
      console.error(error)
    })
}

function changeSelect(i, id) {
  selected.value = i
  manager.value = id
  emit('onSelect', id)
}
function handleSelect(val) {
  emit('onSelect', val)
  console.log(val)
  // "(val) => emit('onSelect', val)"
}
function handleClose() {
  comments.value = null
  visible.value = false // Close the dialog
}
function formatDate(time) {
  return dayjs(time).format('DD.MM.YYYY')
}
const pluralizeComment = (count) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'отзывов'
  if (lastDigit === 1) return 'отзыв'
  if (lastDigit >= 2 && lastDigit <= 4) return 'отзыва'
  return 'отзывов'
}

watch(
  [office],
  () => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!office?.value) {
      refetch()
    }
  },
  { immediate: true }
)
</script>
<template>
  <div class="select-manager w-full" v-if="data">
    <!-- <Dropdown
      :disabled="!data"
      style="width: 100%"
      v-model="manager"
      @update:model-value="handleSelect"
      :options="data"
      option-value="id"
      option-label="label"
      placeholder="Менеджер офиса"
    /> -->
    <p class="">Выберите менеджера</p>

    <div
      v-for="(manager, i) of managerRatings"
      :key="i"
      class="manager-item w-full"
      :class="selected == i && 'selected-manager'"
      @click="changeSelect(i, manager.id)"
    >
      <img src="@/assets/img/manager.png" height="48" />
      <div class="flex-grow">
        <span class=""> {{ manager.label }} </span>
        <div class="rating">
          <Rating v-model="manager.rating" readonly :cancel="false" :stars="5" />
          <span class="context underline-1" @click.stop="openCom(manager.id, manager)">
            смотреть отзывы</span
          >
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    @hide="handleClose"
    modal
    class="dialog-review"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="header-comment flex jus-beet">
        <div class="flex">
          <img src="@/assets/img/manager.png" height="48" />
          <div class="flex flex-col manager-name">
            <p>{{ showManager.label }}</p>
            <div class="flex">
              <Rating v-model="showManager.rating" readonly :cancel="false" :stars="5" />
              <span class="underline-1" v-if="comments.length != 0">
                {{ comments.length }} {{ pluralizeComment(11) }}
              </span>
              <span v-else class="underline-1">Отзывов пока нет</span>
            </div>
          </div>
        </div>
        <!-- <span>Review {{ showManager }}</span> -->
        <span class="close-icon" @click="handleClose">
          <CancelIcon />
        </span>
      </div>
    </template>

    <div v-for="(comment, i) of comments" :key="i" class="comment">
      <div class="top-comment">
        <span>
          {{ formatDate(comment.created) }}
        </span>
        <Rating v-model="comment.points" readonly :cancel="false" :stars="5" />
      </div>
      <div class="body-comment w-full">
        <p class="my-2">
          Клиент:<span>
            {{ comment.user }}
          </span>
        </p>
        <p class="">{{ comment.text }}</p>
      </div>
    </div>
  </Dialog>
  <!-- <div>
    <ReviewManager v-model="manager" />
  </div> -->
</template>
<style scoped>
.select-manager {
  margin-top: 24px;
}
.select-manager p {
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
}
.manager-item {
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
  border: 1px solid #e5e3ff;
  background: #f9f7ff;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 8px;
}

.manager-item span {
  font-size: 20px;
  font-weight: 500;
  color: #202020;
}
.selected-manager {
  background: #29265b;
}
.selected-manager span {
  color: #fff;
}
.rating {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.rating .context {
  font-size: 12px;
  line-height: 1.2;
  color: #4f4f4f;
}

.selected-manager .rating .context {
  color: #dedede;
}

.dialog-review {
  width: 200px;
  height: auto;
}
.top-comment {
  display: flex;
  align-items: center;
  gap: 10px;
}
.comment {
  border-bottom: 1px solid #e5e3ff;
  padding: 10px 0;
}
.comment:last-child {
  border: none;
}
.top-comment span {
  font-size: 14px;
  font-weight: 500;
  color: #4f4f4f;
}
.body-comment p {
  font-size: 16px;
  font-weight: 500;
  color: #4f4f4f;
}
.my-2 {
  margin: 8px 0;
}

.body-comment p span {
  font-weight: 700;
}

.header-comment {
  padding: 10px;
  width: 100%;
}
.header-comment .manager-name {
  justify-content: space-between;
  flex-grow: 1;
  margin-left: 18px;
}
.header-comment .manager-name p {
  color: #202020;
  font-size: 18px;
  font-weight: 600;
}
.manager-name .underline-1 {
  margin-left: 12px;
}
.close-icon {
  color: #29265b;
  font-size: 18px;
}
</style>
