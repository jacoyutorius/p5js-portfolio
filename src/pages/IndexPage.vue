<template>
  <div class="max-w-5xl mx-auto px-6 py-16">
    <header class="mb-12">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">p5.js Portfolio</h1>
      <p class="mt-2 text-gray-500 text-lg">作成した p5.js スケッチの一覧</p>
    </header>

    <p v-if="sketches.length === 0" class="text-gray-400 text-center py-24">
      作品がまだありません
    </p>
    <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <li v-for="sketch in sketches" :key="sketch.name">
        <SketchCard
          :name="sketch.name"
          :title="sketch.title"
          :description="sketch.description"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getSketches } from '../sketches.js'
import SketchCard from '../components/SketchCard.vue'

const sketches = getSketches()
</script>
