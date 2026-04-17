<script setup>
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
const { users, loading, error, lastLoadedAt, activeCount } = storeToRefs(usersStore)
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Асинхронные actions</h2>

    <div class="mb-6 rounded-xl border border-cyan-200 bg-cyan-50 p-5 text-cyan-900">
      Весь процесс загрузки (`loading`, `error`, данные) хранится в store и может использоваться
      в любом компоненте.
    </div>

    <div class="mb-6 flex flex-wrap gap-2">
      <button
        class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="loading"
        @click="usersStore.fetchUsers(false)"
      >
        Загрузить (с кешем)
      </button>
      <button
        class="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="loading"
        @click="usersStore.fetchUsers(true)"
      >
        Обновить с API
      </button>
      <button
        class="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-200"
        @click="usersStore.clearUsers()"
      >
        Очистить
      </button>
    </div>

    <div v-if="loading" class="rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
      Загрузка пользователей...
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
      {{ error }}
    </div>

    <div v-else-if="users.length" class="space-y-4">
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          Загружено пользователей: <strong>{{ users.length }}</strong>
        </div>
        <div class="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
          Активных: <strong>{{ activeCount }}</strong>
        </div>
        <div class="rounded-lg bg-violet-50 p-3 text-sm text-violet-800">
          Последнее обновление: <strong>{{ lastLoadedAt }}</strong>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <article
          v-for="user in users"
          :key="user.id"
          class="rounded-xl border border-slate-200 bg-white p-4"
        >
          <div class="mb-2 flex items-center justify-between">
            <h3 class="font-semibold text-slate-900">{{ user.name }}</h3>
            <span
              class="rounded-full px-2 py-1 text-xs font-medium"
              :class="
                user.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              "
            >
              {{ user.isActive ? 'active' : 'inactive' }}
            </span>
          </div>
          <p class="text-sm text-slate-600">{{ user.email }}</p>
          <p class="mt-1 text-sm text-slate-500">{{ user.company }}</p>
        </article>
      </div>
    </div>

    <p v-else class="text-sm text-slate-500">Данные еще не загружены.</p>
  </div>
</template>
