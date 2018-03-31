<template>
  <div id="A_Header">
    <mu-appbar>
      <div class="logo">
        <img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/54b68a5c-fdd2-4842-9e1e-b88d1c403f28.png" alt="">
      </div>
      <mu-flat-button label="登录" slot="right" @click="signIn" v-if="!homeInfo.username"/>
      <mu-flat-button :label="homeInfo.name || homeInfo.username" labelPosition="before" icon="arrow_drop_down" slot="right" v-if="homeInfo.username" @click="toggle"/>
      <mu-icon-menu icon="arrow_drop_down" :open="open" style=" position: absolute;right: 0;">
        <mu-menu-item title="退出" @click="signout"/>
      </mu-icon-menu>
    </mu-appbar>
  </div>
</template>

<script>
export default {
  props: ['homeInfo'],
  data () {
    return {
      open: false
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    signIn () {
      this.$router.push({ path: '/' + this.$route.path.split('/')[1] + '/login' })
    },
    signout () {
      var ctx = this
      this.$http.post('/auth/admin/logout').then((res) => {
        if (res.code === 0) {
          ctx.$store.commit('admin/setHomeInfo', {})
          ctx.$router.push({ path: '/admin/login' })
        } else {
          ctx.$refs.toast.show(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
#A_Header {
  .mu-appbar {
    background-color: #383d41;
    color: #fff;
    height: 50px;
    padding: 0;
    box-shadow: none;
    .mu-appbar-title {
      line-height: 50px
    }
    .logo{
      width: 112px;
      border-right: 1px solid #000;
      text-align: center;
      padding-right: 8px;
      img {
        width: 78px;
        vertical-align: middle;
      }
    }
    .mu-flat-button{
      background: #2a2a2a;
      color: rgba(255,255,255,0.5);
    }
    .mu-flat-button:hover{
      color:#fff;
    }
  }
}

</style>
