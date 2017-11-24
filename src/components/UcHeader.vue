<template>
  <div class="header">
    <div class="logo">
      <img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/8a688605-44c1-4729-88b3-c818641b12cc.png" alt="">
    </div>
    <div class="nav">
      <div class="nav-account">
        <mu-icon-menu
          icon="person"
          :anchorOrigin="anchorOrigin"
          :targetOrigin="targetOrigin"
        >
          <mu-menu-item title="帮助" />
          <mu-menu-item title="退出" />
        </mu-icon-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      anchorOrigin: {horizontal: 'right', vertical: 'bottom'},
      targetOrigin: {horizontal: 'right', vertical: 'top'}
    }
  },
  methods: {
    toAccount () {
      this.$router.push({ name: 'account' })
    }
  }
}
</script>


<style>
.header{
  background-color: #1e2328;
  height: 60px;
}
.logo {
  float: left;
  height: 60px;
  padding: 0 50px;
}
.logo img {
  height: 100%;
}
.nav{
  float: right;
  height: 60px;
  padding: 0 50px;
  line-height: 60px;
}
.nav ul,
.nav-account {
  float: left;
}

.nav li {
  float: left;
}
.nav li a {
  color: #fff;
  display: inline-block;
  padding: 0 25px;
  position: relative;
}
.nav li a::after,
.nav li.active a::after {
  content: '';
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  border-bottom: 2px  solid #ff6700;
  height: 2px;
}
.nav li a::after {
  transform: scaleX(0);
  transition: all .2s ease-in-out;
}
.nav li.active a::after,
.nav li a:hover::after {
  transform: scaleX(1);
}
.nav-account {
  padding: 0 25px;
  color: #fff;
  line-height: 1;
  height: 60px;
  position: relative;
}
.nav-account .mu-icon-menu {
  padding-top: 12px;
  height: 60px;
}
.nav-account .mu-icon-button {
  width: 36px;
  height: 36px;
  padding: 0;
  background: #7e57c2;
  overflow: hidden;
}
.nav-account .mu-icon {
  font-size: 42px;
  margin-top: 2px;
  margin-left: -3px;
}
</style>

