<template>
  <div id="uc">
    <page-header :uc="true"></page-header>
    <div class="main">
      <mu-row gutter>
        <mu-col desktop="50">
          <UcWebsite></UcWebsite>
        </mu-col>
        <mu-col desktop="25">
          <img class="col-banner" src="/static/points.png" alt="">
        </mu-col>
        <mu-col desktop="25">
          <img class="col-banner" src="/static/events.png" alt="">
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col desktop="33">
          <UcPoints></UcPoints>
        </mu-col>
        <mu-col desktop="33">
          <UcMessage></UcMessage>
        </mu-col>
        <mu-col desktop="33">
          <UcFeedback></UcFeedback>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col desktop="75" class="no-shadow">
          <UcService></UcService>
        </mu-col>
        <mu-col desktop="25" class="order-list">
          <UcOrder></UcOrder>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col desktop="50" class="order-list">
          <UcLog></UcLog>
        </mu-col>
        <mu-col desktop="25">
          <img src="/static/help.jpg" alt="">
        </mu-col>
        <mu-col desktop="25">
          <img :src="'static/' + clients" @mouseover="onClients" @mouseout="unClients" alt="">
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import UcWebsite from '@/components/uc/uc-website'
import UcPoints from '@/components/uc/uc-points'
import UcMessage from '@/components/uc/uc-message'
import UcFeedback from '@/components/uc/uc-feedback'
import UcService from '@/components/uc/uc-service'
import UcOrder from '@/components/uc/uc-order'
import UcLog from '@/components/uc/uc-log'
import { mapGetters } from 'vuex'
export default {
  components: {
    PageHeader,
    UcWebsite,
    UcPoints,
    UcMessage,
    UcFeedback,
    UcService,
    UcOrder,
    UcLog
  },
  data () {
    return {
      clients: 'clients.jpg'
    }
  },
  computed: {
    ...mapGetters('orders', ['orderList', 'orderDetail'])
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    onClients () {
      this.clients = 'clients_hover.jpg'
    },
    unClients () {
      this.clients = 'clients.jpg'
    }
  }
}
</script>

<style>
#uc .col {
  box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
  overflow: hidden;
}
#uc .col img {
  display: block;
}
#uc .col.no-shadow {
  box-shadow: none;
}
.main {
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
  overflow: hidden;
  zoom: 1;
}
.website {
  background: #fff;
  padding: 20px;
}
.website-wrap {
  display: flex;
}
.website-logo {
  width: 120px;
  margin-right: 10px;
}
.website-logo img {
  display: block;
}
.website-cont {
  flex: 1;
}
.website-cont-item {
  padding: 5px 0;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group-item {
  position: relative;
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
}
.upgrade-tip:after {
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
.limit-time {
  color: #999;
}
#uc .row {
  padding-top: 15px;
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
#uc .service-banner:first-child {
  padding-top: 0;
}
.service-banner .col {
  height: 107px;
  background: #fff;
  display: flex;
  cursor: pointer;
}
.service-banner:nth-child(1) .col:nth-child(1) .service-logo {
  background: #009688;
}
.service-banner:nth-child(1) .col:nth-child(2) .service-logo {
  background: #039be5;
}
.service-banner:nth-child(1) .col:nth-child(3) .service-logo {
  background: #43a047;
}
.service-banner:nth-child(2) .col:nth-child(1) .service-logo {
  background: #ef6c00;
}
.service-banner:nth-child(2) .col:nth-child(2) .service-logo {
  background: #607d8b;
}
.service-banner:nth-child(2) .col:nth-child(3) .service-logo {
  background: #7c4dff;
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
}
.service-cont h3 {
  font-size: 14px;
  padding-bottom: 5px;
}
.service-cont p {
  font-size: 12px;
  color: #666;
}
.order-detail-hd,
.order-detail-bd {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}
.order-detail-hd h2,
.order-detail-bd h2 {
  color: #000;
  padding-bottom: 5px;
}
.detail-hd-item,
.detail-bd-item {
  display: flex;
  justify-content: space-between;
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
</style>
