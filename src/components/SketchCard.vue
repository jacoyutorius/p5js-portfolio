<template>
  <article class="sketch-card">
    <router-link :to="`/sketch/${name}`" class="sketch-card__link">
      <h2 class="sketch-card__title">{{ title }}</h2>
      <p v-if="description" class="sketch-card__description">{{ description }}</p>
    </router-link>
  </article>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: undefined,
  },
})
</script>

<style scoped>
.sketch-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.sketch-card__link {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}

.sketch-card__link:hover {
  background-color: #f5f5f5;
}

.sketch-card__title {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.sketch-card__description {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}
</style>
