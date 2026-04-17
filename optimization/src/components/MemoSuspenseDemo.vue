<script setup>
import { ref } from 'vue'
import PerfMemberCard from './perf/PerfMemberCard.vue'

const uiPulse = ref(0)
const members = ref([
  { id: 1, name: 'Анна', score: 42 },
  { id: 2, name: 'Борис', score: 37 },
  { id: 3, name: 'Вера', score: 51 },
  { id: 4, name: 'Глеб', score: 29 }
])

function pulseUI() {
  uiPulse.value += 1
}

function increaseScore(id) {
  const member = members.value.find(item => item.id === id)
  if (member) member.score += 1
}

function resetScores() {
  members.value = [
    { id: 1, name: 'Анна', score: 42 },
    { id: 2, name: 'Борис', score: 37 },
    { id: 3, name: 'Вера', score: 51 },
    { id: 4, name: 'Глеб', score: 29 }
  ]
  uiPulse.value = 0
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">v-memo и контроль лишних апдейтов</h2>

    <div class="mb-5 flex flex-wrap gap-2">
      <button
        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        @click="pulseUI()"
      >
        Обновить несвязанное UI-состояние
      </button>
      <button
        class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        @click="resetScores()"
      >
        Сброс
      </button>
      <span class="rounded-lg bg-lime-100 px-3 py-2 text-sm text-lime-800">uiPulse: {{ uiPulse }}</span>
    </div>

    <div class="mb-5 flex flex-wrap gap-2">
      <button
        v-for="member in members"
        :key="`btn-${member.id}`"
        class="rounded-lg bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-200"
        @click="increaseScore(member.id)"
      >
        +1 score {{ member.name }}
      </button>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h3 class="mb-3 text-lg font-semibold text-amber-900">Без v-memo</h3>
        <p class="mb-3 text-sm text-amber-800">
          Здесь каждый ререндер родителя создает новые props (`{ ...member }`), поэтому карточки
          обновляются чаще.
        </p>
        <div class="space-y-2">
          <PerfMemberCard
            v-for="member in members"
            :key="`plain-${member.id}`"
            :member="{ ...member }"
            mode="plain"
          />
        </div>
      </section>

      <section class="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 class="mb-3 text-lg font-semibold text-emerald-900">С v-memo</h3>
        <p class="mb-3 text-sm text-emerald-800">
          Vue пропускает поддерево, пока не изменятся зависимости `id` и `score`.
        </p>
        <div class="space-y-2">
          <div
            v-for="member in members"
            :key="`memo-${member.id}`"
            v-memo="[member.id, member.score]"
          >
            <PerfMemberCard :member="{ ...member }" mode="memo" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
