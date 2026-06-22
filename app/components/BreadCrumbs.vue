<template>
  <nav class="text-sm text-gray-500">
    <ol class="flex flex-wrap items-center gap-2">
      <template
        v-for="(item, idx) in items"
        :key="item.label"
      >
        <li
          v-if="idx != items.length - 1"
          class="flex items-center gap-2"
        >
          <NuxtLink
            :to="item.path"
            class="hover:text-gray-900 hover:underline"
          >
            {{ item.label }}
          </NuxtLink>
          <span class="text-gray-300">/</span>
        </li>

        <li v-else>
          <span class="font-medium text-gray-900">
            {{ item.label }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const { items } = defineProps<{ items: { label: string; path: string }[] }>()
</script>
