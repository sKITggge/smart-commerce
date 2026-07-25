<template>
  <div class="category-section">
    <h2 class="text-2xl font-semibold mb-4">{{ category }}</h2>

    <div
      v-if="isLoading"
      class="flex gap-5 overflow-x-auto [scrollbar-width:none]"
    >
      <div
        v-for="i in 5"
        :key="i"
        class="w-64 flex-shrink-0"
      >
        <div class="animate-pulse bg-gray-200 rounded-xl h-80"></div>
      </div>
    </div>

    <div
      v-else-if="products?.length"
      class="relative"
    >
      <Swiper
        :key="`swiper-${category}-${products.length}`"
        :modules="modules"
        :slides-per-view="'auto'"
        :space-between="24"
        :navigation="true"
      >
        <SwiperSlide
          v-for="product in products"
          :key="product.id"
          class="product-slide pt-2"
        >
          <ProductCard
            class="w-full"
            :product="product"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <p
      v-else
      class="text-gray-500"
    >
      No products in this category.
    </p>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps<{ category: Category }>()

const category = ref(props.category.slug)
const sortOption = ref<SortOption>({ sortBy: 'title', order: 'asc' })
const perPage = ref(5)
const currentPage = ref(1)

const { products, isLoading } = useFetchProducts(category, sortOption, perPage, currentPage)

const modules = [Navigation]
</script>

<style scoped>
.product-slide {
  height: auto;
  display: flex;
  width: 16rem;
}

@media (min-width: 640px) {
  .product-slide {
    width: 18rem;
  }
}

@media (min-width: 1024px) {
  .product-slide {
    width: 16rem;
  }
}
</style>
