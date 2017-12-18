<template>
  <div class="">
    <mu-row gutter class="service-banner">
      <mu-col width="100" tablet="50" desktop="33" v-for="(item, index) in list" :key="index">
        <div class="service-logo" @click="openPaid(item)"><img :src="'/static/' + item.pic + '.png'"></div>
        <div class="service-cont" @click="openPaid(item)">
          <h3>{{item.name}}<span v-html="state(item.id)"></span></h3>
          <p>{{item.desc}}</p>
        </div>
      </mu-col>
      <mu-col width="0" desktop="33" style="opacity: 0"></mu-col>
    </mu-row>
    <Pay ref="pay" :title="'购买'" :totalPriceSingle="totalPrice" :priceItemIds="priceItemIds" :year="'1'"></Pay>
  </div>
</template>

<script>
import Pay from '@/components/Pay'
import { mapState } from 'vuex'
export default {
  components: {
    Pay
  },
  data () {
    return {
      list: [
        { id: '297e2669600191860160021f845900a7', price: 1500, name: '小程序', desc: '小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。', pic: 'wxa' },
        { id: '297e2669600191860160021fada500aa', price: 0, name: '手机网站', desc: '专门为手机进行优化的网站，更为方便用户浏览。', pic: 'website' },
        { id: '297e2669600191860160021fe16100ac', price: 1500, name: '微网站', desc: '通过微信网页的方式进行表现，使信息的展现更加赏心悦目，进一步提高用户体验。', pic: 'wx' },
        { id: '297e26696001918601600220127d00af', price: 0, name: '微传单', desc: '无需会写代码，极速创建H5微传单，轻松在线制作微海报、H5场景、电子邀请函。', pic: 'wcd' },
        { id: '297e26696001918601600220721b00b4', price: 0, name: '多语言', desc: '让使用不同语言的用户都能够从同个网站获得内容相同的信息。', pic: 'lang' }
      ],
      priceItemIds: '',
      totalPrice: 0
    }
  },
  computed: {
    ...mapState({
      homeInfo: state => state.homeInfo
    })
  },
  methods: {
    openPaid (item) {
      var ctx = this
      this.priceItemIds = item.id
      if (item.id === '297e26696001918601600220721b00b4') {
        let items = this.$store.state.shop.shopFunction[2].groups[1].items
        let ids = this.$store.state.homeInfo.priceItemIds
        items.map((item2, index) => {
          if (!ids.match(new RegExp(item2.value))) {} else {
            ctx.totalPrice += item2.price * 0.3
          }
        })
      } else {
        this.totalPrice = item.price
      }
      this.$refs.pay.openDialog()
    },
    state (v) {
      if (this.homeInfo.priceItemIds && this.homeInfo.priceItemIds.match(new RegExp(v))) { return '已购买' }
    }
  }
}
</script>
