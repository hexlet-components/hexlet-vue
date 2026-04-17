<script setup>
import { ref, onMounted, computed } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)
const search = ref('')

const loadUsers = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
    }
    
    users.value = await response.json()
  } catch (e) {
    error.value = e.message
    console.error('Ошибка загрузки:', e)
  } finally {
    loading.value = false
  }
}

const filteredUsers = computed(() => {
  if (!search.value.trim()) return users.value
  
  return users.value.filter(user => 
    user.name.toLowerCase().includes(search.value.toLowerCase()) ||
    user.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const simulateError = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent')
    
    if (!response.ok) {
      throw new Error(`Симуляция ошибки: ${response.status}`)
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div>
    <!-- Заголовок и управление -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Список пользователей</h2>
        <p class="text-gray-600 mt-1">Загрузка данных с внешнего API</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="loadUsers"
          :disabled="loading"
          class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          {{ loading ? 'Загрузка...' : 'Обновить' }}
        </button>
        <button
          @click="simulateError"
          class="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          Создать ошибку
        </button>
      </div>
    </div>

    <!-- Поиск -->
    <div class="mb-6">
      <div class="relative">
        <input
          v-model="search"
          type="text"
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder="Поиск по имени или email..."
          :disabled="loading"
        />
        <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600 font-medium">Загружаем данные пользователей...</p>
      <p class="text-sm text-gray-500 mt-1">Пожалуйста, подождите</p>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Ошибка загрузки!</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ error }}</p>
          </div>
          <div class="mt-4">
            <button
              @click="loadUsers"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Состояние успешной загрузки -->
    <div v-else>
      <!-- Сообщение если ничего не найдено -->
      <div v-if="search && filteredUsers.length === 0" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <span class="text-yellow-800">Пользователи не найдены по запросу "{{ search }}"</span>
        </div>
      </div>

      <!-- Сетка пользователей -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div class="p-6">
            <!-- Аватар и имя -->
            <div class="flex items-start space-x-4 mb-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {{ user.name.charAt(0) }}
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ user.name }}</h3>
                <p class="text-sm text-gray-500">@{{ user.username }}</p>
              </div>
            </div>

            <!-- Контактная информация -->
            <div class="space-y-3">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span class="text-gray-600">{{ user.email }}</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span class="text-gray-600">{{ user.phone }}</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
                <a :href="'https://' + user.website" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">
                  {{ user.website }}
                </a>
              </div>
            </div>

            <!-- Компания -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <p class="text-sm text-gray-500 mb-1">Компания</p>
              <p class="font-medium text-gray-900">{{ user.company.name }}</p>
              <p class="text-xs text-gray-500 italic mt-1">{{ user.company.catchPhrase }}</p>
            </div>
          </div>

          <!-- Футер карточки -->
          <div class="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">ID: {{ user.id }}</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Активен
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Статистика -->
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">
              Найдено пользователей: 
              <span class="font-semibold text-gray-900">{{ filteredUsers.length }}</span> 
              из 
              <span class="font-semibold text-gray-900">{{ users.length }}</span>
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <div class="h-2 w-2 rounded-full bg-green-500"></div>
            <span class="text-xs text-gray-500">Все системы работают</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>