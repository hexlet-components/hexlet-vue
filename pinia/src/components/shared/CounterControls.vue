<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const { count, step } = storeToRefs(counter)
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-6">
    <h3 class="mb-2 text-lg font-semibold text-slate-900">ComponentA: управление</h3>
    <p class="mb-4 text-sm text-slate-600">
      Этот компонент меняет состояние в store. Любой другой компонент увидит изменения сразу.
    </p>

    <label class="mb-4 block text-sm text-slate-600">
      Шаг изменения:
      <input
        type="number"
        min="1"
        max="10"
        class="mt-2 w-24 rounded-lg border border-slate-300 px-3 py-2"
        :value="step"
        @input="counter.setStep($event.target.value)"
      >
    </label>

    <div class="flex flex-wrap gap-2">
      <button
        class="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700"
        @click="counter.decrement()"
      >
        -{{ step }}
      </button>
      <button
        class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        @click="counter.increment()"
      >
        +{{ step }}
      </button>
      <button
        class="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-200"
        @click="counter.reset()"
      >
        Сброс
      </button>
    </div>

    <div class="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
      Текущее значение: <strong>{{ count }}</strong>
    </div>
  </div>
</template>
