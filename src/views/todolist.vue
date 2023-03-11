<script setup>
import { ref, reactive, onMounted, onBeforeMount, onBeforeUnmount, getCurrentInstance } from 'vue'

// todo: 可修改现有todo
// todo: 优先级
// todo: 修改顺序
// todo: 点击完成todo显示bug
// todo: 已删除列表(再次删除完全删除) (展开 收纳)

// 申请localStorage空间
localStorage.ingData == null && localStorage.setItem('ingData', ['提醒我定闹钟', '明天带伞'])
localStorage.doneData == null && localStorage.setItem('doneData', ['今晚整理衣物'])

console.log('ingData: ', localStorage.ingData.split(','))
console.log('doneData: ', localStorage.doneData.split(','))

// 双区初始化
const ingData = reactive(localStorage.ingData == '' ? [] : localStorage.ingData.split(','))
const doneData = reactive(localStorage.doneData == '' ? [] : localStorage.doneData.split(','))
// localStorage.clear()

// 添加的代办内容
let addValue = ref('')

// 刷新前保存修改
window.addEventListener('beforeunload', (event) => {
  event.preventDefault()
  localStorage.setItem('ingData', ingData)
  localStorage.setItem('doneData', doneData)
})

// 卸载前时保存修改
onBeforeUnmount(() => {
  localStorage.setItem('ingData', ingData)
  localStorage.setItem('doneData', doneData)
})


onMounted(() => {
  // let refAll = getCurrentInstance().ctx.$refs
  // const addtodo = refAll.addtodo
})

function Addtodo() {
  const text = addValue.value
  if (!text) return
  ingData.push(text)
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
  if (zone == ingData) doneData.push(text)
  else ingData.push(text)
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


</script>

<template>
  <div id="app">
    <div class="header">
      <p>ToDolist</p>
      <input @keypress.enter="Addtodo()" v-model.trim="addValue" type="text" placeholder="请输入ToDo" id="addtodo" />
      <button class="add" @click="Addtodo()">添加</button>
    </div>
    <div class="content">
      <div class="ing">
        <h2>正在进行</h2>
        <ul>
          <li v-for="(todo, index) in ingData" :key="index">
            <input type="checkbox" @click="zoneSwitch($event, ingData)" />
            <p>{{ todo }}</p>
            <div class="icon" @click="deleteTodo($event, ingData)">
              <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12L16.2 5H31.8L33 12" stroke="#333" stroke-width="4" stroke-linejoin="round" />
                <path d="M6 12H42" stroke="#333" stroke-width="4" stroke-linecap="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M37 12L35 43H13L11 12H37Z" fill="#333" stroke="#333"
                  stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 35H29" stroke="#FFF" stroke-width="4" stroke-linecap="round" />
              </svg>
            </div>
          </li>
        </ul>
      </div>

      <div class="done">
        <h2>已经完成</h2>
        <ul>
          <li v-for="(todo, index) in doneData" :key="index">
            <input type="checkbox" @click="zoneSwitch($event, doneData)" checked />
            <p>{{ todo }}</p>
            <div class="icon" @click="deleteTodo($event, doneData)">
              <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12L16.2 5H31.8L33 12" stroke="#333" stroke-width="4" stroke-linejoin="round" />
                <path d="M6 12H42" stroke="#333" stroke-width="4" stroke-linecap="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M37 12L35 43H13L11 12H37Z" fill="#333" stroke="#333"
                  stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
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
  flex-direction: column;
  font-family: 'pingfang sc', 'Courier New', Courier, monospace;
  width: 500px;
  height: 100vh;
  overflow-y: scroll;
  margin-left: 10px;
  background-color: #fff;
}

// 全部header
.header {
  flex-shrink: 0;
  width: 100%;
  height: 60px;
  padding: 0 5px 0 10px;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-blue);
  align-items: center;

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
    margin: 0 15px;
    border-radius: 0.3em;
    box-shadow: inset 0 0 0.1em #222;
    font-size: 1.2em;
  }
}

.content {
  flex-shrink: 1;
  width: 100%;
  margin: 20px 0 0 5px;
  display: flex;
  flex-direction: column;

  .ing {
    li {
      border-left: 5px solid var(--color-blue);
    }
  }

  .done {
    margin-top: 20px;

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
      padding: 0 10px;
      line-height: 1.8em;
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

// 右框边线
.note,
#user {
  border-right: 1px solid #22222222;
}

// 下框边线
.note_title {
  border-bottom: 1px solid #22222222;
}

button {
  width: 5em;
  height: 2em;
  padding: 2px 5px;
  margin-right: 10px;
  border: 0;
  background-color: #fff;
  border-radius: 0.5em;
  color: var(--color-blue);
  font-size: 1.2em;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);
  }
}

.hide {
  margin: 0;
  display: none;
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
</style>
