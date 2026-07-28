<template>
  <div
    style="height: 100px"
    class="smart-captcha"
    :data-sitekey="siteKey"
    :data-callback="callbackName"
  ></div>
</template>

<script setup lang="ts">
const { siteKey } = defineProps<{ siteKey: string }>()
const emit = defineEmits<{ success: [token: string] }>()

const callbackName = `smartCaptchaCallback_${useId().replace(/:/g, '_')}`

useHead({
  script: [{ src: 'https://smartcaptcha.yandexcloud.net/captcha.js', async: true, defer: true }]
})

onMounted(() => {
  ;(window as unknown as Record<string, (token: string) => void>)[callbackName] = (token) => {
    emit('success', token)
  }
})

onUnmounted(() => {
  delete (window as unknown as Record<string, unknown>)[callbackName]
})
</script>
