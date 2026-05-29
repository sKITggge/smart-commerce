<template>
  <div
    class="absolute -bottom-12 mx-4 sm:mx-auto sm:max-w-sm md:w-full right-0 left-0 md:static gap-4 items-center search-panel"
    :class="[isSearchOpen ? 'flex' : 'hidden', 'md:!flex']"
  >
    <img
      src="/icons/magnifyingGlass.svg"
      alt="Logo"
      class="w-5 h-5"
    />
    <input
      class="w-full focus:outline-none"
      type="text"
      placeholder="Search products..."
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isSearchOpen: boolean
}>()
</script>
