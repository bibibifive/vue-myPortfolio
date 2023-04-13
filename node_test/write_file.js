const fs = require('fs')

// 内容
const content = ' 雷猴雷猴\n'

//处理选项
const opt = { 
  flag: 'a', // a：追加写入；w：覆盖写入
}


// 第一个参数：文件名
// 第二个参数：写入的内容
// 第三个参数：写入模式（追加、覆盖等）
// 第四个参数：错误信息监听

fs.writeFile('test.txt', content, opt, (err) => {
  if (err) {
    console.error(err)
  }
})