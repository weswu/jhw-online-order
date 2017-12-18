<template>
  <div class="main-content spread">
    <div class="warpper">
      <mu-sub-header>我推广的会员</mu-sub-header>
      <mu-content-block>
        <iframe id="extend_rank" :src="'http://www.jihui88.com/member/extend_rank.html?u='+$store.state.user.username" style="width: 100%; border: none; height: 87%;"></iframe>
      </mu-content-block>
    </div>
  </div>
</template>
