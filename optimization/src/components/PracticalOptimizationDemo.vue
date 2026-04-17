<script setup>
import { computed, ref } from 'vue'

const symptoms = [
  { id: 'list-jumps', label: 'Список "прыгает" при вставке элемента в начало' },
  { id: 'static-rerender', label: 'Тяжелый статичный блок обновляется при каждом клике' },
  { id: 'first-load-heavy', label: 'Слишком тяжелый первый экран и медленный старт' },
  { id: 'repeat-updates', label: 'Много карточек обновляются без реальной причины' }
]

const selectedSymptoms = ref(['list-jumps', 'first-load-heavy'])

const playbook = {
  'list-jumps': [
    { id: 'k1', title: 'Добавить стабильный :key', details: 'Используйте уникальный id, а не индекс.' }
  ],
  'static-rerender': [
    { id: 'o1', title: 'Зафиксировать блок через v-once', details: 'Подходит для полностью статичного UI.' }
  ],
  'first-load-heavy': [
    {
      id: 'l1',
      title: 'Вынести редкие части в lazy loading',
      details: 'Загружайте тяжелые компоненты по требованию.'
    },
    {
      id: 'l2',
      title: 'Показать fallback через Suspense',
      details: 'Сделайте загрузку понятной для пользователя.'
    }
  ],
  'repeat-updates': [
    {
      id: 'm1',
      title: 'Ограничить обновления с v-memo',
      details: 'Рендерить блок только при изменении ключевых зависимостей.'
    }
  ]
}

function toggleSymptom(id) {
  if (selectedSymptoms.value.includes(id)) {
    selectedSymptoms.value = selectedSymptoms.value.filter(item => item !== id)
    return
  }
  selectedSymptoms.value = [...selectedSymptoms.value, id]
}

const recommendations = computed(() => {
  const unique = new Map()
  selectedSymptoms.value.forEach(id => {
    ;(playbook[id] ?? []).forEach(item => {
      unique.set(item.id, item)
    })
  })
  return [...unique.values()]
})
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Практический чеклист оптимизации</h2>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 class="mb-3 text-lg font-semibold text-slate-900">1. Какие симптомы видите?</h3>
        <div class="space-y-2">
          <button
            v-for="symptom in symptoms"
            :key="symptom.id"
            class="w-full rounded-lg border px-3 py-2 text-left text-sm"
            :class="
              selectedSymptoms.includes(symptom.id)
                ? 'border-emerald-300 bg-emerald-100 text-emerald-900'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
            "
            @click="toggleSymptom(symptom.id)"
          >
            {{ symptom.label }}
          </button>
        </div>
      </section>

      <section class="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 class="mb-3 text-lg font-semibold text-emerald-900">2. Что применять в коде</h3>
        <div v-if="recommendations.length" class="space-y-2">
          <article
            v-for="item in recommendations"
            :key="item.id"
            class="rounded-lg border border-emerald-200 bg-white p-3"
          >
            <h4 class="font-medium text-slate-900">{{ item.title }}</h4>
            <p class="text-sm text-slate-600">{{ item.details }}</p>
          </article>
        </div>
        <p v-else class="text-sm text-emerald-800">Выберите хотя бы один симптом слева.</p>
      </section>
    </div>

    <div class="mt-6 rounded-xl border border-cyan-200 bg-cyan-50 p-5">
      <h3 class="mb-2 text-lg font-semibold text-cyan-900">Рабочий порядок действий</h3>
      <ol class="list-decimal list-inside space-y-1 text-sm text-cyan-900">
        <li>Измерьте проблему (DevTools Performance/Vue DevTools).</li>
        <li>Уберите лишние ререндеры (`:key`, `v-once`, `v-memo`).</li>
        <li>Сократите стартовый бандл (lazy loading).</li>
        <li>Проверьте UX загрузки (`Suspense` fallback).</li>
      </ol>
    </div>
  </div>
</template>
