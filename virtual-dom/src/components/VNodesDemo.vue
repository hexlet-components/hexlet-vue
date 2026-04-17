<script setup>
import { ref, computed, h } from 'vue'

// Состояния для демонстрации
const message = ref('Изначальный текст')
const counter = ref(0)
const showExtra = ref(false)

// Функция для создания виртуального узла вручную
const createVNodeExample = () => {
  return h('div', { 
    class: 'bg-blue-50 p-4 rounded-lg border border-blue-200' 
  }, [
    h('h3', { class: 'text-lg font-semibold text-blue-800' }, 'Пример VNode'),
    h('p', { class: 'mt-2 text-blue-600' }, message.value),
    h('button', {
      class: 'mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
      onClick: () => counter.value++
    }, `Клик: ${counter.value}`)
  ])
}

// Структура VNode
const vnodeStructure = computed(() => ({
  type: 'div',
  props: { 
    class: 'bg-blue-50 p-4 rounded-lg border border-blue-200'
  },
  children: [
    {
      type: 'h3',
      props: { class: 'text-lg font-semibold text-blue-800' },
      children: 'Пример VNode'
    },
    {
      type: 'p',
      props: { class: 'mt-2 text-blue-600' },
      children: message.value
    }
  ]
}))

// Компонент, рендерящийся через render функцию
const ManualComponent = {
  setup() {
    const localCounter = ref(0)
    return { localCounter }
  },
  render() {
    return h('div', { class: 'bg-green-50 p-4 rounded-lg border border-green-200' }, [
      h('h3', { class: 'text-lg font-semibold text-green-800' }, 'Ручной render()'),
      h('p', { class: 'mt-2 text-green-600' }, `Локальный счетчик: ${this.localCounter}`),
      h('button', {
        class: 'mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700',
        onClick: () => this.localCounter++
      }, 'Увеличить')
    ])
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Виртуальные узлы (VNodes)</h2>
    
    <div class="mb-8">
      <p class="text-gray-600 mb-4">
        Virtual DOM в Vue состоит из виртуальных узлов — JavaScript-объектов,
        описывающих структуру интерфейса. Эти объекты легковесны и работа с ними
        быстрее, чем с реальным DOM.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: шаблон Vue -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Шаблон Vue</h3>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Сообщение:
            </label>
            <input
              v-model="message"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Введите текст..."
            />
          </div>

          <div class="mb-6">
            <label class="flex items-center">
              <input
                v-model="showExtra"
                type="checkbox"
                class="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-gray-700">Показать дополнительный контент</span>
            </label>
          </div>

          <!-- Реальный компонент -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">Результат рендеринга:</h4>
            
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 class="text-lg font-semibold text-blue-800">Пример VNode</h3>
              <p class="mt-2 text-blue-600">{{ message }}</p>
              <p v-if="showExtra" class="mt-2 text-blue-500">
                Дополнительный текст, который появляется по условию
              </p>
              <button
                @click="counter++"
                class="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Клик: {{ counter }}
              </button>
            </div>
          </div>
        </div>

        <!-- Компонент с render функцией -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Render функция</h3>
          <ManualComponent />
        </div>
      </div>

      <!-- Правая колонка: структура VNode -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Структура VNode (упрощенно)
          </h3>
          
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre class="whitespace-pre-wrap">{{ JSON.stringify(vnodeStructure, null, 2) }}</pre>
          </div>

          <div class="mt-6 space-y-4">
            <div class="p-3 bg-blue-50 rounded-lg">
              <h4 class="font-medium text-blue-800 mb-1">Что происходит:</h4>
              <p class="text-blue-600 text-sm">
                1. Vue компилирует шаблон в render функцию<br>
                2. При обновлении данных выполняется render функция<br>
                3. Создается новое виртуальное дерево VNodes<br>
                4. Сравнивается со старым деревом<br>
                5. Применяются только необходимые изменения к DOM
              </p>
            </div>

            <div class="p-3 bg-green-50 rounded-lg">
              <h4 class="font-medium text-green-800 mb-1">Преимущества:</h4>
              <ul class="text-green-600 text-sm space-y-1">
                <li>• Работа в памяти быстрее прямых DOM-операций</li>
                <li>• Минимизация обращений к реальному DOM</li>
                <li>• Автоматическая группировка обновлений</li>
                <li>• Возможность оптимизаций на уровне фреймворка</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Ручное создание VNode -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Программное создание VNode
          </h3>
          
          <div v-if="createVNodeExample">
            <component :is="createVNodeExample" />
          </div>
          
          <div class="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p class="text-yellow-800 text-sm">
              <strong>Примечание:</strong> Vue автоматически создает VNodes из шаблонов.
              Ручное создание через `h()` нужно для продвинутых сценариев и динамических компонентов.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>