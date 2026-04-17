<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { user, token, isAuthenticated, roleLabel } = storeToRefs(authStore)

const formName = ref('Иван')
const formRole = ref('editor')

const tokenPreview = computed(() => {
  if (!token.value) return 'нет токена'
  return `${token.value.slice(0, 16)}...`
})

function signIn() {
  authStore.loginAsDemo(formName.value || 'Иван', formRole.value)
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Setup Store (Composition API синтаксис)</h2>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Управление авторизацией</h3>

        <div class="space-y-4">
          <label class="block text-sm text-slate-600">
            Имя
            <input
              v-model="formName"
              type="text"
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            >
          </label>

          <label class="block text-sm text-slate-600">
            Роль
            <select
              v-model="formRole"
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="admin">admin</option>
              <option value="editor">editor</option>
              <option value="viewer">viewer</option>
            </select>
          </label>

          <div class="flex flex-wrap gap-2">
            <button
              class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              @click="signIn()"
            >
              loginAsDemo()
            </button>
            <button
              class="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-300"
              @click="authStore.logout()"
            >
              logout()
            </button>
          </div>
        </div>
      </section>

      <section class="rounded-xl border border-slate-200 bg-white p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Состояние setup store</h3>
        <div class="space-y-3 text-sm">
          <div class="rounded-lg bg-blue-50 p-3 text-blue-900">
            isAuthenticated: <strong>{{ isAuthenticated }}</strong>
          </div>
          <div class="rounded-lg bg-emerald-50 p-3 text-emerald-900">
            roleLabel: <strong>{{ roleLabel }}</strong>
          </div>
          <div class="rounded-lg bg-violet-50 p-3 text-violet-900">
            token: <strong>{{ tokenPreview }}</strong>
          </div>
          <div class="rounded-lg bg-slate-100 p-3 text-slate-700">
            user:
            <strong v-if="user">{{ user.name }} ({{ user.role }})</strong>
            <strong v-else>гость</strong>
          </div>
        </div>

        <pre class="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  function login() { ... }
  return { user, isAuthenticated, login }
})</pre>
      </section>
    </div>
  </div>
</template>
