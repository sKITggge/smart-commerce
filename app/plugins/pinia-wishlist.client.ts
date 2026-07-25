import { useWishlistStore } from '~~/stores/wishlist'

export default defineNuxtPlugin(async () => {
  const wishlistStore = useWishlistStore()

  wishlistStore.loadFromLocalStorage()
})
