<script setup>
const antiPatterns = [
  'Списки без стабильных ключей',
  'Тяжелые блоки, которые рендерятся при каждом клике',
  'Загрузка редко используемых страниц сразу при старте',
  'Повторные рендеры из-за лишних зависимостей'
]

const solutions = [
  'Использовать стабильный :key в каждом v-for',
  'Фиксировать статичный UI через v-once',
  'Включать lazy loading через defineAsyncComponent/import()',
  'Ограничивать апдейты через v-memo и корректные зависимости'
]
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Где теряется производительность</h2>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-red-200 bg-red-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-red-900">Типичные проблемы</h3>
        <ul class="space-y-2 text-sm text-red-800">
          <li v-for="item in antiPatterns" :key="item">• {{ item }}</li>
        </ul>
      </section>

      <section class="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-emerald-900">Как решать</h3>
        <ul class="space-y-2 text-sm text-emerald-800">
          <li v-for="item in solutions" :key="item">• {{ item }}</li>
        </ul>
      </section>
    </div>

    <div class="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
      Цель оптимизации в Vue: уменьшать объем лишней работы фреймворка, а не усложнять код без
      причины. Оптимизируйте только то, что реально влияет на UX.
    </div>
  </div>
</template>
