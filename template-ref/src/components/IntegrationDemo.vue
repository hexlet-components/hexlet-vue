<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Интеграция с внешними API</h2>
    
    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <p class="text-gray-600 mb-6">
        Template refs используются для интеграции с нативными API браузера и
        сторонними библиотеками, которые требуют прямого доступа к DOM элементам.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Примеры интеграции -->
        <div class="space-y-4">
          <div class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <h4 class="font-semibold text-blue-800 mb-2">Canvas API</h4>
            <p class="text-blue-600 text-sm">
              <code class="bg-blue-100 px-1 rounded">ref="canvasElement"</code> для
              получения контекста рисования и работы с 2D/3D графикой.
            </p>
          </div>
          
          <div class="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <h4 class="font-semibold text-green-800 mb-2">Web Audio API</h4>
            <p class="text-green-600 text-sm">
              <code class="bg-green-100 px-1 rounded">ref="audioElement"</code> для
              управления воспроизведением, громкостью и другими параметрами аудио.
            </p>
          </div>
          
          <div class="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <h4 class="font-semibold text-purple-800 mb-2">Video API</h4>
            <p class="text-purple-600 text-sm">
              <code class="bg-purple-100 px-1 rounded">ref="videoElement"</code> для
              программного управления видео: пауза, перемотка, полноэкранный режим.
            </p>
          </div>
        </div>
        
        <!-- Сторонние библиотеки -->
        <div class="space-y-4">
          <div class="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
            <h4 class="font-semibold text-yellow-800 mb-2">Графические библиотеки</h4>
            <p class="text-yellow-600 text-sm">
              D3.js, Chart.js, Three.js требуют DOM элемент для инициализации
              и отрисовки графиков, диаграмм, 3D сцен.
            </p>
          </div>
          
          <div class="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <h4 class="font-semibold text-red-800 mb-2">Редакторы кода</h4>
            <p class="text-red-600 text-sm">
              Monaco Editor, CodeMirror, Ace Editor инициализируются на DOM элементе
              и предоставляют API для управления текстом.
            </p>
          </div>
          
          <div class="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
            <h4 class="font-semibold text-indigo-800 mb-2">Карты и геолокация</h4>
            <p class="text-indigo-600 text-sm">
              Google Maps, Leaflet, Mapbox принимают DOM элемент контейнера
              для отображения карт и маркеров.
            </p>
          </div>
        </div>
      </div>
      
      <div class="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <h4 class="font-semibold text-gray-800 mb-2">Общий паттерн интеграции</h4>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
          <div class="text-green-400">&lt;template&gt;</div>
          <div class="my-2 ml-4">&lt;div <span class="text-yellow-300">ref="container"</span>&gt;&lt;/div&gt;</div>
          <div class="text-green-400">&lt;/template&gt;</div>
          <br>
          <div class="text-green-400">&lt;script setup&gt;</div>
          <div class="my-2 ml-4"><span class="text-blue-400">import</span> { ref, onMounted } <span class="text-blue-400">from</span> <span class="text-yellow-300">'vue'</span></div>
          <div class="my-2 ml-4"><span class="text-blue-400">import</span> ExternalLibrary <span class="text-blue-400">from</span> <span class="text-yellow-300">'external-lib'</span></div>
          <br>
          <div class="my-2 ml-4"><span class="text-blue-400">const</span> container = <span class="text-yellow-300">ref</span>(<span class="text-purple-400">null</span>)</div>
          <div class="my-2 ml-4"><span class="text-blue-400">let</span> libraryInstance</div>
          <br>
          <div class="my-2 ml-4"><span class="text-yellow-300">onMounted</span>(() =&gt; {</div>
          <div class="my-2 ml-8">libraryInstance = <span class="text-blue-400">new</span> ExternalLibrary(container.<span class="text-purple-400">value</span>, options)</div>
          <div class="my-2 ml-4">})</div>
          <div class="text-green-400">&lt;/script&gt;</div>
        </div>
      </div>
    </div>
  </div>
</template>