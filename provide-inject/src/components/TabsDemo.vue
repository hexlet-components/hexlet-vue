<script setup>
import { ref, provide, inject, computed } from 'vue'
import { THEME_KEY, TABS_CONTEXT_KEY } from '../keys'

const { theme } = inject(THEME_KEY)

// Состояние вкладок
const activeTab = ref(0)
const setActiveTab = (index) => {
  activeTab.value = index
}

// Предоставляем контекст вкладок
provide(TABS_CONTEXT_KEY, { activeTab, setActiveTab })
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Вкладки через контекст</h2>
    
    <div class="rounded-xl border p-6"
      :class="theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'">
      
      <!-- Контейнер вкладок -->
      <TabsContainer>
        <!-- Панель вкладок -->
        <div class="flex space-x-1 border-b mb-6"
          :class="theme === 'dark' ? 'border-gray-600' : 'border-gray-200'">
          <TabButton :index="0">Профиль</TabButton>
          <TabButton :index="1">Настройки</TabButton>
          <TabButton :index="2">Статистика</TabButton>
          <TabButton :index="3">О системе</TabButton>
        </div>
        
        <!-- Содержимое вкладок -->
        <TabContent :index="0">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Профиль пользователя</h3>
            <p>Эта вкладка показывает информацию о профиле пользователя.</p>
            <div class="p-4 rounded-lg"
              :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
              <p class="text-sm">Данные загружаются динамически при переключении вкладок.</p>
            </div>
          </div>
        </TabContent>
        
        <TabContent :index="1">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Настройки системы</h3>
            <p>Настройте параметры системы под свои нужды.</p>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span>Уведомления</span>
                <span class="px-2 py-1 rounded text-sm"
                  :class="theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'">
                  Включены
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span>Темная тема</span>
                <span class="px-2 py-1 rounded text-sm"
                  :class="theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'">
                  {{ theme === 'dark' ? 'Да' : 'Нет' }}
                </span>
              </div>
            </div>
          </div>
        </TabContent>
        
        <TabContent :index="2">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Статистика</h3>
            <p>Графики и метрики производительности.</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 rounded-lg text-center"
                :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
                <div class="text-2xl font-bold">89%</div>
                <div class="text-sm opacity-80">Эффективность</div>
              </div>
              <div class="p-4 rounded-lg text-center"
                :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
                <div class="text-2xl font-bold">1.2k</div>
                <div class="text-sm opacity-80">Посещений</div>
              </div>
            </div>
          </div>
        </TabContent>
        
        <TabContent :index="3">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">О системе</h3>
            <p>Техническая информация и системные параметры.</p>
            <div class="p-4 rounded-lg"
              :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'">
              <p class="text-sm">Версия: 2.1.0</p>
              <p class="text-sm">Лицензия: MIT</p>
              <p class="text-sm">Сборка: #2024-01-15</p>
            </div>
          </div>
        </TabContent>
      </TabsContainer>
    </div>
    
    <!-- Объяснение -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-xl p-6 border"
        :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'">
        <h4 class="font-semibold mb-3">Как работают вкладки</h4>
        <p class="text-sm mb-3">
          TabsContainer предоставляет контекст через provide.
          TabButton и TabContent получают его через inject.
        </p>
        <pre class="text-xs bg-black bg-opacity-30 p-3 rounded overflow-x-auto">
// TabsContainer
provide('tabs-context', { activeTab, setActiveTab })

// TabButton
const { activeTab, setActiveTab } = inject('tabs-context')
const isActive = computed(() => activeTab.value === props.index)</pre>
      </div>
      
      <div class="rounded-xl p-6 border"
        :class="theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-green-50 border-green-200'">
        <h4 class="font-semibold mb-3">Преимущества</h4>
        <ul class="space-y-2 text-sm">
          <li class="flex items-start">
            <span class="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
            <span>Нет prop drilling между компонентами</span>
          </li>
          <li class="flex items-start">
            <span class="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
            <span>Легко добавить новые вкладки</span>
          </li>
          <li class="flex items-start">
            <span class="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
            <span>Компоненты можно переиспользовать</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>