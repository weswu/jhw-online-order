// ajax配置文件
import axios from 'axios'
// 超时时间 30 秒
axios.defaults.timeout = 30000
// 添加响应拦截器
axios.interceptors.response.use((res) => {
  if (res.data.code === 5) {
    window.location.href = res.headers.requires_auth_url
  } else if (res.data.code !== 0) {
    window.alert(res.data.msg)
  }
  return res
}, (error) => {
  return Promise.reject(error)
})
export default axios
