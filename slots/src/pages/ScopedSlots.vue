<script setup>
import { ref } from 'vue'
import DataTable from '../ui/DataTable.vue'
import PaginatedList from '../ui/PaginatedList.vue'

const users = ref([
  { id: 1, name: 'Алексей', email: 'alex@example.com', status: 'active' },
  { id: 2, name: 'Мария', email: 'maria@example.com', status: 'pending' },
  { id: 3, name: 'Иван', email: 'ivan@example.com', status: 'inactive' },
  { id: 4, name: 'Ольга', email: 'olga@example.com', status: 'active' },
  { id: 5, name: 'Дмитрий', email: 'dmitry@example.com', status: 'active' }
])

const columns = [
  { key: 'name', title: 'Имя' },
  { key: 'email', title: 'Email' },
  { key: 'status', title: 'Статус' },
  { key: 'actions', title: 'Действия' }
]

function removeUser(id) {
  users.value = users.value.filter(u => u.id !== id)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Scoped слоты (данные из Дочернего компонента → рендер у родителя)</h2>

    <p class="text-gray-600 mb-8">
      Scoped slot — это slot, которому компонент передаёт параметры (например, <code>row</code>, <code>index</code>).
      Дочерний компонент управляет структурой, родитель — отображением.
    </p>

    <div class="space-y-8">
      <section class="bg-gray-50 p-6 rounded-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">1) Таблица: кастомизация отдельных ячеек</h3>

        <DataTable :columns="columns" :rows="users">
          <template #status="{ row }">
            <span
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              :class="{
                'bg-green-100 text-green-800': row.status === 'active',
                'bg-yellow-100 text-yellow-800': row.status === 'pending',
                'bg-red-100 text-red-800': row.status === 'inactive'
              }"
            >
              {{ row.status }}
            </span>
          </template>

          <template #actions="{ row }">
            <button
              class="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
              @click="removeUser(row.id)"
            >
              Удалить
            </button>
          </template>
        </DataTable>

        <div class="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
          DataTable не знает, как рисовать статус/кнопки — он только передаёт <code>row</code> в слот.
        </div>
      </section>

      <section class="bg-gray-50 p-6 rounded-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">2) Пагинированный список: item slot + controls slot</h3>

        <PaginatedList :items="users" :per-page="3">
          <template #default="{ items }">
            <div class="space-y-2">
              <div
                v-for="u in items"
                :key="u.id"
                class="p-3 bg-white border rounded-lg flex items-center justify-between"
              >
                <div>
                  <div class="font-medium text-gray-900">{{ u.name }}</div>
                  <div class="text-sm text-gray-600">{{ u.email }}</div>
                </div>
                <span class="text-xs text-gray-500">{{ u.status }}</span>
              </div>
            </div>
          </template>

          <template #controls="{ page, totalPages, setPage }">
            <div class="flex items-center justify-between mt-3">
              <div class="text-sm text-gray-600">Страница {{ page }} / {{ totalPages }}</div>
              <div class="flex gap-2">
                <button class="px-3 py-1 border rounded" :disabled="page === 1" @click="setPage(page - 1)">
                  Назад
                </button>
                <button class="px-3 py-1 border rounded" :disabled="page === totalPages" @click="setPage(page + 1)">
                  Вперёд
                </button>
              </div>
            </div>
          </template>
        </PaginatedList>

        <div class="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-800">
          Дочерний компонент делает пагинацию и передаёт родителю <code>items/page/totalPages</code>, а UI целиком у родителя.
        </div>
      </section>
    </div>
  </div>
</template>
