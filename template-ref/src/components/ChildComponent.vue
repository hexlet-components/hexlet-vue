<script setup>
import { ref, defineExpose } from 'vue'

const props = defineProps({
  initialMessage: {
    type: String,
    default: 'Дочерний компонент'
  }
})

const counter = ref(0)
const message = ref(props.initialMessage)

const incrementCounter = () => {
  counter.value++
  message.value = `Счетчик: ${counter.value}`
}

const resetCounter = () => {
  counter.value = 0
  message.value = props.initialMessage
}

const getState = () => {
  return {
    counter: counter.value,
    message: message.value
  }
}

// Экспортируем публичные методы
defineExpose({
  incrementCounter,
  resetCounter,
  getState,
  counter
})
</script>

<template>
  <div class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
    <h4 class="font-semibold text-blue-800 mb-2">{{ message }}</h4>
    <div class="flex items-center justify-between">
      <span class="text-blue-600">Счетчик: {{ counter }}</span>
      <button
        @click="incrementCounter"
        class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
      >
        +
      </button>
    </div>
    <p class="mt-2 text-xs text-blue-500">
      defineExpose открывает публичные методы
    </p>
  </div>
</template>