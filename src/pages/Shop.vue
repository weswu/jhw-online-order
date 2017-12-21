<template>
  <div id="shop">
    <div class="wrap shop-wrap">
      <div class="side-bar">
        <div class="side-bar-bd" :class="{'fixed': fixed}">
          <div class="side-bar-bd_cont">
            <table class="mu-table w-table">
              <tr class="mu-thead" v-for="(item, index) in shopFunction" :key="item.title" v-if="index > 0">
                <th class="mu-th"><div class="mu-th-wrapper">{{item.title}}</div></th>
                <td class="mu-th" colspan="2">
                  <div class="" v-if="row.needCheck" v-for="(row, rIndex) in item.groups" :key="row.title">
                    <mu-flexbox class="mt8">
                      <mu-flexbox-item class="flex-demo">
                        {{row.title}}
                      </mu-flexbox-item>
                      <mu-flexbox-item class="flex-demo">
                        {{row.price}}
                      </mu-flexbox-item>
                    </mu-flexbox>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <mu-select-field :value="0" :labelFocusClass="['label-foucs']" label="选择使用年限" @change="chooseYear" fullWidth>
            <mu-menu-item v-for="(year, index) in yearList" :key="index" :value="index" :title="year + '年'" />
          </mu-select-field>
          <div class="side-bar-origin-price">原价：RMB {{totalPrice}}</div>
          <div class="side-bar-price">RMB {{totalPrice}}</div>
          <mu-raised-button @click="toMain" label="确认支付" primary fullWidth />
        </div>
      </div>
      <div class="shop">
        <shop-group></shop-group>
        <FAQ></FAQ>
      </div>
    </div>
    <Pay ref="pay" :title="'订单支付'"></Pay>
    <Online></Online>
  </div>
</template>

<script>
import ShopGroup from '@/components/shop/ShopGroup'
import FAQ from '@/components/shop/FAQ'
import Pay from '@/components/Pay'
import Online from '@/components/shop/Online'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    ShopGroup,
    FAQ,
    Pay,
    Online
  },
  data () {
    return {
      fixed: false
    }
  },
  computed: {
    ...mapGetters('shop', ['year', 'yearList', 'totalPrice', 'shopFunction'])
  },
  mounted () {
    let that = this
    window.onscroll = function () {
      let sTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条距离页面顶部位置
      if (document.querySelector('.shop-wrap')) {
        let menu = document.querySelector('.shop-wrap').offsetTop
        if (sTop > menu) {
          that.fixed = true
        } else {
          that.fixed = false
        }
      }
    }
  },
  methods: {
    ...mapActions('shop', ['chooseYear']),
    toMain () {
      this.$refs.pay.openDialog()
    }
  }
}
</script>

<style lang="less">
.wrap {
  width: 1200px;
  margin: 50px auto 0;
  position: relative;
}

// 右侧计算表单
.side-bar {
  float: right;
  width: 270px;
  .side-bar-bd {
    width: 270px;
    padding: 30px;
    background: #fff;
    .side-bar-bd_cont {
      padding-bottom: 20px;
      .w-table{
        border: 1px solid rgba(0,0,0,.12);
        border-bottom: none;
        .mu-th{
          height: auto;
          line-height: 20px;
          font-size: 13px;
          padding: 7px 7px;
          color: rgba(0,0,0,.8);
          border-right:  1px solid rgba(0,0,0,.12);
        }
      }
    }
    // 总价格
    .side-bar-origin-price {
      color: #ff4081;
      text-align: right;
      font-size: 14px;
      text-decoration: line-through;
    }
    .side-bar-price {
      text-align: right;
      font-size: 24px;
      padding: 10px 0;
    }
  }
  .fixed {
    position: fixed;
    top: 0;
    z-index: 2;
  }
}
.side-bar-item_title {
  font-size: 13px;
  color: #9b9b9b;
  line-height: 30px;
}
.side-bar-item {
  padding: 0 15px;
  font-size: 13px;
  line-height: 24px;
}
.side-bar-item span {
  float: right;
}

// 左侧购买项
.shop {
  width: 900px;
  .shop-group {
    margin-top: 30px;
    min-height: 100px;
    background: #fff;
    overflow: hidden;
    zoom: 1;
    position: relative;
    .shop-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      bottom: 0;
      background: #000;
      color: #fff;
      text-align: center;
      .shop-icon-wrap {
        position: absolute;
        top: 50%;
        margin-top: -33px;
        width: 100%;
        text-align: center;
        img {
          height: 36px;
          display: inline-block;
        }
        p {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .shop-cont {
      width: 700px;
      margin-left: 200px;
      padding: 20px 30px;
    }
    .shop-nav-bd,.shop-cont {
      padding: 20px;
      overflow: hidden;
      zoom: 1;
    }
    .shop-nav-bd li,.shop-cont li {
      float: left;
      width: 25%;
      position: relative;
    }
  }
}
.shop.pd-top {
  padding-top: 148px;
}
.shop-nav {
  background: #fff;
  width: 900px;
}
.shop-group ul {
  overflow: hidden;
  zoom: 1;
  margin-top: 20px;
}
.shop-group ul:first-child {
  border-top: none;
  margin-top: 0px;
}
.shop-group-title {
  padding: 10px 0;
  font-weight: bold;
}
.shop-group-title::after {
  content: '';
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.shop-group-title span {
  font-size: 12px;
  font-weight: normal;
  color: #444;
  padding: 0 10px;
}
.shop-cont span {
  line-height: 30px;
}
.mu-radio-label {
  font-size: 14px;
}

/* 自适应 */
@media only screen and (max-width: 1100px) {
  .wrap {
    width: 1000px;
    .shop {
      width: 700px;
      .shop-cont {
        width: 500px;
      }
      .shop-nav-bd li, .shop-cont li {
        width: 33.3%;
      }
    }
  }
}
</style>
