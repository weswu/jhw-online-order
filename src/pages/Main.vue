<template>
  <div id="main">
    <page-header :uc="true"></page-header>
    <div class="main">
      <div class="menu-btn">
        <mu-raised-button @click="newWeb" label="添加网站" icon="web" />
      </div>      
      <div class="main-row">
        <div class="main-col" v-for="item in webs" :key="item.id">
          <div class="col-wrap">
            <mu-card>
              <mu-card-header :title="item.title">
                <mu-badge :content="item.status" secondary />
              </mu-card-header>
              <mu-card-media>
                <img :src="item.pic" />
              </mu-card-media>
              <mu-card-actions>
                <mu-raised-button label="管理网站" icon="settings" />
                <mu-raised-button label="设计网站" icon="palette" />
                <mu-raised-button label="升级" icon="trending_up" primary />
              </mu-card-actions>
            </mu-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import { mapGetters } from 'vuex'
export default {
  components: {
    PageHeader
  },
  computed: {
    ...mapGetters([
      'webs'
    ])
  },
  methods: {
    newWeb () {
      this.$router.push({ name: 'shop' })
    }
  }
}
</script>

<style>
.main {
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
  overflow: hidden;
  zoom: 1;
}
.main-col {
  float: left;
  width: 33%;  
}
.menu-btn,
.col-wrap {
  padding: 10px;
}
.mu-card-header-title {
  padding-right: 0;
}
.mu-card-actions button {
  margin: 0 5px;
}
</style>

