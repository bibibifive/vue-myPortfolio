<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
let clock = ref(dayjs())
setInterval(() => {
  clock.value = clock.value == dayjs() ? clock.value : dayjs()
}, 1000)

</script>

<template>
  <t-aside>
    <t-menu theme="light" value="dashboard" style="margin-right: 50px" height="550px">
      <div class="block">
        {{ clock.format('YYYY-MM-DD dddd HH:mm:ss') }}
      </div>
      <router-link to="/">
        <t-menu-item value="home">
          <template #icon>
            <t-icon name="home" />
          </template>
          首页
        </t-menu-item>
      </router-link>

      <router-link to="/todolist">
        <t-menu-item value="todolist">
          <template #icon>
            <t-icon name="bulletpoint" />
          </template>



          代办
        </t-menu-item>
      </router-link>

      <router-link to="/calendar">
        <t-menu-item value="calendar">
          <template #icon>
            <t-icon name="calendar" />
          </template>
          日历组件
        </t-menu-item>
      </router-link>

      <router-link to="/notes">
        <t-menu-item value="notes">
          <template #icon>
            <t-icon name="books" />
          </template>
          笔记
        </t-menu-item>
      </router-link>

      <router-link to="/searchForQQ">
        <t-menu-item value="searchForQQ">
          <template #icon>
            <t-icon name="logo-qq" />
          </template>
          searchForQQ
        </t-menu-item>
      </router-link>

    </t-menu>
  </t-aside>
</template>


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
