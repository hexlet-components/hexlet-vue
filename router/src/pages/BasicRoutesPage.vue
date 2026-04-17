<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Базовые маршруты и router-view</h2>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Конфигурация routes</h3>
        <p class="mb-3 text-sm text-slate-600">
          Каждый маршрут связывает URL с компонентом страницы.
        </p>
        <pre class="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">const routes = [
  { path: '/', component: HomePage },
  { path: '/basic', component: BasicRoutesPage },
  { path: '/users/:id', component: DynamicUserPage }
]</pre>
      </section>

      <section class="rounded-xl border border-slate-200 bg-white p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Рендер страницы</h3>
        <p class="mb-3 text-sm text-slate-600">
          В корневом компоненте нужен `router-view`, куда Vue Router подставляет текущую страницу.
        </p>
        <pre class="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">&lt;template&gt;
  &lt;header&gt;...общая шапка...&lt;/header&gt;
  &lt;router-view /&gt;
&lt;/template&gt;</pre>
      </section>
    </div>

    <div class="mt-6 rounded-xl border border-cyan-200 bg-cyan-50 p-5 text-cyan-900">
      Попробуйте переключаться верхним меню: URL меняется, но приложение не делает полную
      перезагрузку страницы.
    </div>
  </div>
</template>
