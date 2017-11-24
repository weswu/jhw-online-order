// 众筹数据接口
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 30000 // 超时时间 30 秒
})

function get (path, params) {
  return new Promise((resolve, reject) => {
    http.get(path, {params}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// function post (path, data) {
//   return new Promise((resolve, reject) => {
//     http.post(path, data).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

// function put (path, data) {
//   return new Promise((resolve, reject) => {
//     http.put(path, data).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

export default {
  getShops () {
    return get('data/shop.json')
  }
}
