<script setup>
let pagelist = ["首页", "沸点", "课程", "直播", "活动", "竞赛", "商城", "APP", "插件"]
</script>

<template>
  <div>
    <img class="logo" src="@/assets/logo.svg" alt="logo">
    <li v-for="page in pagelist"><RouterLink to="/" >{{ page }}</RouterLink></li>
    
  </div>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  height: 60px;
  padding: 10px;
  display: block;
}

li {
  list-style-type: none;
}

a {
  display: inline-block;
  margin: 0 12px;
  height: 60px;
  line-height: 60px;

  &::before {
    content: "";
    position: absolute;
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
  }

  &:hover::before {
    background-color: var(--color-main);
  }
}
</style>