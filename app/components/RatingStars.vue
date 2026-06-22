<template>
  <div class="flex items-center gap-2">
    <div class="flex items-center">
      <template
        v-for="i in max"
        :key="i"
      >
        <svg
          v-if="starType(i) === 'full'"
          class="h-4 w-4 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.447a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.539 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.783.57-1.838-.197-1.539-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.05 9.386c-.783-.57-.38-1.81.588-1.81H6.8a1 1 0 00.95-.69l1.299-3.959z"
          />
        </svg>

        <svg
          v-else-if="starType(i) === 'half'"
          class="h-4 w-4"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient
              :id="`half-${uid}-${i}`"
              x1="0"
              x2="1"
            >
              <stop
                offset="50%"
                stop-color="#fbbf24"
              />
              <stop
                offset="50%"
                stop-color="#e5e7eb"
              />
            </linearGradient>
          </defs>
          <path
            :fill="`url(#half-${uid}-${i})`"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.447a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.539 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.783.57-1.838-.197-1.539-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.05 9.386c-.783-.57-.38-1.81.588-1.81H6.8a1 1 0 00.95-.69l1.299-3.959z"
          />
        </svg>

        <svg
          v-else
          class="h-4 w-4 text-gray-200"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.447a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.539 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.783.57-1.838-.197-1.539-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.05 9.386c-.783-.57-.38-1.81.588-1.81H6.8a1 1 0 00.95-.69l1.299-3.959z"
          />
        </svg>
      </template>
    </div>

    <span
      v-if="showValue"
      class="text-sm text-gray-600"
    >
      ({{ normalized.toFixed(1) }})
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rating: number
    max?: number
    showValue?: boolean
  }>(),
  {
    max: 5,
    showValue: true
  }
)

const uid = Math.random().toString(36).slice(2)

const normalized = computed(() => {
  return Math.min(props.max, Math.max(0, props.rating))
})

function starType(i: number) {
  const r = normalized.value
  if (r >= i) return 'full'
  if (r >= i - 0.5) return 'half'
  return 'empty'
}
</script>
