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
        <div>
          <div class="relative rounded-2xl bg-gray-50 p-6 shadow-sm md:p-8">
            <span
              v-if="(product.discountPercentage ?? 0) > 0"
              class="absolute left-2 top-2 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow"
            >
              -{{ product.discountPercentage ?? 0 }}%
            </span>

            <img
              :src="productImages[currentImageIdx]"
              :alt="product.title"
              class="h-[360px] w-full rounded-xl object-contain md:h-[460px]"
            />
          </div>
          <div class="mt-4 flex gap-4 overflow-x-auto scrollbar-hidden">
            <button
              v-for="(img, idx) in productImages"
              :key="img + '-' + idx"
              :class="{ '!border-blue-600': idx === currentImageIdx }"
              class="shrink-0 border border-gray-600 rounded-xl cursor-pointer"
              @click="switchImage(idx)"
            >
              <img
                :src="img"
                :alt="product.title"
                class="h-20 w-20 object-contain"
              />
            </button>
          </div>
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
            <div>{{ product.availabilityStatus }}</div>
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

      <div
        v-if="specifications.length"
        class="mt-8 border-t border-gray-200 pt-6"
      >
        <h2 class="text-lg font-semibold text-gray-900">Specifications</h2>
        <dl class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="spec in specifications"
            :key="spec.label"
            class="flex justify-between border-b border-gray-100 py-2"
          >
            <dt class="text-sm font-medium text-gray-500">{{ spec.label }}</dt>
            <dd class="text-sm font-medium text-gray-900">{{ spec.value }}</dd>
          </div>
        </dl>
      </div>

      <div
        v-if="product.reviews && product.reviews.length"
        class="mt-8 border-t border-gray-200 pt-6"
      >
        <h2 class="text-lg font-semibold text-gray-900">Customer Reviews</h2>
        <div class="mt-4 space-y-4">
          <div
            v-for="review in product.reviews"
            :key="review.reviewerName"
            class="border-b border-gray-100 pb-4 last:border-0"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-semibold text-gray-900">{{ review.reviewerName }}</span>
              <RatingStars :rating="review.rating" />
            </div>
            <p class="mt-1 text-sm text-gray-600">{{ review.comment }}</p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex justify-between">
          <h2 class="text-lg font-semibold text-gray-900">You May Also Like</h2>
          <NuxtLink
            class="text-gray-600 hover:text-blue-400 transition-colors"
            :to="{ path: '/products', query: { category: product.category } }"
          >
            See More
          </NuxtLink>
        </div>

        <CategoryProducts
          :category="product.category"
          :showTitle="false"
        />
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
const productId = route.params.id as string
const { product, isLoading, error } = useFetchProduct(productId)

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

const specifications = computed(() => {
  const p = product.value
  if (!p) return []

  const specs = [
    { label: 'Brand', value: p?.brand },
    { label: 'Weight', value: p.weight ? `${p.weight} g` : undefined },
    { label: 'Stock', value: p.stock ? `${p.stock} units` : undefined },
    { label: 'Warranty', value: p.warrantyInformation }
  ]

  return specs.filter((spec) => spec.value)
})

const productImages = computed(() => Array(5).fill(product.value?.thumbnail))

const currentImageIdx = ref<number>(0)

const switchImage = (idx: number) => {
  currentImageIdx.value = idx
}
</script>
