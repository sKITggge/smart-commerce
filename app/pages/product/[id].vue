<template>
  <main>
    <div
      v-if="isLoading"
      class="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-10"
    >
      <span
        class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
      />
    </div>

    <div
      v-else-if="!error && !!product"
      class="mx-auto max-w-6xl px-4 py-8 md:py-12"
    >
      <BreadCrumbs
        :items="breadcrumbsItems"
        class="mb-6"
      />

      <div class="grid gap-8 md:grid-cols-2 md:gap-12">
        <div class="relative rounded-2xl bg-gray-50 p-6 shadow-sm md:p-8">
          <span
            v-if="(product.discountPercentage ?? 0) > 0"
            class="absolute left-2 top-2 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow"
          >
            -{{ product.discountPercentage ?? 0 }}%
          </span>

          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="h-[360px] w-full rounded-xl object-contain md:h-[460px]"
          />
        </div>

        <div class="flex flex-col">
          <span class="text-xs font-semibold uppercase tracking-widest text-gray-500">
            {{ product.category }}
          </span>

          <h1 class="mt-2 text-2xl font-semibold text-gray-900 md:text-4xl">
            {{ product.title }}
          </h1>

          <div class="mt-4 flex items-center gap-3">
            <RatingStars :rating="product.rating ?? 0" />
          </div>

          <div class="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
            <span class="text-3xl font-bold text-gray-900"> ${{ discountedPrice }} </span>
            <span class="text-lg font-semibold text-gray-400 line-through">
              ${{ product.price }}
            </span>
          </div>

          <div class="flex items-center gap-2 mt-4 leading-4">
            <div class="w-1.5 h-1.5 rounded-full bg-green-600"></div>
            <div>In Stock</div>
          </div>

          <div class="mt-5 text-sm leading-7 text-gray-600 md:text-base">
            {{ product.description }}
          </div>

          <div class="mt-7 flex flex-wrap gap-3">
            <button
              class="flex gap-2 items-center px-4 py-3 w-fit rounded-2xl bg-blue-600 font-medium transition-colors duration-200 ease-in-out hover:bg-blue-500 text-white cursor-pointer"
            >
              <img
                src="/icons/cart.svg"
                alt="cart icon"
                class="h-5 w-5 text-white"
              />
              <span>Add To Cart</span>
            </button>
            <button
              class="flex items-center justify-center rounded-xl border border-gray-300 bg-white p-3 transition hover:bg-gray-50 focus:outline-none cursor-pointer"
            >
              <img
                src="/icons/heart.svg"
                alt="cart icon"
                class="h-5 w-5 text-white"
              />
            </button>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-6">
            <div class="grid gap-4 sm:grid-cols-3">
              <div class="flex items-start gap-3">
                <div class="mt-0.5 text-gray-700">
                  <img
                    class="h-5 w-5"
                    src="/icons/shipping.svg"
                    alt="shipping icon"
                  />
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900">Free Shipping</div>
                  <div class="text-xs text-gray-500">On orders over $100</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="mt-0.5 text-gray-700">
                  <img
                    class="h-5 w-5"
                    src="/icons/security.svg"
                    alt="security icon"
                  />
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900">Secure Payment</div>
                  <div class="text-xs text-gray-500">100% protected</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="mt-0.5 text-gray-700">
                  <img
                    class="h-5 w-5"
                    src="/icons/return.svg"
                    alt="return icon"
                  />
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900">Easy Returns</div>
                  <div class="text-xs text-gray-500">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="mx-auto max-w-6xl px-4 py-12"
    >
      <h1 class="text-xl font-semibold text-gray-900">Product is not found</h1>
    </div>
  </main>
</template>

<script setup lang="ts">
import RatingStars from '~/components/RatingStars.vue'
import { useFetchProduct } from '~/composables/useFetchProduct'

const route = useRoute()
const userId = route.params.id as string
const { product, isLoading, error } = useFetchProduct(userId)

const discountedPrice = computed(() => {
  if (!product.value) return 0

  const price = product.value.price
  const discount = product.value.discountPercentage ?? 0

  const discounted = price * (1 - discount / 100)

  return Math.round(discounted * 100) / 100
})

const breadcrumbsItems = computed(() => [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Products',
    path: '/products'
  },
  {
    label: product.value?.category ?? '',
    path: `/products/${product.value?.category}`
  },
  {
    label: product.value?.title ?? '',
    path: `/product/${product.value?.id}`
  }
])
</script>
