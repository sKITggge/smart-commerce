import { useWishlistStore } from '~~/stores/wishlist'
import { useCartStore } from '~~/stores/cart'

export default defineNuxtPlugin(async () => {
  const wishlistStore = useWishlistStore()
  const cartStore = useCartStore()

  wishlistStore.loadFromLocalStorage()
  cartStore.loadFromLocalStorage()
})
