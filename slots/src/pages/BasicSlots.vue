<script setup>
import BaseCard from '../ui/BaseCard.vue'
import BaseButton from '../ui/BaseButton.vue'
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Базовые слоты (default + fallback)</h2>

    <p class="text-gray-600 mb-8">
      <strong>default slot</strong> и <strong>содержимое по умолчанию</strong> (fallback).
      Без named/scoped.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section class="bg-gray-50 p-6 rounded-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">1) Default slot</h3>

        <BaseCard>
          <h4 class="font-semibold text-gray-900 mb-2">Кастомный контент из родителя</h4>
          <p class="text-gray-600 mb-3">
            Этот блок передан внутрь компонента через default slot.
          </p>
          <BaseButton>Кнопка внутри слота</BaseButton>
        </BaseCard>

        <div class="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
          Компонент задаёт рамку/отступы, а родитель задаёт содержимое.
        </div>
      </section>

      <section class="bg-gray-50 p-6 rounded-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">2) Fallback (содержимое по умолчанию)</h3>

        <div class="space-y-4">
          <BaseCard />
          <BaseCard>
            <p class="text-gray-700">Здесь fallback не используется, потому что слот заполнен.</p>
          </BaseCard>
        </div>

        <div class="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-800">
          Если родитель не передал контент — рендерится fallback внутри &lt;slot&gt;.
        </div>
      </section>
    </div>

    <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
      <div class="font-semibold text-blue-900 mb-2">Итог</div>
      <p class="text-blue-800">
        Базовый slot решает задачу “структура у компонента, контент у родителя”.
        Следующий шаг — несколько зон вставки (именованные слоты).
      </p>
    </div>
  </div>
</template>
