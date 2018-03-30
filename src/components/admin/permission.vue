<template>
  <div class="">
    <mu-sub-header>权限管理
      <mu-raised-button label="添加权限" @click="open" style="float:right;margin: 5px;"/>
    </mu-sub-header>
    <mu-table :showCheckbox="false" ref="table">
      <mu-thead>
        <mu-tr>
          <mu-th v-for="(item,index) in columns" :key="index" :style="item.width ? 'width:' + item.width + 'px' : ''">{{item.title}}</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in list" :key="index">
          <mu-td>{{item.username}}</mu-td>
          <mu-td><span v-if="item.permissionType === 'ORDER'">订单</span><span v-if="item.permissionType === 'PERMISSION'">权限</span></mu-td>
          <mu-td>
            <mu-icon value="mode_edit" color="blue" title="修改"  @click="open(item)"/>
            <mu-icon value="delete_forever" color="red" title="删除" @click="open(item, 'del')"/>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination class="pagin" :total="total" :current="this.searchData.page + 1" :pageSize="this.searchData.size" @pageChange="handleClick"></mu-pagination>

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
        sort: 'addTime,desc'
      },
      pagelist: [
        {text: '订单', value: 'ORDER'},
        {text: '权限', value: 'PERMISSION'}
      ],
      dialog: false,
      title: '添加权限',
      username: '',
      permissionType: '',
      id: ''
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
        item.id = ''
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

<style lang="css">
</style>
