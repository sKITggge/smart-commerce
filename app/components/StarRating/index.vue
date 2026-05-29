<template>
  <div class="flex items-center gap-0.5">
    <template
      v-for="i in fullStars"
      :key="`full-${i}`"
    >
      <StarIcon
        :size="size"
        class="text-yellow-400"
      />
    </template>

    <StarHalfIcon
      v-if="hasHalfStar"
      :size="size"
      class="text-yellow-400"
    />

    <template
      v-for="i in emptyStars"
      :key="`empty-${i}`"
    >
      <StarIcon
        :size="size"
        class="text-gray-200"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import StarIcon from './StarIcon.vue'
import StarHalfIcon from './StarHalfIcon.vue'

interface Props {
  rating: number
  max?: number
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  max: 5,
  size: 16
})

const fullStars = Math.floor(props.rating)
const hasHalfStar = props.rating % 1 !== 0
const emptyStars = props.max - fullStars - (hasHalfStar ? 1 : 0)
</script>
