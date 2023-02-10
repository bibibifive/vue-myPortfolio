<template>
  <div class="navContent">
    <NavLeft></NavLeft>
  </div>
</template>

<script setup>
import NavLeft from './nav-left.vue'
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .navContent {
    width: 1440px;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}


</style>

