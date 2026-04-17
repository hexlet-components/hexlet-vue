<script setup>
import { ref, provide, reactive, computed, inject } from 'vue'
import { THEME_KEY, FORM_STATE_KEY } from '../keys'

const { theme } = inject(THEME_KEY)

// Состояние формы
const formState = reactive({
  submitting: false,
  disabled: false,
  errors: {}
})

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

// Provide состояния формы
provide(FORM_STATE_KEY, { formState, formData })

// Валидация
const validateForm = () => {
  formState.errors = {}
  
  if (!formData.name.trim()) {
    formState.errors.name = 'Имя обязательно'
  }
  
  if (!formData.email.trim()) {
    formState.errors.email = 'Email обязателен'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    formState.errors.email = 'Некорректный email'
  }
  
  if (!formData.message.trim()) {
    formState.errors.message = 'Сообщение обязательно'
  }
  
  return Object.keys(formState.errors).length === 0
}

// Отправка формы
const submitForm = async () => {
  if (formState.submitting || !validateForm()) return
  
  formState.submitting = true
  
  // Имитация API запроса
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  console.log('Форма отправлена:', formData)
  
  formState.submitting = false
  formState.disabled = true
  
  setTimeout(() => {
    formState.disabled = false
    Object.assign(formData, { name: '', email: '', message: '' })
    formState.errors = {}
  }, 2000)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Форма с контекстом состояния</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Левая колонка: форма -->
      <div class="space-y-6">
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Форма обратной связи</h3>
          
          <div class="space-y-4">
            <!-- Поле 1 -->
            <FormField label="Имя" field="name">
              <input
                v-model="formData.name"
                type="text"
                :disabled="formState.disabled || formState.submitting"
                class="w-full px-4 py-2 rounded-lg border transition-all"
                :class="[
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900',
                  formState.errors.name 
                    ? 'border-red-500' 
                    : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                ]"
                placeholder="Введите ваше имя"
              />
            </FormField>
            
            <!-- Поле 2 -->
            <FormField label="Email" field="email">
              <input
                v-model="formData.email"
                type="email"
                :disabled="formState.disabled || formState.submitting"
                class="w-full px-4 py-2 rounded-lg border transition-all"
                :class="[
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900',
                  formState.errors.email 
                    ? 'border-red-500' 
                    : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                ]"
                placeholder="email@example.com"
              />
            </FormField>
            
            <!-- Поле 3 -->
            <FormField label="Сообщение" field="message">
              <textarea
                v-model="formData.message"
                :disabled="formState.disabled || formState.submitting"
                rows="4"
                class="w-full px-4 py-2 rounded-lg border transition-all"
                :class="[
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900',
                  formState.errors.message 
                    ? 'border-red-500' 
                    : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                ]"
                placeholder="Ваше сообщение..."
              ></textarea>
            </FormField>
          </div>
          
          <div class="mt-6">
            <button
              @click="submitForm"
              :disabled="formState.submitting || formState.disabled"
              class="w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center"
              :class="[
                formState.submitting || formState.disabled
                  ? theme === 'dark'
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : theme === 'dark'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-100 hover:bg-green-200 text-green-800'
              ]"
            >
              <span v-if="formState.submitting" class="animate-spin mr-2">⟳</span>
              <span v-if="formState.submitting">Отправка...</span>
              <span v-else-if="formState.disabled">Отправлено!</span>
              <span v-else>Отправить сообщение</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Правая колонка: состояние формы -->
      <div class="space-y-6">
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h3 class="text-lg font-semibold mb-4">Состояние формы</h3>
          
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="p-3 rounded-lg text-center"
                :class="theme === 'dark' 
                  ? formState.submitting ? 'bg-yellow-900' : 'bg-gray-800'
                  : formState.submitting ? 'bg-yellow-100' : 'bg-gray-100'">
                <div class="text-sm opacity-80">Отправка</div>
                <div class="font-bold"
                  :class="formState.submitting ? 'text-yellow-600' : ''">
                  {{ formState.submitting ? 'Да' : 'Нет' }}
                </div>
              </div>
              
              <div class="p-3 rounded-lg text-center"
                :class="theme === 'dark' 
                  ? formState.disabled ? 'bg-green-900' : 'bg-gray-800'
                  : formState.disabled ? 'bg-green-100' : 'bg-gray-100'">
                <div class="text-sm opacity-80">Заблокирована</div>
                <div class="font-bold"
                  :class="formState.disabled ? 'text-green-600' : ''">
                  {{ formState.disabled ? 'Да' : 'Нет' }}
                </div>
              </div>
            </div>
            
            <!-- Ошибки -->
            <div v-if="Object.keys(formState.errors).length > 0">
              <h4 class="font-medium mb-2 text-red-600">Ошибки валидации:</h4>
              <ul class="space-y-1">
                <li v-for="(error, field) in formState.errors" :key="field"
                  class="text-sm p-2 rounded bg-red-50 text-red-700">
                  {{ field }}: {{ error }}
                </li>
              </ul>
            </div>
            
            <!-- Данные формы -->
            <div>
              <h4 class="font-medium mb-2">Данные формы:</h4>
              <pre class="text-xs p-3 rounded overflow-x-auto"
                :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
          </div>
        </div>

        <!-- Компонент FormField -->
        <div class="rounded-xl p-6 border"
          :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
          <h4 class="font-semibold mb-3">Компонент FormField</h4>
          
          <p class="text-sm opacity-80 mb-4">
            FormField получает состояние формы через inject и автоматически:
          </p>
          
          <ul class="space-y-2 text-sm">
            <li class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
              Отображает ошибки валидации
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
              Блокирует поле при отправке
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-purple-500 mr-3"></span>
              Работает с любым типом поля (input, textarea, select)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>