<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import StepOne from './order/StepOne.vue'
import StepTwo from './order/StepTwo.vue'
import StepThree from './order/StepThree.vue'
import Logo from '@/components/Logo.vue'

const router = useRouter()

const handleBackButton = () => router.back()

let form = reactive({
  direct: null,
  delivery: null,
  selected_manager: null,
  count: null,
  date: new Date(),
  rate: null,
  type: 1,
  office: null,
  delivery_address: null,
  slot: null
})

const currentStep = ref(0) // Initialize the current step index

// Function to handle step changes
const handleStepChange = (stepIndex) => {
  currentStep.value = stepIndex.index
}
</script>

<template>
  <BackButton @click="handleBackButton" />
  <div class="wrapper_full h-full">
    <Logo />
    <div class="flex-grow main_content">
      <div class="col-12 m-0 center">
        <h5 class="font-unbounded main_content_title">Обмен</h5>
      </div>
      <Stepper
        :currentStep="currentStep"
        @step-change="handleStepChange"
        class="step0 h-full"
        :class="{
          step1: currentStep > 0,
          step2: currentStep > 1
        }"
      >
        <StepperPanel header="" class="h-full ">
          <template #content="{ nextCallback }">
            <StepOne v-model="form" @next="() => nextCallback()" class="h-full" />
          </template>
        </StepperPanel>
        <StepperPanel header="">
          <template #content="{ prevCallback, nextCallback }">
            <StepTwo
              v-model="form"
              @next="() => nextCallback()"
              @prev="() => prevCallback()"
              class="h-full"
            />
          </template>
        </StepperPanel>
        <StepperPanel header="">
          <template #content="{ prevCallback }">
            <StepThree v-model="form" @prev="() => prevCallback()" class="h-full " />
          </template>
        </StepperPanel>
      </Stepper>
    </div>
  </div>
</template>

<style scoped></style>
