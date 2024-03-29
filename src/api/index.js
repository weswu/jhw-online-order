// ajax配置文件
import axios from 'axios'
// 超时时间 30 秒
axios.defaults.timeout = 30000
// 添加响应拦截器
axios.interceptors.response.use((res) => {
  // 登录
  if (res.data.code === 5 && res.config.url === '/api/user/info') {
    // window.open(res.headers.requires_auth_url)
    return res
  } else if (res.data.code !== 0) {
    // window.alert(res.data.msg)
  }
  return res.data
}, (error) => {
  return Promise.reject(error)
})
export default axios
