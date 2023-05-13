<template>
  <t-aside>
    <t-menu theme="light" value="dashboard" style="margin-right: 50px" height="550px">
      <div class="block">
        {{ clock.format('YY-MM-DD ddd HH:mm:ss') }}
      </div>
      <!-- <router-link to="/">
          <t-menu-item value="home">
            <template #icon>
              <t-icon name="home" />
            </template>
            首页
          </t-menu-item>
        </router-link> -->

      <router-link v-for="route in routes" :to=route.to>
        <t-menu-item :value=route.value>
          <template #icon>
            <t-icon :name=route.iconName />
          </template>
          {{ route.title }}
        </t-menu-item>
      </router-link>

    </t-menu>
  </t-aside>
</template>



<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
let clock = ref(dayjs())
setInterval(() => {
  clock.value = clock.value == dayjs() ? clock.value : dayjs()
}, 1000)

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
]

</script>


<style lang="scss" scoped>
.block {
  width: 100%;
  height: 20px;
  background-color: #d9e1ff;
  margin: 10px 0;
}

// @media (min-width: 1024px) {
// }

section {
  height: 100vh;
}
</style>
