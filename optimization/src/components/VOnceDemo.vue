<script setup>
import { ref } from 'vue'

const counter = ref(0)
const note = ref('Стартовое значение')

function bump() {
  counter.value += 1
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">v-once для статичных блоков</h2>

    <div class="mb-5 flex flex-wrap items-center gap-3">
      <button
        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        @click="bump()"
      >
        Увеличить счетчик
      </button>
      <input
        v-model="note"
        type="text"
        class="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm"
        placeholder="Измените текст"
      >
      <span class="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
        counter: {{ counter }}
      </span>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Обычный блок (реактивный)</h3>
        <p class="text-sm text-slate-600">Counter: {{ counter }}</p>
        <p class="text-sm text-slate-600">Note: {{ note }}</p>
        <p class="mt-3 text-xs text-slate-500">
          Этот блок обновляется при каждом изменении реактивных данных.
        </p>
      </section>

      <section class="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
        <h3 class="mb-3 text-lg font-semibold text-cyan-900">Блок с v-once</h3>
        <div v-once>
          <p class="text-sm text-cyan-900">Counter: {{ counter }}</p>
          <p class="text-sm text-cyan-900">Note: {{ note }}</p>
        </div>
        <p class="mt-3 text-xs text-cyan-800">
          Блок отрендерен один раз и "заморожен". Это подходит только для полностью статичного UI.
        </p>
      </section>
    </div>
  </div>
</template>
