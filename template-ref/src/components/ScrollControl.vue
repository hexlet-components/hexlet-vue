<script setup>
import { ref, onMounted } from 'vue'

// Базовый скроллинг
const scrollContainer = ref(null)
const scrollPosition = ref(0)

// Программная прокрутка к элементам
const itemsContainer = ref(null)
const items = ref(Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  text: `Элемент ${i + 1}`,
  ref: null
})))

// Smooth скроллинг
const smoothContainer = ref(null)

// Infinite scroll
const infiniteContainer = ref(null)
const infiniteItems = ref(Array.from({ length: 10 }, (_, i) => `Элемент ${i + 1}`))
const isLoading = ref(false)

onMounted(() => {
  // Обновление позиции прокрутки
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', updateScrollPosition)
  }
  
  // Infinite scroll observer
  if (infiniteContainer.value) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading.value) {
        loadMoreItems()
      }
    }, { threshold: 0.1 })
    
    observer.observe(infiniteContainer.value.lastElementChild)
  }
})

const updateScrollPosition = () => {
  if (scrollContainer.value) {
    const container = scrollContainer.value
    const maxScroll = container.scrollHeight - container.clientHeight
    const percentage = maxScroll > 0 ? (container.scrollTop / maxScroll) * 100 : 0
    scrollPosition.value = Math.round(percentage)
  }
}

const scrollToTop = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0
  }
}

const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  }
}

const scrollBy = (amount) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop += amount
  }
}

const scrollToItem = (index) => {
  if (itemsContainer.value && items.value[index]?.ref) {
    items.value[index].ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const smoothScrollTo = (position) => {
  if (smoothContainer.value) {
    smoothContainer.value.scrollTo({
      top: position,
      behavior: 'smooth'
    })
  }
}

const setItemRef = (el, index) => {
  if (el) {
    items.value[index].ref = el
  }
}

const loadMoreItems = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  
  // Имитация загрузки
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const newItems = Array.from({ length: 5 }, (_, i) => 
    `Элемент ${infiniteItems.value.length + i + 1}`
  )
  
  infiniteItems.value.push(...newItems)
  isLoading.value = false
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Управление прокруткой</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: Базовый скроллинг -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Базовый скроллинг</h3>
          
          <div class="mb-4">
            <div
              ref="scrollContainer"
              class="h-64 overflow-y-auto border border-gray-300 rounded-lg mb-4"
            >
              <div class="p-4 space-y-2">
                <div
                  v-for="n in 30"
                  :key="n"
                  class="p-3 bg-gray-50 rounded border border-gray-200"
                >
                  Элемент {{ n }}
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-3 mb-4">
              <div class="flex-1">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Верх</span>
                  <span>Позиция: {{ scrollPosition }}%</span>
                  <span>Низ</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-blue-600 transition-all duration-300"
                    :style="{ width: `${scrollPosition}%` }"
                  ></div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-4 gap-2">
              <button
                @click="scrollToTop"
                class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                ↑ Вверх
              </button>
              <button
                @click="scrollBy(-100)"
                class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                -100px
              </button>
              <button
                @click="scrollBy(100)"
                class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                +100px
              </button>
              <button
                @click="scrollToBottom"
                class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                ↓ Вниз
              </button>
            </div>
          </div>
        </div>

        <!-- Smooth скроллинг -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Smooth скроллинг</h3>
          
          <div class="mb-4">
            <div
              ref="smoothContainer"
              class="h-48 overflow-y-auto border border-gray-300 rounded-lg mb-4"
            >
              <div class="p-4 space-y-8">
                <div
                  v-for="n in 8"
                  :key="n"
                  :id="`section-${n}`"
                  class="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg"
                >
                  <h4 class="font-semibold text-purple-800 mb-2">Секция {{ n }}</h4>
                  <p class="text-purple-600">Содержимое секции {{ n }}</p>
                </div>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <button
                v-for="n in 8"
                :key="n"
                @click="smoothScrollTo((n - 1) * 120)"
                class="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Секция {{ n }}
              </button>
            </div>
          </div>
          
          <div class="p-3 bg-purple-50 rounded-lg">
            <p class="text-purple-800 text-sm">
              Метод <code class="bg-purple-100 px-1 rounded">scrollTo</code> с параметром
              <code class="bg-purple-100 px-1 rounded">behavior: 'smooth'</code> создаёт
              плавную анимацию прокрутки.
            </p>
          </div>
        </div>
      </div>

      <!-- Правая колонка: Продвинутый скроллинг -->
      <div class="space-y-6">
        <!-- Прокрутка к элементам -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Прокрутка к элементам</h3>
          
          <div class="mb-4">
            <div
              ref="itemsContainer"
              class="h-64 overflow-y-auto border border-gray-300 rounded-lg mb-4"
            >
              <div class="p-4 space-y-2">
                <div
                  v-for="(item, index) in items"
                  :key="item.id"
                  :ref="(el) => setItemRef(el, index)"
                  class="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  {{ item.text }}
                </div>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <button
                v-for="n in 5"
                :key="n"
                @click="scrollToItem((n - 1) * 4)"
                class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                К элементу {{ (n - 1) * 4 + 1 }}
              </button>
            </div>
          </div>
          
          <div class="p-3 bg-green-50 rounded-lg">
            <p class="text-green-800 text-sm">
              Метод <code class="bg-green-100 px-1 rounded">scrollIntoView</code> прокручивает
              элемент в область видимости. Можно задать поведение и выравнивание.
            </p>
          </div>
        </div>

        <!-- Infinite scroll -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Infinite scroll</h3>
          
          <div class="mb-4">
            <div
              ref="infiniteContainer"
              class="h-64 overflow-y-auto border border-gray-300 rounded-lg mb-4"
            >
              <div class="p-4 space-y-2">
                <div
                  v-for="(item, index) in infiniteItems"
                  :key="index"
                  class="p-3 bg-gray-50 rounded border border-gray-200"
                >
                  {{ item }}
                </div>
                <div
                  v-if="isLoading"
                  class="p-4 text-center text-gray-600"
                >
                  Загрузка...
                </div>
              </div>
            </div>
            
            <div class="p-3 bg-yellow-50 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-yellow-800">Загружено элементов:</span>
                  <span class="font-medium ml-2">{{ infiniteItems.length }}</span>
                </div>
                <span class="text-yellow-600 text-sm">
                  Скролл до конца для загрузки
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Свойства для прокрутки -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Свойства и методы прокрутки</h3>
          
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">scrollTop</code>
              <span class="text-gray-600 text-sm">Позиция прокрутки</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">scrollHeight</code>
              <span class="text-gray-600 text-sm">Высота всего контента</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">clientHeight</code>
              <span class="text-gray-600 text-sm">Высота видимой области</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">scrollTo()</code>
              <span class="text-gray-600 text-sm">Прокрутка к позиции</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <code class="text-sm text-gray-700">scrollIntoView()</code>
              <span class="text-gray-600 text-sm">Прокрутка к элементу</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>