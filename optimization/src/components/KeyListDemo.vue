<script setup>
import { ref } from 'vue'
import IdentityRow from './perf/IdentityRow.vue'

const seed = [
  { id: 101, name: 'Анна' },
  { id: 102, name: 'Борис' },
  { id: 103, name: 'Вера' },
  { id: 104, name: 'Глеб' },
  { id: 105, name: 'Дарья' }
]

const employees = ref([...seed])

function shuffle() {
  const clone = [...employees.value]
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[clone[i], clone[j]] = [clone[j], clone[i]]
  }
  employees.value = clone
}

function reset() {
  employees.value = [...seed]
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Оптимизация списков через :key</h2>

    <div class="mb-5 flex flex-wrap gap-2">
      <button
        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        @click="shuffle()"
      >
        Перемешать список
      </button>
      <button
        class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        @click="reset()"
      >
        Сбросить порядок
      </button>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-red-200 bg-red-50 p-5">
        <h3 class="mb-3 text-lg font-semibold text-red-900">Плохой вариант: key по индексу</h3>
        <p class="mb-3 text-sm text-red-800">
          Token остается на позиции, а не на элементе данных. Это признак некорректного сопоставления.
        </p>
        <div class="space-y-2">
          <IdentityRow
            v-for="(item, index) in employees"
            :key="index"
            :item="item"
            mode="index"
            :position="index"
          />
        </div>
      </section>

      <section class="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 class="mb-3 text-lg font-semibold text-emerald-900">Хороший вариант: стабильный key=id</h3>
        <p class="mb-3 text-sm text-emerald-800">
          Token движется вместе с элементом данных. Vue делает точечные изменения без лишней переработки.
        </p>
        <div class="space-y-2">
          <IdentityRow
            v-for="(item, index) in employees"
            :key="item.id"
            :item="item"
            mode="id"
            :position="index"
          />
        </div>
      </section>
    </div>
  </div>
</template>
