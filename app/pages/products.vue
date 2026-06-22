<template>
  <div class="container mx-auto py-6 px-4">
    <div class="space-y-2 mb-4">
      <h1 class="text-3xl font-bold lg:text-5xl">All Products</h1>

      <span
        v-if="!!products.length"
        class="text-gray-500"
      >
        {{ total }} products found
      </span>
    </div>

    <div class="flex justify-between items-center gap-4 mb-4">
      <div class="flex gap-6">
        <span class="text-lg font-semibold">Filters</span>
        <button
          class="text-gray-500 text-sm cursor-pointer"
          @click="resetCategory"
        >
          Clear Filters
        </button>
      </div>

      <div class="w-full sm:w-64">
        <Dropdown
          v-model="sortOption"
          :options="sortOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
        />
      </div>
    </div>

    <div class="w-full mb-6 lg:hidden">
      <Dropdown
        v-model="searchCategory"
        :options="categories"
        optionLabel="name"
        optionValue="slug"
        placeholder="Select category"
        class="w-full"
        :loading="isCategoriesLoading"
      />
    </div>

    <div class="flex justify-between gap-4">
      <div class="hidden lg:block">
        <h2 class="text-xl font-semibold mb-2">Categories</h2>

        <div
          v-if="isCategoriesLoading"
          class="flex justify-center p-4"
        >
          <AppLoader />
        </div>

        <div
          v-else-if="error"
          class="text-red-600 p-4"
        >
          Ошибка загрузки категорий: {{ error.message }}
        </div>

        <nav
          v-else
          class="flex flex-col gap-2 min-w-3xs"
        >
          <button
            v-for="cat in categories"
            :key="cat.slug"
            class="px-4 py-2 rounded-md transition-colors hover:bg-gray-100 text-start cursor-pointer"
            @click="searchCategory = cat.slug"
          >
            {{ cat.name }}
          </button>
        </nav>
      </div>

      <div class="w-full">
        <div
          v-if="isProductsLoading"
          class="flex justify-center p-10"
        >
          <AppLoader />
        </div>

        <template v-else-if="products.length">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              class="w-full"
            />
          </div>

          <div
            v-if="canLoadMore"
            ref="loadMoreTrigger"
            class="flex justify-center py-6"
          >
            <AppLoader v-if="isLoadingMore" />
          </div>

          <div class="mt-6">
            <Paginator
              :rows="perPage"
              :first="(currentPage - 1) * perPage"
              :totalRecords="total"
              :rowsPerPageOptions="[10, 30, 50]"
              @page="handlePageChange"
            />
          </div>
        </template>

        <p
          v-else
          class="text-gray-500"
        >
          No products in this category.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import type { PageState } from 'primevue'
import type { SortOption } from '#shared/types/types'
import AppLoader from '~/components/AppLoader.vue'

const route = useRoute()

const { categories, isLoading: isCategoriesLoading, error } = useFetchCategories()

const searchCategory = ref((route.query.category as string) ?? '')

const resetCategory = () => {
  searchCategory.value = ''
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Price: Low to High', value: { sortBy: 'price', order: 'asc' } },
  { label: 'Price: High to Low', value: { sortBy: 'price', order: 'desc' } },
  { label: 'Name: A to Z', value: { sortBy: 'title', order: 'asc' } },
  { label: 'Name: Z to A', value: { sortBy: 'title', order: 'desc' } }
]

const sortOption = ref<SortOption>({ sortBy: 'price', order: 'asc' })

const currentPage = ref(1)
const perPage = ref(10)

const loadMoreTrigger = ref<HTMLElement | null>(null)

const {
  products,
  total,
  isLoading: isProductsLoading,
  isLoadingMore,
  canLoadMore,
  loadMore
} = useFetchProducts(searchCategory, sortOption, perPage, currentPage)

useInfiniteScroll(
  loadMoreTrigger,
  async () => {
    await loadMore()
  },
  {
    distance: 150,
    canLoadMore: () => canLoadMore.value
  }
)

const handlePageChange = (event: PageState) => {
  currentPage.value = event.page + 1
  perPage.value = event.rows
}

watch(
  () => route.query.category,
  (newCategory) => {
    searchCategory.value = (newCategory as string) ?? ''
  },
  { immediate: true }
)

watch(searchCategory, (newVal) => {
  if (newVal !== route.query.category) {
    currentPage.value = 1

    navigateTo({
      query: {
        category: newVal || undefined
      }
    })
  }
})
</script>
