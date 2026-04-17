<script setup>
import { inject, computed } from 'vue'
import { FORM_STATE_KEY } from '../keys'

const props = defineProps({
  label: String,
  field: String
})

const { formState } = inject(FORM_STATE_KEY)

const hasError = computed(() => !!formState.errors[props.field])
const errorMessage = computed(() => formState.errors[props.field])
</script>

<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium">
      {{ label }}
    </label>
    
    <slot></slot>
    
    <div v-if="hasError" class="text-red-600 text-sm mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>