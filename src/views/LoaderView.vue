<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import Cookies from 'js-cookie'
import { useMutation } from '@tanstack/vue-query'
import { useWebApp } from 'vue-tg'
import { ValidationApi } from '@/api/auth'

const router = useRouter()
const { mutateAsync } = useMutation({ mutationFn: ValidationApi })

onMounted(async () => {
  //const token = Cookies.get('token')
  const token = sessionStorage.getItem('token')
  if (!token) {
    const { initData } = useWebApp()
    console.log('initData', initData)
    try {
      const {
        data: { token }
      } = await mutateAsync(initData)
      console.log('token', token)
      //Cookies.set('token', token)
      sessionStorage.setItem('token', token)
      router.replace({ path: '/home' })
    } catch (e) {
      console.log(e)
    }
  } else {
    router.replace({ path: '/home' })
  }
})
</script>
<template>loading</template>
