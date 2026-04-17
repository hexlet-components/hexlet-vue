<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Измерение одного элемента
const measuredElement = ref(null)
const elementMetrics = ref({
  width: 0,
  height: 0,
  offsetTop: 0,
  offsetLeft: 0,
  scrollWidth: 0,
  scrollHeight: 0
})

// Измерение при ресайзе
const resizableElement = ref(null)
const resizeMetrics = ref({ width: 0, height: 0 })
const resizeObserver = ref(null)

// Измерение текста
const textElement = ref(null)
const textMetrics = ref({
  textContent: '',
  textLength: 0,
  scrollWidth: 0,
  offsetWidth: 0
})

// Измерение viewport
const viewportMetrics = ref({
  width: 0,
  height: 0,
  scrollX: 0,
  scrollY: 0
})

onMounted(() => {
  // Измерение элемента при монтировании
  updateElementMetrics()
  
  // Настройка ResizeObserver
  if (resizableElement.value) {
    resizeObserver.value = new ResizeObserver((entries) => {
      for (const entry of entries) {
        resizeMetrics.value = {
          width: Math.round(entry.contentRect.width),
          height: Math.round(entry.contentRect.height)
        }
      }
    })
    
    resizeObserver.value.observe(resizableElement.value)
    
    // Начальные размеры
    if (resizableElement.value) {
      resizeMetrics.value = {
        width: Math.round(resizableElement.value.offsetWidth),
        height: Math.round(resizableElement.value.offsetHeight)
      }
    }
  }
  
  // Измерение viewport
  updateViewportMetrics()
  window.addEventListener('resize', updateViewportMetrics)
  window.addEventListener('scroll', updateViewportMetrics)
  
  // Измерение текста
  updateTextMetrics()
})

onUnmounted(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
  
  window.removeEventListener('resize', updateViewportMetrics)
  window.removeEventListener('scroll', updateViewportMetrics)
})

const updateElementMetrics = () => {
  if (measuredElement.value) {
    const rect = measuredElement.value.getBoundingClientRect()
    elementMetrics.value = {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      offsetTop: Math.round(measuredElement.value.offsetTop),
      offsetLeft: Math.round(measuredElement.value.offsetLeft),
      scrollWidth: Math.round(measuredElement.value.scrollWidth),
      scrollHeight: Math.round(measuredElement.value.scrollHeight)
    }
  }
}

const updateTextMetrics = () => {
  if (textElement.value) {
    textMetrics.value = {
      textContent: textElement.value.textContent,
      textLength: textElement.value.textContent.length,
      scrollWidth: Math.round(textElement.value.scrollWidth),
      offsetWidth: Math.round(textElement.value.offsetWidth)
    }
  }
}

const updateViewportMetrics = () => {
  viewportMetrics.value = {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY
  }
}

const updateContent = () => {
  if (measuredElement.value) {
    const newContent = 'Новый контент с другим размером текста, который влияет на размеры элемента'
    measuredElement.value.textContent = newContent
    updateElementMetrics()
  }
}

const updateText = () => {
  if (textElement.value) {
    const texts = [
      'Короткий текст',
      'Средний текст, который занимает немного больше места',
      'Очень длинный текст, который точно не поместится в контейнер и вызовет переполнение'
    ]
    const randomText = texts[Math.floor(Math.random() * texts.length)]
    textElement.value.textContent = randomText
    updateTextMetrics()
  }
}

