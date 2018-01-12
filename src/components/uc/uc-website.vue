<template>
  <div class="website">
    <div class="website-wrap">
      <div class="website-logo">
        <img :src="'http://img.jihui88.com/' + homeInfo.logo" @error="setErrorImg" alt="logo">
      </div>
      <div class="website-cont">
        <div class="website-cont-item">
          {{homeInfo.name || '匿名'}}
          <mu-badge :content="user.username ? '正常' : '未登录'" color="#00c853" />
        </div>
        <div class="website-cont-item limit-time">有效期至 <span v-if="homeInfo.endTime">{{homeInfo.endTime | time('yyyy年MM月dd日')}}</span></div>
        <div class="website-cont-item btn-group">
          <div class="btn-group-item">
            <a :href="homeInfo.siteUrl" target="_blank"><mu-raised-button label="界面编辑" primary /></a>
            <a href="http://www.jihui88.com/member/index.html" target="_blank"><mu-raised-button label="数据管理" primary /></a>
          </div>
          <div class="btn-group-item">
            <span class="upgrade-tip">限时优惠<span v-if="homeInfo.isDiscount">99</span></span>
            <mu-raised-button label="升级" @click="toShop" secondary />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user', 'homeInfo'])
  },
  methods: {
    toShop () {
      this.$router.push({ name: 'shop' })
    },
    setErrorImg (e) {
      e.target.src = 'http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/54b68a5c-fdd2-4842-9e1e-b88d1c403f28.png'
    }
  }
}
</script>
<style lang="less">
// 基本信息
.website {
  background: #fff;
  padding: 20px;
  .website-wrap {
    display: flex;
    .website-logo {
      width: 120px;
      height: 120px;
      margin-right: 10px;
      overflow: hidden;
      img {
        max-width: 100%;
        display: block;
      }
    }
    .website-cont {
      flex: 1;
      .website-cont-item {
        padding: 5px 0;
      }
      .limit-time {
        color: #999;
      }
      .btn-group {
        display: flex;
        justify-content: space-between;
        .btn-group-item {
          position: relative;
        }
      }
    }
  }
}
</style>
