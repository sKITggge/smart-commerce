<template>
  <NuxtLink
    class="group rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg relative"
    to="/"
  >
    <div
      v-if="product.discountPercentage > 0"
      class="absolute -top-2 -right-2 z-20 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg"
    >
      Save {{ product.discountPercentage }} %
    </div>

    <div class="relative aspect-square rounded-t-lg overflow-hidden bg-gray-100">
      <img
        :src="product.thumbnail"
        :alt="product.description"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <button
        class="absolute right-2 bottom-2 wishlist-button bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in-out"
        :class="{ 'bg-red-600 hover:bg-red-700': isInWishlist }"
        @click.prevent.stop="$emit('handleAddToWishlist', product)"
      >
        <HeartIcon
          class="w-5 h-5"
          stroke="#fff"
          fill="#fff"
        />
      </button>
    </div>

    <div class="p-4">
      <h3 class="mb-3 line-clamp-2">{{ product.title }}</h3>

      <div class="mb-2 flex items-center gap-2">
        <StarRating :rating="product.rating" />
        <span class="text-sm text-gray-600">({{ product.rating }})</span>
      </div>

      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-baseline-last gap-2">
          <span class="font-bold text-lg text-blue-600">{{ product.price }}$</span>
          <span class="font-bold text-sm text-blue-600 line-through">{{ discountedPrice }}$</span>
        </div>
        <span class="text-xs text-gray-500 uppercase">{{ product.category }}</span>
      </div>

      <button
        class="w-full px-2 py-1 rounded-xl text-white bg-blue-600 font-medium transition-colors duration-200 ease-in-out hover:bg-blue-700 cursor-pointer"
        @click.prevent.stop="$emit('handleAddToCart', product.id)"
      >
        Add to cart
      </button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import HeartIcon from '~/components/icons/HeartIcon.vue'
import type { Product } from '#shared/types/types'
import { useWishlistStore } from '~~/stores/wishlist'

const { product } = defineProps<{ product: Product }>()

const wishlistStore = useWishlistStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(product.id))

defineEmits<{
  (e: 'handleAddToCart', id: number): void
  (e: 'handleAddToWishlist', product: Product): void
}>()

const discountedPrice = computed(() => {
  return ((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)
})
</script>
