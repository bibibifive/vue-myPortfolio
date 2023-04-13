// var Mock = require('mockjs')
// var data = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// })
// // 输出结果
// console.log(JSON.stringify(data, null, 4))

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const db_name = 'zrt'
;(async function () {
  const client = new MongoClient(url)
  try {
    await client.connect()
    const database = client.db(db_name)
    const collection_test = database.collection('fortest')
    const product_list = collection_test.find({})

    while (await product_list.hasNext()) {
      const p = await product_list.next()
      console.log(p.name)
    }
    client.close()
  } catch (e) {
    console.log(e.stack)
  }
})()
