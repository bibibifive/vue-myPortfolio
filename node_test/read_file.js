const fs = require('fs')

// 检测文件是否存在
const exist = fs.existsSync('test.txt')
console.log(exist)

// 第一个参数是文件名；
// 第二个参数是回调，err 监听错误信息，data 是读取回来的数据。

fs.readFile('./test.txt', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  // data 是二进制类型，需要转换成字符串
  console.log(data)
  console.log(data.toString())

  const arr = data.toString().split('\n')
  console.log(arr);
})
