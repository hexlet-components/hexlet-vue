<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Демонстрация производительности
const heavyListSize = ref(100)
const useKeys = ref(true)
const renderTime = ref(0)
const fps = ref(0)
const frameCount = ref(0)
const lastTime = ref(0)

// Генерация тяжелого списка
const heavyList = computed(() => {
  const start = performance.now()
  const list = Array.from({ length: heavyListSize.value }, (_, i) => ({
    id: useKeys.value ? `item-${i}` : i,
    name: `Элемент ${i + 1}`,
    value: Math.random() * 1000,
    color: `hsl(${(i * 10) % 360}, 70%, 80%)`
  }))
  
  renderTime.value = performance.now() - start
  return list
})

// Операции со списком
const shuffleList = () => {
  const array = [...heavyList.value]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  // В реальном приложении здесь было бы обновление реактивных данных
  console.log('Список перемешан (в реальном приложении здесь было бы обновление данных)')
}

const updateAllValues = () => {
  // В реальном приложении здесь обновлялись бы значения
  console.log('Все значения обновлены (в реальном приложении здесь было бы обновление данных)')
}

// FPS счетчик
const updateFPS = () => {
  const now = performance.now()
  frameCount.value++
  
  if (now >= lastTime.value + 1000) {
    fps.value = frameCount.value
    frameCount.value = 0
    lastTime.value = now
  }
  
  requestAnimationFrame(updateFPS)
}

onMounted(() => {
  lastTime.value = performance.now()
  requestAnimationFrame(updateFPS)
})

// DevTools интеграция
const devToolsInfo = ref('')

