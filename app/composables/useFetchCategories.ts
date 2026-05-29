export const useFetchCategories = () => {
  const { data, pending, error } = useFetch<Category[]>(
    'https://dummyjson.com/products/categories'
  )

  return {
    categories: data,
    isLoading: pending,
    error
  }
}
