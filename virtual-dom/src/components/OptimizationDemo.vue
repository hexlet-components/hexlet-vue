<script setup>
import { ref, computed } from 'vue'

// Данные для демонстрации
const items = ref([
  { id: 1, name: 'Яблоко', price: 50, quantity: 2 },
  { id: 2, name: 'Банан', price: 30, quantity: 3 },
  { id: 3, name: 'Апельсин', price: 70, quantity: 1 }
])

const newItem = ref({ name: '', price: 0, quantity: 1 })
const expensiveThreshold = ref(60)

// ПЛОХО: функция в шаблоне
const calculateItemTotal = (item) => {
  console.log('calculateItemTotal вызван для:', item.name)
  return item.price * item.quantity
}

// ХОРОШО: computed свойство
const totalWithComputed = computed(() => {
  console.log('totalWithComputed пересчитан')
  return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

// Другие computed свойства
const expensiveItems = computed(() => {
  return items.value.filter(item => item.price > expensiveThreshold.value)
})

const averagePrice = computed(() => {
  if (items.value.length === 0) return 0
  const total = items.value.reduce((sum, item) => sum + item.price, 0)
  return Math.round(total / items.value.length)
})

// Действия
const addItem = () => {
  if (newItem.value.name.trim()) {
    items.value.push({
      id: Date.now(),
      name: newItem.value.name,
      price: newItem.value.price,
      quantity: newItem.value.quantity
    })
    newItem.value = { name: '', price: 0, quantity: 1 }
  }
}

const removeItem = (id) => {
  items.value = items.value.filter(item => item.id !== id)
}

// Демонстрация мемоизации
const heavyCalculationCalls = ref(0)
const memoizedResults = ref({})

const heavyCalculation = (n) => {
  heavyCalculationCalls.value++
  
  // Проверяем кэш
  if (memoizedResults.value[n]) {
    return memoizedResults.value[n]
  }
  
  // Имитация тяжелых вычислений
  let result = 0
  for (let i = 0; i < n * 1000000; i++) {
    result += Math.sin(i) * Math.cos(i)
  }
  
  // Сохраняем в кэш
  memoizedResults.value[n] = result
  return result
}

const calculationInput = ref(5)
const calculationResult = ref(0)

const runCalculation = () => {
  calculationResult.value = heavyCalculation(calculationInput.value)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Оптимизация рендеринга</h2>
    
    <div class="mb-8">
      <p class="text-gray-600 mb-4">
        Virtual DOM эффективен, но требует правильных подходов к организации кода.
        Оптимизации позволяют минимизировать ненужные вычисления и перерисовки.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: computed vs функции -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Computed свойства vs функции в шаблоне
          </h3>

          <div class="mb-6">
            <div class="flex gap-4 mb-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Порог дорогих товаров
                </label>
                <input
                  v-model="expensiveThreshold"
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-sm text-gray-500 mt-1">
                  <span>10</span>
                  <span>{{ expensiveThreshold }}</span>
                  <span>100</span>
                </div>
              </div>
              
              <button
                @click="addItem"
                class="self-end px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Добавить товар
              </button>
            </div>

            <!-- Форма добавления товара -->
            <div class="grid grid-cols-3 gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Название
                </label>
                <input
                  v-model="newItem.name"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Название товара"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Цена
                </label>
                <input
                  v-model.number="newItem.price"
                  type="number"
                  class="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                  min="0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Количество
                </label>
                <input
                  v-model.number="newItem.quantity"
                  type="number"
                  class="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                  min="1"
                />
              </div>
            </div>
          </div>

          <!-- Таблица товаров -->
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100">
                  <th class="p-3 text-left">Товар</th>
                  <th class="p-3 text-left">Цена</th>
                  <th class="p-3 text-left">Кол-во</th>
                  <th class="p-3 text-left">Итого (функция)</th>
                  <th class="p-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="item in items" 
                  :key="item.id"
                  class="border-b hover:bg-gray-50"
                >
                  <td class="p-3">{{ item.name }}</td>
                  <td class="p-3">{{ item.price }} ₽</td>
                  <td class="p-3">{{ item.quantity }}</td>
                  <td class="p-3">
                    {{ calculateItemTotal(item) }} ₽
                    <span v-if="item.price > expensiveThreshold" class="ml-2 text-xs bg-red-100 text-red-800 px-1 rounded">
                      Дорогой
                    </span>
                  </td>
                  <td class="p-3">
                    <button
                      @click="removeItem(item.id)"
                      class="text-red-600 hover:text-red-800 text-sm"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Computed результаты -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 class="font-semibold text-gray-900 mb-3">Computed свойства:</h4>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 bg-blue-50 rounded-lg">
              <div class="text-sm text-blue-600">Общая стоимость</div>
              <div class="text-lg font-bold text-blue-800">{{ totalWithComputed }} ₽</div>
              <div class="text-xs text-blue-500 mt-1">
                Кэшируется автоматически
              </div>
            </div>
            
            <div class="p-3 bg-green-50 rounded-lg">
              <div class="text-sm text-green-600">Средняя цена</div>
              <div class="text-lg font-bold text-green-800">{{ averagePrice }} ₽</div>
              <div class="text-xs text-green-500 mt-1">
                Обновляется при изменении товаров
              </div>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-yellow-50 rounded-lg">
            <div class="flex justify-between items-center">
              <div>
                <div class="text-sm text-yellow-800">Дорогих товаров (>{{
                  expensiveThreshold }}₽):</div>
                <div class="font-medium text-yellow-900">
                  {{ expensiveItems.length }}
                </div>
              </div>
              <div class="text-xs text-yellow-600">
                Reactivity в действии
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка: мемоизация и v-once -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Мемоизация и v-once
          </h3>

          <!-- Демонстрация мемоизации -->
          <div class="mb-6">
            <div class="flex items-end gap-3 mb-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Число для тяжелых вычислений
                </label>
                <div class="flex gap-2">
                  <input
                    v-model="calculationInput"
                    type="range"
                    min="1"
                    max="10"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span class="text-lg font-bold text-blue-600 w-8 text-center">
                    {{ calculationInput }}
                  </span>
                </div>
              </div>
              
              <button
                @click="runCalculation"
                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Вычислить
              </button>
            </div>

            <div class="p-4 bg-gray-50 rounded-lg">
              <div class="grid grid-cols-2 gap-4">
                <div class="p-3 bg-purple-50 rounded-lg">
                  <div class="text-sm text-purple-600">Результат</div>
                  <div class="text-lg font-bold text-purple-800">
                    {{ calculationResult.toFixed(6) }}
                  </div>
                </div>
                
                <div class="p-3 bg-red-50 rounded-lg">
                  <div class="text-sm text-red-600">Вызовов функции</div>
                  <div class="text-lg font-bold text-red-800">
                    {{ heavyCalculationCalls }}
                  </div>
                  <div class="text-xs text-red-500 mt-1">
                    Без кэша: {{ calculationInput * 10 }}
                  </div>
                </div>
              </div>
              
              <div class="mt-3 text-sm text-gray-600">
                Мемоизация уменьшает вызовы тяжелой функции с {{ calculationInput * 10 }}
                до {{ heavyCalculationCalls }}
              </div>
            </div>
          </div>

          <!-- v-once демонстрация -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Директива v-once:</h4>
            
            <div class="p-4 bg-gray-900 text-gray-100 rounded-lg mb-3">
              <div class="text-green-400">&lt;!-- Статичный контент --&gt;</div>
              <div class="my-2">
                &lt;h1 <span class="text-yellow-300">v-once</span>&gt;
                <span class="text-blue-300">Статичный заголовок</span>
                &lt;/h1&gt;
              </div>
              <div class="my-2">
                &lt;p <span class="text-yellow-300">v-once</span>&gt;
                <span class="text-blue-300">Этот текст рендерится один раз</span>
                &lt;/p&gt;
              </div>
            </div>
            
            <div class="p-3 bg-green-50 rounded-lg">
              <p class="text-green-800 text-sm">
                <strong>v-once</strong> сообщает Vue, что элемент и его дочерние элементы
                считаются статичными и должны рендериться только один раз.
                При последующих обновлениях они пропускаются.
              </p>
            </div>
          </div>
        </div>

        <!-- Советы по оптимизации -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 class="font-semibold text-gray-900 mb-3">Практические советы:</h4>
          
          <div class="space-y-3">
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                  <div class="h-2 w-2 rounded-full bg-red-600"></div>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-700">Избегайте функций в шаблонах</p>
                <p class="text-gray-600 text-sm">
                  Функции вызываются при каждом рендере. Используйте computed свойства.
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <div class="h-2 w-2 rounded-full bg-green-600"></div>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-700">Разделяйте большие компоненты</p>
                <p class="text-gray-600 text-sm">
                  Мелкие компоненты обновляются независимо друг от друга.
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div class="h-2 w-2 rounded-full bg-blue-600"></div>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-700">Используйте v-once для статики</p>
                <p class="text-gray-600 text-sm">
                  Помечайте статичные части шаблона, чтобы Vue их пропускал.
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <div class="h-2 w-2 rounded-full bg-purple-600"></div>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-700">Мемоизируйте тяжелые вычисления</p>
                <p class="text-gray-600 text-sm">
                  Кэшируйте результаты дорогих операций, которые не меняются часто.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>