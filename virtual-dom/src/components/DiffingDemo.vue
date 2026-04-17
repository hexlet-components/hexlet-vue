<script setup>
import { ref, computed, nextTick } from 'vue'

// Состояния для демонстрации
const items = ref([
  { id: 1, name: 'Элемент 1', color: 'bg-red-100 text-red-800' },
  { id: 2, name: 'Элемент 2', color: 'bg-green-100 text-green-800' },
  { id: 3, name: 'Элемент 3', color: 'bg-blue-100 text-blue-800' },
  { id: 4, name: 'Элемент 4', color: 'bg-yellow-100 text-yellow-800' },
  { id: 5, name: 'Элемент 5', color: 'bg-purple-100 text-purple-800' }
])

const newItemId = ref(6)
const showWithKeys = ref(true)
const lastOperation = ref('')
const renderCount = ref(0)

// Отслеживание рендеров
const incrementRenderCount = () => {
  renderCount.value++
}

// Операции с массивом
const addToStart = () => {
  lastOperation.value = 'Добавление в начало'
  items.value.unshift({ 
    id: newItemId.value++, 
    name: `Новый элемент ${newItemId.value - 1}`,
    color: 'bg-gray-100 text-gray-800'
  })
  incrementRenderCount()
}

const addToEnd = () => {
  lastOperation.value = 'Добавление в конец'
  items.value.push({ 
    id: newItemId.value++, 
    name: `Новый элемент ${newItemId.value - 1}`,
    color: 'bg-gray-100 text-gray-800'
  })
  incrementRenderCount()
}

const removeFirst = () => {
  if (items.value.length > 1) {
    lastOperation.value = 'Удаление первого элемента'
    items.value.shift()
    incrementRenderCount()
  }
}

const reverseList = () => {
  lastOperation.value = 'Реверс списка'
  items.value.reverse()
  incrementRenderCount()
}

const resetList = () => {
  lastOperation.value = 'Сброс к исходному состоянию'
  items.value = [
    { id: 1, name: 'Элемент 1', color: 'bg-red-100 text-red-800' },
    { id: 2, name: 'Элемент 2', color: 'bg-green-100 text-green-800' },
    { id: 3, name: 'Элемент 3', color: 'bg-blue-100 text-blue-800' },
    { id: 4, name: 'Элемент 4', color: 'bg-yellow-100 text-yellow-800' },
    { id: 5, name: 'Элемент 5', color: 'bg-purple-100 text-purple-800' }
  ]
  newItemId.value = 6
  renderCount.value = 0
}

// Демонстрация nextTick
const asyncUpdateDemo = ref('Изначальное значение')
const pendingUpdate = ref(false)

