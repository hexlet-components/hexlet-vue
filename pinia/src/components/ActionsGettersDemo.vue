<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const { count, step, doubleCount, isPositive, parity } = storeToRefs(counter)

const signLabel = computed(() => {
  if (count.value > 0) return 'положительное'
  if (count.value < 0) return 'отрицательное'
  return 'нулевое'
})
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Actions и Getters</h2>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Actions</h3>
        <p class="mb-4 text-sm text-slate-600">
          Изменяем store только через методы, чтобы логика оставалась в одном месте.
        </p>

        <div class="mb-4 flex flex-wrap gap-2">
          <button
            class="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700"
            @click="counter.decrement()"
          >
            decrement()
          </button>
          <button
            class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            @click="counter.increment()"
          >
            increment()
          </button>
          <button
            class="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-800 transition-colors hover:bg-slate-300"
            @click="counter.reset()"
          >
            reset()
          </button>
        </div>

        <label class="block text-sm text-slate-600">
          Шаг:
          <input
            type="range"
            min="1"
            max="10"
            class="mt-2 w-full"
            :value="step"
            @input="counter.setStep($event.target.value)"
          >
        </label>
        <p class="mt-2 text-sm text-slate-500">Текущее значение step: {{ step }}</p>
      </section>

      <section class="rounded-xl border border-slate-200 bg-white p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Getters</h3>
        <p class="mb-4 text-sm text-slate-600">
          Getters работают как `computed`: пересчитываются автоматически и кэшируют результат.
        </p>

        <div class="space-y-3 text-sm">
          <div class="rounded-lg bg-blue-50 p-3 text-blue-900">count: <strong>{{ count }}</strong></div>
          <div class="rounded-lg bg-emerald-50 p-3 text-emerald-900">
            doubleCount: <strong>{{ doubleCount }}</strong>
          </div>
          <div class="rounded-lg bg-violet-50 p-3 text-violet-900">
            isPositive: <strong>{{ isPositive }}</strong>
          </div>
          <div class="rounded-lg bg-amber-50 p-3 text-amber-900">
            parity: <strong>{{ parity }}</strong>
          </div>
          <div class="rounded-lg bg-slate-100 p-3 text-slate-800">
            Дополнительный computed в компоненте: <strong>{{ signLabel }}</strong>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
