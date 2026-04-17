<script setup>
import { ref } from 'vue'
import SmartListPanel from '../ui/SmartListPanel.vue'

const notifications = ref([
  { id: 1, title: 'Новое сообщение', text: 'Сообщение от Алексея', read: false },
  { id: 2, title: 'Обновление', text: 'Запланировано на 20:00', read: true },
  { id: 3, title: 'Оплата', text: 'Заказ #12345 оплачен', read: true }
])

function markAllRead() {
  notifications.value = notifications.value.map(n => ({ ...n, read: true }))
}

function clearAll() {
  notifications.value = []
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Практика (осознанная комбинация slots)</h2>

    <p class="text-gray-600 mb-8">
      Здесь один практический компонент, который комбинирует:
      <strong>named slots</strong> (header/footer/empty) + <strong>scoped slot</strong> (item).
    </p>

    <div class="bg-gray-50 p-6 rounded-xl">
      <SmartListPanel :items="notifications">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold text-gray-900">Уведомления</div>
              <div class="text-sm text-gray-600">Демо: named + scoped slots</div>
            </div>
            <div class="flex gap-2">
              <button class="px-3 py-1 border rounded hover:bg-white" @click="markAllRead">Прочитать все</button>
              <button class="px-3 py-1 border rounded hover:bg-white" @click="clearAll">Очистить</button>
            </div>
          </div>
        </template>

        <!-- scoped slot: как рисовать один элемент -->
        <template #item="{ item }">
          <div class="p-3 bg-white border rounded-lg">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="font-medium" :class="item.read ? 'text-gray-900' : 'text-blue-900'">
                  {{ item.title }}
                </div>
                <div class="text-sm" :class="item.read ? 'text-gray-600' : 'text-blue-700'">
                  {{ item.text }}
                </div>
              </div>
              <span class="text-xs px-2 py-1 rounded"
                    :class="item.read ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'">
                {{ item.read ? 'прочитано' : 'новое' }}
              </span>
            </div>
          </div>
        </template>

        <template #empty>
          <div class="p-6 bg-white border rounded-lg text-center text-gray-600">
            Нет уведомлений.
          </div>
        </template>

        <template #footer>
          <div class="text-xs text-gray-500">
            Компонент управляет структурой (header/list/footer), родитель управляет рендером item и состояниями.
          </div>
        </template>
      </SmartListPanel>
    </div>
  </div>
</template>
