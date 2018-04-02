<template>
  <div class="">
    <mu-sub-header>权限管理</mu-sub-header>
    <mu-content-block class="search">
      <input type="text" v-model="searchData.name" placeholder="用户名">
      <button type="button" name="button" @click="search">搜索</button>
      <button type="button" name="button" @click="open" style="float:right;margin: 5px;">添加权限</button>
    </mu-content-block>
    <mu-table :showCheckbox="false" ref="table">
      <mu-thead>
        <mu-tr>
          <mu-th v-for="(item,index) in columns" :key="index" :style="item.width ? 'width:' + item.width + 'px' : ''">{{item.title}}</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in list" :key="index">
          <mu-td>{{item.username}}</mu-td>
          <mu-td>
            <span v-if="item.permissionType === 'ORDER'">订单管理</span>
            <span v-if="item.permissionType === 'PERMISSION'">权限管理</span>
            <span v-if="item.permissionType === 'AGENT'">经销商补单</span>
          </mu-td>
          <mu-td>
            <mu-icon value="mode_edit" color="blue" title="修改"  @click="open(item)"/>
            <mu-icon value="delete_forever" color="red" title="删除" @click="open(item, 'del')"/>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <div class="pagination">
      <div class="btn">
        <input type="text" v-model="page">
        <button type="button" name="button" @click="searchPage">GO</button>
      </div>
      <mu-pagination :total="total" :current="searchData.page + 1" :pageSize="searchData.size" @pageChange="handleClick"></mu-pagination>
      <div class="info">
        共有{{total}}条，每页显示：10条
      </div>
    </div>


    <mu-dialog :open="dialog" :title="title" @close="close">
      <div v-if="title !== '删除权限'">
        <mu-text-field hintText="用户账号" v-model="username"/><br/>
        <mu-select-field v-model="permissionType" :labelFocusClass="['label-foucs']" label="权限页面">
          <mu-menu-item v-for="v,index in pagelist" :key="index" :value="v.value" :title="v.text" />
        </mu-select-field>
      </div>
      <div v-if="title === '删除权限'">
        你确定要删除吗?<br/>
      </div>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="sub" label="确定" v-if="title !== '删除权限'"/>
      <mu-flat-button slot="actions" primary @click="del" label="确定" v-if="title === '删除权限'"/>
    </mu-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      list: [],
      columns: [
        { title: '用户名' },
        { title: '权限页面' },
        { title: '操作', width: 160 }
      ],
      total: 0,
      searchData: {
        page: 0,
        size: 10,
        sort: 'addTime,desc',
        name: ''
      },
      pagelist: [
        {text: '订单管理', value: 'ORDER'},
        {text: '权限管理', value: 'PERMISSION'},
        {text: '经销商补单', value: 'AGENT'}
      ],
      dialog: false,
      title: '添加权限',
      username: '',
      permissionType: '',
      page: '',
      id: ''
    }
  },
  computed: {
    ...mapGetters({
      homeInfo: 'admin/homeInfo'
    })
  },
  watch: {
    homeInfo: {
      handler () {
        var ctx = this
        setTimeout(function () {
          if (ctx.list.length === 0) {
            ctx.get()
          }
        }, 1000)
      },
      deep: true
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      var ctx = this
      this.$http.get('/admin/permission/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.code === 0) {
          ctx.list = res.data.content
          if (this.searchData.page === 0) {
            ctx.total = res.data.totalElements
          }
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    },
    handleClick (index) {
      this.searchData.page = index - 1
      this.get()
    },
    search () {
      this.searchData.page = 0
      this.get()
    },
    searchPage () {
      if (this.page < 1) {
        this.searchData.page = 0
      } else {
        this.searchData.page = this.page - 1
      }
      this.page = ''
      this.get()
    },
    open (item, text) {
      if (text === 'del') {
        this.id = item.permissionId
        this.title = '删除权限'
      } else if (item.permissionId) {
        this.id = item.permissionId
        this.username = item.username
        this.permissionType = item.permissionType
        this.title = '修改权限'
      } else {
        this.id = ''
        this.username = ''
        this.title = '添加权限'
      }
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    vail () {
      if (!this.username) {
        this.$parent.$refs.toast.show('账号不能为空')
        return true
      }
      if (!this.permissionType) {
        this.$parent.$refs.toast.show('权限页面不能为空')
        return true
      }
    },
    sub () {
      var ctx = this
      if (this.vail()) { return }
      this.dialog = false
      if (this.id) {
        this.edit()
      } else {
        this.$http.post('/admin/permission/detail?username=' + this.username + '&permissionType=' + this.permissionType).then((res) => {
          if (res.code === 0) {
            ctx.$parent.$refs.toast.show('添加成功')
            ctx.list.push(res.data)
            ctx.username = ''
          } else {
            ctx.$parent.$refs.toast.show(res.msg)
          }
        })
      }
    },
    edit (item) {
      var ctx = this
      this.$http.put('/admin/permission/detail/' + this.id + '?username=' + this.username + '&permissionType=' + this.permissionType).then((res) => {
        if (res.code === 0) {
          ctx.$parent.$refs.toast.show('修改成功')
          ctx.list.forEach(item => {
            if (item.permissionId === ctx.id) {
              item.username = this.username
              item.permissionType = this.permissionType
            }
          })
          ctx.username = ''
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    },
    del () {
      var ctx = this
      this.dialog = false
      this.$http.delete('/admin/permission/delete/' + this.id).then((res) => {
        if (res.code === 0) {
          ctx.$parent.$refs.toast.show('删除成功')
          for (let i = 0; i < ctx.list.length; i++) {
            if (ctx.list[i].permissionId === this.id) {
              ctx.list.splice(i, 1)
            }
          }
          ctx.total = ctx.total - 1
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    }
  }
}
</script>
