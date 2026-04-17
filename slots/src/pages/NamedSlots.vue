<script setup>
import { ref } from 'vue'
import ModalWindow from '../ui/ModalWindow.vue'
import AppLayout from '../ui/AppLayout.vue'
import TogglePanel from '../ui/TogglePanel.vue'

const showModal = ref(false)
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Именованные слоты (named slots)</h2>

    <p class="text-gray-600 mb-8">
      Именованные слоты нужны, когда у компонента <strong>несколько областей</strong> вставки:
      header/footer/sidebar и т.д. Здесь нет scoped slots.
    </p>

    <div class="space-y-8">
      <!-- Modal -->
      <section class="bg-gray-50 p-6 rounded-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">1) Модальное окно: header / default / footer</h3>

        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          @click="showModal = true"
        >
          Открыть модалку
        </button>

        <ModalWindow v-if="showModal" @close="showModal = false">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="font-semibold text-gray-900">Кастомный заголовок</div>
              <button class="text-gray-500 hover:text-gray-800" @click="showModal = false">×</button>
            </div>
          </template>

          <p class="text-gray-700">
            Это содержимое передано через <strong>default</strong> slot.
          </p>

          <template #footer>
            <div class="flex justify-end gap-2">
              <button class="px-4 py-2 border rounded-lg" @click="showModal = false">Отмена</button>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg" @click="showModal = false">ОК</button>
            </div>
          </template>
        </ModalWindow>

        <div class="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
          Один компонент — три зоны вставки, каждая переопределяется независимо.
        </div>
      </section>

      <!-- Layout -->
      <section class="bg-gray-50 p-6 rounded-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">2) Layout: header / sidebar / content / footer</h3>

        <AppLayout>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="font-semibold">Кастомная шапка</div>
              <div class="text-sm opacity-90">user@demo</div>
            </div>
          </template>

          <template #sidebar>
            <nav class="space-y-2">
              <button class="w-full text-left px-3 py-2 rounded hover:bg-gray-200">Главная</button>
              <button class="w-full text-left px-3 py-2 rounded hover:bg-gray-200">Проекты</button>
              <button class="w-full text-left px-3 py-2 rounded hover:bg-gray-200">Настройки</button>
            </nav>
          </template>

          <template #content>
            <h4 class="font-semibold text-gray-900 mb-2">Контент страницы</h4>
            <p class="text-gray-700">Сюда вставляется то, что зависит от конкретной страницы.</p>
          </template>

          <template #footer>
            <div class="text-center text-xs">© 2026 Demo Layout</div>
          </template>
        </AppLayout>

        <div class="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-800">
          Layout определяет сетку/структуру, а родитель наполняет зоны.
        </div>
      </section>

      <!-- TogglePanel -->
      <section class="bg-gray-50 p-6 rounded-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">3) Контейнер с управляющей зоной: toggle + content</h3>

        <TogglePanel>
          <template #toggle="{ open, toggle }">
            <div class="flex items-center justify-between">
              <div class="font-medium text-gray-800">Панель</div>
              <button
                class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                @click="toggle"
              >
                {{ open ? 'Скрыть' : 'Показать' }}
              </button>
            </div>
          </template>

          <p class="text-gray-700">
            Контент передаётся через default slot. Сверху — именованный slot <code>toggle</code>.
          </p>
        </TogglePanel>

        <div class="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
          Пример, где управляющая зона отделена от содержимого.
        </div>
      </section>
    </div>
  </div>
</template>
