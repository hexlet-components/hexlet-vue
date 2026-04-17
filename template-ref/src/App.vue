<script setup>
import { ref, shallowRef } from 'vue'
import BasicRefs from './components/BasicRefs.vue'
import FocusManagement from './components/FocusManagement.vue'
import ElementMeasurement from './components/ElementMeasurement.vue'
import ScrollControl from './components/ScrollControl.vue'
import ComponentRefs from './components/ComponentRefs.vue'
import IntegrationDemo from './components/IntegrationDemo.vue'

const tabs = [
  { id: 1, name: 'Базовые refs', component: BasicRefs },
  { id: 2, name: 'Управление фокусом', component: FocusManagement },
  { id: 3, name: 'Измерение элементов', component: ElementMeasurement },
  { id: 4, name: 'Управление прокруткой', component: ScrollControl },
  { id: 5, name: 'Refs на компоненты', component: ComponentRefs },
  { id: 6, name: 'Интеграция', component: IntegrationDemo }
]

const activeTab = ref(1)
const activeComponent = shallowRef(BasicRefs)

const switchTab = (tabId) => {
  activeTab.value = tabId
  const tab = tabs.find(t => t.id === tabId)
  if (tab) {
    activeComponent.value = tab.component
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <header class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Работа с DOM через ref в Vue
        </h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Практическая демонстрация template refs для доступа к DOM элементам,
          управления фокусом, измерения размеров и интеграции с нативными API
        </p>
      </header>

      <nav class="bg-white rounded-xl shadow-lg p-1 mb-8">
        <div class="flex flex-wrap gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="switchTab(tab.id)"
            class="px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm"
            :class="[
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </nav>

      <main class="bg-white rounded-2xl shadow-xl p-6">
        <component :is="activeComponent" />
      </main>

      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Ключевые концепции
            </h3>
            <div class="space-y-2">
              <div class="flex items-center text-gray-600">
                <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                Template refs для доступа к реальным DOM элементам
              </div>
              <div class="flex items-center text-gray-600">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                Разница между реактивными ref и DOM ссылками
              </div>
              <div class="flex items-center text-gray-600">
                <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                nextTick для работы с асинхронным обновлением DOM
              </div>
              <div class="flex items-center text-gray-600">
                <div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                Интеграция с внешними библиотеками и нативными API
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Что демонстрируется
            </h3>
            <p class="text-gray-600 mb-4">
              Каждая вкладка показывает конкретный сценарий использования template refs.
              Все примеры интерактивны — вы можете взаимодействовать с элементами
              и видеть результаты в реальном времени.
            </p>
            <div class="text-sm text-gray-500">
              Откройте консоль браузера для наблюдения за событиями и состоянием refs
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>