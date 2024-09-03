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
  if (!Cookies.get('token')) {
    const token =
      'query_id=AAEF26U9AgAAAAXbpT3OckL1&user=%7B%22id%22%3A5329246981%2C%22first_name%22%3A%22Nodirbek%22%2C%22last_name%22%3A%22Najmiddinov%22%2C%22username%22%3A%22Rare_Oligarch%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725041946&hash=88a2b83462b12285c27dc3efc6a5f65a1add25f425459b605281fb4fb7951a47'
    const { initData } = useWebApp()
    console.log('initData', initData)
    try {
      const {
        data: { token }
      } = await mutateAsync(initData)
      console.log('token', token)
      Cookies.set('token', token)
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
