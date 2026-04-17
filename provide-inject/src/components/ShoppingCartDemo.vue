<script setup>
import { ref, reactive, computed, provide, inject } from 'vue'
import { THEME_KEY, SHOPPING_CART_KEY } from '../keys'

const { theme } = inject(THEME_KEY)

// Корзина покупок
const cart = reactive({
  items: [
    { id: 1, name: 'Ноутбук', price: 99900, quantity: 1 },
    { id: 2, name: 'Мышь', price: 2500, quantity: 2 },
    { id: 3, name: 'Клавиатура', price: 4500, quantity: 1 },
    { id: 4, name: 'Монитор', price: 32000, quantity: 1 }
  ]
})

// Вычисляемые свойства
const totalItems = computed(() => {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
})

const totalPrice = computed(() => {
  return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

// Методы
const addItem = (item) => {
  const existing = cart.items.find(i => i.id === item.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.items.push({ ...item, quantity: 1 })
  }
}

const removeItem = (id) => {
  const index = cart.items.findIndex(item => item.id === id)
  if (index !== -1) {
    if (cart.items[index].quantity > 1) {
      cart.items[index].quantity--
    } else {
      cart.items.splice(index, 1)
    }
  }
}

const clearCart = () => {
  cart.items = []
}

// Предоставляем корзину
provide(SHOPPING_CART_KEY, {
  cart,
  totalItems,
  totalPrice,
  addItem,
  removeItem,
  clearCart
})

// Товары для добавления
const availableProducts = [
  { id: 5, name: 'Наушники', price: 7500 },
  { id: 6, name: 'Веб-камера', price: 3500 },
  { id: 7, name: 'Коврик для мыши', price: 800 },
  { id: 8, name: 'USB-хаб', price: 2200 }
]
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Корзина покупок через контекст</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: корзина -->
      <div class="space-y-6">
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold">Корзина покупок</h3>
            <div class="flex items-center space-x-4">
              <div class="px-3 py-1 rounded-full text-sm font-medium"
                :class="theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100 text-blue-800'">
                Товаров: {{ totalItems }}
              </div>
              <button
                @click="clearCart"
                class="px-3 py-1 rounded text-sm"
                :class="theme === 'dark' 
                  ? 'bg-red-900 hover:bg-red-800' 
                  : 'bg-red-100 hover:bg-red-200 text-red-800'">
                Очистить
              </button>
            </div>
          </div>
          
          <!-- Список товаров -->
          <div class="space-y-4">
            <div v-for="item in cart.items" :key="item.id"
              class="flex items-center justify-between p-4 rounded-lg border"
              :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'">
              <div>
                <h4 class="font-medium">{{ item.name }}</h4>
                <p class="text-sm opacity-80">{{ item.price.toLocaleString() }} ₽ × {{ item.quantity }}</p>
              </div>
              
              <div class="flex items-center space-x-4">
                <span class="font-bold">
                  {{ (item.price * item.quantity).toLocaleString() }} ₽
                </span>
                <div class="flex items-center space-x-2">
                  <button
                    @click="removeItem(item.id)"
                    class="w-8 h-8 rounded-full flex items-center justify-center"
                    :class="theme === 'dark' 
                      ? 'bg-red-900 hover:bg-red-800' 
                      : 'bg-red-100 hover:bg-red-200 text-red-800'">
                    -
                  </button>
                  <span class="w-8 text-center">{{ item.quantity }}</span>
                  <button
                    @click="addItem(item)"
                    class="w-8 h-8 rounded-full flex items-center justify-center"
                    :class="theme === 'dark' 
                      ? 'bg-green-900 hover:bg-green-800' 
                      : 'bg-green-100 hover:bg-green-200 text-green-800'">
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="cart.items.length === 0" class="text-center py-8 opacity-80">
              Корзина пуста
            </div>
          </div>
          
          <!-- Итог -->
          <div class="mt-6 pt-6 border-t"
            :class="theme === 'dark' ? 'border-gray-600' : 'border-gray-200'">
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold">Итого:</span>
              <span class="text-2xl font-bold text-green-600">
                {{ totalPrice.toLocaleString() }} ₽
              </span>
            </div>
          </div>
        </div>

        <!-- Компонент MiniCart -->
        <MiniCart />
      </div>

      <!-- Правая колонка: добавление товаров -->
      <div class="space-y-6">
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Добавить товары</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="product in availableProducts" :key="product.id"
              class="p-4 rounded-lg border transition-all hover:shadow"
              :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'">
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium">{{ product.name }}</h4>
                <span class="font-bold">{{ product.price.toLocaleString() }} ₽</span>
              </div>
              
              <button
                @click="addItem(product)"
                class="w-full mt-2 py-2 rounded-lg font-medium transition-all"
                :class="theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'">
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>

        <!-- Компонент CartSummary -->
        <CartSummary />
        
        <!-- Объяснение -->
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h4 class="font-semibold mb-3">Глобальный контекст корзины</h4>
          
          <p class="text-sm opacity-80 mb-3">
            Корзина предоставляется через provide и доступна в любом компоненте:
          </p>
          
          <div class="space-y-2 text-sm">
            <div class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
              <span>Главная страница: отображает мини-корзину</span>
            </div>
            <div class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
              <span>Карточка товара: добавляет товары</span>
            </div>
            <div class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-purple-500 mr-3"></span>
              <span>Хедер: показывает количество товаров</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>