import { defineStore } from 'pinia'
import type { Product } from '#shared/types/types'

interface CartItem {
  item: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  loading: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    loading: false
  }),

  getters: {
    ids: (state) => state.items.map((p) => p.item.id),
    isInCart: (state) => (id: number) => state.items.some((p) => p.item.id === id),
    count: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
    totalPrice: (state) =>
      (state.items.reduce((count, item) => count + item.quantity * item.item.price, 0)).toFixed(2),
    taxAmount: (state) =>
      (
        state.items.reduce((count, item) => count + item.quantity * item.item.price, 0) * 0.08
      ).toFixed(2),
    taxedTotalPrice: (state) => {
      const total = state.items.reduce((sum, item) => sum + item.quantity * item.item.price, 0)
      return (total * 1.08).toFixed(2)
    }
  },

  actions: {
    toggleItem(product: Product) {
      if (this.isInCart(product.id)) {
        this.items = this.items.filter((p) => p.item.id !== product.id)
      } else {
        this.items.push({ item: product, quantity: 1 })
      }
      this.saveToLocalStorage()
    },

    incrementItem(id: number) {
      if (!this.isInCart(id)) return

      this.items.map((item) => {
        if (item.item.id === id) {
          item.quantity += 1
        }
      })

      this.saveToLocalStorage()
    },

    decrementItem(id: number) {
      if (!this.isInCart(id)) return

      this.items.map((item) => {
        if (item.item.id === id && item.quantity > 1) {
          item.quantity -= 1
        }
      })

      this.saveToLocalStorage()
    },

    removeItem(id: number) {
      if (!this.isInCart(id)) return

      this.items = this.items.filter((item) => item.item.id !== id)
      this.saveToLocalStorage()
    },

    emptyCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    async loadAllProducts(stored: { id: number; quantity: number }[]) {
      if (stored.length === 0) {
        this.items = []
        return
      }

      this.loading = true

      try {
        const requests = stored.map((item) =>
          $fetch<Product>(`https://dummyjson.com/products/${item.id}`)
        )
        const products = await Promise.all(requests)

        this.items = products.map((product) => {
          const quantity = stored.find((i) => product.id === i.id)?.quantity ?? 1
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
        const cartItemsCompact = this.items.map((p) => ({ id: p.item.id, quantity: p.quantity }))
        localStorage.setItem('cart_ids', JSON.stringify(cartItemsCompact))
      }
    },

    loadFromLocalStorage() {
      if (import.meta.client) {
        const stored = localStorage.getItem('cart_ids')
        if (stored) {
          this.loadAllProducts(JSON.parse(stored))
        }
      }
    }
  }
})
