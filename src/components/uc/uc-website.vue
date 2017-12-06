<template>
  <div class="website">
    <div class="website-wrap">
      <div class="website-logo">
        <img :src="'http://img.jihui88.com/' + this.$store.state.homeInfo.logo" @error="setErrorImg" alt="logo">
      </div>
      <div class="website-cont">
        <div class="website-cont-item">
          {{$store.state.homeInfo.name}}
          <mu-badge content="正常" color="#00c853" />
        </div>
        <div class="website-cont-item limit-time">有效期至 <span v-if="$store.state.homeInfo.endTime">{{$store.state.homeInfo.endTime | time('yyyy年MM月dd日')}}</span></div>
        <div class="website-cont-item btn-group">
          <div class="btn-group-item">
            <a :href="$store.state.homeInfo.siteUrl"><mu-raised-button label="界面编辑" primary /></a>
            <a href="http://www.jihui88.com/member/index.html"><mu-raised-button label="数据管理" primary /></a>
          </div>
          <div class="btn-group-item">
            <span class="upgrade-tip">限时优惠</span>
            <mu-raised-button label="升级" @click="toShop" secondary />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toShop () {
      this.$router.push({ name: 'shop' })
    },
    setErrorImg (e) {
      e.target.src = 'http://iph.href.lu/120x120'
    }
  }
}
</script>
