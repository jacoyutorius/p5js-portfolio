<template>
  <main>
    <RouterLink to="/">← 一覧に戻る</RouterLink>
    <template v-if="sketch">
      <h1>{{ sketch.title }}</h1>
      <p v-if="sketch.description">{{ sketch.description }}</p>
      <iframe :src="`${baseUrl}sketches/${sketch.name}/index.html`" />
    </template>
  </main>
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
