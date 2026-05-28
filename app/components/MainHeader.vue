<template>
  <header class="relative w-full shadow-lg">
    <div class="container mx-auto px-4 py-3 flex md:gap-4 items-center justify-between">
      <button class="cursor-pointer" @click="toggleOpen">
        <img src="/icons/burger.svg" alt="Logo" class="w-5 h-5" />
      </button>

      <NuxtLink href="/" class="flex gap-2 items-center">
        <div class="p-2 rounded-sm bg-blue-500">
          <img src="/icons/logo.svg" alt="Logo" class="w-5 h-5" />
        </div>
        <span class="text-2xl font-bold">Shop</span>
      </NuxtLink>

      <div
        class="absolute -bottom-12 mx-4 sm:mx-auto sm:max-w-sm md:w-full right-0 left-0 md:static gap-4 items-center search-panel"
        :class="[isSearchOpen ? 'flex' : 'hidden', 'md:!flex']"
      >
        <img src="/icons/magnifyingGlass.svg" alt="Logo" class="w-5 h-5" />
        <input class="w-full focus:outline-none" type="text" placeholder="Search products..." />
      </div>

      <nav class="flex gap-4 items-center">
        <NuxtLink
          v-for="item in sideNav"
          :key="item.alt"
          class="p-2 rounded-full transition-colors hover:bg-gray-100"
          :href="item.to"
        >
          <img :src="item.path" :alt="item.alt" class="w-5 h-5" />
        </NuxtLink>

        <button
          class="p-2 rounded-full transition-colors hover:bg-gray-100 md:hidden"
          @click="toggleSearchOpen"
        >
          <img src="/icons/magnifyingGlass.svg" alt="search" class="w-5 h-5" />
        </button>
      </nav>
    </div>
  </header>

  <template v-if="isOpen">
    <div class="fixed h-screen left-0 max-w-xl overflow-y-auto bg-white shadow-2xl p-4">
      <div class="flex justify-between items-center gap-4 pb-3 border-b border-gray-300 mb-6">
        <div class="flex gap-2 items-center">
          <div class="p-2 rounded-sm bg-blue-500">
            <img src="/icons/logo.svg" alt="Logo" class="w-5 h-5" />
          </div>
          <span class="text-2xl font-bold">Shop Categories</span>
        </div>

        <button
          class="p-2 rounded-full transition-colors hover:bg-gray-100 cursor-pointer"
          @click="toggleOpen"
        >
          <img src="/icons/cross.svg" alt="close" class="w-5 h-5" />
        </button>
      </div>

      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.label"
          :to="{ path: '/products', query: { category: cat.category } }"
          class="px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
        >
          {{ cat.label }}
        </NuxtLink>

        <div class="border-t border-gray-300 px-4 py-2">QUICK LINKS</div>

        <NuxtLink
          href="/wishlist"
          class="flex gap-2 items-center px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
        >
          <img src="/icons/heart.svg" alt="Wishlist" class="w-5 h-5" />
          <span>Wishlist</span>
        </NuxtLink>

        <NuxtLink
          href="/cart"
          class="flex gap-2 items-center px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
        >
          <img src="/icons/cart.svg" alt="Cart" class="w-5 h-5" />
          <span>Cart</span>
        </NuxtLink>
      </nav>
    </div>
  </template>
</template>

<script setup lang="ts">
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

const categories = [
  { label: 'Beauty', category: 'beauty' },
  { label: 'Furniture', category: 'furniture' },
  { label: 'Science', category: 'science' },
  { label: 'Groceries', category: 'groceries' },
  { label: 'Business', category: 'business' },
  { label: 'Laptops', category: 'laptops' },
  { label: 'Mens Shirts', category: 'mens-shirts' },
  { label: 'Toys', category: 'toys' },
  { label: 'Sports', category: 'sports' },
  { label: 'Books', category: 'books' },
  { label: 'Electronics', category: 'electronics' },
  { label: 'Garden', category: 'garden' },
  { label: 'Pet Supplies', category: 'pet-supplies' },
  { label: 'Automotive', category: 'automotive' },
  { label: 'Clothing', category: 'clothing' }
]

const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const isSearchOpen = ref(false)
const toggleSearchOpen = () => {
  isSearchOpen.value = !isSearchOpen.value
}
</script>
