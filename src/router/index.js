import { createRouter, createWebHistory } from 'vue-router'
import LayoutContent from '@/layouts/components/LayoutContent.vue'

// 自动导入modules文件夹下所有ts文件
const modules = import.meta.glob('./modules/**/*.ts')

// 路由暂存
const routeModuleList = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// 存放动态路由
export const asyncRouterList = [...routeModuleList]

// 存放固定的路由
const defaultRouterList = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/pages/login/index.vue'),
  // },
  {
    path: '/',
    name: 'home',
    component: LayoutContent,
  },
  {
    path: '/calendar',
    name: 'todolist',
    component: () => import('@/pages/calendar.vue'),
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('@/pages/notes.vue'),
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: () => import('@/pages/todolist.vue'),
  },
  {
    path: '/:w+',
    name: '404Page',
    component: LayoutContent,
  },
]

const routes = [...defaultRouterList, ...asyncRouterList]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
