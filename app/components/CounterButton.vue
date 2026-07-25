<template>
  <div
    class="inline-flex w-fit items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2"
  >
    <button
      type="button"
      class="h-6 w-6 rounded-md text-gray-700 transition hover:bg-gray-50 cursor-pointer"
      @click.prevent.stop="$emit('decrement')"
    >
      −
    </button>
    <span class="min-w-5 text-center text-sm font-semibold text-gray-900">
      {{ quantity }}
    </span>
    <button
      type="button"
      class="h-6 w-6 rounded-md text-gray-700 transition hover:bg-gray-50 cursor-pointer"
      @click.prevent.stop="$emit('increment')"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'increment' | 'decrement'): void
}>()

const { quantity } = defineProps<{ quantity: number }>()
</script>
