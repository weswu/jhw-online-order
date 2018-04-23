<template>
  <div id="A_Page" class="j_member">
    <router-view/>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
#A_Page.j_member{
  .mu-sub-header{
    border-bottom: none;
  }
  .mu-table{
    .detail{
      color: #2549a6;
      text-decoration: none;
    }
    .mu-tr{
      color: #5b5b5b
    }
  }
  .pagination{
    .mu-pagination{
      .mu-pagination-item{

      }
      .mu-pagination-item.active{
        color: #14a4ff;
      }
    }
  }
  .content-right{
    button{
      color: #a0a0a0
    }
    .bar{
      color: #c9c9c9;
      padding: 0 3px;
    }
  }
  .buy-total{
    .buy-fr{
      margin-top: 18px;
      .price{
        font-size: 22px;
      }
    }
    button{
      width: auto;
    }
  }
}
</style>
