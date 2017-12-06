<template>
  <div class="shop-group-wrap">
    <div class="shop-group" v-for="(row, sIndex) in shopFunction" :key="row.title">
      <div class="shop-icon" :style="{backgroundColor: colors[sIndex]}">
        <div class="shop-icon-wrap">
          <img :src="'/static/icon/' + row.icon" alt="">
          <p>{{row.title}}</p>
        </div>
      </div>
      <div class="shop-cont">
        <ul v-for="(group, gIndex) in row.groups" :key="group.title">
          <p v-if="group.title" class="shop-group-title">{{group.title}}<span v-if="group.sub">{{group.sub}}</span></p>
          <li v-for="(item, index) in group.items" :key="item.name">
            <div v-if="group.needCheck" @mouseenter="enter(item, $event)" @mouseleave="leave">
              <mu-radio v-if="group.type === 'radio'" @change="chooseRadio({sIndex: sIndex, gIndex: gIndex, index: index, item: item})" :label="item.name" :name="group.name" :nativeValue="item.value" :value="group.value"/>
              <mu-checkbox v-else @change="chooseCheck({sIndex: sIndex, gIndex: gIndex, index: index, item: item})" :label="item.name" :nativeValue="item.value" :value="group.value" :disabled="item.disabled"/>
            </div>
            <span v-else @mouseenter="enter(item, $event)" @mouseleave="leave">{{item.name}}</span>
          </li>
          <div class="designer" v-if="group.custom && showDesigner">
            <mu-card v-for="k in designers" :key="k.id">
              <mu-card-media :title="k.name" :subTitle="k.sub">
                <img v-lazy="'/static/' + k.avatar"/>
              </mu-card-media>
              <mu-card-actions>
                <mu-radio @change="chooseDesigner({sIndex: sIndex, gIndex: gIndex, key: k})" label="选择TA" name="designer" :nativeValue="k.value"  @mouseenter="enter(k, $event)" @mouseleave="leave"/>
              </mu-card-actions>
            </mu-card>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      trigger: null,
      colors: [
        '#13C1E2',
        '#5FD89C',
        '#745FF3',
        '#EABF59',
        '#E05477',
        '#CA73D4'
      ]
    }
  },
  computed: {
    ...mapGetters('shop', ['showDesigner', 'shopFunction', 'designers'])
  },
  methods: {
    ...mapActions('shop', ['chooseRadio', 'chooseCheck', 'chooseDesigner']),
    enter (item, e) {
      this.$parent.$parent.$refs.tooltip.show(item, e)
    },
    leave () {
      this.$parent.$parent.$refs.tooltip.hide()
    }
  }
}
</script>

<style>
.designer {
  width: 100%;
  overflow: hidden;
  zoom: 1;
  padding: 30px 0;
}
.designer .mu-card {
  float: left;
  width: 160px;
  margin: 5px;
}
.designer .mu-card-media-title {
  padding: 5px 10px;
  background: rgba(0, 0, 0, .65);
}
.designer .mu-card-title {
  font-size: 14px;
  line-height: 24px;
  color: #fff;
}
.designer .mu-card-sub-title {
  font-size: 12px;
  color: #fff;
}
</style>
