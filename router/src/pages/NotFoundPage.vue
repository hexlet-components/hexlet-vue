<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="rounded-xl border border-red-200 bg-red-50 p-6">
    <h2 class="mb-2 text-2xl font-bold text-red-900">404 - Страница не найдена</h2>
    <p class="mb-4 text-red-800">
      Маршрут <code>{{ route.fullPath }}</code> отсутствует в конфигурации.
    </p>
    <router-link to="/" class="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800">
      Вернуться на главную
    </router-link>
  </div>
</template>
