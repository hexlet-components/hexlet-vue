<script setup>
import { inject } from 'vue'
import { THEME_KEY } from '../keys'

const { theme } = inject(THEME_KEY)
const deepData = inject('deepData')

const updateFromBottom = () => {
  deepData.message = 'Обновлено с самого нижнего уровня!'
  deepData.level = 5
  deepData.timestamp = new Date().toLocaleTimeString()
}
</script>

<template>
  <div class="p-4 rounded-lg border ml-16"
    :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-red-50 border-red-200'">
    <div class="flex justify-between items-center mb-2">
      <h5 class="font-medium">Уровень 5: LevelFive</h5>
      <button
        @click="updateFromBottom"
        class="text-sm px-3 py-1 rounded"
        :class="theme === 'dark' 
          ? 'bg-red-700 hover:bg-red-600' 
          : 'bg-red-100 hover:bg-red-200'">
        Обновить снизу
      </button>
    </div>
    
    <div class="p-3 rounded mt-2"
      :class="theme === 'dark' ? 'bg-gray-900' : 'bg-white'">
      <p class="text-sm font-medium mb-1">Получено через inject:</p>
      <p class="font-bold">{{ deepData.message }}</p>
      <p class="text-xs opacity-80 mt-1">
        Уровень: {{ deepData.level }}, Время: {{ deepData.timestamp }}
      </p>
    </div>
    
    <p class="text-xs opacity-80 mt-3">
      Этот компонент находится на 5-м уровне вложенности, но имеет прямой доступ к данным
      через inject без передачи через промежуточные компоненты.
    </p>
  </div>
</template>