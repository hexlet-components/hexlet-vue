<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const { cartLines, totalItems, totalPrice, hasItems } = storeToRefs(cartStore)
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-6">
    <h3 class="mb-4 text-lg font-semibold text-slate-900">Корзина на странице checkout</h3>

    <div v-if="hasItems" class="space-y-3">
      <article
        v-for="line in cartLines"
        :key="line.id"
        class="rounded-lg border border-slate-200 bg-slate-50 p-4"
      >
        <div class="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h4 class="font-medium text-slate-900">{{ line.title }}</h4>
            <p class="text-sm text-slate-500">{{ line.price.toLocaleString() }} ₽ за единицу</p>
          </div>
          <strong class="text-slate-900">{{ line.lineTotal.toLocaleString() }} ₽</strong>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            class="rounded-lg bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-300"
            @click="cartStore.decreaseQuantity(line.id)"
          >
            -1
          </button>
          <span class="rounded-lg bg-white px-3 py-1 text-sm text-slate-700">
            {{ line.quantity }}
          </span>
          <button
            class="rounded-lg bg-slate-800 px-3 py-1 text-sm font-medium text-white hover:bg-slate-700"
            @click="cartStore.increaseQuantity(line.id)"
          >
            +1
          </button>
          <button
            class="ml-auto rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
            @click="cartStore.removeFromCart(line.id)"
          >
            Удалить
          </button>
        </div>
      </article>

      <div class="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
        Итого: <strong>{{ totalItems }}</strong> шт. на сумму
        <strong>{{ totalPrice.toLocaleString() }} ₽</strong>
      </div>

      <button
        class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        @click="cartStore.clearCart()"
      >
        Очистить корзину
      </button>
    </div>

    <p v-else class="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">Корзина пока пустая</p>
  </section>
</template>
