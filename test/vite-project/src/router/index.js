import { createRouter, createWebHistory } from 'vue-router'
import homeVue from '../views/Home.vue'
import EggVue from '../views/Egg.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: homeVue },{ path: '/egg', component: EggVue }],
})

export default router
