<script setup>
import { onMounted, ref } from 'vue'

let msg = ref('') //载体对象

// 数据初始化
searchStock('sh600519')

function searchStock(gpCode) {
  gpCode = gpCode.trim()
  fetch(`https://zj.v.api.aa1.cn/api/gupiao-01/?gp=${gpCode}`, {
    method: 'GET',
  })
    .then((res) => {
      const reader = res.body.getReader()
      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close()
                return
              }
              controller.enqueue(value)
              push()
            })
          }
          push()
        },
      })
    })
    .then((stream) => new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text())
    .then((result) => {
      msg.value = result
      let arr = result.split('~')
      console.log(arr)
    })
}

let gpData = {
  1: '股票名字',
  2: '股票代码',
  3: '当前价格',
  4: '昨收',
  5: '今开',
  6: '成交量（手）',
  7: '外盘',
  8: '内盘',
  9: '买一',
  10: '买一量（手） ',
  '11～18': '买二 买五',
  '19～20': '卖一',
  20: '卖一量 ',
  '21～28': '卖二 卖五 ',
  29: '最近逐笔成交',
  30: '时间 ',
  31: '涨跌 ',
  32: '涨跌%',
  33: '最高',
  34: '最低',
  35: '价格/成交量（手）/成交额 ',
  36: '成交量（手） ',
  37: '成交额（万）',
  38: '换手率',
  39: '市盈率',
  '40～41': '最高',
  42: '最低',
  43: '涨幅',
  44: '流通市值',
  45: '总市值',
  46: '市净率 ',
  47: '涨停价',
  48: '跌停价',
  49: '量比',
  50: '委差',
  74: '委比',
  51: '均价',
  52: '市盈率',
}

import * as echarts from 'echarts/core'
import { TitleComponent, GridComponent, DataZoomComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, GridComponent, DataZoomComponent, BarChart, CanvasRenderer])

//DOM引用
const chart_D1 = ref()

let dataAxis = [
  '点',
  '击',
  '柱',
  '子',
  '或',
  '者',
  '两',
  '指',
  '在',
  '触',
  '屏',
  '上',
  '滑',
  '动',
  '能',
  '够',
  '自',
  '动',
  '缩',
  '放',
]

let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]

let option = {
  title: {
    text: '特性示例：渐变色 点击缩放',
    subtext: 'Feature Sample: Gradient Color, Click Zoom',
  },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      inside: true,
      color: '#fff',
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
    },
    z: 10,
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: true,
    },
    axisLabel: {
      color: '#999',
    },
  },
  dataZoom: [
    {
      type: 'inside',
    },
  ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' },
          ]),
        },
      },
      data: data,
    },
  ],
}
// Enable data zoom when user click bar.
const zoomSize = 4

onMounted(() => {
  let myChart = echarts.init(chart_D1.value)

  myChart.on('click', function (params) {
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    })
  })

  option && myChart.setOption(option)
})
</script>

<template>
  <!-- {{ msg }}
  <t-input size="large" autoWidth @change="($event) => searchStock($event)" /> -->
  <div class="broad">
    <div class="eachBroad" ref="chart_D1">1</div>
    <div class="eachBroad">1</div>
    <div class="eachBroad">1</div>
    <div class="eachBroad">1</div>
  </div>
</template>

<style scoped lang="scss">
.broad {
  display: grid;
  width: 100%;
  height: calc(100% - 40px);
  margin: 20px 0;
  grid: repeat(2, 50%) / auto-flow 50%;
  place-items: center;
  .eachBroad {
    background-color: rgb(235, 227, 198);
    width: 100%;
    height: 100%;
    padding: 15px;
  }
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
