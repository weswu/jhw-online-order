<template lang="html">
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
            <mu-raised-button label="界面编辑" primary />
            <mu-raised-button label="数据管理" primary />
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
    }
  }
}
</script>

<style lang="css">
</style>
