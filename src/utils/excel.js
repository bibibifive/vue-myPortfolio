import { writeFile, utils } from 'xlsx'

// 导出Excel
export const exportExcel = (workSheetData, fileName = `example_${new Date().getTime()}.xlsx`) => {
  const ws = utils.aoa_to_sheet(workSheetData) //数据
  const workSheetName = 'Sheet1' //sheet名字
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, ws, workSheetName)
  return writeFile(workbook, fileName, { type: 'binary' })
}



// 对象数组数据 转化为 二维数组
export const objectToArray = (arr, sign = 'except', signArr = []) => {
  if (sign == 'include') {
    return arr.map((v) => {
      let tmpArr = []
      for (let [i, value] of Object.entries(v)) {
        if (signArr.includes(i)) tmpArr.push(value)
      }
      return tmpArr
    })
  } else if (sign == 'except') {
    return arr.map((v) => {
      let tmpArr = []
      for (let [i, value] of Object.entries(v)) {
        if (signArr.includes(i)) continue
        tmpArr.push(value)
      }
      return tmpArr
    })
  }
}

// Excel头
export const objectToArray_forheader = (arr, key) => {
  return arr.map((v) => {
    return v[key]
  })
}

