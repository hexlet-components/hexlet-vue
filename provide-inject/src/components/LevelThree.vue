<script setup>
import { inject } from 'vue'
import { THEME_KEY } from '../keys'

const { theme } = inject(THEME_KEY)
</script>

<template>
  <div class="p-4 rounded-lg border mb-4 ml-8"
    :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-yellow-50 border-yellow-200'">
    <h5 class="font-medium mb-2">Уровень 3: LevelThree</h5>
    <slot></slot>
  </div>
</template>