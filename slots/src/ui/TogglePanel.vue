<script setup>
import { ref } from 'vue'

const open = ref(true)
function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden bg-white">
    <div class="bg-gray-50 p-4 border-b">
      <slot name="toggle" :open="open" :toggle="toggle">
        <button class="px-3 py-1 border rounded" @click="toggle">
          {{ open ? 'Скрыть' : 'Показать' }}
        </button>
      </slot>
    </div>

    <div class="p-4" v-if="open">
      <slot />
    </div>
  </div>
</template>
