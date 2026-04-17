<script setup>
import { ref, shallowRef, provide } from 'vue'
import { THEME_KEY, USER_KEY, NOTIFICATIONS_KEY, MODAL_KEY } from './keys'
import DemoList from './components/DemoList.vue'
import ThemeDemo from './components/ThemeDemo.vue'
import FormDemo from './components/FormDemo.vue'
import TabsDemo from './components/TabsDemo.vue'
import ShoppingCartDemo from './components/ShoppingCartDemo.vue'
import DeepNestingDemo from './components/DeepNestingDemo.vue'

// Глобальные provide
const theme = ref('dark')
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
provide(THEME_KEY, { theme, toggleTheme })

// Пользователь
const user = ref({
  id: 1,
  name: 'Алексей Петров',
  email: 'alexey@example.com',
  role: 'admin'
})
provide(USER_KEY, user)

// Уведомления
const notifications = ref([
  { id: 1, message: 'Добро пожаловать!', type: 'info' },
  { id: 2, message: 'Обновление доступно', type: 'warning' }
])
const addNotification = (message, type = 'info') => {
  notifications.value.push({
    id: Date.now(),
    message,
    type
  })
}
provide(NOTIFICATIONS_KEY, { notifications, addNotification })

// Модальное окно
const modalState = ref({
  isOpen: false,
  title: '',
  content: ''
})
const openModal = (title, content) => {
  modalState.value = {
    isOpen: true,
    title,
    content
  }
}
const closeModal = () => {
  modalState.value.isOpen = false
}
provide(MODAL_KEY, { modalState, openModal, closeModal })

// Демо компоненты
const demos = [
  { id: 1, name: 'Список демонстраций', component: DemoList },
  { id: 2, name: 'Тема оформления', component: ThemeDemo },
  { id: 3, name: 'Форма с контекстом', component: FormDemo },
  { id: 4, name: 'Вкладки', component: TabsDemo },
  { id: 5, name: 'Корзина покупок', component: ShoppingCartDemo },
  { id: 6, name: 'Глубокая вложенность', component: DeepNestingDemo }
]

const activeDemo = ref(1)
const activeComponent = shallowRef(DemoList)

const switchDemo = (demoId) => {
  activeDemo.value = demoId
  const demo = demos.find(d => d.id === demoId)
  if (demo) {
    activeComponent.value = demo.component
  }
}
</script>

<template>
  <div :class="['min-h-screen', theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900']">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Заголовок -->
      <header class="mb-10">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold mb-2">Provide/Inject в Vue</h1>
            <p class="text-lg opacity-80">
              Интерактивная демонстрация передачи данных через контекст
            </p>
          </div>
          <div class="text-sm">
            <div class="p-2 rounded bg-gray-800 text-gray-300">
              Тема: {{ theme === 'dark' ? 'Темная' : 'Светлая' }}
            </div>
          </div>
        </div>
      </header>

      <!-- Навигация -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-1">
          <button
            v-for="demo in demos"
            :key="demo.id"
            @click="switchDemo(demo.id)"
            class="px-4 py-3 rounded-lg font-medium transition-all duration-200"
            :class="[
              activeDemo === demo.id
                ? theme === 'dark' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ demo.name }}
          </button>
        </div>
      </div>

      <!-- Контент -->
      <main class="rounded-2xl shadow-xl p-6 transition-all duration-300"
        :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'">
        <component :is="activeComponent" />
      </main>

      <!-- Футер -->
      <footer class="mt-12 pt-8 border-t" :class="theme === 'dark' ? 'border-gray-700' : 'border-gray-200'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Что демонстрируется</h3>
            <p class="opacity-80">
              Каждая демонстрация показывает реальный сценарий использования
              provide/inject для передачи данных через уровни вложенности
              без prop drilling.
            </p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4">Ключевые концепции</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span>Передача реактивных данных через контекст</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span>Использование Symbol для безопасных ключей</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span>Комбинация со слотами для гибких компонентов</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>