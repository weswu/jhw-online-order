<template>
  <div id="uc">
    <div class="main">
      <mu-row gutter>
        <mu-col width="100" tablet="100" desktop="50">
          <UcWebsite></UcWebsite>
        </mu-col>
        <mu-col width="100" tablet="50" desktop="25" class="col-img">
          <img class="col-banner" src="/static/points.png" alt="">
        </mu-col>
        <mu-col width="100" tablet="50" desktop="25" class="col-img">
          <img class="col-banner" src="/static/events.png" alt="">
        </mu-col>
      </mu-row>

      <mu-row gutter>
        <mu-col width="100" tablet="33" desktop="33">
          <UcPoints></UcPoints>
        </mu-col>
        <mu-col width="100" tablet="33" desktop="33">
          <UcActiveMessage></UcActiveMessage>
        </mu-col>
        <mu-col width="100" tablet="33" desktop="33">
          <UcMessage></UcMessage>
        </mu-col>
      </mu-row>

      <mu-row gutter>
        <mu-col width="100" tablet="100" desktop="75" class="no-shadow">
          <UcService></UcService>
        </mu-col>
        <mu-col width="100" tablet="50" desktop="25" class="order-list">
          <UcOrder></UcOrder>
        </mu-col>
        <mu-col width="100" tablet="50" desktop="50" class="order-list">
          <UcLog></UcLog>
        </mu-col>
        <mu-col width="100" tablet="50" desktop="25" class="col-img">
          <img src="/static/help.jpg" alt="">
        </mu-col>
        <mu-col width="100" tablet="50" desktop="25" class="col-img">
          <img :src="'/static/clients' + clients + '.jpg'" @mouseover="clients = '_hover'" @mouseout="clients = ''">
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import UcWebsite from '@/components/uc/uc-website'
import UcPoints from '@/components/uc/uc-points'
import UcActiveMessage from '@/components/uc/uc-message-active'
import UcMessage from '@/components/uc/uc-message'
import UcService from '@/components/uc/uc-service'
import UcOrder from '@/components/uc/uc-order'
import UcLog from '@/components/uc/uc-log'
export default {
  components: {
    PageHeader,
    UcWebsite,
    UcPoints,
    UcActiveMessage,
    UcMessage,
    UcService,
    UcOrder,
    UcLog
  },
  data () {
    return {
      clients: '',
      points: []
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$store.dispatch('getUser', this.$http)
      this.$http.get('/api/user/homeInfo').then((res) => {
        if (res.data) {
          this.$store.commit('setHomeInfo', res.data)
        }
      })
    }
  }
}
</script>

<style lang="less">
#uc{
  .col {
    box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
    overflow: hidden;
    margin-top: 15px;
    img {
      display: block;
    }
  }
  .col.no-shadow {
    box-shadow: none;
    margin-top: 0;
    padding-bottom: 3px;
  }
  .col-img{
    box-shadow: none;
    padding: 0 3px 3px 0;
    img {
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      margin: 0 auto;
    }
  }
}
.data-empty {
  text-align: center;
    padding: 20px 0;
    color: #999;
}
.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
  overflow: hidden;
  zoom: 1;
}
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

.upgrade-tip {
  position: absolute;
  top: -30px;
  right: 0;
  z-index: 9;
  background: rgba(0, 0, 0, .75);
  color: #fff;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 3px;
  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    margin-left: -5px;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
    border-top-color: rgba(0, 0, 0, .75);
  }
}


.col-banner {
  display: block;
  cursor: pointer;
}
.box {
  background: #fff;
}
.box-cont {
  height: 264px;
}
.box-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #eee;
}
.box-data {
  margin: 0;
  font-size: 48px;
}

.data-points .mu-badge {
  background: #ff5722;
  color: #fff;
}
.income{
  color: green
}
.out{
  color: red
}
.data-message .mu-badge {
  background: #009688;
  color: #fff;
}
.data-feedback .mu-badge {
  background: #2196f3;
  color: #fff;
}
.box-foot {
  display: flex;
  justify-content: center;
  border-top: 1px solid #eee;
}
#uc .mu-item-right {
  width: auto;
}
.order-list .box-cont {
  height: 140px;
}

.service-logo {
  display: flex;
  width: 87px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-direction: column;
}
.service-logo img {
  display: block;
  width: 32px;
  padding-bottom: 5px;
}
.service-cont {
  flex: 1;
  padding: 10px 10px 10px 0;
  h3 {
    font-size: 14px;
    padding-bottom: 3px;
    span {
      font-size: 12px;
      font-weight: normal;
      color: #999;
      float: right;
    }
  }
  p {
    font-size: 12px;
    color: #666;
  }
}



.dialog_bd {
  padding-top: 24px;
}
.order-price {
  padding: 10px 0;
  font-size: 18px;
}
.order-price span {
  padding: 0 10px;
  color: #ff4081;
  font-size: 14px;
  text-decoration: line-through;
}
.order-price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.order-price-item_ft {
  color: #333;
}
.order-price-total .order-price-item_hd {
  font-size: 16px;
}
.order-price-total .order-price-item_ft {
  font-size: 32px;
}
.payment {
  float: right;
}
.wexinpay {
  background: #0eb20c;
  color: #fff;
}
.alipay {
  background: #00a3ee;
  color: #fff;
}
.payment-code {
  clear: both;
  padding-top: 20px;
}
.payment-code-wrap {
  padding: 30px;
  background: #f8f8f8;

  text-align: center;
  color: #666;
}
.box-cont.feedback {
  padding: 20px;
  height: 177px;
}


// 中间5块小图标
.service-banner:first-child {
  padding-top: 0;
  .col {
    height: 107px;
    background: #fff;
    display: flex;
    cursor: pointer;
    margin-top: 0
  }
  .col:nth-child(1) .service-logo {
    background: #009688;
  }
  .col:nth-child(2) .service-logo {
    background: #039be5;
  }
  .col:nth-child(3) .service-logo {
    background: #43a047;
  }
  .col:nth-child(4) .service-logo {
    background: #ef6c00;
  }
  .col:nth-child(5) .service-logo {
    background: #7c4dff;
  }
  .col:nth-child(6) .service-logo {
    background: #607d8b;
  }
}

</style>
