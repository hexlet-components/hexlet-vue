<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const products = [
  { id: 1, title: 'Vue 3 Handbook', price: 1200 },
  { id: 2, title: 'Router Patterns', price: 1800 },
  { id: 3, title: 'Pinia Cookbook', price: 1500 },
  { id: 4, title: 'TypeScript for Vue', price: 2400 },
  { id: 5, title: 'Nuxt Practical Guide', price: 2900 },
  { id: 6, title: 'Frontend Architecture', price: 2100 },
  { id: 7, title: 'Testing Vue Apps', price: 1700 },
  { id: 8, title: 'UI Performance Notes', price: 1300 }
]

const perPage = 4

const sort = computed(() => (route.query.sort === 'price' ? 'price' : 'title'))

const page = computed(() => {
  const value = Number(route.query.page ?? 1)
  return Number.isInteger(value) && value > 0 ? value : 1
})

const sortedProducts = computed(() => {
  const clone = [...products]
  if (sort.value === 'price') {
    return clone.sort((a, b) => a.price - b.price)
  }
  return clone.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedProducts.value.length / perPage)))
const safePage = computed(() => Math.min(page.value, totalPages.value))

const visibleProducts = computed(() => {
  const start = (safePage.value - 1) * perPage
  return sortedProducts.value.slice(start, start + perPage)
})

function updateQuery(nextQuery) {
  router.push({ name: 'catalog', query: nextQuery })
}

function setSort(nextSort) {
  updateQuery({
    ...route.query,
    sort: nextSort,
    page: '1'
  })
}

function setPage(nextPage) {
  const normalized = Math.max(1, Math.min(totalPages.value, nextPage))
  updateQuery({
    ...route.query,
    sort: sort.value,
    page: String(normalized)
  })
}

function resetQuery() {
  router.push({ name: 'catalog', query: {} })
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Query-параметры: /catalog?page=&amp;sort=</h2>

    <div class="mb-4 flex flex-wrap items-center gap-2">
      <button
        class="rounded-lg px-3 py-2 text-sm font-medium"
        :class="
          sort === 'title' ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
        "
        @click="setSort('title')"
      >
        sort=title
      </button>
      <button
        class="rounded-lg px-3 py-2 text-sm font-medium"
        :class="
          sort === 'price' ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
        "
        @click="setSort('price')"
      >
        sort=price
      </button>
      <button
        class="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        @click="resetQuery()"
      >
        Сброс query
      </button>
    </div>

    <div class="mb-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
      Текущий URL: <strong>/catalog?page={{ safePage }}&amp;sort={{ sort }}</strong>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <article
        v-for="product in visibleProducts"
        :key="product.id"
        class="rounded-xl border border-slate-200 bg-white p-4"
      >
        <h3 class="font-semibold text-slate-900">{{ product.title }}</h3>
        <p class="mt-1 text-slate-600">{{ product.price.toLocaleString() }} ₽</p>
      </article>
    </div>

    <div class="mt-5 flex items-center gap-2">
      <button
        class="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="safePage === 1"
        @click="setPage(safePage - 1)"
      >
        Назад
      </button>
      <span class="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
        Страница {{ safePage }} из {{ totalPages }}
      </span>
      <button
        class="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="safePage === totalPages"
        @click="setPage(safePage + 1)"
      >
        Вперед
      </button>
    </div>
  </div>
</template>
