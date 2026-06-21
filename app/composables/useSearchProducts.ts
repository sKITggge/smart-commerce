import type { Ref } from 'vue'
import { refDebounced } from '@vueuse/core'

export const useSearchProducts = (query: Ref<string>, limit = 5) => {
  const debouncedQuery = refDebounced(query, 300)

  const { data, pending, error, refresh } = useFetch<PaginatedProducts>(
    'https://dummyjson.com/products/search',
    {
      watch: false,
      immediate: false,
      query: computed(() => ({
        q: debouncedQuery.value,
        limit
      })),
      default: () => ({ products: [], total: 0, skip: 0, limit: 0 })
    }
  )

  watch(
    debouncedQuery,
    async (q) => {
      const term = q.trim()

      if (term.length < 3) {
        data.value = { products: [], total: 0, skip: 0, limit: 0 }
        return
      }

      await refresh()
    },
    { immediate: false }
  )

  return {
    products: computed(() => data.value?.products ?? []),
    isLoading: pending,
    error
  }
}
