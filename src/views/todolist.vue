<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// todo: 导入生成todo
// todo: 撤回
// todo: 可修改现有todo
// todo: 优先级
// todo: 修改顺序
// todo: 点击完成todo显示bug
// todo: 已删除列表(再次删除完全删除) (展开 收纳)

// 申请localStorage空间
localStorage.ingData == null && localStorage.setItem('ingData', '提醒我定闹钟,明天带伞')
localStorage.doneData == null && localStorage.setItem('doneData', '今晚整理衣物')

// 双区初始化
let ingData = ref(localStorage.ingData == '' ? [] : localStorage.ingData.split(','))
let doneData = ref(localStorage.doneData == '' ? [] : localStorage.doneData.split(','))
// localStorage.clear()

// 添加的代办内容
let addValue = ref('')

// 刷新前保存修改
window.addEventListener('beforeunload', (event) => {
  event.preventDefault()
  localStorage.setItem('ingData', ingData.value)
  localStorage.setItem('doneData', doneData.value)
})
// 卸载前时保存修改
onBeforeUnmount(() => {
  localStorage.setItem('ingData', ingData.value)
  localStorage.setItem('doneData', doneData.value)
})

// ref绑定DOM
// let refAll = getCurrentInstance().ctx.$refs
// const addtodo = refAll.addtodo

function Addtodo() {
  const text = addValue.value
  if (!text) return
  ingData.value.unshift(text)
  addValue.value = null
}

function zoneSwitch(e, zone) {
  const text = e.currentTarget.nextElementSibling.textContent
  zone.some((v, i) => {
    if (v === text) {
      zone.splice(i, 1)
      return true
    }
  })
  if (zone == ingData.value) doneData.value.unshift(text)
  else ingData.value.unshift(text)
}

function deleteTodo(e, zone) {
  const text = e.currentTarget.previousElementSibling.textContent
  zone.some((v, i) => {
    if (v === text) {
      zone.splice(i, 1)
      return true
    }
  })
}

function deleteAll() {
  if (confirm('是否要清空')) doneData.value = []
  else return
}

function upload_todolist() {
  const newList_upload = upload.files[0]
  const list_reader = new FileReader()
  list_reader.onload = (proEvt) => {
    let tmp = proEvt.target.result
    tmp = tmp.trim().split('\n')
    doneData.value.push(...ingData.value) //把待办全部推入结束
    ingData.value = [] //置空代办
    ingData.value.push(...tmp) //推入代办文件的文本
  }
  //将 Blob 或者 File 对象转根据特殊的编码格式转化为内容 (字符串形式)
  // 这个方法是异步的，也就是说，只有当执行完成后才能够查看到结果，如果直接查看是无结果的，并返回 undefined
  list_reader.readAsText(newList_upload)
}

onMounted(() => {
  const upload = document.querySelector('#upload')
})

onMounted(() => {
  console.log('ingData: ', localStorage.ingData.split(','))
  console.log('doneData: ', localStorage.doneData.split(','))
})
</script>

