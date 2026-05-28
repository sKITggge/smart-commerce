<template>
  <nav class="flex gap-4 items-center">
    <NuxtLink
      v-for="item in sideNav"
      :key="item.alt"
      class="p-2 rounded-full transition-colors hover:bg-gray-100"
      :to="item.to"
    >
      <img
        :src="item.path"
        :alt="item.alt"
        class="w-5 h-5"
      />
    </NuxtLink>

    <button
      class="p-2 rounded-full transition-colors hover:bg-gray-100 md:hidden"
      @click="toggleSearchOpen"
    >
      <img
        src="/icons/magnifyingGlass.svg"
        alt="search"
        class="w-5 h-5"
      />
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  toggleSearchOpen: () => void
}>()

const sideNav = [
  {
    path: '/icons/heart.svg',
    to: '/wishlist',
    alt: 'wishlist'
  },
  {
    path: '/icons/cart.svg',
    to: '/cart',
    alt: 'cart'
  },
  {
    path: '/icons/user.svg',
    to: '/profile',
    alt: 'profile'
  }
]
</script>