if (typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
  devToolsInfo.value = 'Vue DevTools доступны'
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Производительность и мониторинг</h2>
    
    <div class="mb-8">
      <p class="text-gray-600 mb-4">
        Наблюдайте за производительностью рендеринга и учитесь оптимизировать
        обновления Virtual DOM. Используйте Vue DevTools для анализа.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: тяжелый список -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Тяжелый список</h3>
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <span class="text-sm text-gray-600 mr-3">Ключи:</span>
                <button
                  @click="useKeys = !useKeys"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  :class="useKeys ? 'bg-green-600' : 'bg-gray-300'"
                >
                  <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    :class="useKeys ? 'translate-x-6' : 'translate-x-1'"
                  />
                </button>
              </div>
              
              <div class="text-sm">
                <span class="text-gray-600">Элементов:</span>
                <span class="font-bold text-blue-600 ml-2">{{ heavyListSize }}</span>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Размер списка: {{ heavyListSize }}
                </label>
                <input
                  v-model="heavyListSize"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10</span>
                  <span>250</span>
                  <span>500</span>
                </div>
              </div>
              
              <div class="flex gap-2">
                <button
                  @click="shuffleList"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Перемешать
                </button>
                <button
                  @click="updateAllValues"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Обновить все
                </button>
              </div>
            </div>
          </div>

          <!-- Список -->
          <div class="h-96 overflow-y-auto border border-gray-200 rounded-lg">
            <div class="p-2">
              <div
                v-for="item in heavyList"
                :key="useKeys ? item.id : undefined"
                class="p-3 mb-2 rounded-lg transition-all duration-200 hover:shadow-md"
                :style="{ backgroundColor: item.color }"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <span class="font-medium text-gray-900">{{ item.name }}</span>
                    <span class="text-sm text-gray-700 ml-2">ID: {{ useKeys ? item.id : 'no-key' }}</span>
                  </div>
                  <div class="text-lg font-bold text-gray-800">
                    {{ item.value.toFixed(2) }}
                  </div>
                </div>
                <div class="mt-2 text-xs text-gray-600">
                  Сгенерирован: {{ new Date().toLocaleTimeString() }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Метрики производительности -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 class="font-semibold text-gray-900 mb-3">Метрики производительности</h4>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div class="text-sm text-blue-600">Время рендеринга</div>
              <div class="text-2xl font-bold text-blue-800">{{ renderTime.toFixed(2) }} мс</div>
              <div class="text-xs text-blue-500 mt-1">
                Создание виртуального дерева
              </div>
            </div>
            
            <div class="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div class="text-sm text-green-600">FPS</div>
              <div class="text-2xl font-bold" :class="fps >= 50 ? 'text-green-800' : fps >= 30 ? 'text-yellow-600' : 'text-red-600'">
                {{ fps }}
              </div>
              <div class="text-xs text-green-500 mt-1">
                Кадров в секунду
              </div>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm text-gray-700">Элементов в DOM:</div>
                <div class="font-medium text-gray-900">{{ heavyListSize * 3 }}</div>
              </div>
              <div class="text-xs text-gray-500">
                {{ useKeys ? 'С ключами' : 'Без ключей' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка: советы и DevTools -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Vue DevTools и отладка
          </h3>

          <div class="mb-6">
            <p class="text-gray-600 mb-4">
              Используйте Vue DevTools для анализа производительности и
              отслеживания обновлений компонентов.
            </p>

            <div class="p-4 bg-gray-900 text-gray-100 rounded-lg mb-4">
              <div class="text-green-400">// Установка Vue DevTools</div>
              <div class="my-2">
                <span class="text-blue-400">npm install</span> @vue/devtools
              </div>
              <div class="my-2">
                <span class="text-purple-400">// Или расширение для браузера</span>
              </div>
              <div class="my-2">
                <span class="text-yellow-300">chrome://extensions</span> →
                <span class="text-blue-300">Vue.js devtools</span>
              </div>
            </div>
          </div>

          <!-- Возможности DevTools -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Возможности DevTools:</h4>
            
            <div class="space-y-3">
              <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-blue-600 text-sm">1</span>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="font-medium text-blue-800">Inspector компонентов</p>
                  <p class="text-blue-600 text-sm">
                    Просмотр дерева компонентов и их состояния
                  </p>
                </div>
              </div>
              
              <div class="flex items-center p-3 bg-green-50 rounded-lg">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span class="text-green-600 text-sm">2</span>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="font-medium text-green-800">Timeline</p>
                  <p class="text-green-600 text-sm">
                    Отслеживание событий и обновлений компонентов
                  </p>
                </div>
              </div>
              
              <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span class="text-purple-600 text-sm">3</span>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="font-medium text-purple-800">Performance</p>
                  <p class="text-purple-600 text-sm">
                    Профилирование рендеринга и поиск узких мест
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Чеклист производительности -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 class="font-semibold text-gray-900 mb-3">Чеклист производительности</h4>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-5 w-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <div v-if="useKeys" class="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <span class="ml-3 text-gray-700">Ключи в v-for</span>
              </div>
              <span class="text-sm" :class="useKeys ? 'text-green-600' : 'text-red-600'">
                {{ useKeys ? '✓' : '✗' }}
              </span>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-5 w-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <div class="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <span class="ml-3 text-gray-700">Разделение компонентов</span>
              </div>
              <span class="text-green-600 text-sm">✓</span>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-5 w-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <div class="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <span class="ml-3 text-gray-700">Computed свойства</span>
              </div>
              <span class="text-green-600 text-sm">✓</span>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-5 w-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <div class="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <span class="ml-3 text-gray-700">FPS > 50</span>
              </div>
              <span class="text-sm" :class="fps >= 50 ? 'text-green-600' : 'text-red-600'">
                {{ fps >= 50 ? '✓' : '✗' }}
              </span>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <p class="text-blue-800 text-sm">
              <strong>Совет:</strong> Используйте режим производительности в DevTools
              для поиска компонентов, которые перерисовываются слишком часто.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Заключение -->
    <div class="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
      <h4 class="text-lg font-semibold text-gray-900 mb-3">Итог</h4>
      <p class="text-gray-600">
        Virtual DOM в Vue — это мощный механизм, который автоматически оптимизирует обновления интерфейса.
        Понимание его работы позволяет писать более производительные приложения.
        Ключевые принципы: используйте ключи в списках, выносите вычисления в computed свойства,
        разделяйте большие компоненты и наблюдайте за производительностью через DevTools.
      </p>
    </div>
  </div>
</template>