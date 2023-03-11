<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { get } from 'lodash'


let msg = ref({}) //载体对象

// 数据初始化
searchqq('123456')


// 搜索函数
function searchqq_Axios(qqNumber) {
  qqNumber = qqNumber.trim()
  if (!qqNumber || isNaN(+qqNumber)) {
    let tmp_obj = {
      nickname: '搜索错误',
      touxiang: '搜索错误',
      email: '搜索错误'
    }
    Object.assign(msg.value, tmp_obj)
    return
  }
  axios.get(`https://v.api.aa1.cn/api/qqjson/index.php?qq=${qqNumber}`)
    .then(response => response.data)
    .then(data => {
      let tmp_obj = { ...data }

      Object.assign(msg.value, tmp_obj)
    })
}

function searchqq(qqNumber) {
  qqNumber = qqNumber.trim()
  if (!qqNumber || isNaN(+qqNumber)) {
    let tmp_obj = {
      nickname: '搜索错误',
      touxiang: '搜索错误',
      email: '搜索错误'
    }
    Object.assign(msg.value, tmp_obj)
    return
  }
  fetch(`https://v.api.aa1.cn/api/qqjson/index.php?qq=${qqNumber}`,{
    method:'GET'
  })
    .then(response => {
      let tmp = response.json()
      return tmp
    })
    .then(data => {
      console.log(data);
      let tmp_obj = { ...data }

      Object.assign(msg.value, tmp_obj)
    })
}



</script>

<template>
  <div class="center">
    <t-input size="large" autoWidth @change="$event => searchqq($event) " />
    <ul>
      <li v-for="(v, k) in msg">
        <div class="k">{{ k }} </div>
        <div class="v" v-if="k === 'touxiang'">
          <img :src='v' alt="">
        </div>
        <div class="v" v-else>{{ v ? v : '无昵称' }} </div>
        <br>
      </li>
    </ul>
  </div>

</template>

<style scoped lang="scss">
.center {
  margin-left: 20px;
  margin-top: 20px;
}

li {
  list-style-type: none;
  font-size: 3em;
  line-height: 1em;
}

.k {
  color: rgb(146, 61, 0);
}

.v {
  color: rgb(103, 0, 29);
}
</style>
