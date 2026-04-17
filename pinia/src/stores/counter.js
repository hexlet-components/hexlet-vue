import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    step: 1,
    history: []
  }),

  getters: {
    doubleCount: state => state.count * 2,
    isPositive: state => state.count > 0,
    parity: state => (state.count % 2 === 0 ? 'четное' : 'нечетное')
  },

  actions: {
    increment() {
      this.count += this.step
      this.addHistory('increment')
    },

    decrement() {
      this.count -= this.step
      this.addHistory('decrement')
    },

    reset() {
      this.count = 0
      this.addHistory('reset')
    },

    setStep(value) {
      const parsed = Number(value)
      if (Number.isNaN(parsed)) return
      this.step = Math.min(10, Math.max(1, Math.trunc(parsed)))
    },

    addHistory(type) {
      const actionLabel = {
        increment: 'Увеличение',
        decrement: 'Уменьшение',
        reset: 'Сброс'
      }

      this.history.unshift({
        id: Date.now() + Math.random(),
        action: actionLabel[type] ?? type,
        value: this.count,
        time: new Date().toLocaleTimeString()
      })

      this.history = this.history.slice(0, 6)
    }
  }
})
