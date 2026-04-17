<script setup>
import { inject } from 'vue'
import { THEME_KEY } from '../keys'

const { theme } = inject(THEME_KEY)
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Демонстрации Provide/Inject</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Карточка 1: Тема -->
      <div class="rounded-xl p-6 border transition-all hover:shadow-lg"
        :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'">
        <div class="h-12 w-12 rounded-lg mb-4 flex items-center justify-center"
          :class="theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'">
          <span class="text-2xl">🎨</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Тема оформления</h3>
        <p class="mb-4 opacity-80 text-sm">
          Передача темы через контекст для всех компонентов приложения.
          Демонстрирует реактивность и функции для изменения данных.
        </p>
        <div class="text-xs px-2 py-1 rounded-full inline-block"
          :class="theme === 'dark' ? 'bg-gray-600' : 'bg-blue-100 text-blue-800'">
          Использует: provide, inject, ref, Symbol
        </div>
      </div>

      <!-- Карточка 2: Форма -->
      <div class="rounded-xl p-6 border transition-all hover:shadow-lg"
        :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'">
        <div class="h-12 w-12 rounded-lg mb-4 flex items-center justify-center"
          :class="theme === 'dark' ? 'bg-green-900' : 'bg-green-100'">
          <span class="text-2xl">📝</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Форма с контекстом</h3>
        <p class="mb-4 opacity-80 text-sm">
          Форма предоставляет состояние (отправка, валидация) полям ввода
          через контекст. Поля автоматически блокируются при отправке.
        </p>
        <div class="text-xs px-2 py-1 rounded-full inline-block"
          :class="theme === 'dark' ? 'bg-gray-600' : 'bg-green-100 text-green-800'">
          Использует: reactive, computed, слоты
        </div>
      </div>

      <!-- Карточка 3: Вкладки -->
      <div class="rounded-xl p-6 border transition-all hover:shadow-lg"
        :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-200'">
        <div class="h-12 w-12 rounded-lg mb-4 flex items-center justify-center"
          :class="theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'">
          <span class="text-2xl">📑</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Компонент вкладок</h3>
        <p class="mb-4 opacity-80 text-sm">
          Tabs управляет активной вкладкой, Tab потребляет контекст.
          Демонстрация паттерна "контейнер-контент" с provide/inject.
        </p>
        <div class="text-xs px-2 py-1 rounded-full inline-block"
          :class="theme === 'dark' ? 'bg-gray-600' : 'bg-purple-100 text-purple-800'">
          Использует: ref, computed, слоты
        </div>
      </div>

      <!-- Карточка 4: Корзина -->
      <div class="rounded-xl p-6 border transition-all hover:shadow-lg"
        :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'">
        <div class="h-12 w-12 rounded-lg mb-4 flex items-center justify-center"
          :class="theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-100'">
          <span class="text-2xl">🛒</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Корзина покупок</h3>
        <p class="mb-4 opacity-80 text-sm">
          Глобальное состояние корзины доступно из любого компонента.
          Добавление, удаление, подсчет суммы через контекст.
        </p>
        <div class="text-xs px-2 py-1 rounded-full inline-block"
          :class="theme === 'dark' ? 'bg-gray-600' : 'bg-yellow-100 text-yellow-800'">
          Использует: reactive, computed, методы
        </div>
      </div>

      <!-- Карточка 5: Глубокая вложенность -->
      <div class="rounded-xl p-6 border transition-all hover:shadow-lg"
        :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-red-50 border-red-200'">
        <div class="h-12 w-12 rounded-lg mb-4 flex items-center justify-center"
          :class="theme === 'dark' ? 'bg-red-900' : 'bg-red-100'">
          <span class="text-2xl">🏗️</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Глубокая вложенность</h3>
        <p class="mb-4 opacity-80 text-sm">
          Данные передаются через 5 уровней вложенности.
          Сравнение prop drilling и provide/inject подходов.
        </p>
        <div class="text-xs px-2 py-1 rounded-full inline-block"
          :class="theme === 'dark' ? 'bg-gray-600' : 'bg-red-100 text-red-800'">
          Использует: вложенные компоненты
        </div>
      </div>

      <!-- Карточка 6: Объяснение -->
      <div class="rounded-xl p-6 border transition-all hover:shadow-lg col-span-full md:col-span-2 lg:col-span-1"
        :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'">
        <div class="h-12 w-12 rounded-lg mb-4 flex items-center justify-center bg-gray-200">
          <span class="text-2xl">ℹ️</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Что такое Provide/Inject?</h3>
        <p class="mb-4 opacity-80 text-sm">
          Provide/Inject создает прямой канал между компонентом-предком
          и любым компонентом-потомком, минуя промежуточные уровни.
          Решает проблему "prop drilling" в глубоких иерархиях.
        </p>
        <div class="p-3 rounded-lg text-sm"
          :class="theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'">
          <code class="block mb-1">provide('ключ', значение)</code>
          <code class="block">const данные = inject('ключ')</code>
        </div>
      </div>
    </div>
  </div>
</template>