<script setup>
import CartHeaderBadge from './practical/CartHeaderBadge.vue'
import CartCatalog from './practical/CartCatalog.vue'
import CartCheckout from './practical/CartCheckout.vue'
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-slate-900">Практический кейс: глобальная корзина</h2>

    <CartHeaderBadge />

    <div class="mt-6 grid gap-6 xl:grid-cols-2">
      <CartCatalog />
      <CartCheckout />
    </div>

    <div class="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
      Компоненты выше не обмениваются `props` и `emit`, но синхронно отображают одни и те же данные,
      потому что используют единый `useCartStore()`.
    </div>
  </div>
</template>
