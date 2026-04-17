<script setup>
const candidates = [
  'Профиль пользователя и авторизация',
  'Корзина, избранное, уведомления',
  'Кэш данных, загруженных с API',
  'Общие настройки интерфейса'
]

const localStateExamples = [
  'Открыт ли конкретный dropdown',
  'Текст в input до отправки',
  'Локальное состояние модального окна'
]
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Что такое Pinia и зачем она нужна</h2>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-blue-900">Когда Pinia действительно нужна</h3>
        <p class="mb-4 text-blue-800">
          Pinia используется для состояния, которое одновременно требуется в разных частях приложения,
          не связанных напрямую через `props`.
        </p>
        <ul class="space-y-2 text-sm text-blue-800">
          <li v-for="item in candidates" :key="item">• {{ item }}</li>
        </ul>
      </section>

      <section class="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Что оставить локально в компоненте</h3>
        <p class="mb-4 text-slate-600">
          Не всё состояние нужно выносить в store. Локальные UI-детали лучше хранить в `ref` рядом с
          компонентом.
        </p>
        <ul class="space-y-2 text-sm text-slate-600">
          <li v-for="item in localStateExamples" :key="item">• {{ item }}</li>
        </ul>
      </section>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-emerald-900">Установка и подключение</h3>
        <div class="space-y-3 text-sm">
          <pre class="overflow-x-auto rounded-lg bg-slate-900 p-3 text-slate-100">npm install pinia</pre>
          <pre class="overflow-x-auto rounded-lg bg-slate-900 p-3 text-slate-100">import { createPinia } from 'pinia'
const app = createApp(App)
app.use(createPinia())</pre>
        </div>
      </section>

      <section class="rounded-xl border border-violet-200 bg-violet-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-violet-900">Рекомендуемая структура</h3>
        <pre class="overflow-x-auto rounded-lg bg-slate-900 p-3 text-sm text-slate-100">src/
  stores/
    counter.js
    users.js
    auth.js
  components/
  App.vue</pre>
      </section>
    </div>
  </div>
</template>
