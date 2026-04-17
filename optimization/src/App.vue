<script setup>
import { ref, shallowRef } from 'vue'
import IntroPerformance from './components/IntroPerformance.vue'
import KeyListDemo from './components/KeyListDemo.vue'
import VOnceDemo from './components/VOnceDemo.vue'
import LazyLoadingDemo from './components/LazyLoadingDemo.vue'
import MemoSuspenseDemo from './components/MemoSuspenseDemo.vue'
import PracticalOptimizationDemo from './components/PracticalOptimizationDemo.vue'

const tabs = [
  { id: 1, name: 'Введение', component: IntroPerformance },
  { id: 2, name: ':key в списках', component: KeyListDemo },
  { id: 3, name: 'v-once', component: VOnceDemo },
  { id: 4, name: 'Lazy loading', component: LazyLoadingDemo },
  { id: 5, name: 'v-memo + Suspense', component: MemoSuspenseDemo },
  { id: 6, name: 'Практика', component: PracticalOptimizationDemo }
]

const activeTab = ref(1)
const activeComponent = shallowRef(IntroPerformance)

function switchTab(tabId) {
  activeTab.value = tabId
  const tab = tabs.find(item => item.id === tabId)
  if (tab) activeComponent.value = tab.component
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-lime-50 to-emerald-50">
    <div class="container mx-auto max-w-7xl px-4 py-8">
      <header class="mb-10 rounded-2xl bg-white p-6 shadow-lg">
        <h1 class="mb-3 text-4xl font-bold text-slate-900">Оптимизация производительности Vue</h1>
        <p class="text-lg text-slate-600">
          Интерактивный урок по оптимизации рендеринга: `:key`, `v-once`, lazy loading,
          `v-memo` и `Suspense`.
        </p>
      </header>

      <nav class="mb-8 rounded-2xl bg-white p-2 shadow-lg">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="rounded-xl px-4 py-3 text-sm font-medium transition-all md:text-base"
            :class="
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            "
            @click="switchTab(tab.id)"
          >
            {{ tab.name }}
          </button>
        </div>
      </nav>

      <main class="rounded-2xl bg-white p-6 shadow-xl">
        <component :is="activeComponent" />
      </main>

      <footer class="mt-12 border-t border-slate-200 pt-8">
        <div class="grid gap-8 md:grid-cols-2">
          <section>
            <h2 class="mb-3 text-xl font-semibold text-slate-900">Фокус оптимизации</h2>
            <ul class="space-y-2 text-slate-600">
              <li>Уменьшение количества лишних обновлений</li>
              <li>Стабильные ключи и предсказуемый diff</li>
              <li>Отложенная загрузка редко используемого кода</li>
            </ul>
          </section>
          <section>
            <h2 class="mb-3 text-xl font-semibold text-slate-900">Инструменты в проекте</h2>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800"><code>:key</code></span>
              <span class="rounded-full bg-cyan-100 px-3 py-1 text-cyan-800"><code>v-once</code></span>
              <span class="rounded-full bg-lime-100 px-3 py-1 text-lime-800"><code>v-memo</code></span>
              <span class="rounded-full bg-amber-100 px-3 py-1 text-amber-800"><code>Suspense</code></span>
              <span class="rounded-full bg-indigo-100 px-3 py-1 text-indigo-800"><code>defineAsyncComponent</code></span>
            </div>
          </section>
        </div>
      </footer>
    </div>
  </div>
</template>
