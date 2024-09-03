import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelegram from 'vue-tg'
import PrimeVue from 'primevue/config'
import { VueQueryPlugin } from '@tanstack/vue-query'

import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import ConfirmDialog from 'primevue/confirmdialog'
import DataView from 'primevue/dataview'
import Dialog from 'primevue/dialog'
import Dock from 'primevue/dock'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import SelectButton from 'primevue/selectbutton'
import StepperPanel from 'primevue/stepperpanel'
import Stepper from 'primevue/stepper'
import Tag from 'primevue/tag'
import ConfirmationService from 'primevue/confirmationservice'
import Rating from 'primevue/rating'
import Textarea from 'primevue/textarea'

import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import '@/assets/style/main.css'

import ru from '@/plugins/ru'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue, { locale: ru })
app.use(VueQueryPlugin)
app.use(VueTelegram)
app.use(createPinia())
app.use(router)
app.use(ConfirmationService)

app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('ConfirmDialog', ConfirmDialog)
app.component('DataView', DataView)
app.component('Dock', Dock)
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('InputText', InputText)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Rating', Rating)
app.component('SelectButton', SelectButton)
app.component('StepperPanel', StepperPanel)
app.component('Stepper', Stepper)
app.component('Tag', Tag)
app.component('Textarea', Textarea)
app.mount('#app')
