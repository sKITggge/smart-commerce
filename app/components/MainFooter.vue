<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <div class="mb-8 text-center md:text-left">
        <h2 class="text-2xl md:text-3xl font-bold">Smart Commerce</h2>
        <p class="text-gray-600 mt-2 max-w-md mx-auto md:mx-0">
          Your one-stop shop for everything you need. Quality products, great prices.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:flex justify-between gap-8 py-8 border-t border-b border-gray-200"
      >
        <div
          v-for="column in footerLinks"
          :key="column.title"
        >
          <div class="w-fit mx-auto">
            <h3 class="font-semibold mb-3">{{ column.title }}</h3>
            <ul class="space-y-2">
              <li
                v-for="link in column.links"
                :key="link.label"
              >
                <NuxtLink
                  :to="link.to"
                  class="text-gray-600 hover:text-blue-400 transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="text-center text-gray-500 text-sm pt-8">
        © 2026 Smart Commerce. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Smartphones', to: '/products?category=smartphones' },
      { label: 'Laptops', to: '/products?category=laptops' },
      { label: 'Fragrances', to: '/products?category=fragrances' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', to: '/' },
      { label: 'FAQs', to: '/' },
      { label: 'Shipping', to: '/' },
      { label: 'Returns', to: '/' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Privacy', to: '/' },
      { label: 'Terms', to: '/' }
    ]
  }
]
</script>
