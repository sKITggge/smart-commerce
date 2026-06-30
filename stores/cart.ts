import { defineStore } from 'pinia'
import type { Product } from '#shared/types/types'

interface StoredItem {
  id: number
  quantity: number
}

interface CartItem {
  item: Product
  quantity: number
}

interface CartState {
  ids: StoredItem[]
  items: CartItem[]
  loading: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    ids: [],
    items: [],
    loading: false
  }),

  getters: {
    isInCart: (state) => (id: number) => state.ids.some((item) => item.id === id),
    count: (state) => state.ids.reduce((count, item) => count + item.quantity, 0),
    totalPrice: (state) => {
      const total = state.items.reduce((sum, item) => sum + item.quantity * item.item.price, 0)
      return total.toFixed(2)
    },
    taxAmount: (state) => {
      const total = state.items.reduce((sum, item) => sum + item.quantity * item.item.price, 0)
      return (total * 0.08).toFixed(2)
    },
    taxedTotalPrice: (state) => {
      const total = state.items.reduce((sum, item) => sum + item.quantity * item.item.price, 0)
      return (total * 1.08).toFixed(2)
    }
  },

  actions: {
    toggleItem(product: Product) {
      const existing = this.ids.findIndex((i) => i.id === product.id)

      if (existing !== -1) {
        this.ids.splice(existing, 1)
        this.items = this.items.filter((p) => p.item.id !== product.id)
      } else {
        this.ids.push({ id: product.id, quantity: 1 })
        this.items.push({ item: product, quantity: 1 })
      }

      this.saveToLocalStorage()
    },

    incrementItem(id: number) {
      const idx = this.ids.findIndex((i) => i.id === id)
      if (idx === -1) return
      const stored = this.ids[idx]
      if (stored) {
        stored.quantity += 1
        const itemIdx = this.items.findIndex((ci) => ci.item.id === id)
        if (itemIdx !== -1 && this.items[itemIdx]) {
          this.items[itemIdx].quantity += 1
        }
        this.saveToLocalStorage()
      }
    },

    decrementItem(id: number) {
      const idx = this.ids.findIndex((i) => i.id === id)
      if (idx === -1) return
      const stored = this.ids[idx]
      if (stored && stored.quantity > 1) {
        stored.quantity -= 1
        const itemIdx = this.items.findIndex((ci) => ci.item.id === id)
        if (itemIdx !== -1 && this.items[itemIdx]) {
          this.items[itemIdx].quantity -= 1
        }
        this.saveToLocalStorage()
      }
    },

    getProductCount(id: number) {
      return this.ids.find((item) => item.id === id)?.quantity ?? 0
    },

    removeItem(id: number) {
      this.ids = this.ids.filter((i) => i.id !== id)
      this.items = this.items.filter((item) => item.item.id !== id)
      this.saveToLocalStorage()
    },

    emptyCart() {
      this.ids = []
      this.items = []
      this.saveToLocalStorage()
    },

    async loadAllProducts() {
      if (this.ids.length === 0) {
        this.items = []
        return
      }

      this.loading = true

      try {
        const requests = this.ids.map ((item) =>
          $fetch<Product>(`https://dummyjson.com/products/${item.id}`)
        )
        const products = await Promise.all(requests)

        this.items = products.map((product) => {
          const quantity = this.ids.find((i) => product.id === i.id)?.quantity ?? 1
          return {
            item: product,
            quantity: quantity
          }
        })
      } catch (error: unknown) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    saveToLocalStorage() {
      if (import.meta.client) {
        localStorage.setItem('cart_ids', JSON.stringify(this.ids))
      }
    },

    loadFromLocalStorage() {
      if (import.meta.client) {
        const stored = localStorage.getItem('cart_ids')
        if (stored) {
          this.ids = JSON.parse(stored)
        }
      }
    }
  }
})
