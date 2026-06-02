<template>
  <section class="bg-gray-200">
    <div
      class="container mx-auto p-4 pt-12 lg:p-10 lg:pt-24 flex flex-col md:flex-row justify-between gap-6"
    >
      <div class="flex flex-1 flex-col gap-4 lg:gap-6">
        <span class="w-fit py-1 px-2 rounded-full bg-blue-200/80 text-blue-600 text-sm">
          New Collection 2026
        </span>
        <h1 class="text-4xl font-bold lg:text-6xl">Discover Premium Products</h1>
        <p class="text-base lg:text-lg font-semibold text-gray-500">
          Shop the latest trends with confidence. Quality products, competitive prices, and
          exceptional service.
        </p>
        <div class="text-white mt-4 lg:mt-0">
          <NuxtLink
            to="/products"
            class="px-4 py-3 w-fit rounded-2xl bg-blue-600 font-medium transition-colors duration-200 ease-in-out hover:bg-blue-500"
          >
            Shop Now
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-1 justify-center">
        <img
          class="rounded-2xl object-cover"
          src="/hero_bg.jpg"
          alt="banner background"
        />
      </div>
    </div>
  </section>
</template>
