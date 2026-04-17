import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
    lastLoadedAt: null
  }),

  getters: {
    activeCount: state => state.users.filter(user => user.isActive).length
  },

  actions: {
    async fetchUsers(force = false) {
      if (this.loading) return
      if (this.users.length && !force) return

      this.loading = true
      this.error = null

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data = await response.json()
        this.users = data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          company: user.company?.name ?? 'Без компании',
          isActive: user.id % 2 === 0
        }))

        this.lastLoadedAt = new Date().toLocaleTimeString()
      } catch (_error) {
        this.error = 'Не удалось загрузить пользователей. Проверьте соединение и попробуйте снова.'
      } finally {
        this.loading = false
      }
    },

    clearUsers() {
      this.users = []
      this.lastLoadedAt = null
    }
  }
})
