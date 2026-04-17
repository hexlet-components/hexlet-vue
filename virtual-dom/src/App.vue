<script setup>
import { ref, shallowRef } from 'vue'
import VNodesDemo from './components/VNodesDemo.vue'
import DiffingDemo from './components/DiffingDemo.vue'
import OptimizationDemo from './components/OptimizationDemo.vue'
import PerformanceDemo from './components/PerformanceDemo.vue'

const tabs = [
  { id: 1, name: 'Виртуальные узлы', component: VNodesDemo },
  { id: 2, name: 'Сравнение деревьев', component: DiffingDemo },
  { id: 3, name: 'Оптимизация', component: OptimizationDemo },
  { id: 4, name: 'Производительность', component: PerformanceDemo }
]

const activeTab = ref(1)
const activeComponent = shallowRef(VNodesDemo)

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
      <!-- Заголовок -->
      <header class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Virtual DOM в Vue
        </h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Интерактивная демонстрация виртуального DOM, алгоритмов сравнения и оптимизации рендеринга
        </p>
      </header>

      <!-- Навигация -->
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

      <!-- Контент -->
      <main class="bg-white rounded-2xl shadow-xl p-6">
        <component :is="activeComponent" />
      </main>

      <!-- Футер -->
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Что должно работать:
            </h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <span class="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span class="text-gray-600">Вкладка 1: Создание и обновление VNodes</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                <span class="text-gray-600">Вкладка 2: Сравнение с ключами и без</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                <span class="text-gray-600">Вкладка 3: Оптимизация вычислений</span>
              </div>
              <div class="flex items-center">
                <span class="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                <span class="text-gray-600">Вкладка 4: Мониторинг производительности</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Если не работает:
            </h3>
            <div class="p-3 bg-red-50 rounded-lg">
              <p class="text-red-800 font-medium">Попробуйте:</p>
              <ol class="list-decimal list-inside text-red-600 text-sm mt-2 space-y-1">
                <li>Остановить сервер (Ctrl+C)</li>
                <li>Удалить node_modules и package-lock.json</li>
                <li>Запустить: <code class="bg-gray-800 text-white px-2 py-1 rounded">npm install</code></li>
                <li>Запустить: <code class="bg-gray-800 text-white px-2 py-1 rounded">npm run dev</code></li>
              </ol>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>