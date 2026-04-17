<script setup>
import CounterControls from './shared/CounterControls.vue'
import CounterMirror from './shared/CounterMirror.vue'
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Несколько компонентов - одно состояние</h2>

    <div class="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
      Основная идея Pinia: `useCounterStore()` в каждом компоненте возвращает доступ к одному и тому
      же централизованному состоянию.
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <CounterControls />
      <CounterMirror />
    </div>
  </div>
</template>
