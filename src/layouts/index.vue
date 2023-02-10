<template>
  <t-layout>
    <t-aside><layout-side-nav /></t-aside>
    <t-content><layout-content /></t-content>
  </t-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import LayoutSideNav from './components/LayoutSideNav.vue'
import LayoutContent from './components/LayoutContent.vue'

// import '@/style/layout.less';

// const route = useRoute()
</script>

<style lang="less" scoped>

</style>
