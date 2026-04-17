<script setup>
import { ref, onMounted } from 'vue'
import ChildComponent from './ChildComponent.vue'

// Ref на дочерний компонент
const childRef = ref(null)

// Multiple refs
const childRefs = ref([])

// Динамический компонент
const dynamicComponent = ref(null)

onMounted(() => {
  console.log('Child ref доступен:', childRef.value)
  
  if (childRef.value) {
    console.log('Методы child компонента:', childRef.value)
  }
})

const callChildMethod = () => {
  if (childRef.value) {
    childRef.value.incrementCounter()
  }
}

const getChildState = () => {
  if (childRef.value) {
    const state = childRef.value.getState()
    alert(`Состояние child компонента:\nСчетчик: ${state.counter}\nСообщение: ${state.message}`)
  }
}

const setChildRef = (el, index) => {
  childRefs.value[index] = el
}

const callMultipleMethods = () => {
  childRefs.value.forEach((child, index) => {
    if (child) {
      child.incrementCounter()
      console.log(`Дочерний компонент ${index + 1} обновлен`)
    }
  })
}

const resetAll = () => {
  childRefs.value.forEach((child) => {
    if (child) {
      child.resetCounter()
    }
  })
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Refs на компоненты</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: Базовый ref на компонент -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Ref на дочерний компонент</h3>
          
          <div class="mb-4">
            <ChildComponent ref="childRef" />
            
            <div class="flex gap-2 mt-4">
              <button
                @click="callChildMethod"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Вызвать метод child
              </button>
              <button
                @click="getChildState"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Получить состояние
              </button>
            </div>
          </div>
          
          <div class="p-3 bg-blue-50 rounded-lg">
            <p class="text-blue-800 text-sm">
              Template ref на компонент даёт доступ к его публичным методам
              и свойствам через <code class="bg-blue-100 px-1 rounded">defineExpose</code>.
            </p>
          </div>
        </div>

        <!-- Динамический компонент -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Динамический компонент</h3>
          
          <div class="mb-4">
            <ChildComponent
              :ref="(el) => dynamicComponent = el"
              :initial-message="'Динамический child'"
            />
            
            <button
              @click="dynamicComponent?.incrementCounter()"
              class="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Вызвать метод динамического компонента
            </button>
          </div>
          
          <div class="p-3 bg-purple-50 rounded-lg">
            <p class="text-purple-800 text-sm">
              Ref можно установить динамически через функцию, которая получает
              экземпляр компонента как аргумент.
            </p>
          </div>
        </div>
      </div>

      <!-- Правая колонка: Multiple refs -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Несколько refs на компоненты</h3>
          
          <div class="mb-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <ChildComponent
                v-for="index in 4"
                :key="index"
                :ref="(el) => setChildRef(el, index - 1)"
                :initial-message="`Child ${index}`"
              />
            </div>
            
            <div class="flex gap-2">
              <button
                @click="callMultipleMethods"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Вызвать у всех
              </button>
              <button
                @click="resetAll"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Сбросить все
              </button>
            </div>
          </div>
        </div>

        <!-- Ограничения и правила -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Ограничения и правила</h3>
          
          <div class="space-y-3">
            <div class="flex items-start p-3 bg-red-50 rounded-lg">
              <div class="flex-shrink-0 mt-1">
                <div class="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                  <span class="text-red-600 text-sm">!</span>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-red-800">Только публичные методы</p>
                <p class="text-red-600 text-sm">
                  Доступны только методы, объявленные в defineExpose
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
                <p class="font-medium text-yellow-800">Композиция лучше наследования</p>
                <p class="text-yellow-600 text-sm">
                  Используйте props и events вместо прямого доступа к методам
                </p>
              </div>
            </div>
            
            <div class="flex items-start p-3 bg-green-50 rounded-lg">
              <div class="flex-shrink-0 mt-1">
                <div class="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-600 text-sm">✓</span>
                </div>
              </div>
              <div class="ml-3">
                <p class="font-medium text-green-800">Для интеграции с библиотеками</p>
                <p class="text-green-600 text-sm">
                  Идеально для передачи в сторонние библиотеки
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>