<template>
  <div>
    <MainHero />

    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Popular Categories</h1>

      <div
        v-if="categories.length"
        class="space-y-8 lg:space-y-12"
      >
        <div
          v-for="cat in categories"
          :key="cat.slug"
        >
          <CategoryProducts :category="cat" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { categories: allCategories } = useFetchCategories()
const categories = computed(() => allCategories.value?.slice(0, 3) || [])
</script>
