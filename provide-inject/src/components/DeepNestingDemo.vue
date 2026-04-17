<script setup>
import { ref, provide, inject } from 'vue'
import { THEME_KEY } from '../keys'

const { theme } = inject(THEME_KEY)

// Данные для передачи через prop drilling
const userData = ref({
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  role: 'admin',
  settings: {
    theme: 'dark',
    notifications: true,
    language: 'ru'
  }
})

// Provide для глубокой вложенности
const deepData = ref({
  message: 'Это сообщение проходит через 5 уровней вложенности',
  level: 0,
  timestamp: new Date().toLocaleTimeString()
})

provide('deepData', deepData)

// Компоненты для вложенности
const components = [
  { name: 'App', level: 0 },
  { name: 'Layout', level: 1 },
  { name: 'Sidebar', level: 2 },
  { name: 'Menu', level: 3 },
  { name: 'MenuItem', level: 4 },
  { name: 'UserInfo', level: 5 }
]
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Глубокая вложенность</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: prop drilling -->
      <div class="space-y-6">
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Prop Drilling</h3>
          
          <p class="mb-4 opacity-80">
            Традиционный подход: данные передаются через props на каждом уровне.
          </p>
          
          <!-- Иерархия компонентов -->
          <div class="space-y-2">
            <div v-for="component in components" :key="component.name"
              class="p-4 rounded-lg border-l-4"
              :style="{ marginLeft: `${component.level * 1.5}rem` }"
              :class="[
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-gray-50 border-gray-300',
                component.level === 5
                  ? 'border-l-green-500'
                  : 'border-l-blue-500'
              ]">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-medium">{{ component.name }}</span>
                  <span class="text-sm opacity-80 ml-2">(уровень {{ component.level }})</span>
                </div>
                <span v-if="component.level === 0" class="text-sm px-2 py-1 rounded"
                  :class="theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'">
                  Имеет данные
                </span>
                <span v-else-if="component.level === 5" class="text-sm px-2 py-1 rounded"
                  :class="theme === 'dark' ? 'bg-green-900' : 'bg-green-100'">
                  Нужны данные
                </span>
                <span v-else class="text-sm px-2 py-1 rounded"
                  :class="theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'">
                  Транзитный
                </span>
              </div>
              
              <div v-if="component.level === 0" class="mt-2 text-sm p-2 rounded"
                :class="theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'">
                <code>&lt;Layout :user="userData" /&gt;</code>
              </div>
              
              <div v-if="component.level > 0 && component.level < 5" class="mt-2 text-sm opacity-80">
                Получает userData через prop, но не использует его
              </div>
              
              <div v-if="component.level === 5" class="mt-2 text-sm p-2 rounded"
                :class="theme === 'dark' ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'">
                Наконец-то использует данные: {{ userData.name }}
              </div>
            </div>
          </div>
          
          <div class="mt-6 p-4 rounded-lg"
            :class="theme === 'dark' ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'">
            <p class="text-sm font-medium mb-2">Проблемы prop drilling:</p>
            <ul class="text-sm space-y-1">
              <li>• 4 промежуточных компонента получают ненужные props</li>
              <li>• Усложняется рефакторинг</li>
              <li>• Увеличивается связность компонентов</li>
              <li>• Шум в коде (много транзитных props)</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Правая колонка: provide/inject -->
      <div class="space-y-6">
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Provide/Inject</h3>
          
          <p class="mb-4 opacity-80">
            Современный подход: данные передаются через контекст напрямую.
          </p>
          
          <!-- Иерархия с provide/inject -->
          <div class="space-y-2">
            <div v-for="component in components" :key="component.name"
              class="p-4 rounded-lg border-l-4"
              :style="{ marginLeft: `${component.level * 1.5}rem` }"
              :class="[
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-gray-50 border-gray-300',
                component.level === 0
                  ? 'border-l-purple-500'
                  : component.level === 5
                    ? 'border-l-green-500'
                    : 'border-l-transparent'
              ]">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-medium">{{ component.name }}</span>
                  <span class="text-sm opacity-80 ml-2">(уровень {{ component.level }})</span>
                </div>
                <span v-if="component.level === 0" class="text-sm px-2 py-1 rounded"
                  :class="theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'">
                  provide('userData')
                </span>
                <span v-else-if="component.level === 5" class="text-sm px-2 py-1 rounded"
                  :class="theme === 'dark' ? 'bg-green-900' : 'bg-green-100'">
                  inject('userData')
                </span>
                <span v-else class="text-sm px-2 py-1 rounded opacity-50"
                  :class="theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'">
                  Не участвует
                </span>
              </div>
              
              <div v-if="component.level === 0" class="mt-2 text-sm p-2 rounded"
                :class="theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'">
                <code>provide('userData', userData)</code>
              </div>
              
              <div v-if="component.level > 0 && component.level < 5" class="mt-2 text-sm opacity-50">
                Не знает о существовании userData
              </div>
              
              <div v-if="component.level === 5" class="mt-2 text-sm p-2 rounded"
                :class="theme === 'dark' ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'">
                Получает напрямую: const userData = inject('userData')
              </div>
            </div>
          </div>
          
          <div class="mt-6 p-4 rounded-lg"
            :class="theme === 'dark' ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'">
            <p class="text-sm font-medium mb-2">Преимущества provide/inject:</p>
            <ul class="text-sm space-y-1">
              <li>• Промежуточные компоненты не затронуты</li>
              <li>• Прямой доступ к данным на любой глубине</li>
              <li>• Чище код, меньше связности</li>
              <li>• Легче рефакторить и поддерживать</li>
            </ul>
          </div>
        </div>

        <!-- Демонстрация глубокой вложенности -->
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h4 class="font-semibold mb-4">Живая демонстрация</h4>
          
          <div class="p-4 rounded-lg mb-4"
            :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
            <p class="text-sm">Сообщение проходит через 5 уровней вложенности:</p>
            <p class="font-bold mt-2">{{ deepData.message }}</p>
            <p class="text-sm opacity-80 mt-1">Время: {{ deepData.timestamp }}</p>
          </div>
          
          <!-- Вложенные компоненты -->
          <LevelOne>
            <template #default>
              <LevelTwo>
                <template #default>
                  <LevelThree>
                    <template #default>
                      <LevelFour>
                        <template #default>
                          <LevelFive />
                        </template>
                      </LevelFour>
                    </template>
                  </LevelThree>
                </template>
              </LevelTwo>
            </template>
          </LevelOne>
        </div>
      </div>
    </div>
  </div>
</template>