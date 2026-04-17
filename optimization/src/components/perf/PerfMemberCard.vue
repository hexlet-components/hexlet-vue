<script setup>
import { onUpdated, ref } from 'vue'

defineProps({
  member: { type: Object, required: true },
  mode: { type: String, required: true }
})

const updateCount = ref(0)

onUpdated(() => {
  updateCount.value += 1
})
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-3">
    <div class="mb-2 flex items-center justify-between">
      <h4 class="font-medium text-slate-900">{{ member.name }}</h4>
      <span
        class="rounded-full px-2 py-1 text-xs font-medium"
        :class="mode === 'plain' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'"
      >
        {{ mode === 'plain' ? 'обычно' : 'v-memo' }}
      </span>
    </div>
    <p class="text-sm text-slate-600">Score: {{ member.score }}</p>
    <p class="text-xs text-slate-500">onUpdated: {{ updateCount }}</p>
  </article>
</template>
