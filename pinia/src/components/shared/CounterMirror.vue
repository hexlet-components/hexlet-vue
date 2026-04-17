<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const { count, doubleCount, parity, history } = storeToRefs(counter)
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-6">
    <h3 class="mb-2 text-lg font-semibold text-slate-900">ComponentB: наблюдатель</h3>
    <p class="mb-4 text-sm text-slate-600">
      Компонент не передает props и не получает emit. Он просто использует тот же store.
    </p>

    <div class="grid gap-3 sm:grid-cols-3">
      <div class="rounded-lg bg-blue-50 p-3">
        <div class="text-xs uppercase text-blue-700">count</div>
        <div class="text-2xl font-bold text-blue-900">{{ count }}</div>
      </div>
      <div class="rounded-lg bg-emerald-50 p-3">
        <div class="text-xs uppercase text-emerald-700">doubleCount</div>
        <div class="text-2xl font-bold text-emerald-900">{{ doubleCount }}</div>
      </div>
      <div class="rounded-lg bg-violet-50 p-3">
        <div class="text-xs uppercase text-violet-700">parity</div>
        <div class="text-2xl font-bold text-violet-900">{{ parity }}</div>
      </div>
    </div>

    <div class="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div class="mb-2 text-sm font-medium text-slate-700">Последние изменения</div>
      <ul v-if="history.length" class="space-y-1 text-sm text-slate-600">
        <li v-for="item in history" :key="item.id">
          {{ item.time }}: {{ item.action }} → {{ item.value }}
        </li>
      </ul>
      <p v-else class="text-sm text-slate-500">История пока пустая</p>
    </div>
  </div>
</template>
