<script setup>
import { inject, computed } from 'vue'
import { TABS_CONTEXT_KEY } from '../keys'

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const { activeTab } = inject(TABS_CONTEXT_KEY)

const isActive = computed(() => activeTab.value === props.index)
</script>

<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>