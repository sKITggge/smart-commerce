<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="emit('close')"
    />

    <Transition name="slide">
      <div
        v-show="isOpen"
        class="fixed top-0 left-0 h-full max-w-xl w-full bg-white shadow-2xl p-4 z-50 overflow-y-auto"
      >
        <div class="flex justify-between items-center gap-4 pb-3 border-b border-gray-300 mb-6">
          <div class="flex gap-2 items-center">
            <div class="p-2 rounded-sm bg-blue-500">
              <img
                src="/icons/logo.svg"
                alt="Logo"
                class="w-5 h-5"
              />
            </div>
            <span class="text-2xl font-bold">Shop Categories</span>
          </div>

          <button
            class="p-2 rounded-full transition-colors hover:bg-gray-100 cursor-pointer"
            @click="emit('close')"
          >
            <img
              src="/icons/cross.svg"
              alt="close"
              class="w-5 h-5"
            />
          </button>
        </div>

        <nav class="flex flex-col gap-2">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.label"
            :to="{ path: '/products', query: { category: cat.category } }"
            class="px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
            @click="emit('close')"
          >
            {{ cat.label }}
          </NuxtLink>

          <div class="border-t border-gray-300 px-4 py-2">QUICK LINKS</div>

          <NuxtLink
            to="/wishlist"
            class="flex gap-2 items-center px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
            @click="emit('close')"
          >
            <img
              src="/icons/heart.svg"
              alt="Wishlist"
              class="w-5 h-5"
            />
            <span>Wishlist</span>
          </NuxtLink>

          <NuxtLink
            to="/cart"
            class="flex gap-2 items-center px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
            @click="emit('close')"
          >
            <img
              src="/icons/cart.svg"
              alt="Cart"
              class="w-5 h-5"
            />
            <span>Cart</span>
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

watch(
  () => props.isOpen,
  (newVal) => {
    if (typeof document !== 'undefined') {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const categories = [
  { label: 'Beauty', category: 'beauty' },
  { label: 'Furniture', category: 'furniture' },
  { label: 'Science', category: 'science' },
  { label: 'Groceries', category: 'groceries' },
  { label: 'Business', category: 'business' },
  { label: 'Laptops', category: 'laptops' },
  { label: 'Mens Shirts', category: 'mens-shirts' },
  { label: 'Toys', category: 'toys' },
  { label: 'Sports', category: 'sports' },
  { label: 'Books', category: 'books' },
  { label: 'Electronics', category: 'electronics' },
  { label: 'Garden', category: 'garden' },
  { label: 'Pet Supplies', category: 'pet-supplies' },
  { label: 'Automotive', category: 'automotive' },
  { label: 'Clothing', category: 'clothing' }
]
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
