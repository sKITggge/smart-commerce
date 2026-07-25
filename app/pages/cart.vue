<template>
  <main class="min-h-screen bg-gray-50 py-8 md:py-10">
    <div
      v-if="loading"
      class="mx-auto flex max-w-6xl justify-center px-4 py-10"
    >
      <AppLoader />
    </div>

    <div
      v-else-if="!count"
      class="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4"
    >
      <h1 class="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">Your cart is empty</h1>
      <p class="mb-6 text-gray-600">Looks like you have not added anything to your cart yet.</p>
      <NuxtLink
        to="/"
        class="w-fit rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Explore products
      </NuxtLink>
    </div>

    <div
      v-else
      class="mx-auto max-w-6xl px-4"
    >
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 md:text-4xl">Shopping Cart</h1>
        <p class="mt-1 text-gray-600">{{ count }} item{{ count > 1 ? 's' : '' }} in your cart</p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="flex flex-col gap-4 lg:col-span-2">
          <CartCard
            v-for="item in items"
            :key="item.item.id"
            :product="item.item"
            :quantity="item.quantity"
            @handle-increment="store.incrementItem"
            @handle-decrement="store.decrementItem"
            @handle-remove="store.removeItem"
          />
        </div>

        <aside class="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-gray-900">Order Summary</h2>

          <div class="mt-5 space-y-3 text-sm">
            <div class="flex items-center justify-between text-gray-600">
              <span>Subtotal</span>
              <span class="font-medium text-gray-900">{{ totalPrice }}</span>
            </div>
            <div class="flex items-center justify-between text-gray-600">
              <span>Shipping</span>
              <span class="font-medium text-gray-900">Free</span>
            </div>
            <div class="flex items-center justify-between text-gray-600">
              <span>Tax</span>
              <span class="font-medium text-gray-900">{{ taxAmount }}</span>
            </div>

            <div class="my-4 border-t border-gray-200 pt-4"></div>

            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-gray-900">Total</span>
              <span class="text-base font-semibold text-gray-900">{{ taxedTotalPrice }} </span>
            </div>
          </div>

          <button
            class="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
            @click="openModal"
          >
            Proceed to Checkout
          </button>

          <div class="mt-4 text-center">
            <NuxtLink
              to="/"
              class="text-sm font-medium text-gray-700 hover:underline"
            >
              Continue Shopping
            </NuxtLink>
          </div>

          <div class="mt-6 border-t border-gray-200 pt-5 text-center">
            <p class="text-xs text-gray-500">Secure checkout powered by</p>
            <div class="mt-3 flex flex-wrap justify-center gap-2">
              <span
                class="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700"
              >
                VISA
              </span>
              <span
                class="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700"
              >
                MC
              </span>
              <span
                class="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700"
              >
                AMEX
              </span>
              <span
                class="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700"
              >
                PP
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          @click="closeModal"
        />

        <div
          class="relative w-full max-w-md flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl md:p-7"
        >
          <h2 class="text-lg font-semibold text-gray-900">Success!</h2>
          <p class="mt-1 text-sm text-gray-600">Your action has been completed successfully.</p>

          <div class="flex gap-4">
            <NuxtLink
              to="/"
              class="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              @click="checkoutProducts"
            >
              Back to Home
            </NuxtLink>
            <button
              class="inline-flex w-full items-center justify-center rounded-xl border border-red-500 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-100 cursor-pointer sm:w-auto"
              @click="closeModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from '~~/stores/cart'

const store = useCartStore()
const { count, items, loading, totalPrice, taxAmount, taxedTotalPrice } = storeToRefs(store)

const isOpen = ref(false)

const openModal = () => (isOpen.value = true)
const closeModal = () => (isOpen.value = false)

const checkoutProducts = () => {
  isOpen.value = false
  store.emptyCart()
}

onMounted(() => {
  if (store.ids.length && !store.items.length) {
    store.loadAllProducts()
  }
})
</script>
