<template>
  <div id="login">
    <PageHeader></PageHeader>
    <div class="container">
      <div class="login">
        <form class="login-bd">
          <h1>请登录</h1>
          <mu-text-field label="手机号码" hintText="请使用注册时填写的手机号码" v-model="mobileNumb" @change="mobileNumbInput" :errorText="mobileNumbError" fullWidth />
          <mu-text-field label="密码" hintText="输入你的登录密码" type="password" v-model="password" @change="passwordInput" :errorText="passwordError" fullWidth />
          <div class="login-ft">
            <p>
              <mu-raised-button @click="submit" label="登录" type="submit" primary />
              <mu-flat-button @click="toForget" label="忘记密码？" />
            </p>
            <mu-flat-button @click="toReg" label="没有账号？立即注册" />
          </div>          
        </form>
        <div class="icon-group">
          <div class="icon-group-hd">使用第三方登录</div>
          <div class="icon-group-bd">
            <img src="static/wechat.png" alt="">
            <img src="static/qq.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      mobileNumb: '',
      mobileNumbError: '',
      password: '',
      passwordError: '',
      isError: true,
      activeTab: 'tab1'
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    submit (e) {
      e.preventDefault()
      this.mobileNumbInput()
      this.passwordInput()
      if (!this.isError) {
        console.log('submit')
        this.$router.push({ name: 'shop' })
      }
    },
    toReg () {
      this.$router.push({ name: 'reg' })
    },
    toForget () {
      this.$router.push({ name: 'forget' })
    },
    mobileNumbInput () {
      if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.mobileNumb))) {
        this.mobileNumbError = '11位数字，仅限中国大陆手机号码'
        this.isError = true
      } else {
        this.mobileNumbError = ''
        this.isError = false
      }
    },
    passwordInput () {
      if (!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/.test(this.password))) {
        this.passwordError = '6-16位, 数字、字母、符号至少包含两种, 同时不能包含中文和空格'
        this.isError = true
      } else {
        this.passwordError = ''
        this.isError = false
      }
    }
  }
}
</script>

<style>
.icon-group {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.icon-group-hd {
  color: #9e9e9e;
  padding-right: 20px;
}
.icon-group-bd img {
  width: 48px;
  padding: 0 5px;
}
</style>
