import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/p5js-portfolio/',
  test: {
    environment: 'happy-dom',
    globals: true,
    passWithNoTests: true,
  },
})
