<script setup>
import { ref, shallowRef } from 'vue'

import BasicSlots from './pages/BasicSlots.vue'
import NamedSlots from './pages/NamedSlots.vue'
import ScopedSlots from './pages/ScopedSlots.vue'
import PracticalExamples from './pages/PracticalExamples.vue'

const tabs = [
  { id: 1, name: 'Базовые слоты', component: BasicSlots },
  { id: 2, name: 'Именованные слоты', component: NamedSlots },
  { id: 3, name: 'Scoped слоты', component: ScopedSlots },
  { id: 4, name: 'Практика', component: PracticalExamples }
]

const activeTab = ref(1)
const activeComponent = shallowRef(BasicSlots)

function switchTab(tabId) {
  activeTab.value = tabId
  const tab = tabs.find(t => t.id === tabId)
  if (tab) activeComponent.value = tab.component
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <header class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-3">Слоты в Vue</h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Интерактивный урок: default slots → named slots → scoped slots → практический кейс
        </p>
      </header>

      <div class="bg-white rounded-xl shadow-lg p-1 mb-8">
        <div class="flex flex-wrap gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="switchTab(tab.id)"
            class="px-6 py-3 rounded-lg font-medium transition-all duration-200"
            :class="[
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <main class="bg-white rounded-2xl shadow-xl p-6">
        <component :is="activeComponent" />
      </main>

      <footer class="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="font-semibold text-gray-800 mb-2">Структура урока</div>
            <ul class="list-disc list-inside space-y-1">
              <li>Базовые: default slot + fallback</li>
              <li>Именованные: несколько зон вставки</li>
              <li>Scoped: данные из Дочернего компонента → отображение у родителя</li>
              <li>Практика: комбинирование подходов</li>
            </ul>
          </div>
          <div>
            <div class="font-semibold text-gray-800 mb-2">Ключевые конструкции</div>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"><code>&lt;slot&gt;</code></span>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full"><code>#header</code></span>
              <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full"><code>#default</code></span>
              <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full"><code>v-slot</code></span>
              <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full"><code>{ row, index }</code></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
