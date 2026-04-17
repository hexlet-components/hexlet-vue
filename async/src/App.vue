<script setup>
import { ref, shallowRef } from 'vue'
import UsersList from './components/UsersList.vue'
import UserDetail from './components/UserDetail.vue'
import ParallelFetch from './components/ParallelFetch.vue'

const tabs = [
  { id: 1, name: 'Список пользователей', component: UsersList },
  { id: 2, name: 'Детали пользователя', component: UserDetail },
  { id: 3, name: 'Параллельная загрузка', component: ParallelFetch }
]

const activeTab = ref(1)
const activeComponent = shallowRef(UsersList)

const switchTab = (tabId) => {
  activeTab.value = tabId
  const tab = tabs.find(t => t.id === tabId)
  if (tab) {
    activeComponent.value = tab.component
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Заголовок -->
      <header class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Асинхронная обработка данных в Vue
        </h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Практическая демонстрация асинхронных операций, управления состояниями 
          и реактивности с использованием Vue 3 Composition API
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
              Что вы должны видеть:
            </h3>
            <ul class="space-y-2">
              <li class="flex items-start text-gray-600">
                <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                <div>
                  <strong>Список пользователей:</strong> 10 карточек с данными, поиск, кнопки управления
                </div>
              </li>
              <li class="flex items-start text-gray-600">
                <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                <div>
                  <strong>Детали пользователя:</strong> Слайдер для выбора ID, детальная информация, навигация
                </div>
              </li>
              <li class="flex items-start text-gray-600">
                <span class="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2"></span>
                <div>
                  <strong>Параллельная загрузка:</strong> Три колонки данных, сравнение методов загрузки, статистика
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Используемые технологии:
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Vue 3 Composition API
              </span>
              <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Tailwind CSS
              </span>
              <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Fetch API
              </span>
            </div>
            <div class="mt-4 p-3 bg-gray-100 rounded-lg">
              <p class="text-sm text-gray-600">
                <strong>Если не видите изменения:</strong> Остановите сервер (Ctrl+C) и запустите заново:<br>
                <code class="bg-gray-800 text-white px-2 py-1 rounded text-xs">npm run dev</code>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>