import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  const isAuthenticated = computed(() => Boolean(user.value && token.value))
  const roleLabel = computed(() => user.value?.role ?? 'guest')

  function login(credentials) {
    user.value = credentials.user
    token.value = credentials.token
  }

  function loginAsDemo(name = 'Иван', role = 'editor') {
    login({
      user: {
        id: Date.now(),
        name,
        role
      },
      token: `token-${Math.random().toString(16).slice(2)}`
    })
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return {
    user,
    token,
    isAuthenticated,
    roleLabel,
    login,
    loginAsDemo,
    logout
  }
})
