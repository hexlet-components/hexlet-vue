<script setup>
import { ref, shallowRef } from 'vue'
import IntroPinia from './components/IntroPinia.vue'
import SharedStateDemo from './components/SharedStateDemo.vue'
import ActionsGettersDemo from './components/ActionsGettersDemo.vue'
import AsyncUsersDemo from './components/AsyncUsersDemo.vue'
import SetupStoreDemo from './components/SetupStoreDemo.vue'
import PracticalCaseDemo from './components/PracticalCaseDemo.vue'

const tabs = [
  { id: 1, name: 'Введение', component: IntroPinia },
  { id: 2, name: 'Общее состояние', component: SharedStateDemo },
  { id: 3, name: 'Actions и Getters', component: ActionsGettersDemo },
  { id: 4, name: 'Async Actions', component: AsyncUsersDemo },
  { id: 5, name: 'Setup Store', component: SetupStoreDemo },
  { id: 6, name: 'Практический кейс', component: PracticalCaseDemo }
]

const activeTab = ref(1)
const activeComponent = shallowRef(IntroPinia)

function switchTab(tabId) {
  activeTab.value = tabId
  const tab = tabs.find(item => item.id === tabId)
  if (tab) activeComponent.value = tab.component
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
    <div class="container mx-auto max-w-7xl px-4 py-8">
      <header class="mb-10 text-center">
        <h1 class="mb-3 text-4xl font-bold text-slate-900">Управление состоянием с Pinia</h1>
        <p class="mx-auto max-w-4xl text-lg text-slate-600">
          Интерактивный урок: общий store для несвязанных компонентов, actions, getters, асинхронные
          загрузки и setup-синтаксис.
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
                ? 'bg-blue-600 text-white shadow-md'
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
            <h2 class="mb-3 text-xl font-semibold text-slate-900">Когда использовать Pinia</h2>
            <ul class="space-y-2 text-slate-600">
              <li>Данные нужны сразу в нескольких независимых частях приложения</li>
              <li>Нужна единая логика изменения состояния через actions</li>
              <li>Нужны производные данные через getters и прозрачная отладка</li>
            </ul>
          </section>

          <section>
            <h2 class="mb-3 text-xl font-semibold text-slate-900">Что показано в проекте</h2>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="rounded-full bg-blue-100 px-3 py-1 text-blue-800"><code>defineStore</code></span>
              <span class="rounded-full bg-green-100 px-3 py-1 text-green-800"><code>state</code></span>
              <span class="rounded-full bg-yellow-100 px-3 py-1 text-yellow-800"><code>actions</code></span>
              <span class="rounded-full bg-purple-100 px-3 py-1 text-purple-800"><code>getters</code></span>
              <span class="rounded-full bg-pink-100 px-3 py-1 text-pink-800"><code>storeToRefs</code></span>
              <span class="rounded-full bg-cyan-100 px-3 py-1 text-cyan-800"><code>setup store</code></span>
            </div>
          </section>
        </div>
      </footer>
    </div>
  </div>
</template>
