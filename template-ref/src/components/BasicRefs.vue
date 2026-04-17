<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Basic template ref
const basicInput = ref(null)
const showInput = ref(false)
const basicMessage = ref('')

// Ref с условным рендерингом
const conditionalInput = ref(null)
const showConditional = ref(false)
const conditionalMessage = ref('')

// Ref с v-for
const listItems = ref(['Первый', 'Второй', 'Третий'])
const itemRefs = ref([])

onMounted(() => {
  console.log('Компонент смонтирован')
  console.log('basicInput при монтировании:', basicInput.value)
  
  // Демонстрация nextTick
  setTimeout(() => {
    console.log('basicInput после setTimeout:', basicInput.value)
  }, 0)
})

const toggleInput = async () => {
  showInput.value = !showInput.value
  
  if (showInput.value) {
    await nextTick()
    console.log('Input появился, ref:', basicInput.value)
    
    if (basicInput.value) {
      basicInput.value.focus()
      basicMessage.value = 'Фокус установлен!'
    }
  } else {
    basicMessage.value = ''
  }
}

const toggleConditional = async () => {
  showConditional.value = !showConditional.value
  
  if (showConditional.value) {
    await nextTick()
    console.log('Условный input появился, ref:', conditionalInput.value)
    
    if (conditionalInput.value) {
      conditionalInput.value.focus()
      conditionalMessage.value = 'Условный фокус установлен'
    }
  } else {
    conditionalMessage.value = ''
  }
}

const logRefs = () => {
  console.log('Refs элементов списка:', itemRefs.value)
  
  itemRefs.value.forEach((el, index) => {
    if (el) {
      console.log(`Элемент ${index}:`, el.textContent)
    }
  })
}

const setRef = (el, index) => {
  itemRefs.value[index] = el
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Базовые template refs</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: Основные refs -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Базовый template ref</h3>
          
          <div class="mb-4">
            <div class="flex gap-3 mb-3">
              <input
                v-if="showInput"
                ref="basicInput"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Введите текст..."
              />
              <button
                @click="toggleInput"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ showInput ? 'Скрыть' : 'Показать' }}
              </button>
            </div>
            
            <div v-if="basicMessage" class="p-3 bg-blue-50 rounded-lg">
              <p class="text-blue-800">{{ basicMessage }}</p>
            </div>
            
            <div class="mt-3 p-3 bg-gray-50 rounded-lg">
              <p class="text-gray-600 text-sm">
                Значение ref: <code class="bg-gray-100 px-1 rounded">{{ basicInput }}</code>
              </p>
              <p class="text-gray-600 text-sm mt-1">
                При скрытии элемента ref становится <code class="bg-gray-100 px-1 rounded">null</code>
              </p>
            </div>
          </div>
        </div>

        <!-- Ref с v-for -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Refs в v-for</h3>
          
          <div class="mb-4">
            <div class="space-y-2">
              <div
                v-for="(item, index) in listItems"
                :key="index"
                :ref="(el) => setRef(el, index)"
                class="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                {{ item }}
              </div>
            </div>
            
            <button
              @click="logRefs"
              class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Логировать refs в консоль
            </button>
          </div>
          
          <div class="p-3 bg-purple-50 rounded-lg">
            <p class="text-purple-800 text-sm">
              Функция ref в v-for получает элемент и его индекс.
              Все refs хранятся в массиве для доступа к каждому элементу.
            </p>
          </div>
        </div>
      </div>

      <!-- Правая колонка: Условный рендеринг и nextTick -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Условный рендеринг</h3>
          
          <div class="mb-4">
            <div class="flex gap-3 mb-3">
              <input
                v-if="showConditional"
                ref="conditionalInput"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Условный input..."
              />
              <button
                @click="toggleConditional"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {{ showConditional ? 'Скрыть' : 'Показать' }}
              </button>
            </div>
            
            <div v-if="conditionalMessage" class="p-3 bg-green-50 rounded-lg">
              <p class="text-green-800">{{ conditionalMessage }}</p>
            </div>
            
            <div class="mt-3 p-3 bg-gray-50 rounded-lg">
              <p class="text-gray-600 text-sm">
                При появлении элемента требуется <code class="bg-gray-100 px-1 rounded">nextTick()</code>,
                чтобы дождаться обновления DOM перед доступом к ref.
              </p>
            </div>
          </div>
        </div>

        <!-- Информация о refs -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Важные моменты</h3>
          
          <div class="space-y-3">
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                  <div class="h-2 w-2 rounded-full bg-red-600"></div>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-700">Ref инициализируется как null</p>
                <p class="text-gray-600 text-sm">
                  DOM ещё не существует при создании компонента
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
                <p class="font-medium text-gray-700">Используйте onMounted или nextTick</p>
                <p class="text-gray-600 text-sm">
                  DOM доступен только после монтирования компонента
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
                <p class="font-medium text-gray-700">Ref становится null при удалении элемента</p>
                <p class="text-gray-600 text-sm">
                  Всегда проверяйте наличие элемента перед использованием
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>