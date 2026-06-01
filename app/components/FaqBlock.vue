<template>
  <article class="rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
    <button
      class="flex w-full items-center justify-between p-4 text-left font-medium text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none"
      @click="isOpen = !isOpen"
    >
      <span class="text-lg">{{ question }}</span>
      <img
        class="h-5 w-5 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        src="/icons/arrow.svg"
        alt="arrow"
      />
    </button>

    <Transition name="slide">
      <div
        v-if="isOpen"
        class="px-4 pb-4 text-gray-600"
      >
        {{ answer }}
      </div>
    </Transition>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  question: string
  answer: string
}>()

const isOpen = ref(false)
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
