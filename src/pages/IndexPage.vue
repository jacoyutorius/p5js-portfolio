<template>
  <main>
    <h1>p5.js Portfolio</h1>
    <p v-if="sketches.length === 0">作品がまだありません</p>
    <ul v-else class="sketch-list">
      <li v-for="sketch in sketches" :key="sketch.name">
        <SketchCard
          :name="sketch.name"
          :title="sketch.title"
          :description="sketch.description"
        />
      </li>
    </ul>
  </main>
</template>

<script setup>
import { getSketches } from '../sketches.js'
import SketchCard from '../components/SketchCard.vue'

const sketches = getSketches()
</script>

<style scoped>
.sketch-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
</style>
