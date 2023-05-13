<template>
  <div class="border">
    <div class="container">
    <div class="box" v-for="_ in 100"></div>
  </div>
  </div>
</template>


<script setup>

</script>


<style scoped lang="scss">
$minWidth : 90px;
$gap : 10px;

.box {
  width: $minWidth;
  height: $minWidth;
  background-color: aquamarine;
}

.container {
  width: calc(($minWidth + $gap) * 12 - $gap);
  display: flex;
  flex-wrap: wrap;
  gap: $gap;

  @for $i from 1 through 100 {
    :nth-child(#{$i}) {
      background-color: rgb(80, 150, 80+$i);
    }
  }
}

.border{
  width: fit-content;
  border: 5px dashed #222;
  margin: 20px auto;
}
</style> 