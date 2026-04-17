<script setup>
import { inject, computed } from 'vue'
import { SHOPPING_CART_KEY, THEME_KEY } from '../keys'

const { cart, totalItems, totalPrice } = inject(SHOPPING_CART_KEY)
const { theme } = inject(THEME_KEY)

const hasItems = computed(() => cart.items.length > 0)
</script>

<template>
  <div class="rounded-xl p-6 border"
    :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
    <h4 class="font-semibold mb-4">Мини-корзина (вложенный компонент)</h4>
    
    <div v-if="hasItems" class="space-y-3">
      <div v-for="item in cart.items.slice(0, 3)" :key="item.id"
        class="flex justify-between items-center text-sm">
        <span class="truncate">{{ item.name }} × {{ item.quantity }}</span>
        <span class="font-medium">{{ (item.price * item.quantity).toLocaleString() }} ₽</span>
      </div>
      
      <div v-if="cart.items.length > 3" class="text-center text-sm opacity-80">
        и ещё {{ cart.items.length - 3 }} товаров...
      </div>
      
      <div class="pt-3 border-t"
        :class="theme === 'dark' ? 'border-gray-600' : 'border-gray-200'">
        <div class="flex justify-between font-bold">
          <span>Всего:</span>
          <span>{{ totalPrice.toLocaleString() }} ₽</span>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-4 opacity-80">
      Корзина пуста
    </div>
  </div>
</template>