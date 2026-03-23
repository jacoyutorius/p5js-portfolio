<template>
  <article>
    <router-link
      :to="`/sketch/${name}`"
      class="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100
             hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ title }}</h2>
      <p v-if="description" class="text-sm text-gray-500 leading-relaxed">{{ description }}</p>
      <span class="inline-block mt-4 text-xs font-medium text-indigo-500">View sketch →</span>
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
