<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  perPage: { type: Number, default: 3 }
})

const page = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(props.items.length / props.perPage)))

watch(
  () => [props.items.length, props.perPage],
  () => {
    if (page.value > totalPages.value) page.value = totalPages.value
    if (page.value < 1) page.value = 1
  }
)

const pageItems = computed(() => {
  const start = (page.value - 1) * props.perPage
  return props.items.slice(start, start + props.perPage)
})

function setPage(p) {
  if (p < 1 || p > totalPages.value) return
  page.value = p
}
</script>

<template>
  <div>
    <slot :items="pageItems">
      <ul class="space-y-2">
        <li v-for="it in pageItems" :key="it.id" class="p-3 bg-white border rounded">
          {{ it.name ?? it.id }}
        </li>
      </ul>
    </slot>

    <slot name="controls" :page="page" :totalPages="totalPages" :setPage="setPage">
      <div class="flex justify-between mt-3 text-sm text-gray-600">
        <span>Страница {{ page }} / {{ totalPages }}</span>
        <div class="flex gap-2">
          <button class="px-3 py-1 border rounded" :disabled="page === 1" @click="setPage(page - 1)">
            Назад
          </button>
          <button class="px-3 py-1 border rounded" :disabled="page === totalPages" @click="setPage(page + 1)">
            Вперёд
          </button>
        </div>
      </div>
    </slot>
  </div>
</template>
