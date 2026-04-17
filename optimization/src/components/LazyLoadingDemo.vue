<script setup>
import { defineAsyncComponent, ref } from 'vue'

const showPanel = ref(false)
const openCount = ref(0)

const AsyncAnalyticsPanel = defineAsyncComponent({
  loader: () =>
    new Promise(resolve => {
      setTimeout(() => resolve(import('./perf/HeavyAnalyticsPanel.vue')), 800)
    }),
  delay: 150,
  timeout: 7000
})

function openPanel() {
  showPanel.value = true
  openCount.value += 1
}

function closePanel() {
  showPanel.value = false
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Ленивая загрузка компонентов</h2>

    <div class="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      Компонент аналитики загружается только при первом открытии. До этого его кода нет в стартовом
      бандле.
    </div>

    <div class="mb-5 flex flex-wrap gap-2">
      <button
        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        @click="openPanel()"
      >
        Открыть async-панель
      </button>
      <button
        class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        @click="closePanel()"
      >
        Скрыть
      </button>
      <span class="rounded-lg bg-indigo-100 px-3 py-2 text-sm text-indigo-800">
        Открытий: {{ openCount }}
      </span>
    </div>

    <Suspense>
      <template #default>
        <AsyncAnalyticsPanel v-if="showPanel" />
      </template>

      <template #fallback>
        <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-indigo-900">
          Загрузка async-компонента...
        </div>
      </template>
    </Suspense>

    <p class="mt-4 text-sm text-slate-500">
      В production-сборке этот компонент уходит в отдельный чанк и загружается по требованию.
    </p>
  </div>
</template>
