<template>
  <div>
    <MainHero />
    <div class="grid grid-cols-5">
      <ProductCard
        :product="product"
        @handle-add-to-wishlist="(pr) => toggleItem(pr)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '#shared/types/types'
import { useWishlistStore } from '~~/stores/wishlist'

const { toggleItem } = useWishlistStore()

const product: Product = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description:
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
  category: 'beauty',
  price: 9.99,
  discountPercentage: 10.48,
  rating: 2.56,
  brand: 'Essence',
  thumbnail:
    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
}
</script>
