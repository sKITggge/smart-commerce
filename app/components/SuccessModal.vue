<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
    >
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        @click="$emit('close')"
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
              alt="success"
              class="h-5 w-5"
            />
          </div>

          <div class="flex-1">
            <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
            <p class="mt-1 text-sm text-gray-600">{{ message }}</p>
          </div>

          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
            @click="$emit('close')"
          >
            <img
              src="/icons/cross.svg"
              alt="close"
              class="h-5 w-5"
            />
          </button>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <NuxtLink
            to="/"
            class="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            @click="$emit('close')"
          >
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  message: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
