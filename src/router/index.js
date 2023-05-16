import { createRouter, createWebHashHistory } from 'vue-router'
import homeVue from '@/views/home.vue'
import calendarVue from '@/views/calendar.vue'
import pageVue from '@/views/page.vue'
import notesVue from '@/views/notes.vue'
import flexVue from '@/views/flex.vue'
import todolistVue from '@/views/todolist.vue'
// import stockVue from '@/views/stock.vue'
import searchForQQ from '@/views/searchForQQ.vue'

// 自动导入modules文件夹下所有ts文件
// const modules = import.meta.glob('./modules/**/*.ts')

// // 路由暂存
// const routeModuleList = []

// Object.keys(modules).forEach((key) => {
//   const mod = modules[key].default || {}
//   const modList = Array.isArray(mod) ? [...mod] : [mod]
//   routeModuleList.push(...modList)
// })

// 存放动态路由
// export const asyncRouterList = [...routeModuleList]

// 存放固定的路由
const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login/index.vue'),
  // },
  {
    path: '/',
    component: homeVue,
    redirect: '/page',
  },
  {
    path: '/page',
    component: pageVue,
  },  
  {
    path: '/calendar',
    component: calendarVue,
  },
  {
    path: '/notes',
    component: notesVue,
  },
  {
    path: '/todolist',
    component: todolistVue,
  },
  {
    path: '/searchForQQ',
    component: searchForQQ,
  },
  {
    path: '/flex',
    component: flexVue,
  },
  {
    path: '/stock',
    component: () => import('@/views/stock.vue'),
  },  
  {
    path: '/:w*',
    component: () => import('@/views/noFound.vue'),
  },
]

// const routes = [...defaultRouterList, ...asyncRouterList]

const router = createRouter({
  history: createWebHashHistory(),
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
