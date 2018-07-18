<template>
    <div class="betamount">
        <p class="title">下注金额排名</p>
        <Table :columns="columns" :data="amoutRank"></Table>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  data() {
    return {
      columns: [
        {
          title:'排名',
          type:'index',
          maxWidth:60
        },
        {
          title: "游戏名",
          key: "name"
        },
        {
          title: "今日下注金额",
          key: "profit",
          render:(h,params)=>{
              return h('span',thousandFormatter(params.row.profit))
          }
        }
      ],
      
    };
  },
  props:['amoutRank']
};
</script>
<style lang="less" scoped>
.betamount {
  width: 300px;
  .title {
    line-height: 36px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
