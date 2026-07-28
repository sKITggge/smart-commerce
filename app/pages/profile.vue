<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
    <div class="w-full max-w-md">
      <form
        class="bg-white shadow-md rounded-2xl border border-gray-200 px-8 pt-7 pb-8"
        @submit.prevent="handleSubmit"
      >
        <h1 class="text-2xl font-bold text-center text-gray-900 mb-6">Log In</h1>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            v-model.trim="email"
            type="text"
            placeholder="Email address"
            autofocus
            class="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            :class="emailError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'"
          />
          <p
            v-if="emailError"
            class="mt-2 text-sm text-red-600"
          >
            {{ emailError }}
          </p>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model.trim="password"
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            :class="passwordError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'"
          />
          <p
            v-if="passwordError"
            class="mt-2 text-sm text-red-600"
          >
            {{ passwordError }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
        >
          Login
        </button>
      </form>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          @click="closeModal"
        />

        <div
          class="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl md:p-7"
        >
          <div class="flex items-start gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600"
            >
              <img
                src="/icons/check.svg"
                alt="close"
                class="w-5 h-5"
              />
            </div>

            <div class="flex-1">
              <h2 class="text-lg font-semibold text-gray-900">Success!</h2>
              <p class="mt-1 text-sm text-gray-600">You have successfully logged in.</p>
            </div>

            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
              aria-label="Close"
              @click="closeModal"
            >
              <img
                src="/icons/cross.svg"
                alt="close"
                class="w-5 h-5"
              />
            </button>
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <NuxtLink
              to="/"
              class="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              @click="closeModal"
            >
              Back to Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { validateEmail } from '#shared/utils'

const email = ref('')
const password = ref('')

const isOpen = ref(false)

const emailError = ref<string | null>(null)
const passwordError = ref<string | null>(null)

const closeModal = () => {
  isOpen.value = false
}

const handleSubmit = () => {
  emailError.value = null
  passwordError.value = null

  if (!email.value) {
    emailError.value = 'Email is required.'
  } else if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email.'
  }

  if (!password.value) {
    passwordError.value = 'Password is required.'
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters.'
  }

  isOpen.value = true
}
</script>
