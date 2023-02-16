<template>
  <div class="top"></div>
  <div class="gridBox">

    <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }" v-for="item in pages">
      <template #footer>
        <t-comment :author=item.title :content=item.description />
      </template>
    </t-card>

  </div>
</template>

<script setup>

const cover = 'https://tdesign.gtimg.com/site/source/card-demo.png'

let pages = [
  { title: "日历", description: "自封装的日历组件" },
  { title: "笔记", description: "学习前端的路上写下的笔记" },
  { title: "代办", description: "一个基于localstorage的todolist" },
]
</script>


<style lang="scss" scoped >
.top {
  width: 100%;
  height: 60px;
}

.gridBox {
  display: grid;
  width: calc(100% - 80px);
  grid: auto-flow / 1fr 1fr 1fr;
  justify-items: center
}

.t-card {
  margin-bottom: 30px;
}
</style>
