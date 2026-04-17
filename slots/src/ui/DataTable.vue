<script setup>
defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true }
})
</script>

<template>
  <div class="overflow-x-auto border border-gray-200 rounded-lg bg-white">
    <table class="w-full text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th v-for="c in columns" :key="c.key" class="p-3 text-left text-gray-700 font-semibold">
            {{ c.title }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in rows" :key="row.id" class="hover:bg-gray-50">
          <td v-for="c in columns" :key="c.key" class="p-3">
            <slot :name="c.key" :row="row" :index="index">
              {{ row[c.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
