<template>
  <div id="account">
    <PageHeader :uc="true"></PageHeader>
    <div class="main">
      <div class="menu-btn">
        <mu-raised-button @click="newWeb" label="添加管理员" icon="assignment_ind" />
      </div>      
      <div class="main-row">
        <div class="main-col" v-for="item in accounts" :key="item.id">
          <div class="col-wrap">
            <mu-card>
              <mu-card-header :title="item.accountName" :subTitle="item.level">
                <mu-badge :content="item.status" secondary />
              </mu-card-header>
              <mu-card-actions>
                <mu-raised-button label="修改" icon="settings" @click="editAccount" />
                <mu-raised-button v-if="item.canDelete" label="删除" icon="delete_forever" />
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
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      accounts: [
        {
          id: 1,
          accountName: '网站名称',
          canDelete: false,
          level: '超级管理员',
          status: '正常'
        },
        {
          id: 2,
          accountName: 'abc',
          canDelete: true,
          level: '超级管理员',
          status: '正常'
        }
      ]
    }
  },
  methods: {
    newWeb () {
      this.$router.push({ name: 'shop' })
    },
    editAccount () {
      this.$router.push({ name: 'account' })
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
  width: 25%;  
}
.menu-btn,
.col-wrap {
  padding: 10px;
}
.mu-card-actions button {
  margin: 0 5px;
}
</style>
