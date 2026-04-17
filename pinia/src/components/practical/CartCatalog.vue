<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const { catalog } = storeToRefs(cartStore)
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-6">
    <h3 class="mb-4 text-lg font-semibold text-slate-900">Каталог товаров</h3>

    <div class="grid gap-3 md:grid-cols-2">
      <article
        v-for="product in catalog"
        :key="product.id"
        class="rounded-lg border border-slate-200 bg-slate-50 p-4"
      >
        <div class="mb-2 flex items-start justify-between gap-3">
          <div>
            <h4 class="font-medium text-slate-900">{{ product.title }}</h4>
            <p class="text-xs text-slate-500">{{ product.category }}</p>
          </div>
          <strong class="text-slate-900">{{ product.price.toLocaleString() }} ₽</strong>
        </div>

        <button
          class="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          @click="cartStore.addToCart(product)"
        >
          Добавить в корзину
        </button>
      </article>
    </div>
  </section>
</template>
