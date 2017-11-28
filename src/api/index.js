// ajax配置文件
import axios from 'axios'

// 超时时间 30 秒
axios.default.timeout = 30000
// 添加响应拦截器
axios.interceptors.response.use((res) => {
  if (res.status === 654) {
    window.alert('请求超时！')
  }
  return res
}, (error) => {
  return Promise.reject(error)
})

export default axios
