import { defineStore } from 'pinia'

const catalog = [
  { id: 1, title: 'Курс по Vue 3', category: 'Обучение', price: 3900 },
  { id: 2, title: 'Шаблон админки', category: 'UI Kit', price: 1900 },
  { id: 3, title: 'Pinia Dev Handbook', category: 'Электронная книга', price: 1200 },
  { id: 4, title: 'Компонентный аудит', category: 'Услуга', price: 7500 }
]

export const useCartStore = defineStore('cart', {
  state: () => ({
    catalog,
    items: []
  }),

  getters: {
    totalItems: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: state => state.items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    hasItems: state => state.items.length > 0,
    cartLines: state =>
      state.items.map(item => ({
        ...item,
        lineTotal: item.price * item.quantity
      }))
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      })
    },

    increaseQuantity(productId) {
      const existingItem = this.items.find(item => item.id === productId)
      if (existingItem) existingItem.quantity += 1
    },

    decreaseQuantity(productId) {
      const existingItem = this.items.find(item => item.id === productId)
      if (!existingItem) return

      if (existingItem.quantity === 1) {
        this.removeFromCart(productId)
        return
      }

      existingItem.quantity -= 1
    },

    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },

    clearCart() {
      this.items = []
    }
  }
})
