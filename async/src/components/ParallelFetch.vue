<script setup>
import { ref, onMounted, computed } from 'vue'

const users = ref([])
const posts = ref([])
const comments = ref([])
const loading = ref(false)
const loadingUsers = ref(false)
const loadingPosts = ref(false)
const loadingComments = ref(false)
const error = ref(null)
const executionTime = ref(0)

const loadSequential = async () => {
  loading.value = true
  loadingUsers.value = true
  loadingPosts.value = true
  loadingComments.value = true
  error.value = null
  executionTime.value = 0
  
  const startTime = performance.now()
  
  try {
    // Последовательная загрузка
    console.log('Начинаем последовательную загрузку...')
    
    // 1. Пользователи
    console.log('Загружаем пользователей...')
    const usersRes = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!usersRes.ok) throw new Error('Ошибка загрузки пользователей')
    users.value = await usersRes.json()
    loadingUsers.value = false
    
    // 2. Посты
    console.log('Загружаем посты...')
    const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    if (!postsRes.ok) throw new Error('Ошибка загрузки постов')
    posts.value = await postsRes.json()
    loadingPosts.value = false
    
    // 3. Комментарии
    console.log('Загружаем комментарии...')
    const commentsRes = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
    if (!commentsRes.ok) throw new Error('Ошибка загрузки комментариев')
    comments.value = await commentsRes.json()
    loadingComments.value = false
    
  } catch (e) {
    error.value = e.message
    loadingUsers.value = false
    loadingPosts.value = false
    loadingComments.value = false
  } finally {
    loading.value = false
    executionTime.value = performance.now() - startTime
    console.log(`Последовательная загрузка завершена за ${executionTime.value}мс`)
  }
}

const loadParallel = async () => {
  loading.value = true
  loadingUsers.value = true
  loadingPosts.value = true
  loadingComments.value = true
  error.value = null
  executionTime.value = 0
  
  const startTime = performance.now()
  
  try {
    // Параллельная загрузка
    console.log('Начинаем параллельную загрузку...')
    
    const [usersRes, postsRes, commentsRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10'),
      fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
    ])

    if (!usersRes.ok || !postsRes.ok || !commentsRes.ok) {
      throw new Error('Ошибка загрузки данных')
    }

    const [usersData, postsData, commentsData] = await Promise.all([
      usersRes.json(),
      postsRes.json(),
      commentsRes.json()
    ])

    users.value = usersData
    posts.value = postsData
    comments.value = commentsData
    
    // Сразу скрываем все спиннеры
    loadingUsers.value = false
    loadingPosts.value = false
    loadingComments.value = false
    
  } catch (e) {
    error.value = e.message
    loadingUsers.value = false
    loadingPosts.value = false
    loadingComments.value = false
  } finally {
    loading.value = false
    executionTime.value = performance.now() - startTime
    console.log(`Параллельная загрузка завершена за ${executionTime.value}мс`)
  }
}

const stats = computed(() => ({
  users: users.value.length,
  posts: posts.value.length,
  comments: comments.value.length,
  total: users.value.length + posts.value.length + comments.value.length
}))

onMounted(() => {
  loadParallel()
})
</script>

