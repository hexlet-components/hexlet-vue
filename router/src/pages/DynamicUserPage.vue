<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const users = [
  { id: 1, name: 'Анна Смирнова', role: 'Frontend Developer', city: 'Москва' },
  { id: 2, name: 'Дмитрий Ковалев', role: 'Backend Developer', city: 'Санкт-Петербург' },
  { id: 3, name: 'Ольга Никитина', role: 'Product Designer', city: 'Казань' },
  { id: 4, name: 'Иван Петров', role: 'QA Engineer', city: 'Новосибирск' }
]

const loading = ref(false)
const loadedAt = ref('—')
const loadCount = ref(0)

const minId = users[0].id
const maxId = users[users.length - 1].id

const currentId = computed(() => {
  const parsed = Number(route.params.id)
  return Number.isInteger(parsed) && parsed >= minId && parsed <= maxId ? parsed : minId
})

const currentUser = computed(() => users.find(user => user.id === currentId.value) ?? users[0])

function openUser(id) {
  router.push({ name: 'user', params: { id } })
}

function openPrev() {
  if (currentId.value > minId) openUser(currentId.value - 1)
}

function openNext() {
  if (currentId.value < maxId) openUser(currentId.value + 1)
}

async function simulateLoad() {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 250))
  loadedAt.value = new Date().toLocaleTimeString()
  loadCount.value += 1
  loading.value = false
}

watch(
  () => route.params.id,
  async () => {
    await simulateLoad()
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Динамический маршрут: /users/:id</h2>

    <div class="mb-6 grid gap-4 md:grid-cols-3">
      <div class="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        <div class="text-xs uppercase text-slate-500">Текущий id</div>
        <div class="text-xl font-bold text-slate-900">{{ currentId }}</div>
      </div>
      <div class="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        <div class="text-xs uppercase text-slate-500">Последняя загрузка</div>
        <div class="text-xl font-bold text-slate-900">{{ loadedAt }}</div>
      </div>
      <div class="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        <div class="text-xs uppercase text-slate-500">Срабатываний watch</div>
        <div class="text-xl font-bold text-slate-900">{{ loadCount }}</div>
      </div>
    </div>

    <div class="mb-4 flex flex-wrap gap-2">
      <button
        class="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="currentId === minId"
        @click="openPrev()"
      >
        Предыдущий
      </button>
      <button
        class="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="currentId === maxId"
        @click="openNext()"
      >
        Следующий
      </button>
      <button
        v-for="user in users"
        :key="user.id"
        class="rounded-lg px-3 py-2 text-sm font-medium"
        :class="
          user.id === currentId ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
        "
        @click="openUser(user.id)"
      >
        user {{ user.id }}
      </button>
    </div>

    <div v-if="loading" class="rounded-xl border border-cyan-200 bg-cyan-50 p-5 text-cyan-900">
      Загрузка данных пользователя...
    </div>

    <article v-else class="rounded-xl border border-slate-200 bg-white p-6">
      <h3 class="mb-2 text-xl font-semibold text-slate-900">{{ currentUser.name }}</h3>
      <p class="text-slate-600">Роль: {{ currentUser.role }}</p>
      <p class="text-slate-600">Город: {{ currentUser.city }}</p>
      <p class="mt-4 text-sm text-slate-500">
        Компонент не пересоздается целиком при смене `:id`, поэтому данные подгружаются через
        `watch(() =&gt; route.params.id)`.
      </p>
    </article>
  </div>
</template>
