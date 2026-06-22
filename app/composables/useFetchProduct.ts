export const useFetchProduct = (id: string) => {
  const url = `https://dummyjson.com/products/${id}`

  const { data, pending, error } = useFetch<Product>(url)

  return {
    product: data,
    isLoading: pending,
    error
  }
}
