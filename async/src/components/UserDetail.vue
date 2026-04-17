<script setup>
import { ref, computed, onMounted } from 'vue'

const userId = ref(1)
const user = ref(null)
const loading = ref(false)
const error = ref(null)
const customId = ref('')

const loadUser = async (id) => {
  loading.value = true
  error.value = null

  try {
    // Искусственная задержка для демонстрации
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: Пользователь не найден`)
    }
    
    user.value = await response.json()
  } catch (e) {
    error.value = e.message
    user.value = null
  } finally {
    loading.value = false
  }
}

const loadCustomUser = () => {
  if (customId.value && customId.value >= 1) {
    userId.value = parseInt(customId.value)
    loadUser(userId.value)
  }
}

const nextUser = () => {
  if (userId.value < 10) {
    userId.value++
    loadUser(userId.value)
  }
}

const prevUser = () => {
  if (userId.value > 1) {
    userId.value--
    loadUser(userId.value)
  }
}

// Начальная загрузка
onMounted(() => {
  loadUser(userId.value)
})

const addressText = computed(() => {
  if (!user.value?.address) return ''
  const addr = user.value.address
  return `${addr.street}, ${addr.suite}, ${addr.city}, ${addr.zipcode}`
})
</script>

<template>
  <div>
    <!-- Заголовок и навигация -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Детали пользователя</h2>
        <p class="text-gray-600 mt-1">Загрузка данных по ID с детальной информацией</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="prevUser"
          :disabled="loading || userId <= 1"
          class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Предыдущий
        </button>
        <button
          @click="nextUser"
          :disabled="loading || userId >= 10"
          class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Следующий
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Левая панель: управление -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Карточка управления -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Управление</h3>
          
          <!-- Слайдер для выбора ID -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ID пользователя (1-10):
            </label>
            <input
              type="range"
              v-model.number="userId"
              min="1"
              max="10"
              :disabled="loading"
              @change="loadUser(userId)"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-500">1</span>
              <span class="text-lg font-bold text-blue-600">{{ userId }}</span>
              <span class="text-sm text-gray-500">10</span>
            </div>
          </div>
          
          <!-- Поле для произвольного ID -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Произвольный ID (для ошибки):
            </label>
            <div class="flex gap-2">
              <input
                v-model="customId"
                type="number"
                min="1"
                max="999"
                placeholder="Введите ID (например: 999)"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                @keyup.enter="loadCustomUser"
              />
              <button
                @click="loadCustomUser"
                :disabled="loading || !customId"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Загрузить
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Введите 999 для симуляции ошибки 404
            </p>
          </div>
          
          <!-- Кнопки управления -->
          <div class="space-y-3">
            <button
              @click="loadUser(userId)"
              :disabled="loading"
              class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {{ loading ? 'Загрузка...' : 'Загрузить пользователя' }}
            </button>
            
            <button
              @click="userId = Math.floor(Math.random() * 10) + 1; loadUser(userId)"
              :disabled="loading"
              class="w-full px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Случайный пользователь (1-10)
            </button>
          </div>
        </div>

        <!-- Карточка статуса -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Статус запроса</h3>
          
          <div v-if="loading" class="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex-shrink-0">
              <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-600"></div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-yellow-800">Загружаем данные пользователя...</p>
              <p class="text-xs text-yellow-700 mt-1">ID: {{ userId }}</p>
            </div>
          </div>
          
          <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Ошибка!</h3>
                <p class="text-sm text-red-700 mt-1">{{ error }}</p>
                <p class="text-xs text-red-600 mt-2">ID: {{ userId }}</p>
              </div>
            </div>
          </div>
          
          <div v-else-if="user" class="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">Успешно!</h3>
                <p class="text-sm text-green-700 mt-1">Данные пользователя загружены</p>
                <p class="text-xs text-green-600 mt-2">ID: {{ userId }} - {{ user.name }}</p>
              </div>
            </div>
          </div>
          
          <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-800">Ожидание...</p>
                <p class="text-sm text-gray-600 mt-1">Нажмите кнопку для загрузки</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая панель: информация о пользователе -->
      <div class="lg:col-span-2">
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Информация о пользователе</h3>
            
            <!-- Состояние загрузки -->
            <div v-if="loading" class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
              <p class="mt-6 text-lg font-medium text-gray-900">Загружаем информацию о пользователе</p>
              <p class="text-gray-600 mt-2">Пожалуйста, подождите...</p>
              <div class="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                <svg class="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                ID: {{ userId }}
              </div>
            </div>
            
            <!-- Состояние ошибки -->
            <div v-else-if="error" class="py-12">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Не удалось загрузить пользователя</h3>
                <p class="text-gray-600 mb-4">{{ error }}</p>
                <div class="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-lg mb-6">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd"/>
                  </svg>
                  ID: {{ userId }} не существует
                </div>
                <p class="text-sm text-gray-500">Попробуйте другой ID пользователя (1-10)</p>
              </div>
            </div>
            
            <!-- Состояние успешной загрузки -->
            <div v-else-if="user" class="space-y-6">
              <!-- Заголовок и аватар -->
              <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div class="flex-shrink-0">
                  <div class="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl">
                    {{ user.name.charAt(0) }}
                  </div>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">{{ user.name }}</h2>
                  <p class="text-gray-600 mt-1">@{{ user.username }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      Активен
                    </span>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ID: {{ user.id }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Контактная информация -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Контактная информация
                  </h4>
                  <div class="space-y-2">
                    <div>
                      <p class="text-sm text-gray-500">Email</p>
                      <p class="font-medium">{{ user.email }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Телефон</p>
                      <p class="font-medium">{{ user.phone }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Сайт</p>
                      <a :href="'https://' + user.website" target="_blank" class="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                        {{ user.website }}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Адрес
                  </h4>
                  <div class="space-y-2">
                    <div>
                      <p class="text-sm text-gray-500">Полный адрес</p>
                      <p class="font-medium">{{ addressText }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Координаты</p>
                      <p class="font-medium">
                        {{ user.address?.geo?.lat }}, {{ user.address?.geo?.lng }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Компания -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  Компания
                </h4>
                <div>
                  <h5 class="text-lg font-bold text-gray-900 mb-2">{{ user.company?.name }}</h5>
                  <p class="text-gray-700 italic mb-2">"{{ user.company?.catchPhrase }}"</p>
                  <p class="text-gray-600">{{ user.company?.bs }}</p>
                </div>
              </div>
            </div>
            
            <!-- Состояние без данных -->
            <div v-else class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0a4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Пользователь не выбран</h3>
              <p class="text-gray-600">Выберите ID пользователя и нажмите "Загрузить пользователя"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>