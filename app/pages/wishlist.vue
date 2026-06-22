<template>
  <main class="py-8">
    <div
      v-if="loading"
      class="flex justify-center p-4"
    >
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <div
      v-else-if="!count"
      class="flex flex-col items-center justify-center min-h-96"
    >
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Your wishlist is empty</h1>
      <p class="text-gray-600 mb-4">Save items you love to your wishlist and find them anytime.</p>
      <NuxtLink
        to="/"
        class="w-fit px-4 py-2 rounded-xl text-white bg-blue-600 font-medium transition-colors duration-200 ease-in-out hover:bg-blue-700 cursor-pointer"
      >
        Explore products
      </NuxtLink>
    </div>

    <div
      v-else
      class="container mx-auto"
    >
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-3">My wishlist</h1>
      <p class="text-gray-600 mb-4">{{ count }} item{{ count > 1 ? 's' : '' }} saved</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @handle-add-to-wishlist="store.toggleItem"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useWishlistStore } from '~~/stores/wishlist'

const store = useWishlistStore()

const { count, products, loading } = storeToRefs(store)
</script>
