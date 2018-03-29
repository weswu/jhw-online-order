<template>
  <div id="A_Login">
    <div class="login">
      <div class="login-bd">
        <h1>请登录</h1>
        <mu-text-field label="账号" hintText="输入你的登录账号" v-model="model.username" fullWidth />
        <mu-text-field label="密码" hintText="输入你的登录密码" type="password" v-model="model.password" fullWidth />
        <mu-text-field label="验证码" hintText="输入验证码" v-model="model.code" fullWidth />
        <img :src="'http://buy.jihui88.com/verificationCode'+verifyPic" class="veriImg" @click="refreshCode">
        <mu-raised-button @click="submit" label="登录" type="submit" primary/>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      model: {
        username: '',
        password: '',
        code: ''
      },
      verifyPic: ''
    }
  },
  methods: {
    refreshCode () {
      this.verifyPic = '?time=' + new Date().getTime()
    },
    submit (e) {
      var ctx = this
      if (!this.model.username) {
        return this.$parent.$refs.toast.show('账号不能为空')
      }
      if (!this.model.password) {
        return this.$parent.$refs.toast.show('密码不能为空')
      }
      this.$http.post('/auth/admin/login?' + qs.stringify(this.model)).then((res) => {
        if (res.code === 0) {
          ctx.$store.commit('admin/setUser', res.data)
          ctx.$store.dispatch('admin/getHomeInfo')
          ctx.$router.push({ path: '/admin/order' })
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.login{
  margin: 0;
}
.login-bd{
  position: relative;
}
.veriImg{
  width: 80px;
  position: absolute;
  margin-top: -56px;
    right: 0;
}
</style>
