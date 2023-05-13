<template>
  <div class="main">
    <div class="left">
      <div v-for="item in data" @click="change(item)">{{ item.title }} </div>
    </div>
    <div class="right">{{ rightData }}</div>
  </div>
</template>



<script setup>
import { ref } from 'vue'

// 组件 listAndDetail ( data )
const props = defineProps({
  data: Object
})

let rightData = ref(props.data[0].detail)

function change(item) {
  rightData.value = item.detail
}

</script>


<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: stretch;
  /* align-items: center; */
  /* gap: 50px; */
  font-size: large;
}

.left {
  width: 10%;
  background-color: rgb(215, 255, 255);
}

.right {
  width: fit-content;
  background-color: rgb(255, 255, 228);
  /* margin: auto; */
}
</style> 