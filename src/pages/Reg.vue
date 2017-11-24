<template>
  <div id="reg">
    <page-header></page-header>
    <div class="container">
      <div class="login">
        <form class="login-bd">
          <h1>填写以下表单，立即开始</h1>
          <mu-text-field label="手机号码" hintText="11位数字，仅限中国大陆手机号码" v-model="mobileNumb" @change="mobileNumbInput" :errorText="mobileNumbError" fullWidth />
          <div class="input-row">
            <div class="input-row-item">
              <mu-text-field label="验证码" hintText="4位字母数字" v-model="code" @change="codeInput" :errorText="codeError" fullWidth />
            </div>
            <mu-flat-button label="发送验证码" class="demo-flat-button" primary/>
          </div>
          <mu-text-field label="密码" hintText="6-16位, 数字、字母、符号至少包含两种, 同时不能包含中文和空格" type="password" v-model="password" @change="passwordInput" :errorText="passwordError" fullWidth />
          <div class="login-ft">
            <mu-raised-button @click="submit" label="立即开始" type="submit" primary />
            <mu-flat-button @click="toLogin" label="已有账号？请登录" />
          </div>
        </form>
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
      code: '',
      codeError: '',
      isError: true
    }
  },
  methods: {
    submit (e) {
      e.preventDefault()
      if (!this.isError) {
        console.log('submit')
      }
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    },
    mobileNumbInput (val) {
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
    },
    codeInput () {
      if (!(/^[A-Za-z0-9]{4}$/.test(this.code))) {
        this.codeError = '4位字母数字'
        this.isError = true
      } else {
        this.codeError = ''
        this.isError = false
      }
    }
  }
}
</script>