<script setup>
const cards = [
  {
    title: 'Базовые маршруты',
    description: 'Связываем URL и компоненты через routes + показываем их в router-view.',
    to: '/basic'
  },
  {
    title: 'Динамические параметры',
    description: 'Маршрут вида /users/:id и реакция компонента на смену параметра.',
    to: '/users/1'
  },
  {
    title: 'Query-параметры',
    description: 'Фильтры и пагинация в URL: /catalog?page=2&sort=price.',
    to: '/catalog'
  },
  {
    title: 'Программная навигация',
    description: 'router.push, router.replace, back/forward для переходов из JS-логики.',
    to: '/actions'
  }
]
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold text-slate-900">Vue Router в SPA</h2>
    <p class="mb-8 max-w-4xl text-slate-600">
      В этом проекте URL становится частью состояния приложения. При переходах страница не
      перезагружается: меняется только компонент внутри `router-view`.
    </p>

    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="card in cards"
        :key="card.title"
        class="rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:shadow-md"
      >
        <h3 class="mb-2 text-lg font-semibold text-slate-900">{{ card.title }}</h3>
        <p class="mb-4 text-sm text-slate-600">{{ card.description }}</p>
        <router-link
          :to="card.to"
          class="inline-flex rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-700"
        >
          Открыть демо
        </router-link>
      </article>
    </div>
  </div>
</template>
