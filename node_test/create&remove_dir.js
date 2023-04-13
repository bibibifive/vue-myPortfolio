const fs = require('fs')

// __dirname 指的是当前文件所在文件夹的绝对路径。
try {
  // 同步创建文件夹
  fs.mkdirSync(`${__dirname}/one_dir`)

  // 一秒后删除
  setTimeout(() => {
    try {
      // 同步删除文件夹
      fs.rmdirSync(`${__dirname}/one_dir`)
    } catch (err) {
      console.log('no_found_TT')
    }
  }, 1000)
} catch (err) {
  console.log('already_created_TT')
}

// 异步创建文件夹
fs.mkdir(`${__dirname}/one_dir`, (err) => {
  // 异步删除文件夹
  setTimeout(() => {
    fs.rmdir(`${__dirname}/one_dir`, (err) => {
      if (err) {
        console.error('no_found_YY')
      }
    })
  }, 1000)

  if (err) {
    console.error('already_created_YY')
  }
})
