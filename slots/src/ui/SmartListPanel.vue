<script setup>
defineProps({
  items: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b bg-gray-50">
      <slot name="header">
        <div class="font-semibold text-gray-900">Header</div>
      </slot>
    </div>

    <div class="p-4">
      <template v-if="items.length">
        <div class="space-y-3">
          <slot
            name="item"
            v-for="it in items"
            :key="it.id ?? JSON.stringify(it)"
            :item="it"
          >
            <div class="p-3 border rounded bg-white">
              {{ it }}
            </div>
          </slot>
        </div>
      </template>

      <template v-else>
        <slot name="empty">
          <div class="p-4 border rounded bg-white text-gray-600 text-center">
            Пусто
          </div>
        </slot>
      </template>
    </div>

    <div class="p-4 border-t bg-gray-50">
      <slot name="footer" />
    </div>
  </div>
</template>
