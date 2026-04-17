<script setup>
import { inject, computed } from 'vue'
import { SHOPPING_CART_KEY, THEME_KEY } from '../keys'

const { cart, totalItems, totalPrice } = inject(SHOPPING_CART_KEY)
const { theme } = inject(THEME_KEY)

const averagePrice = computed(() => {
  if (totalItems.value === 0) return 0
  return Math.round(totalPrice.value / totalItems.value)
})

const mostExpensiveItem = computed(() => {
  if (cart.items.length === 0) return null
  return cart.items.reduce((max, item) => 
    item.price > max.price ? item : max, cart.items[0])
})
</script>

<template>
  <div class="rounded-xl p-6 border"
    :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
    <h4 class="font-semibold mb-4">Статистика корзины</h4>
    
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="p-3 rounded-lg text-center"
        :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
        <div class="text-sm opacity-80">Товаров</div>
        <div class="text-2xl font-bold">{{ totalItems }}</div>
      </div>
      
      <div class="p-3 rounded-lg text-center"
        :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
        <div class="text-sm opacity-80">Средняя цена</div>
        <div class="text-2xl font-bold">{{ averagePrice.toLocaleString() }} ₽</div>
      </div>
    </div>
    
    <div v-if="mostExpensiveItem" class="p-3 rounded-lg"
      :class="theme === 'dark' ? 'bg-yellow-900 bg-opacity-30' : 'bg-yellow-50'">
      <p class="text-sm font-medium mb-1">Самый дорогой товар:</p>
      <p class="font-bold">{{ mostExpensiveItem.name }} — {{ mostExpensiveItem.price.toLocaleString() }} ₽</p>
    </div>
    
    <p class="text-sm opacity-80 mt-4">
      Все данные получены через inject из глобального контекста корзины
    </p>
  </div>
</template>