<template>
  <div id="Admin">
    <div class="layout">
      <div class="content">
        <mu-appbar title="补单系统">
          <mu-flat-button label="登录" slot="right" href="#/admin/login" v-if="!homeInfo.username"/>
          <mu-flat-button :label="homeInfo.name || homeInfo.username" slot="right" v-if="homeInfo.username" style="text-transform: none;"/>
          <mu-flat-button label="退出" slot="right" v-if="homeInfo.username" @click="signout"/>
        </mu-appbar>
        <div class="content-left">
          <mu-list @change="handleListChange" :value="active" v-for="(item,index) in homeInfo.navigateList" :key="index">
            <mu-list-item :title="item.name" :value="item.url" :href="'#/admin/'+item.url"></mu-list-item>
          </mu-list>
        </div>
        <div class="content-right">
          <div class="body">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
    <!--消息...-->
    <Toast ref="toast"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Toast from '@/components/Toast'
export default {
  components: {
    Toast
  },
  data () {
    return {
      active: 'order'
    }
  },
  computed: {
    ...mapGetters({
      homeInfo: 'admin/homeInfo'
    })
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$store.dispatch('admin/getHomeInfo')
    },
    handleListChange (val) {
      this.active = val
    },
    signout () {
      var ctx = this
      this.$http.post('/auth/admin/logout').then((res) => {
        if (res.code === 0) {
          ctx.$store.commit('admin/setUser', {})
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
#Admin{
  .mu-appbar {
    background-color: #fafafa;
    color: #4d4d4d;
  }

  .logo{
    font-size: 18px;
    color: white;
    color: #000;
    padding: 10px 20px;
    background: #fafafa
  }
  .content{
    overflow: hidden;
    .body{
      min-height: 500px;
      background-color: white;
      margin: 20px;
    }
  }

  .content-left{
    width: 210px;
    float: left;
    position: fixed;
    background-color: #1c2438;
    margin-bottom: -4000px;
    padding-bottom: 4000px;
    i{
      font-size: 16px
    }
    .mu-list{
      padding-top: 20px
    }
    .mu-item{
      color: rgba(255, 255, 255, 0.7);
    }
    .mu-item:hover{
      color: #fff
    }
    .mu-item.selected {
      color: #7e57c2;
    }
    .mu-item-title{
      font-size: 14px
    }
  }

  .content-right{
    width: 100%;
    padding-left: 210px;
    display: inline-block;
    float: right;
  }
  .mu-table .mu-icon{
    cursor: pointer;
  }
  .red{
    color: red;
    cursor: pointer;
  }
}
</style>
