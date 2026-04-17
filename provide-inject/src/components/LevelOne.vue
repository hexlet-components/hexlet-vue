<script setup>
import { inject } from 'vue'
import { THEME_KEY } from '../keys'

const { theme } = inject(THEME_KEY)
const deepData = inject('deepData')

// Обновляем данные
const updateData = () => {
  deepData.message = 'Сообщение обновлено на уровне 1'
  deepData.level = 1
  deepData.timestamp = new Date().toLocaleTimeString()
}
</script>

<template>
  <div class="p-4 rounded-lg border mb-4"
    :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'">
    <div class="flex justify-between items-center mb-2">
      <h5 class="font-medium">Уровень 1: LevelOne</h5>
      <button
        @click="updateData"
        class="text-sm px-3 py-1 rounded"
        :class="theme === 'dark' 
          ? 'bg-blue-700 hover:bg-blue-600' 
          : 'bg-blue-100 hover:bg-blue-200'">
        Обновить
      </button>
    </div>
    <slot></slot>
  </div>
</template>