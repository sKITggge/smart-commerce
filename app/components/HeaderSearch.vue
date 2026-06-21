<template>
  <div
    class="absolute -bottom-12 mx-4 sm:mx-auto sm:max-w-sm md:w-full right-0 left-0 md:relative md:bottom-0"
  >
    <div
      class="gap-4 items-center search-panel"
      :class="[isSearchOpen ? 'flex' : 'hidden', 'md:!flex']"
    >
      <img
        src="/icons/magnifyingGlass.svg"
        alt="Logo"
        class="w-5 h-5"
      />
      <input
        v-model.trim="searchTerm"
        class="w-full focus:outline-none"
        type="text"
        placeholder="Search products..."
      />
      <button
        class="w-6 h-6 cursor-pointer"
        @click="clearSearch"
      >
        <img
          src="/icons/cross.svg"
          alt="clear"
          class="w-5 h-5"
        />
      </button>
    </div>

    <div
      v-if="searchTerm.length >= 3"
      class="absolute w-full p-2 mt-2 md:mt-4 flex flex-col gap-4 rounded-md shadow-sm bg-white border border-gray-300"
    >
      <div
        v-if="isLoading"
        class="flex items-center justify-center w-full"
      >
        <span
          class="inline-block w-5 h-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"
        />
      </div>

      <div v-else-if="products && products.length > 0">
        <NuxtLink
          v-for="product in products"
          :key="product.id"
          :to="{ name: 'product-id', params: { id: product.id } }"
          class="flex gap-2 items-baseline-last justify-between p-2 rounded-2xl hover:bg-gray-100 transition-colors duration-200"
        >
          <div class="flex gap-4 items-start">
            <img
              class="w-12 h-12 rounded-md"
              :src="product.thumbnail"
              :alt="product.title"
            />
            <div>
              <h4 class="font-semibold">{{ product.title }}</h4>
              <span class="">{{ product.category }}</span>
            </div>
          </div>
          <span class="font-semibold text-blue-600">${{ product.price }}</span>
        </NuxtLink>
      </div>

      <div v-else>No products found.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchProducts } from '~/composables/useSearchProducts'

defineProps<{
  isSearchOpen: boolean
}>()

const searchTerm = ref<string>('')

const clearSearch = () => {
  searchTerm.value = ''
}

const { products, isLoading } = useSearchProducts(searchTerm)
</script>
