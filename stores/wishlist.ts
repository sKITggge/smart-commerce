import { defineStore } from 'pinia'
import type { Product } from '#shared/types/types'

interface WishlistState {
  ids: number[]
  items: Product[]
  loading: boolean
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistState => ({
    ids: [],
    items: [],
    loading: false
  }),

  getters: {
    isInWishlist: (state) => (id: number) => state.ids.includes(id),
    count: (state) => state.ids.length,
    products: (state): Product[] => state.items
  },

  actions: {
    toggleItem(product: Product) {
      if (this.ids.includes(product.id)) {
        this.ids = this.ids.filter((i) => i !== product.id)
        this.items = this.items.filter((p) => p.id !== product.id)
      } else {
        this.ids.push(product.id)
        this.items.push(product)
      }
      this.saveToLocalStorage()
    },

    async loadAllProducts() {
      if (this.ids.length === 0) {
        this.items = []
        return
      }

      this.loading = true

      try {
        const requests = this.ids.map((id) =>
          $fetch<Product>(`https://dummyjson.com/products/${id}`)
        )
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
          this.ids = JSON.parse(stored)
          this.loadAllProducts()
        }
      }
    }
  }
})