const updateAsync = async () => {
  pendingUpdate.value = true
  asyncUpdateDemo.value = 'Значение изменено'
  
  // DOM еще не обновлен
  const element = document.querySelector('#async-demo')
  const before = element?.textContent
  
  await nextTick()
  
  // DOM обновлен
  const after = element?.textContent
  
  lastOperation.value = `nextTick: было "${before}", стало "${after}"`
  pendingUpdate.value = false
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      Алгоритм сравнения (Diffing) и nextTick
    </h2>
    
    <div class="mb-8">
      <p class="text-gray-600 mb-4">
        Vue сравнивает старое и новое виртуальные деревья, находя минимальный набор изменений
        для применения к реальному DOM. Обновления группируются и применяются асинхронно.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: ключи в списках -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Ключи в списках</h3>
            <div class="flex items-center">
              <span class="text-sm text-gray-600 mr-3">С ключами:</span>
              <button
                @click="showWithKeys = !showWithKeys"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                :class="showWithKeys ? 'bg-blue-600' : 'bg-gray-300'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="showWithKeys ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
          </div>

          <div class="mb-6">
            <div class="flex flex-wrap gap-2 mb-4">
              <button
                @click="addToStart"
                class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Добавить в начало
              </button>
              <button
                @click="addToEnd"
                class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                Добавить в конец
              </button>
              <button
                @click="removeFirst"
                class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Удалить первый
              </button>
              <button
                @click="reverseList"
                class="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                Реверс
              </button>
            </div>
            
            <button
              @click="resetList"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Сбросить список
            </button>
          </div>

          <!-- Список с/без ключей -->
          <div class="space-y-4">
            <div>
              <h4 class="font-medium text-gray-700 mb-2">
                {{ showWithKeys ? 'С :key="item.id"' : 'Без ключей (используется индекс)' }}
              </h4>
              
              <div class="space-y-2">
                <div
                  v-for="(item, index) in items"
                  :key="showWithKeys ? item.id : index"
                  class="p-3 rounded-lg transition-all duration-300"
                  :class="[item.color, { 'border-2 border-blue-500': lastOperation.includes('Добавление') && index === 0 }]"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <span class="font-medium">{{ item.name }}</span>
                      <span class="text-sm opacity-75 ml-2">ID: {{ item.id }}</span>
                    </div>
                    <div class="text-sm">
                      Индекс: {{ index }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-3 bg-blue-50 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <span class="font-medium text-blue-800">Счетчик рендеров:</span>
                  <span class="ml-2 text-blue-600">{{ renderCount }}</span>
                </div>
                <div class="text-sm text-blue-600" v-if="lastOperation">
                  Последняя операция: {{ lastOperation }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Объяснение -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 class="font-semibold text-gray-900 mb-3">Почему ключи важны:</h4>
          
          <div class="space-y-3">
            <div class="p-3 bg-red-50 rounded-lg">
              <h5 class="font-medium text-red-800 mb-1">Без ключей:</h5>
              <p class="text-red-600 text-sm">
                Vue сравнивает элементы по индексу. При добавлении элемента в начало,
                все индексы сдвигаются и Vue думает, что все элементы изменились.
              </p>
            </div>
            
            <div class="p-3 bg-green-50 rounded-lg">
              <h5 class="font-medium text-green-800 mb-1">С ключами:</h5>
              <p class="text-green-600 text-sm">
                Vue идентифицирует элементы по уникальному ключу. При добавлении элемента
                в начало, Vue видит только один новый элемент и оставляет остальные без изменений.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка: nextTick и пакетная обработка -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            nextTick и пакетная обработка
          </h3>

          <div class="mb-6">
            <p class="text-gray-600 mb-4">
              Vue группирует обновления DOM и применяет их асинхронно.
              Используйте <code class="bg-gray-100 px-1 rounded">nextTick()</code>,
              чтобы дождаться обновления DOM.
            </p>

            <div class="p-4 bg-gray-50 rounded-lg mb-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-medium text-gray-700">Текущее значение:</span>
                  <span id="async-demo" class="ml-2 text-blue-600 font-medium">
                    {{ asyncUpdateDemo }}
                  </span>
                </div>
                <button
                  @click="updateAsync"
                  :disabled="pendingUpdate"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <span v-if="pendingUpdate">Обновление...</span>
                  <span v-else>Обновить асинхронно</span>
                </button>
              </div>
            </div>

            <div class="p-3 bg-yellow-50 rounded-lg">
              <p class="text-yellow-800 text-sm">
                При нажатии кнопки значение меняется немедленно, но DOM обновляется
                только после вызова <code>nextTick()</code>. Vue собирает все изменения
                в текущем цикле и применяет их одним пакетом.
              </p>
            </div>
          </div>

          <!-- Пример пакетной обработки -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Пакетная обработка:</h4>
            
            <div class="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm">
              <div class="text-green-400">// Несколько синхронных изменений</div>
              <div class="my-2">
                <span class="text-blue-400">data</span>.<span class="text-yellow-300">value</span> = 1;
                <span class="text-gray-500 ml-2">// DOM не обновляется</span>
              </div>
              <div class="my-2">
                <span class="text-blue-400">data</span>.<span class="text-yellow-300">value</span> = 2;
                <span class="text-gray-500 ml-2">// DOM не обновляется</span>
              </div>
              <div class="my-2">
                <span class="text-blue-400">data</span>.<span class="text-yellow-300">value</span> = 3;
                <span class="text-gray-500 ml-2">// DOM не обновляется</span>
              </div>
              <div class="mt-4 text-green-400">
                // В следующем тике цикла событий
              </div>
              <div class="my-2">
                <span class="text-purple-400">Vue обновляет DOM один раз</span>;
                <span class="text-gray-500 ml-2">// с конечным значением 3</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Когда использовать nextTick -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 class="font-semibold text-gray-900 mb-3">Когда использовать nextTick:</h4>
          
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-600 text-sm">1</span>
                </div>
              </div>
              <div>
                <p class="font-medium text-gray-700">Измерение элементов</p>
                <p class="text-gray-600 text-sm">
                  Получение размеров элемента после изменения данных
                </p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span class="text-blue-600 text-sm">2</span>
                </div>
              </div>
              <div>
                <p class="font-medium text-gray-700">Установка фокуса</p>
                <p class="text-gray-600 text-sm">
                  Фокус на элементе после его отображения
                </p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <span class="text-purple-600 text-sm">3</span>
                </div>
              </div>
              <div>
                <p class="font-medium text-gray-700">Работа со сторонними библиотеками</p>
                <p class="text-gray-600 text-sm">
                  Инициализация библиотек после обновления DOM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>