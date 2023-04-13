const fs = require('fs')

// __dirname 指的是当前文件所在文件夹的绝对路径。
// 同步删除文件
try {
  fs.unlinkSync(`${__dirname}/test.txt`)
} catch (err) {
  console.log('no_found')
}

// 异步删除文件
// fs.unlink(`${__dirname}/test.txt`, err => {
//   if (err) {
//     console.error('no_found')
//   }
// })