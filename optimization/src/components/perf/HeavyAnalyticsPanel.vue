<script setup>
const loadedAt = new Date().toLocaleTimeString()

const rows = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  page: `/section/${index + 1}`,
  visits: 1800 + index * 247,
  tti: 1.4 + index * 0.08
}))
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-5">
    <h3 class="mb-1 text-lg font-semibold text-slate-900">Async Analytics Panel</h3>
    <p class="mb-4 text-xs text-slate-500">Компонент загружен в {{ loadedAt }}</p>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-slate-700">
          <tr>
            <th class="p-2 text-left">Маршрут</th>
            <th class="p-2 text-right">Визиты</th>
            <th class="p-2 text-right">TTI (сек)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="row in rows" :key="row.id">
            <td class="p-2 text-slate-700">{{ row.page }}</td>
            <td class="p-2 text-right text-slate-700">{{ row.visits.toLocaleString() }}</td>
            <td class="p-2 text-right text-slate-700">{{ row.tti.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
