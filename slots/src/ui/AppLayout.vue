<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden bg-white">
    <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
      <slot name="header">
        <div class="font-semibold">Header</div>
      </slot>
    </header>

    <div class="flex">
      <aside class="w-64 bg-gray-50 border-r p-4">
        <slot name="sidebar">
          <div class="text-gray-600 text-sm">Sidebar</div>
        </slot>
      </aside>

      <main class="flex-1 p-6">
        <slot name="content">
          <div class="text-gray-700">Content</div>
        </slot>
      </main>
    </div>

    <footer class="bg-gray-800 text-gray-200 p-4">
      <slot name="footer">
        <div class="text-center text-xs">Footer</div>
      </slot>
    </footer>
  </div>
</template>
