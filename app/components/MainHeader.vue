<template>
  <div>
    <header class="relative w-full shadow-lg">
      <div class="container mx-auto px-4 py-3 flex md:gap-4 items-center justify-between">
        <button
          class="cursor-pointer"
          @click="toggleOpen"
        >
          <img
            src="/icons/burger.svg"
            alt="Logo"
            class="w-5 h-5"
          />
        </button>

        <NuxtLink
          to="/"
          class="flex gap-2 items-center"
        >
          <div class="p-2 rounded-sm bg-blue-500">
            <img
              src="/icons/logo.svg"
              alt="Logo"
              class="w-5 h-5"
            />
          </div>
          <span class="text-2xl font-bold">Shop</span>
        </NuxtLink>

        <HeaderSearch :isSearchOpen="isSearchOpen" />

        <HeaderNav :toggleSearchOpen="toggleSearchOpen" />
      </div>
    </header>

    <HeaderSidebar
      :isOpen="isOpen"
      @close="toggleOpen"
    />
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const isSearchOpen = ref(false)
const toggleSearchOpen = () => {
  isSearchOpen.value = !isSearchOpen.value
}
</script>
