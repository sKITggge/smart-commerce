import type { Ref } from 'vue'
import type { SortOption } from '#shared/types/types'

export const useFetchProducts = (
  category: Ref<string>,
  sortOption: Ref<SortOption>,
  perPage: Ref<number>,
  currentPage: Ref<number>
) => {
  const products = ref<Product[]>([])
  const total = ref(0)

  const isLoading = ref(false)
  const isLoadingMore = ref(false)

  const chunkSize = 10

  const loadedCount = ref(0)

  const baseSkip = computed(() => {
    return (currentPage.value - 1) * perPage.value
  })

  const url = computed(() => {
    return category.value
      ? `https://dummyjson.com/products/category/${category.value}`
      : `https://dummyjson.com/products`
  })

  const fetchChunk = async (reset = false) => {
    const skip = reset ? baseSkip.value : baseSkip.value + loadedCount.value

    const loadingRef = reset ? isLoading : isLoadingMore

    loadingRef.value = true

    try {
      const response = await $fetch<PaginatedProducts>(url.value, {
        query: {
          sortBy: sortOption.value.sortBy,
          order: sortOption.value.order,
          limit: chunkSize,
          skip
        }
      })

      total.value = response.total

      if (reset) {
        products.value = response.products
        loadedCount.value = response.products.length
      } else {
        products.value.push(...response.products)
        loadedCount.value += response.products.length
      }
    } catch (error: unknown) {
      console.error(error)
    } finally {
      loadingRef.value = false
    }
  }

  const availableForCurrentPage = computed(() => {
    return Math.min(perPage.value, total.value - baseSkip.value)
  })

  const canLoadMore = computed(() => {
    return loadedCount.value < availableForCurrentPage.value
  })

  const loadMore = async () => {
    if (!canLoadMore.value) return

    await fetchChunk(false)
  }

  const reset = async () => {
    products.value = []
    loadedCount.value = 0

    await fetchChunk(true)
  }

  watch(
    [category, sortOption, currentPage, perPage],
    () => {
      reset()
    },
    {
      immediate: true
    }
  )

  return {
    products,
    total,
    isLoading,
    isLoadingMore,
    canLoadMore,
    loadMore,
    refresh: reset
  }
}
