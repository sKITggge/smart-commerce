<template>
  <article
    class="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5"
  >
    <div
      class="flex w-full max-w-[92px] items-center justify-center overflow-hidden rounded-2xl bg-gray-50 md:max-w-[110px]"
    >
      <img
        :src="product.thumbnail"
        :alt="product.description"
        class="h-[92px] w-[92px] object-contain transition-transform duration-300 group-hover:scale-105 md:h-[110px] md:w-[110px]"
      />
    </div>

    <div class="flex flex-1 flex-col">
      <span class="text-xs font-semibold uppercase tracking-widest text-gray-500">
        {{ product.brand }}
      </span>
      <NuxtLink
        :to="{ name: 'product-id', params: { id: product.id } }"
        class="mt-1 text-base font-semibold text-gray-900 md:text-lg"
      >
        {{ product.title }}
      </NuxtLink>

      <CounterButton
        :quantity="quantity"
        class="mt-3"
        @increment="$emit('handleIncrement', product.id)"
        @decrement="$emit('handleDecrement', product.id)"
      />
    </div>

    <div class="flex min-w-[120px] flex-col items-end justify-between self-stretch">
      <div class="text-right">
        <span class="block text-base font-semibold text-gray-900"> ${{ fullPrice }} </span>
        <span class="block text-sm text-gray-500"> ${{ product.price }} each </span>
      </div>

      <button
        type="button"
        class="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
        @click.prevent.stop="$emit('handleRemove', product.id)"
      >
        <img
          src="/icons/trash.svg"
          alt="clear cart"
          class="w-5 h-5"
        />
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '#shared/types/types'

defineEmits<{
  (e: 'handleIncrement' | 'handleDecrement' | 'handleRemove', id: number): void
}>()

const { product, quantity } = defineProps<{ product: Product; quantity: number }>()
const fullPrice = computed(() => (product.price * quantity).toFixed(2))
</script>
