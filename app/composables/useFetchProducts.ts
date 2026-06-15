export const useFetchProducts = (category: string, limit: number = 100) => {
  const url = category
    ? `https://dummyjson.com/products/category/${category}`
    : 'https://dummyjson.com/products'

  const { data, pending, error } = useFetch<PaginatedProducts>(url, {
    query: {
      limit: limit
    },
    key: `products-${category || 'all'}-${limit}`
  })

  return {
    products: data,
    isLoading: pending,
    error
  }
}
