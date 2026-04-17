<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Автофокус при монтировании
const autoFocusInput = ref(null)

// Фокус по клику
const focusInput = ref(null)
const focusButton = ref(null)

// Фокус по навигации
const inputs = ref(Array(4).fill(null))
const activeInputIndex = ref(0)

// Фокус в модальном окне
const showModal = ref(false)
const modalInput = ref(null)

onMounted(() => {
  // Автофокус при загрузке
  if (autoFocusInput.value) {
    autoFocusInput.value.focus()
  }
  
  // Фокус на кнопку при монтировании
  if (focusButton.value) {
    focusButton.value.focus()
  }
})

const setInputRef = (el, index) => {
  inputs.value[index] = el
}

const focusNextInput = () => {
  if (activeInputIndex.value < inputs.value.length - 1) {
    activeInputIndex.value++
    setTimeout(() => {
      if (inputs.value[activeInputIndex.value]) {
        inputs.value[activeInputIndex.value].focus()
      }
    }, 10)
  }
}

const focusPrevInput = () => {
  if (activeInputIndex.value > 0) {
    activeInputIndex.value--
    setTimeout(() => {
      if (inputs.value[activeInputIndex.value]) {
        inputs.value[activeInputIndex.value].focus()
      }
    }, 10)
  }
}

const openModal = async () => {
  showModal.value = true
  await nextTick()
  
  if (modalInput.value) {
    modalInput.value.focus()
  }
}

const closeModal = () => {
  showModal.value = false
}

const handleModalKeydown = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Управление фокусом</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: Базовые примеры -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Автофокус при монтировании</h3>
          
          <div class="mb-4">
            <input
              ref="autoFocusInput"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Фокус установлен автоматически"
            />
            <p class="mt-2 text-gray-600 text-sm">
              Фокус устанавливается в хуке onMounted после рендеринга компонента
            </p>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Фокус по клику</h3>
          
          <div class="mb-4">
            <div class="flex gap-3 mb-3">
              <input
                ref="focusInput"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none"
                placeholder="Нажмите кнопку для фокуса"
              />
              <button
                ref="focusButton"
                @click="focusInput?.focus()"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Установить фокус
              </button>
            </div>
            
            <div class="p-3 bg-blue-50 rounded-lg">
              <p class="text-blue-800 text-sm">
                Кнопка получает фокус при монтировании, при её нажатии фокус
                переходит на input через template ref
              </p>
            </div>
          </div>
        </div>

        <!-- Фокус в модальном окне -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Фокус в модальном окне</h3>
          
          <div class="mb-4">
            <button
              @click="openModal"
              class="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Открыть модальное окно
            </button>
          </div>
          
          <div
            v-if="showModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="closeModal"
          >
            <div
              class="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              @keydown="handleModalKeydown"
            >
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Модальное окно</h4>
              
              <input
                ref="modalInput"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 outline-none"
                placeholder="Автофокус при открытии"
              />
              
              <div class="flex justify-between">
                <button
                  @click="closeModal"
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Отмена
                </button>
                <button
                  @click="closeModal"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Сохранить
                </button>
              </div>
              
              <p class="mt-4 text-gray-600 text-sm">
                Нажмите Escape для закрытия окна
              </p>
            </div>
          </div>
          
          <div class="p-3 bg-purple-50 rounded-lg">
            <p class="text-purple-800 text-sm">
              При открытии модального окна требуется nextTick() для ожидания
              рендеринга DOM перед установкой фокуса
            </p>
          </div>
        </div>
      </div>

      <!-- Правая колонка: Навигация по форме -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Навигация по форме</h3>
          
          <div class="space-y-4">
            <div
              v-for="index in 4"
              :key="index"
              class="flex items-center gap-3"
            >
              <span class="text-gray-600 w-8">#{{ index }}</span>
              <input
                :ref="(el) => setInputRef(el, index - 1)"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none"
                :class="{ 'ring-2 ring-blue-500 border-blue-500': activeInputIndex === index - 1 }"
                :placeholder="`Поле ${index}`"
                @focus="activeInputIndex = index - 1"
              />
            </div>
          </div>
          
          <div class="flex gap-2 mt-4">
            <button
              @click="focusPrevInput"
              :disabled="activeInputIndex === 0"
              class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              ← Предыдущее
            </button>
            <button
              @click="focusNextInput"
              :disabled="activeInputIndex === inputs.length - 1"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Следующее →
            </button>
          </div>
          
          <div class="mt-4 p-3 bg-blue-50 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Активное поле: {{ activeInputIndex + 1 }}</span>
              <span class="text-blue-600 text-sm">
                Используйте кнопки для навигации
              </span>
            </div>
          </div>
        </div>

        <!-- Советы по управлению фокусом -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Советы по управлению фокусом</h3>
          
          <div class="space-y-3">
            <div class="flex items-start p-3 bg-green-50 rounded-lg">
              <div class="flex-shrink-0 mt-1">
                <div class="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-600 text-sm">✓</span>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-green-800">Всегда используйте nextTick</p>
                <p class="text-green-600 text-sm">
                  При работе с условно рендерящимися элементами
                </p>
              </div>
            </div>
            
            <div class="flex items-start p-3 bg-yellow-50 rounded-lg">
              <div class="flex-shrink-0 mt-1">
                <div class="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span class="text-yellow-600 text-sm">!</span>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-yellow-800">Проверяйте наличие элемента</p>
                <p class="text-yellow-600 text-sm">
                  Перед вызовом методов фокуса
                </p>
              </div>
            </div>
            
            <div class="flex items-start p-3 bg-purple-50 rounded-lg">
              <div class="flex-shrink-0 mt-1">
                <div class="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <span class="text-purple-600 text-sm">#</span>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-purple-800">Управляйте навигацией</p>
                <p class="text-purple-600 text-sm">
                  Создавайте удобные интерфейсы с клавиатурной навигацией
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>