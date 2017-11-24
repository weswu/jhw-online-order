<template>
  <div id="uc">
    <page-header :uc="true"></page-header>
    <div class="main">
      <mu-row gutter>
        <mu-col desktop="50">
          <div class="website">
            <div class="website-wrap">
              <div class="website-logo">
                <img src="http://iph.href.lu/120x120" alt="">
              </div>
              <div class="website-cont">
                <div class="website-cont-item">
                  网站名称
                  <mu-badge content="正常" color="#00c853" />
                </div>
                <div class="website-cont-item limit-time">有效期至 2018年11月8日</div>
                <div class="website-cont-item btn-group">
                  <div class="btn-group-item">
                    <mu-raised-button label="编辑网站" primary />
                    <mu-raised-button label="管理网站" primary />
                  </div>
                  <div class="btn-group-item">
                    <span class="upgrade-tip">限时优惠</span>
                    <mu-raised-button label="升级" @click="toShop" secondary />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mu-col>
        <mu-col desktop="25">
          <img class="col-banner" src="static/points.png" alt="">
        </mu-col>
        <mu-col desktop="25">
          <img class="col-banner" src="static/events.png" alt="">
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col desktop="33">
          <div class="box">
            <div class="box-title data-points">积分<mu-badge content="600" /></div>
            <div class="box-cont">
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
            </div>
            <div class="box-foot">
              <mu-flat-button label="获取更多积分" />
            </div>
          </div>
        </mu-col>
        <mu-col desktop="33">
          <div class="box">
            <div class="box-title data-message">消息<mu-badge content="20" /></div>
            <div class="box-cont">
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
            </div>
            <div class="box-foot">
              <mu-flat-button label="查看更多消息" />
            </div>
          </div>
        </mu-col>
        <mu-col desktop="33">
          <div class="box">
            <div class="box-title data-feedback">留言<mu-badge content="20" /></div>
            <div class="box-cont">
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
              <mu-list-item title="100积分">
                <span slot="describe">
                  <span>用户A通过你的邀请码注册</span><br/>
                  2017/11/09
                </span>
              </mu-list-item>
            </div>
            <div class="box-foot">
              <mu-flat-button label="查看更多留言" fullWidth />
            </div>
          </div>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col desktop="75" class="no-shadow">
          <mu-row gutter class="service-banner">
            <mu-col desktop="33">
              <div class="service-logo" @click="openPaid"><img src="static/wxa.png"></div>
              <div class="service-cont" @click="openPaid">
                <h3>小程序</h3>
                <p>小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
              </div>
            </mu-col>
            <mu-col desktop="33">
              <div class="service-logo" @click="openPaid"><img src="static/website.png"></div>
              <div class="service-cont" @click="openPaid">
                <h3>手机网站</h3>
                <p>专门为手机进行优化的网站，更为方便用户浏览。</p>
              </div>
            </mu-col>
            <mu-col desktop="33">
              <div class="service-logo" @click="openPaid"><img src="static/wx.png"></div>
              <div class="service-cont" @click="openPaid">
                <h3>微网站</h3>
                <p>通过微信网页的方式进行表现，使信息的展现更加赏心悦目，进一步提高用户体验。</p>
              </div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="service-banner">
            <mu-col desktop="33">
              <div class="service-logo" @click="openPaid"><img src="static/wcd.png"></div>
              <div class="service-cont" @click="openPaid">
                <h3>微传单</h3>
                <p>无需会写代码，极速创建H5微传单，轻松在线制作微海报、H5场景、电子邀请函。</p>
              </div>
            </mu-col>
            <mu-col desktop="33">
              <div class="service-logo" @click="openPaid"><img src="static/book.png"></div>
              <div class="service-cont" @click="openPaid">
                <h3>微样册</h3>
                <p>支持电脑,手机,平板展示翻页HTML5电子杂志</p>
              </div>
            </mu-col>
            <mu-col desktop="33">
              <div class="service-logo" @click="openPaid"><img src="static/lang.png"></div>
              <div class="service-cont" @click="openPaid">
                <h3>多语言</h3>
                <p>让使用不同语言的用户都能够从同个网站获得内容相同的信息。</p>
              </div>
            </mu-col>
          </mu-row>
        </mu-col>
        <mu-col desktop="25" class="order-list">
          <div class="box">
            <div class="box-title data-feedback">消费记录</div>
            <div class="box-cont">
              <mu-list-item v-for="item in orderList" :key="item.orderNo" :title="'RMB ' + item.total" :describeText="item.orderDate" @click="open">
                <mu-icon value="info" slot="right"/>
              </mu-list-item>
            </div>
            <div class="box-foot">
              <mu-flat-button label="查看更多记录" />
            </div>
          </div>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col desktop="50" class="order-list">
          <div class="box">
            <div class="box-title data-feedback">更新日志</div>
            <div class="box-cont">
              <mu-list-item title="新增积分抵扣功能" describeText="2017-06-13"></mu-list-item>
              <mu-list-item title="新增会员限购功能" describeText="2017-03-25"></mu-list-item>
            </div>
            <div class="box-foot">
              <mu-flat-button label="查看更多日志" />
            </div>
          </div>
        </mu-col>
        <mu-col desktop="25">
          <img src="static/help.jpg" alt="">
        </mu-col>
        <mu-col desktop="25">
          <img :src="'static/' + clients" @mouseover="onClients" @mouseout="unClients" alt="">
        </mu-col>
      </mu-row>
    </div>
    <mu-dialog :open="dialog" @close="close">
      <div class="order-detail">
        <div class="order-detail-hd">
          <h2>订单基本信息</h2>
          <div class="detail-hd-item"><span>订单号</span><span>{{orderDetail.orderNo}}</span></div>
          <div class="detail-hd-item"><span>订单金额</span><span>RMB {{orderDetail.total}}</span></div>
          <div class="detail-hd-item"><span>积分抵扣</span><span>{{orderDetail.points}}</span></div>
          <div class="detail-hd-item"><span>实际支付</span><span>RMB {{orderDetail.paid}}</span></div>
        </div>
        <div class="order-detail-bd">
          <h2>订单详细</h2>
          <div class="detail-bd-item" v-for="item in orderDetail.detail" :key="item.orderNo">
            <span>{{item.name}}</span>
            <span>{{item.price}}</span>
          </div>
        </div>
      </div>
      <mu-flat-button slot="actions" @click="close" label="关闭" />
    </mu-dialog>
    <mu-dialog :open="paidDialog" @close="closePaid" title="购买" scrollable>
      <div class="dialog_bd">
        <div class="point">
          <p><mu-checkbox @change="showPoint = !showPoint" label="使用积分抵扣" class="demo-checkbox" /></p>
          <mu-text-field v-if="showPoint" type="number" hintText="提示文字" @input="checkPoint" :errorText="errorText" label="可用积分" v-model.number="points" />
        </div>
        <div class="order-price">
          <div class="order-price-item">
            <div class="order-price-item_hd">订单金额</div>
            <div class="order-price-item_ft">RMB 600</div>
          </div>
          <div class="order-price-item">
            <div class="order-price-item_hd">积分抵扣</div>
            <div class="order-price-item_ft">- RMB 100</div>
          </div>
        </div>
        <div class="order-price order-price-total">
          <div class="order-price-item">
            <div class="order-price-item_hd">共需支付</div>
            <div class="order-price-item_ft">RMB 500</div>
          </div>
        </div>
        <div class="payment">
          <mu-raised-button class="wexinpay" label="微信支付" @click="payment = 1">
            <i class="mu-icon iconfont icon-pay-wechat" style="font-size:24px;"></i>
          </mu-raised-button>
          <mu-raised-button class="alipay" label="支付宝支付" @click="payment = 2">
            <i class="mu-icon iconfont icon-umidd17" style="font-size:24px;"></i>
          </mu-raised-button>
        </div>
        <div class="payment-code" v-if="payment === 1">
          <div class="payment-code-wrap" @click="toPaid">
            <img src="data:image/png;base64,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" alt="">
            <div class="payment-code-tip">手机微信扫码支付</div>
          </div>
        </div>
        <div class="payment-code" v-if="payment === 2">
          <div class="payment-code-wrap" @click="toPaid">
            <img src="data:image/png;base64,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" alt="">
            <div class="payment-code-tip">手机支付宝扫码支付</div>
          </div>
        </div>
      </div>
      <mu-flat-button label="返回" @click="closePaid" slot="actions" />
    </mu-dialog>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import { mapGetters } from 'vuex'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      dialog: false,
      paidDialog: false,
      points: 0,
      showPoint: false,
      payment: 0,
      errorText: '',
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
    },
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    openPaid () {
      console.log(1)
      this.paidDialog = true
    },
    closePaid () {
      this.paidDialog = false
    },
    checkPoint () {
      if (this.points > 100) {
        console.log('big')
        this.errorText = '您的可用积分为100'
        this.points = 100
      } else {
        this.errorText = ''
        console.log('small')
      }
    },
    toShop () {
      this.$router.push({ name: 'shop' })
    },
    toPaid () {
      this.$router.push({ name: 'paid' })
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
