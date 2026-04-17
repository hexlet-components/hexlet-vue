<script setup>
defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
      <div class="px-6 py-4 border-b">
        <slot name="header">
          <div class="flex items-center justify-between">
            <div class="font-semibold text-gray-900">Заголовок</div>
            <button class="text-gray-500 hover:text-gray-800" @click="$emit('close')">×</button>
          </div>
        </slot>
      </div>

      <div class="px-6 py-4">
        <slot>
          <p class="text-gray-700">Содержимое модального окна</p>
        </slot>
      </div>

      <div class="px-6 py-4 border-t bg-gray-50">
        <slot name="footer">
          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 border rounded-lg" @click="$emit('close')">Закрыть</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
