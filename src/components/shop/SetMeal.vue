<template>
  <div id="meal">
    <div class="set-meal" v-for="(item, idx) in meal" :key="item.title">
      <p class="meal-title">{{item.title}}</p>
      <mu-card v-for="(row, index) in item.items" :key="row.name">
        <div class="mu-card-title">
          {{row.name}}<span v-if="row.disabled">（续费）</span>
        </div>
        <mu-card-text :title="row.desc" v-if="row.desc">
          {{row.desc}}
        </mu-card-text>
        <mu-card-text :title="row.desc2" v-if="row.desc2">
          {{row.desc2}}
        </mu-card-text>
        <img :src="row.pic" class="img"/>
        <p class="p-num">使用人数: <span>{{row.number}}%</span></p>
        <div class="score">
          <img src="/static/star.png">
          <img src="/static/star.png">
          <img src="/static/star.png">
          <img src="/static/star.png">
          <img src="/static/star.png">
          <span class="s">5.0分</span>
        </div>
        <mu-radio class="price" v-if="!row.isHide" @input="user(index)" @change="chooseMeal({idx: idx, index: index, item: row})" :label="'￥'+row.price+(row.unit||'')" :name="item.title" :nativeValue="row.value" :value="item.value"/>
        <p class="price price2" v-if="row.isHide">
          ￥{{row.price}}{{row.unit||''}}
        </p>
      </mu-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      renew: ''
    }
  },
  computed: {
    ...mapGetters('shop', ['meal'])
  },
  methods: {
    ...mapActions('shop', ['chooseMeal']),
    user (index) {
      if (index === 0) {
        this.$store.dispatch('getUser', this.$parent.$parent.$refs.iframe)
      }
    }
  }
}
</script>

<style lang="less">
#meal{
  margin-top: 30px;margin-bottom: 10px;
}
.set-meal{
  overflow: hidden;
  .meal-title{
    padding: 10px 27px;
    font-size: 14px;
    color: #000;
  }
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
      font-size: 14px;
      height: 24px;
      line-height: 24px;
      margin-top: 8px;
      margin-bottom: 14px;
      .mu-radio-label{
        color: #FF6600;
      }
    }
    .price2{
      margin-bottom: 19px;
    }
    .desc{
      font-size: 12px;
      color: #6D6D6D;
      line-height: 18px;
      padding: 0 10px;
      height: 18px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      word-wrap: break-word;
    }
  }
  .mu-card-actions{
    padding: 5px 8px 15px 8px;
  }
}
</style>
