<template>
  <nav class="flex gap-4 items-center">
    <NuxtLink
      v-for="item in sideNav"
      :key="item.alt"
      class="relative p-2 rounded-full transition-colors hover:bg-gray-100"
      :to="item.to"
    >
      <img
        :src="item.path"
        :alt="item.alt"
        class="w-5 h-5"
      />
      <span
        v-if="item.count"
        class="absolute -right-1 -top-1 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs"
      >
        {{ item.count }}
      </span>
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
import { useCartStore } from '~~/stores/cart'
import { useWishlistStore } from '~~/stores/wishlist'

defineProps<{
  toggleSearchOpen: () => void
}>()

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const sideNav = computed(() => [
  {
    path: '/icons/heart.svg',
    to: '/wishlist',
    alt: 'wishlist',
    count: wishlistStore.count
  },
  {
    path: '/icons/cart.svg',
    to: '/cart',
    alt: 'cart',
    count: cartStore.count
  },
  {
    path: '/icons/user.svg',
    to: '/profile',
    alt: 'profile'
  }
])
</script>
