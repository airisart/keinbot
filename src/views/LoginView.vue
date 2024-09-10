<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import { useMutation } from '@tanstack/vue-query'
import { LoginWidget } from 'vue-tg'
import type { LoginWidgetUser } from 'vue-tg'

import { LoginApi } from '../api/auth'

const user = ref({})
const { isPending, isError, error, isSuccess, mutateAsync } = useMutation({ mutationFn: LoginApi })
const router = useRouter()
const route = useRoute()
const bot = import.meta.env.VITE_BOT_NAME || 'kein_app_bot'

const handleUserAuth = async (tgUser: LoginWidgetUser) => {
  console.log('tgUser', tgUser)
  user.value = tgUser

  const {
    data: { token, refresh_token }
  } = await mutateAsync(tgUser)
  // Cookies.set('token', token)
  Cookies.set('token', '2ede85d4f91c74a951eb6a59b5d493303b72a43d')
  Cookies.set('refresh_token', refresh_token)
  router.push({ path: '/home', replace: true })
}

console.log('router', route.hash.split('=')?.[1])
</script>
<template>
  <ProgressSpinner v-if="isPending" />
  <div class="margin:auto" v-else-if="!isPending">
    <LoginWidget :bot-username="bot" :request-write="true" @auth="handleUserAuth" />
  </div>
  {{ JSON.stringify(user) }}
</template>