const resizeElement = () => {
  if (resizableElement.value) {
    const widths = [200, 300, 400, 500]
    const heights = [100, 150, 200, 250]
    const randomWidth = widths[Math.floor(Math.random() * widths.length)]
    const randomHeight = heights[Math.floor(Math.random() * heights.length)]
    
    resizableElement.value.style.width = `${randomWidth}px`
    resizableElement.value.style.height = `${randomHeight}px`
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Измерение элементов</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: Измерение размеров -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Измерение размеров элемента</h3>
          
          <div class="mb-4">
            <div
              ref="measuredElement"
              class="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg border border-blue-300 mb-4 transition-all duration-300"
            >
              <p class="text-blue-800">
                Этот элемент измеряется через template ref.
                Его размеры можно получить с помощью getBoundingClientRect()
                и других свойств DOM.
              </p>
            </div>
            
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="text-sm text-blue-600">Ширина</div>
                <div class="text-lg font-bold text-blue-800">{{ elementMetrics.width }}px</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="text-sm text-green-600">Высота</div>
                <div class="text-lg font-bold text-green-800">{{ elementMetrics.height }}px</div>
              </div>
              <div class="p-3 bg-purple-50 rounded-lg">
                <div class="text-sm text-purple-600">Отступ сверху</div>
                <div class="text-lg font-bold text-purple-800">{{ elementMetrics.offsetTop }}px</div>
              </div>
              <div class="p-3 bg-yellow-50 rounded-lg">
                <div class="text-sm text-yellow-600">Отступ слева</div>
                <div class="text-lg font-bold text-yellow-800">{{ elementMetrics.offsetLeft }}px</div>
              </div>
            </div>
            
            <button
              @click="updateContent"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Изменить контент и обновить метрики
            </button>
          </div>
        </div>

        <!-- Измерение текста -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Измерение текста</h3>
          
          <div class="mb-4">
            <div
              ref="textElement"
              class="p-3 bg-gray-100 rounded-lg border border-gray-300 mb-4 overflow-hidden whitespace-nowrap"
            >
              Исходный текст для измерения
            </div>
            
            <div class="space-y-2 mb-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Длина текста:</span>
                <span class="font-medium">{{ textMetrics.textLength }} символов</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Требуемая ширина:</span>
                <span class="font-medium">{{ textMetrics.scrollWidth }}px</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Фактическая ширина:</span>
                <span class="font-medium">{{ textMetrics.offsetWidth }}px</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Переполнение:</span>
                <span class="font-medium" :class="textMetrics.scrollWidth > textMetrics.offsetWidth ? 'text-red-600' : 'text-green-600'">
                  {{ textMetrics.scrollWidth > textMetrics.offsetWidth ? 'Есть' : 'Нет' }}
                </span>
              </div>
            </div>
            
            <button
              @click="updateText"
              class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Изменить текст
            </button>
          </div>
        </div>
      </div>

      <!-- Правая колонка: Ресайз и viewport -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Наблюдение за изменением размеров</h3>
          
          <div class="mb-4">
            <div
              ref="resizableElement"
              class="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg border border-green-300 mb-4 transition-all duration-300"
              style="width: 300px; height: 150px;"
            >
              <p class="text-green-800">
                Этот элемент отслеживается ResizeObserver.
                При изменении его размеров метрики обновляются автоматически.
              </p>
            </div>
            
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="text-sm text-green-600">Текущая ширина</div>
                <div class="text-lg font-bold text-green-800">{{ resizeMetrics.width }}px</div>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="text-sm text-blue-600">Текущая высота</div>
                <div class="text-lg font-bold text-blue-800">{{ resizeMetrics.height }}px</div>
              </div>
            </div>
            
            <button
              @click="resizeElement"
              class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Изменить размер
            </button>
          </div>
          
          <div class="p-3 bg-yellow-50 rounded-lg">
            <p class="text-yellow-800 text-sm">
              ResizeObserver автоматически отслеживает изменения размеров элемента.
              Не забудьте отключить наблюдение в хуке onUnmounted.
            </p>
          </div>
        </div>

        <!-- Измерение viewport -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Измерение viewport</h3>
          
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="text-sm text-gray-600">Ширина окна</div>
              <div class="text-lg font-bold text-gray-800">{{ viewportMetrics.width }}px</div>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="text-sm text-gray-600">Высота окна</div>
              <div class="text-lg font-bold text-gray-800">{{ viewportMetrics.height }}px</div>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="text-sm text-gray-600">Прокрутка по X</div>
              <div class="text-lg font-bold text-gray-800">{{ viewportMetrics.scrollX }}px</div>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="text-sm text-gray-600">Прокрутка по Y</div>
              <div class="text-lg font-bold text-gray-800">{{ viewportMetrics.scrollY }}px</div>
            </div>
          </div>
          
          <div class="p-3 bg-blue-50 rounded-lg">
            <p class="text-blue-800 text-sm">
              Метрики viewport обновляются при изменении размера окна и прокрутке.
              Используйте для адаптивного дизайна и отслеживания положения элементов.
            </p>
          </div>
        </div>

        <!-- Свойства для измерения -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Свойства DOM для измерения</h3>
          
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">offsetWidth/Height</code>
              <span class="text-gray-600 text-sm">Внешние размеры</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">clientWidth/Height</code>
              <span class="text-gray-600 text-sm">Внутренние размеры</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">scrollWidth/Height</code>
              <span class="text-gray-600 text-sm">Весь контент</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">getBoundingClientRect()</code>
              <span class="text-gray-600 text-sm">Точные размеры</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">scrollTop/Left</code>
              <span class="text-gray-600 text-sm">Позиция прокрутки</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>