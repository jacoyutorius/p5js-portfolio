<template>
  <div>
    <header class="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">
      <RouterLink
        to="/"
        class="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
      >
        ← 一覧に戻る
      </RouterLink>
    </header>

    <template v-if="sketch">
      <div class="max-w-5xl mx-auto px-6 pb-6">
        <h1 class="text-2xl font-bold text-gray-900">{{ sketch.title }}</h1>
        <p v-if="sketch.description" class="mt-1 text-gray-500">{{ sketch.description }}</p>
      </div>

      <div class="w-full aspect-video bg-gray-100">
        <iframe
          :src="`${baseUrl}sketches/${sketch.name}/index.html`"
          class="w-full h-full border-0"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getSketches } from '../sketches.js'

const route = useRoute()
const router = useRouter()
const name = route.params.name
const baseUrl = import.meta.env.BASE_URL

const sketch = getSketches().find((s) => s.name === name)

if (!sketch) {
  router.replace({ path: '/404' })
}
</script>
