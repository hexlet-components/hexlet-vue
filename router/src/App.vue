<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/', label: 'Введение' },
  { to: '/basic', label: 'Базовые маршруты' },
  { to: '/users/1', label: 'Динамические :id' },
  { to: '/catalog', label: 'Query-параметры' },
  { to: '/actions', label: 'Программная навигация' }
]

function isActive(to) {
  if (to.startsWith('/users')) return route.path.startsWith('/users')
  if (to === '/catalog') return route.path.startsWith('/catalog')
  if (to === '/actions') return route.path.startsWith('/actions') || route.path.startsWith('/success')
  return route.path === to
}

const routeInfo = computed(() => ({
  path: route.path,
  name: route.name ?? 'n/a',
  params: JSON.stringify(route.params),
  query: JSON.stringify(route.query)
}))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50">
    <div class="container mx-auto max-w-7xl px-4 py-8">
      <header class="mb-8 rounded-2xl bg-white p-6 shadow-lg">
        <h1 class="mb-3 text-4xl font-bold text-slate-900">Навигация с Vue Router</h1>
        <p class="text-lg text-slate-600">
          Интерактивный урок: маршруты, `router-view`, динамические параметры, query-строки и
          программная навигация.
        </p>
      </header>

      <nav class="mb-8 rounded-2xl bg-white p-2 shadow-lg">
        <div class="flex flex-wrap gap-2">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-xl px-4 py-3 text-sm font-medium transition-all md:text-base"
            :class="
              isActive(link.to)
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            "
          >
            {{ link.label }}
          </router-link>
        </div>
      </nav>

      <main class="rounded-2xl bg-white p-6 shadow-xl">
        <router-view />
      </main>

      <footer class="mt-10 grid gap-6 lg:grid-cols-2">
        <section class="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <h2 class="mb-2 text-base font-semibold text-slate-900">Текущее состояние маршрута</h2>
          <div class="space-y-1">
            <p><strong>path:</strong> {{ routeInfo.path }}</p>
            <p><strong>name:</strong> {{ routeInfo.name }}</p>
            <p><strong>params:</strong> {{ routeInfo.params }}</p>
            <p><strong>query:</strong> {{ routeInfo.query }}</p>
          </div>
        </section>

        <section class="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <h2 class="mb-2 text-base font-semibold text-slate-900">Что показывает проект</h2>
          <ul class="space-y-1">
            <li>Связь URL с компонентами через `routes`</li>
            <li>Рендер текущей страницы через `&lt;router-view /&gt;`</li>
            <li>Переходы через `router-link`, `router.push`, `router.replace`</li>
            <li>Работа с `route.params` и `route.query`</li>
          </ul>
        </section>
      </footer>
    </div>
  </div>
</template>
