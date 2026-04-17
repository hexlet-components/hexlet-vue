<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  mode: { type: String, required: true },
  position: { type: Number, required: true }
})

const token = Math.random().toString(36).slice(2, 7)

const badgeClasses = computed(() =>
  props.mode === 'index' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
)
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-3">
    <div class="mb-2 flex items-center justify-between gap-2">
      <h4 class="font-medium text-slate-900">{{ item.name }}</h4>
      <span class="rounded-full px-2 py-1 text-xs font-medium" :class="badgeClasses">
        {{ mode === 'index' ? 'key=index' : 'key=id' }}
      </span>
    </div>

    <div class="text-xs text-slate-600">
      <p>ID данных: <strong>{{ item.id }}</strong></p>
      <p>Позиция в списке: <strong>{{ position + 1 }}</strong></p>
      <p>Token экземпляра: <strong>{{ token }}</strong></p>
    </div>
  </article>
</template>
