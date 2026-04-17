<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const { totalItems, totalPrice } = storeToRefs(cartStore)
</script>

<template>
  <div class="rounded-xl border border-blue-200 bg-blue-50 p-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h3 class="text-lg font-semibold text-blue-900">Мини-корзина в шапке</h3>
      <div class="flex gap-2 text-sm">
        <span class="rounded-full bg-white px-3 py-1 font-medium text-blue-800">
          Товаров: {{ totalItems }}
        </span>
        <span class="rounded-full bg-white px-3 py-1 font-medium text-blue-800">
          Сумма: {{ totalPrice.toLocaleString() }} ₽
        </span>
      </div>
    </div>
  </div>
</template>
