<template>
  <div class="set-meal">
    <mu-card v-for="(item, index) in list">
      <div class="mu-card-title">
        {{item.name}}
      </div>
      <mu-card-text :title="item.desc">
        {{item.desc}}
      </mu-card-text>
      <img :src="item.pic" class="img"/>
      <p class="p-num">使用人数: <span>{{item.number}}</span></p>
      <div class="score">
        <img src="/static/star.png">
        <img src="/static/star.png">
        <img src="/static/star.png">
        <img src="/static/star.png">
        <img src="/static/star.png">
        <span class="s">5.0分</span>
      </div>
      <p class="price">
        ￥
        <font>{{item.price}}</font>
        <font>/年</font>
      </p>
      <mu-card-actions>
        <mu-raised-button @click="toMain(item)" label="购买" primary v-if="!item.isBuy"/>
        <mu-raised-button label="已购买" primary disabled v-if="item.isBuy"/>
      </mu-card-actions>
    </mu-card>
    <Pay ref="pay" :title="'购买'" :totalPriceSingle="totalPrice" :year="'1'"></Pay>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pay from '@/components/Pay'
export default {
  components: {
    Pay
  },
  data () {
    return {
      list: [
        {
          id: '2c9080ce60f7b2650160f7c2e3910025',
          name: '展示型网站',
          desc: '【适合企业】形象展示、产品推广、企业信息发布的企业，中小企业为主，或搜索引擎优化推广的企业',
          pic: 'https://oss.aliyuncs.com/photogallery/photo/1678560599049721/17047/23a11d91-0a91-474f-98c2-2745e90b31a3.jpg',
          number: 29000,
          price: 6800,
          isBuy: false
        },
        {
          id: '2c9080ce60f7b2650160f7c3327f0028',
          name: '营销型网站',
          desc: '【适合企业】工程类、招商类、项目类、设备类等大额非标准化交易，或开展付费推广的企业',
          pic: 'https://oss.aliyuncs.com/photogallery/photo/1678560599049721/17052/a953743e-824f-4a3c-9d52-caa120bf53ef.jpg',
          number: 6800,
          price: 16800,
          isBuy: false
        },
        {
          id: '2c9080ce60f7b2650160f7c40283002d',
          name: '外贸型网站',
          desc: '【适合企业】外贸企业的形象展示、产品推广企业信息发布等大额、出口类交易',
          pic: 'https://oss.aliyuncs.com/photogallery/photo/1678560599049721/17558/4b0d8722-a2c1-4aa1-9239-8eefb37e1461.jpg',
          number: 3500,
          price: 12800,
          isBuy: false
        },
        {
          id: '2c9080ce60f7b2650160f7c448650030',
          name: '品牌型网站',
          desc: '【适合企业】打造企业品牌，展示品牌实力，体现集团实力，企业信息发布的企业，上市公司、集团公司为主',
          pic: 'https://oss.aliyuncs.com/photogallery/photo/1678560599049721/18264/35077858-8695-4074-b997-669a44fdf09b.jpg',
          number: 2200,
          price: 25800,
          isBuy: false
        },
        {
          id: '2c9080ce60f7b2650160f7c495fd0033',
          name: '电商型网站',
          desc: '【适合企业】企业会员互动/在线交易/内部采购,企业自有商户收款/支持多种支付方式',
          pic: 'https://oss.aliyuncs.com/photogallery/photo/1678560599049721/18264/35077858-8695-4074-b997-669a44fdf09b.jpg',
          number: 7200,
          price: 16800,
          isBuy: false
        }
      ],
      totalPrice: 0
    }
  },
  waitForData: true,
  computed: {
    ...mapState({
      homeInfo: state => state.homeInfo
    })
  },
  mounted () {
    this.list.forEach(item => {
      if (this.homeInfo.priceItemIds && this.homeInfo.priceItemIds.match(new RegExp(item.id))) {
        item.isBuy = true
      }
    })
  },
  methods: {
    toMain (item) {
      this.totalPrice = item.price
      this.$refs.pay.openDialog(item.id)
    }
  }
}
</script>

<style lang="less">
.set-meal{
  overflow: hidden;margin-top: 30px;margin-bottom: 10px;
  .mu-card{
    text-align: center;
    width: 30%; float: left;
    margin-left: 3%;
    padding-top: 24px;
    margin-bottom: 20px;
    .mu-card-title{
      font-size: 16px;
      color: #4A4A4A;
      line-height: 24px;
      margin-bottom: 8px;
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mu-card-text{
      font-size: 12px;
      color: #6D6D6D;
      line-height: 18px;
      padding: 0 10px;
      height: 36px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .img {
      height: 60px;
      margin: 8px 0;
      max-width: 100%;
    }
    .score{
      line-height: 16px;
      margin-bottom: 5px;
      color: #FF6600;
      img{
        width: 16px;
        vertical-align: middle;
      }
    }
    .price {
      color: #FF6600;
      font-size: 12px;
      height: 24px;
      margin-top: 8px;
    }
  }
  .mu-card-actions{
    padding: 5px 8px 15px 8px;
  }
}
</style>