<template>
  <div id="app">
    <form class="header" @submit="Addtodo">
      <p>ToDolist</p>
      <input v-model.trim="addValue" type="text" placeholder="请输入ToDo" id="addtodo" />
      <button type="submit">添加</button>
      <label for="upload" class="labelButton">
          <iconpark-icon name="folder-upload"></iconpark-icon>
      </label>
      <input
        @change="upload_todolist()"
        type="file"
        id="upload"
        name="upload"
        accept="application/vnd.ms-excel, text/plain"
        style="display: none"
      />
    </form>
    <div class="content">
      <div class="ing">
        <h2 class="ingZone">正在进行 {{ ingData.length }}</h2>
        <ul>
          <li v-for="(todo, index) in ingData" :key="index">
            <input type="checkbox" @click="zoneSwitch($event, ingData)" />
            <p>{{ todo }}</p>
            <div class="icon" @click="deleteTodo($event, ingData)">
              <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12L16.2 5H31.8L33 12" stroke="#333" stroke-width="4" stroke-linejoin="round" />
                <path d="M6 12H42" stroke="#333" stroke-width="4" stroke-linecap="round" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M37 12L35 43H13L11 12H37Z"
                  fill="#333"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M19 35H29" stroke="#FFF" stroke-width="4" stroke-linecap="round" />
              </svg>
            </div>
          </li>
        </ul>
      </div>

      <div class="done">
        <div class="doneZone">
          <h2>已经完成 {{ doneData.length }}</h2>

          <button @click="deleteAll()">清空</button>
        </div>
        <ul>
          <li v-for="(todo, index) in doneData" :key="index">
            <input type="checkbox" @click="zoneSwitch($event, doneData)" checked />
            <p>{{ todo }}</p>
            <div class="icon" @click="deleteTodo($event, doneData)">
              <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12L16.2 5H31.8L33 12" stroke="#333" stroke-width="4" stroke-linejoin="round" />
                <path d="M6 12H42" stroke="#333" stroke-width="4" stroke-linecap="round" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M37 12L35 43H13L11 12H37Z"
                  fill="#333"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M19 35H29" stroke="#FFF" stroke-width="4" stroke-linecap="round" />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-family: 'pingfang sc', 'Courier New', Courier, monospace;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
}

// 全部header
.header {
  display: flex;
  gap: 20px;
  flex-shrink: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  // justify-content: space-around;
  background-color: var(--color-blue);
  align-items: center;

  button {
    font-size: 20px;
  }

  p {
    font-size: 1.8em;
    font-weight: 700;
    color: #fff;
  }

  input {
    border: 1px solid #22222222;
    line-height: 1.2em;
    flex: 1;
    padding: 5px;
    border-radius: 0.3em;
    box-shadow: inset 0 0 0.1em #222;
    font-size: 1.2em;
  }
}

.content {
  flex-shrink: 1;
  width: 30em;
  height: 100%;
  margin: 20px 0 0 10px;
  display: flex;
  flex-direction: column;

  background-color: rgb(245, 253, 255);
  padding: 20px 5px;
  border-radius: 10px;

  .ing {
    margin-left: 5px;

    li {
      border-left: 5px solid var(--color-blue);
    }
  }

  .done {
    margin-left: 5px;
    margin-top: 40px;

    .doneZone {
      display: flex;
      justify-content: space-between;
    }

    li {
      border-left: 5px solid var(--color-blue-light);
      opacity: 50%;
    }
  }

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 5px 10px;
    margin-top: 10px;
    border-bottom: 1px solid #22222222;

    p {
      flex: 1;
      width: 10em;
      text-overflow: ellipsis;
      padding: 0 10px;
      line-height: 2em;
      font-size: 1.4em;
    }

    input {
      width: 20px;
      cursor: pointer;
      background-color: black;
    }

    .icon {
      cursor: pointer;
      display: flex;
      align-items: center;

      path {
        fill: var(--color-blue);
      }
    }
  }
}

// 零散样式...................................
// .........................................

button,.labelButton {
  // width: 5em;
  display: flex;
  align-items: center;
  width: fit-content;
  height: 2em;
  padding: 2px 10px;
  border: 0;
  background-color: #fff;
  border-radius: 0.5em;
  color: var(--color-blue);
  font-size: 1.2em;
  cursor: pointer;

  &:hover {
    filter: brightness(95%);
  }
}

::-webkit-scrollbar {
  width: 1px;
}

::-webkit-scrollbar-thumb {
  border-radius: 1px;
  background: var(--color-blue);
}

::-webkit-scrollbar-track {
  border-radius: 1px;
  background: #eee;
}

@media screen and (max-width: 700px) {
  .header {
    width: 100vw;
    p {
      display: none;
    }
  }
  .content {
    width: 100%;
  }
}
</style>
