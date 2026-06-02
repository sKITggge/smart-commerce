<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    fill="currentColor"
  >
    <path
      d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28-3.77-2.28zm0-13.4L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ size: number }>()
</script>
