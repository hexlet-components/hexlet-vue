<script setup>
import { provide } from 'vue'
import { TABS_CONTEXT_KEY } from '../keys'

const props = defineProps({
  defaultTab: {
    type: Number,
    default: 0
  }
})

const activeTab = ref(props.defaultTab)
const setActiveTab = (index) => {
  activeTab.value = index
}

provide(TABS_CONTEXT_KEY, {
  activeTab: readonly(activeTab),
  setActiveTab
})
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>