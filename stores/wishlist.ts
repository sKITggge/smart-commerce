import { defineStore } from 'pinia'
import type { Product } from '#shared/types/types'

interface WishlistState {
  items: Product[]
  loading: boolean
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistState => ({
    items: [],
    loading: false
  }),

  getters: {
    ids: (state) => state.items.map((p) => p.id),
    isInWishlist: (state) => (id: number) => state.items.some((p) => p.id === id),
    count: (state) => state.items.length,
    products: (state): Product[] => state.items
  },

  actions: {
    toggleItem(product: Product) {
      if (this.ids.includes(product.id)) {
        this.items = this.items.filter((p) => p.id !== product.id)
      } else {
        this.items.push(product)
      }
      this.saveToLocalStorage()
    },

    async loadAllProducts(ids: number[]) {
      if (ids.length === 0) {
        this.items = []
        return
      }

      this.loading = true

      try {
        const requests = ids.map((id) => $fetch<Product>(`https://dummyjson.com/products/${id}`))
        this.items = await Promise.all(requests)
      } catch (error: unknown) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    saveToLocalStorage() {
      if (import.meta.client) {
        localStorage.setItem('wishlist_ids', JSON.stringify(this.ids))
      }
    },

    loadFromLocalStorage() {
      if (import.meta.client) {
        const stored = localStorage.getItem('wishlist_ids')
        if (stored) {
          this.loadAllProducts(JSON.parse(stored))
        }
      }
    }
  }
})
