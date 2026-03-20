import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/IndexPage.vue'
import DetailPage from '../pages/DetailPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  { path: '/', component: IndexPage },
  { path: '/sketch/:name', component: DetailPage },
  { path: '/404', component: NotFoundPage },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
