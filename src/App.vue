<template>
  <t-layout>
    <layout-side-nav />
    <t-content>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </t-content>
  </t-layout>
</template>

<script setup>
// import { storeToRefs } from 'pinia'
// import { useRoute } from 'vue-router'

import LayoutSideNav from '@/layouts/LayoutSideNav.vue'

// import '@/style/layout.less';

// const route = useRoute()
</script>

<style lang="scss" scoped>
@media screen and (max-width: 500px) {
  .t-layout__sider {
    width: 0;
  }

}

.t-layout__content {
  height: 100vh;
}
</style>
