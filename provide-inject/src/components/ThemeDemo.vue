<script setup>
import { inject, computed } from 'vue'
import { THEME_KEY, USER_KEY, MODAL_KEY } from '../keys'

const { theme, toggleTheme } = inject(THEME_KEY)
const user = inject(USER_KEY)
const { openModal } = inject(MODAL_KEY)

const themeInfo = computed(() => ({
  dark: {
    name: 'Темная',
    description: 'Темная тема снижает нагрузку на глаза',
    bg: 'bg-gray-900',
    text: 'text-white'
  },
  light: {
    name: 'Светлая',
    description: 'Светлая тема улучшает читаемость',
    bg: 'bg-gray-50',
    text: 'text-gray-900'
  }
}[theme.value]))
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Тема оформления через контекст</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: управление -->
      <div class="space-y-6">
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Управление темой</h3>
          
          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <span class="font-medium">Текущая тема:</span>
              <span class="px-3 py-1 rounded-full text-sm font-medium"
                :class="theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'">
                {{ themeInfo.name }}
              </span>
            </div>
            
            <button
              @click="toggleTheme"
              class="w-full py-3 px-4 rounded-lg font-medium transition-all"
              :class="theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-100 hover:bg-blue-200 text-blue-800'">
              Переключить на {{ theme === 'dark' ? 'светлую' : 'темную' }} тему
            </button>
          </div>
          
          <div class="p-4 rounded-lg"
            :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
            <p class="text-sm mb-2">{{ themeInfo.description }}</p>
            <p class="text-sm opacity-80">
              Тема передается через provide/inject и доступна на любой глубине вложенности
            </p>
          </div>
        </div>

        <!-- Пользователь из контекста -->
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Пользователь из контекста</h3>
          
          <div class="flex items-center space-x-4 mb-4">
            <div class="h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold"
              :class="theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'">
              {{ user.name.charAt(0) }}
            </div>
            <div>
              <p class="font-medium">{{ user.name }}</p>
              <p class="text-sm opacity-80">{{ user.email }}</p>
              <p class="text-xs px-2 py-1 rounded-full inline-block mt-1"
                :class="theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'">
                {{ user.role }}
              </p>
            </div>
          </div>
          
          <p class="text-sm opacity-80">
            Данные пользователя доступны через inject без передачи через props
          </p>
        </div>
      </div>

      <!-- Правая колонка: компоненты с темой -->
      <div class="space-y-6">
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Компоненты с темой</h3>
          
          <!-- Кнопки -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <button
              class="py-2 px-4 rounded-lg font-medium transition-all"
              :class="theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-100 hover:bg-blue-200 text-blue-800'">
              Основная кнопка
            </button>
            <button
              class="py-2 px-4 rounded-lg font-medium transition-all border"
              :class="theme === 'dark' 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-100'">
              Вторичная кнопка
            </button>
          </div>
          
          <!-- Карточки -->
          <div class="space-y-4">
            <div class="p-4 rounded-lg border transition-all hover:shadow"
              :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'">
              <h4 class="font-medium mb-2">Уведомление</h4>
              <p class="text-sm opacity-80">Это уведомление адаптируется к текущей теме</p>
            </div>
            
            <div class="p-4 rounded-lg border transition-all hover:shadow"
              :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'">
              <h4 class="font-medium mb-2">Информация</h4>
              <p class="text-sm opacity-80">Все компоненты получают тему через inject</p>
            </div>
          </div>
        </div>

        <!-- Демонстрация модального окна -->
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Модальное окно через контекст</h3>
          
          <div class="space-y-3">
            <button
              @click="openModal('Пример модального окна', 'Это модальное окно открыто через контекст provide/inject. Любой компонент может открыть модалку без прямого доступа к родителю.')"
              class="w-full py-2 px-4 rounded-lg font-medium transition-all"
              :class="theme === 'dark' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-green-100 hover:bg-green-200 text-green-800'">
              Открыть модальное окно
            </button>
            
            <p class="text-sm opacity-80">
              Модальное окно управляется через глобальный контекст.
              Любой компонент может открыть его без передачи callbacks через props.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Пояснение -->
    <div class="mt-8 p-6 rounded-xl border"
      :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'">
      <h4 class="font-semibold mb-3">Как это работает:</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm mb-2">
            <code class="font-mono bg-black bg-opacity-30 px-2 py-1 rounded">App.vue</code> предоставляет тему:
          </p>
          <pre class="text-xs bg-black bg-opacity-30 p-3 rounded overflow-x-auto">
provide('theme', theme) // передаем ref
provide('toggleTheme', toggleTheme) // и функцию</pre>
        </div>
        <div>
          <p class="text-sm mb-2">
            Любой компонент получает тему:
          </p>
          <pre class="text-xs bg-black bg-opacity-30 p-3 rounded overflow-x-auto">
const { theme, toggleTheme } = inject('theme')
// Используем напрямую
&lt;button @click="toggleTheme"&gt;
  {{ theme }}
&lt;/button&gt;</pre>
        </div>
      </div>
    </div>
  </div>
</template>