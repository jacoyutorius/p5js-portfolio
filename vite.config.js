import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [{ src: 'sketches', dest: '.' }],
    }),
  ],
  base: '/p5js-portfolio/',
  test: {
    environment: 'happy-dom',
    globals: true,
    passWithNoTests: true,
  },
})
