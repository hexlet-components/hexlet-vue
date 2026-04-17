<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('student@example.com')
const role = ref('editor')
const submitting = ref(false)
const events = ref([])

function addEvent(text) {
  events.value.unshift({
    id: Date.now() + Math.random(),
    text,
    time: new Date().toLocaleTimeString()
  })
  events.value = events.value.slice(0, 8)
}

async function submitForm() {
  submitting.value = true
  addEvent('submit -> router.push({ name: "success" })')
  await new Promise(resolve => setTimeout(resolve, 500))

  router.push({
    name: 'success',
    query: {
      from: 'actions',
      email: email.value,
      role: role.value
    }
  })

  submitting.value = false
}

function openUserThree() {
  addEvent('router.push({ name: "user", params: { id: 3 } })')
  router.push({ name: 'user', params: { id: 3 } })
}

function openCatalogPage2() {
  addEvent('router.push({ name: "catalog", query: { page: 2, sort: "price" } })')
  router.push({ name: 'catalog', query: { page: '2', sort: 'price' } })
}

function replaceToHome() {
  addEvent('router.replace({ name: "home" })')
  router.replace({ name: 'home' })
}

function goBack() {
  addEvent('router.back()')
  router.back()
}

function goForward() {
  addEvent('router.forward()')
  router.forward()
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Программная навигация</h2>

    <div class="grid gap-6 xl:grid-cols-2">
      <section class="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">router.push после действия</h3>

        <form class="space-y-4" @submit.prevent="submitForm()">
          <label class="block text-sm text-slate-700">
            Email
            <input
              v-model="email"
              type="email"
              class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            >
          </label>

          <label class="block text-sm text-slate-700">
            Роль
            <select
              v-model="role"
              class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            >
              <option value="admin">admin</option>
              <option value="editor">editor</option>
              <option value="viewer">viewer</option>
            </select>
          </label>

          <button
            type="submit"
            class="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="submitting"
          >
            {{ submitting ? 'Переходим...' : 'Отправить и перейти на /success' }}
          </button>
        </form>
      </section>

      <section class="rounded-xl border border-slate-200 bg-white p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">Быстрые действия router API</h3>
        <div class="flex flex-wrap gap-2">
          <button
            class="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
            @click="openUserThree()"
          >
            push -> /users/3
          </button>
          <button
            class="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
            @click="openCatalogPage2()"
          >
            push -> /catalog?page=2
          </button>
          <button
            class="rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-200"
            @click="replaceToHome()"
          >
            replace -> /
          </button>
          <button
            class="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            @click="goBack()"
          >
            back()
          </button>
          <button
            class="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            @click="goForward()"
          >
            forward()
          </button>
        </div>

        <div class="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p class="mb-2 text-sm font-medium text-slate-700">Лог действий</p>
          <ul v-if="events.length" class="space-y-1 text-sm text-slate-600">
            <li v-for="item in events" :key="item.id">
              {{ item.time }}: {{ item.text }}
            </li>
          </ul>
          <p v-else class="text-sm text-slate-500">Пока нет действий</p>
        </div>
      </section>
    </div>
  </div>
</template>