<template>
  <div>
    <!-- Заголовок -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800">Параллельная загрузка данных</h2>
      <p class="text-gray-600 mt-2">
        Сравните производительность последовательной и параллельной загрузки данных из API
      </p>
    </div>

    <!-- Карточки управления и статистики -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Карточка управления -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Управление загрузкой</h3>
        <p class="text-gray-700 mb-6">
          <span class="font-semibold text-blue-700">Параллельная загрузка</span> выполняется быстрее, так как запросы выполняются одновременно
          с помощью Promise.all(). <span class="font-semibold text-gray-700">Последовательная загрузка</span> ждёт завершения каждого запроса
          перед началом следующего.
        </p>
        
        <div class="space-y-3">
          <button
            @click="loadParallel"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ loading ? 'Загрузка...' : 'Параллельная загрузка' }}
          </button>
          
          <button
            @click="loadSequential"
            :disabled="loading"
            class="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Последовательная загрузка
          </button>
        </div>
        
        <div v-if="executionTime > 0" class="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Время выполнения</p>
              <p class="text-2xl font-bold text-gray-900">{{ executionTime.toFixed(2) }} <span class="text-sm">мс</span></p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Эффективность</p>
              <p class="text-lg font-semibold" :class="executionTime < 500 ? 'text-green-600' : 'text-yellow-600'">
                {{ executionTime > 0 ? Math.round((1000 / executionTime) * 10) : 0 }}%
              </p>
            </div>
          </div>
          <div class="mt-2">
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full transition-all duration-500" 
                :class="executionTime < 300 ? 'bg-green-500' : executionTime < 600 ? 'bg-yellow-500' : 'bg-red-500'"
                :style="{ width: `${Math.min(100, (1000 - executionTime) / 10)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Карточка статистики -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Статистика данных</h3>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          <p class="mt-4 text-gray-600">Загрузка статистики...</p>
        </div>
        
        <div v-else class="space-y-4">
          <!-- Прогресс-бары -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">Пользователи</span>
              <span class="text-sm font-bold text-blue-600">{{ stats.users }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${(stats.users / 10) * 100}%` }"></div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">Посты</span>
              <span class="text-sm font-bold text-green-600">{{ stats.posts }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${(stats.posts / 10) * 100}%` }"></div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">Комментарии</span>
              <span class="text-sm font-bold text-yellow-600">{{ stats.comments }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-yellow-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${(stats.comments / 10) * 100}%` }"></div>
            </div>
          </div>
          
          <!-- Итоговая статистика -->
          <div class="pt-4 border-t border-green-200">
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-1">Всего записей</p>
              <p class="text-4xl font-bold text-gray-900">{{ stats.total }}</p>
              <div class="flex justify-center gap-4 mt-3">
                <div class="text-center">
                  <div class="text-lg font-bold text-blue-600">{{ stats.users }}</div>
                  <div class="text-xs text-gray-500">Пользователей</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-green-600">{{ stats.posts }}</div>
                  <div class="text-xs text-gray-500">Постов</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-yellow-600">{{ stats.comments }}</div>
                  <div class="text-xs text-gray-500">Комментариев</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Состояние ошибки -->
    <div v-if="error" class="mb-6">
      <div class="bg-red-50 border-l-4 border-red-500 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Ошибка загрузки данных!</h3>
            <p class="text-sm text-red-700 mt-1">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Результаты загрузки -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Пользователи -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="bg-blue-600 px-4 py-3">
          <h4 class="text-lg font-semibold text-white flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.205a6 6 0 01-7.143 0"/>
            </svg>
            Пользователи ({{ users.length }})
          </h4>
        </div>
        <div class="p-4 max-h-96 overflow-y-auto">
          <!-- Спиннер для пользователей -->
          <div v-if="loadingUsers" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <p class="mt-2 text-sm text-gray-600">Загружаем пользователей...</p>
          </div>
          
          <div v-else class="space-y-3">
            <div
              v-for="user in users.slice(0, 5)"
              :key="user.id"
              class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {{ user.name.charAt(0) }}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
              </div>
            </div>
          </div>
          <div v-if="users.length > 5 && !loadingUsers" class="text-center pt-3 border-t border-gray-200">
            <p class="text-sm text-gray-500">и ещё {{ users.length - 5 }} пользователей...</p>
          </div>
        </div>
      </div>

      <!-- Посты -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="bg-green-600 px-4 py-3">
          <h4 class="text-lg font-semibold text-white flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Посты ({{ posts.length }})
          </h4>
        </div>
        <div class="p-4 max-h-96 overflow-y-auto">
          <!-- Спиннер для постов -->
          <div v-if="loadingPosts" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
            <p class="mt-2 text-sm text-gray-600">Загружаем посты...</p>
          </div>
          
          <div v-else class="space-y-3">
            <div
              v-for="post in posts"
              :key="post.id"
              class="p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p class="text-sm font-medium text-gray-900 line-clamp-2">{{ post.title }}</p>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-gray-500">Автор ID: {{ post.userId }}</span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Пост
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Комментарии -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="bg-yellow-600 px-4 py-3">
          <h4 class="text-lg font-semibold text-white flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Комментарии ({{ comments.length }})
          </h4>
        </div>
        <div class="p-4 max-h-96 overflow-y-auto">
          <!-- Спиннер для комментариев -->
          <div v-if="loadingComments" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-600"></div>
            <p class="mt-2 text-sm text-gray-600">Загружаем комментарии...</p>
          </div>
          
          <div v-else class="space-y-3">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p class="text-sm font-medium text-gray-900 line-clamp-2">{{ comment.name }}</p>
              <p class="text-xs text-gray-600 mt-1 line-clamp-2">{{ comment.body }}</p>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-gray-500">{{ comment.email }}</span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                  Комментарий
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ключевые моменты -->
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Ключевые моменты демонстрации</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg class="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">Promise.all()</h4>
            <p class="text-sm text-gray-600">Позволяет загружать несколько ресурсов одновременно</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg class="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">Оптимизация</h4>
            <p class="text-sm text-gray-600">Параллельная загрузка значительно быстрее последовательной</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <svg class="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">Обработка ошибок</h4>
            <p class="text-sm text-gray-600">Каждый запрос обрабатывает ошибки через try/catch</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg class="h-4 w-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">Реактивность</h4>
            <p class="text-sm text-gray-600">Данные остаются реактивными после загрузки</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>