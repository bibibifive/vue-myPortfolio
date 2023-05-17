<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

const current = ref(1) //当前页
const pageSize = ref(10) //每页条数

const filterOption = ref([])

const onPageSizeChange = (size) => {
  MessagePlugin.success(`pageSize变化为${size}`)
  console.log('page-size:', size)
}

const onCurrentChange = (index, pageInfo) => {
  MessagePlugin.success(`转到第${index}页`)
  console.log(pageInfo)
}

const onChange = (pageInfo) => {
  console.log(pageInfo)
}

const columns = [
  {
    title: '单号',
    colKey: 'number',
  },
  {
    title: '种类',
    colKey: 'kind',
    cell: 'type-slot-name',
    // width: 120,
  },
  {
    title: '审批状态',
    colKey: 'status',
  },
  {
    title: '申请时间',
    colKey: 'createTime',
  },
]

const baseArr = (kind) =>
  Array(35)
    .fill('')
    .map((_, i) => ({
      index: i,
      number: i + 1,
      kind,
      status: 'good',
      createTime: '2023-5-1',
    }))

const data = [...baseArr('bread'), ...baseArr('nut'), ...baseArr('banana')]

const totalData = computed(() => {
  let tmpData = [...data]
  if (filterOption.value.length) {
    return tmpData.filter((v) => {
      return filterOption.value.includes(v.kind)
    })
  }
  return tmpData
})




const getTableData = (base) => {
  let [page = 1, pageSize = 10, totalData] = base

  const { length } = totalData

  const tableData = {
    data: [],
    page,
    pageSize,
    length,
  }
  if (pageSize >= length) {
    tableData.data = totalData
    tableData.page = 1 //直接取第一页
  } else {
    const num = pageSize * (page - 1) //计算当前页（不含）之前的所有数据总条数
    if (num < length) {
      const startIndex = num //当前页第一条数据在总数据集中的索引
      const endIndex = num + pageSize - 1 //当前页最后一条数据索引
      tableData.data = totalData.slice(startIndex, endIndex + 1)
    } else {
      //当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
      const size = (length / pageSize) | 0 //完整的页面数
      const rest = length % pageSize //不完整的页面的数据数
      if (rest > 0) {
        //余页不完整
        tableData.page = size + 1 //修正为真实的最有一页
        tableData.data = totalData.slice(pageSize * size)
      } else if (rest === 0) {
        //余页完整
        tableData.page = size //当前页码重置，取size
        tableData.data = totalData.slice(pageSize * (size - 1))
      }
    }
  }
  return tableData.data
}
</script>

<template>
  <div class="marginBox">
    <div class="optionHeader">
      <t-row>
        <t-col :span="4">
          <t-space>
            <!-- <t-button>导出 Excel</t-button> -->
          </t-space>
        </t-col>
        <t-col :span="4"> </t-col>
        <t-col :span="4">
          <t-select showArrow multiple v-model="filterOption">
            <t-option key="bread" label="bread" value="bread" />
            <t-option key="nut" label="nut" value="nut" />
            <t-option key="banana" label="banana" value="banana" />
            <t-option key="noData" label="noData" value="noData" />
          </t-select>
        </t-col>
      </t-row>
    </div>

    <t-content style="overflow-y: scroll">
      <t-table
        :data="getTableData([current, pageSize, totalData], filterOption)"
        size="large"
        :columns="columns"
        row-key="property"
        table-layout="auto"
      >
      </t-table>
    </t-content>

    <t-footer>
      <t-pagination
        v-model="current"
        v-model:pageSize="pageSize"
        :total="totalData.length"
        show-jumper
        @change="onChange"
        @page-size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
    </t-footer>
  </div>
</template>

<style scoped lang="scss">
.marginBox {
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0;
  height: 100vh;
  background-color: #fff;
}

.optionHeader {
  height: fit-content;
  padding: 10px;
  flex: 0;
}
</style>
