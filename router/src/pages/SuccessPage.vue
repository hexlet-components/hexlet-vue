<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const source = computed(() => route.query.from ?? 'unknown')
const email = computed(() => route.query.email ?? '—')
const role = computed(() => route.query.role ?? '—')
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold text-slate-900">Страница успеха</h2>
    <p class="mb-6 text-slate-600">
      Это целевая страница для примера `router.push` из JS-кода.
    </p>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-lg bg-emerald-50 p-4 text-emerald-900">
        <div class="text-xs uppercase">from</div>
        <div class="text-lg font-semibold">{{ source }}</div>
      </div>
      <div class="rounded-lg bg-blue-50 p-4 text-blue-900">
        <div class="text-xs uppercase">email</div>
        <div class="text-lg font-semibold">{{ email }}</div>
      </div>
      <div class="rounded-lg bg-violet-50 p-4 text-violet-900">
        <div class="text-xs uppercase">role</div>
        <div class="text-lg font-semibold">{{ role }}</div>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap gap-2">
      <router-link
        to="/actions"
        class="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
      >
        Вернуться к примерам router API
      </router-link>
      <router-link
        to="/"
        class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
      >
        На главную
      </router-link>
    </div>
  </div>
</template>
