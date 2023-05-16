<template>
  <t-aside>
    <t-menu theme="light" value="dashboard">
      <!-- <div class="block">
        {{ clock.format('YY-MM-DD ddd HH:mm:ss') }}
      </div> -->

      <flipClock />

      <router-link v-for="route in routes" :to="route.to">
        <t-menu-item :value="route.value" v-if="route.origin">
          <template #icon>
            <iconpark-icon :name="route.iconName" size="20" fill="#888"></iconpark-icon>
          </template>
          <span style="margin-left: 8px"> {{ route.title }}</span>
        </t-menu-item>

        <t-menu-item :value="route.value" v-else>
          <template #icon>
            <t-icon :name="route.iconName" />
          </template>
          {{ route.title }}
        </t-menu-item>
      </router-link>
    </t-menu>
  </t-aside>
</template>

<script setup>
// import dayjs from 'dayjs'
// import { ref } from 'vue'
// let clock = ref(dayjs())
// setInterval(() => {
//   clock.value = clock.value == dayjs() ? clock.value : dayjs()
// }, 1000)

import flipClock from '@/views/component/flipClock.vue'

const routes = [
  {
    to: '/',
    value: 'home',
    iconName: 'home',
    title: '首页',
  },
  {
    to: '/page',
    value: 'page',
    iconName: 'order-adjustment-column',
    title: '分页',
  },
  {
    to: '/todolist',
    value: 'todolist',
    iconName: 'bulletpoint',
    title: '待办',
  },
  {
    to: '/calendar',
    value: 'calendar',
    iconName: 'calendar',
    title: '日历组件',
  },
  {
    to: '/notes',
    value: 'notes',
    iconName: 'books',
    title: '笔记',
  },
  {
    to: '/searchForQQ',
    value: 'searchForQQ',
    iconName: 'logo-qq',
    title: 'searchForQQ',
  },
  {
    to: '/flex',
    value: 'flex',
    iconName: 'logo-windows',
    title: '布局',
  },
  {
    to: '/stock',
    value: 'stock',
    iconName: 'chart-stock',
    title: '股市',
    origin: 'iconpark',
  },
]
</script>

<style lang="scss" scoped>

.t-layout__sider{
  height: 100vh;
}
.block {
  width: 100%;
  height: 20px;
  background-color: #d9e1ff;
  margin: 10px 0;
}

// @media (min-width: 1024px) {
// }

.t-menu__content {
  margin-left: 20px;
}

section {
  height: 100vh;
}
</style>
