<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
    <div class="w-full max-w-md">
      <LoginForm
        v-if="mode === 'login'"
        @switch="mode = 'register'"
        @success="openSuccess('Success!', 'You have successfully logged in.')"
      />
      <RegisterForm
        v-else
        @switch="mode = 'login'"
        @success="openSuccess('Success!', 'Your account has been created.')"
      />
    </div>

    <SuccessModal
      :open="isOpen"
      :title="successTitle"
      :message="successMessage"
      @close="closeModal"
    />
  </main>
</template>

<script setup lang="ts">
const mode = ref<'login' | 'register'>('login')

const isOpen = ref(false)
const successTitle = ref('Success!')
const successMessage = ref('')

const openSuccess = (title: string, message: string) => {
  successTitle.value = title
  successMessage.value = message
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}
</script>
