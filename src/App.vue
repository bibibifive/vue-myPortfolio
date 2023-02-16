<template>
  <t-layout>
    <layout-side-nav />
    <t-content>
      <router-view></router-view>
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

<style lang="less" scoped>

</style>
