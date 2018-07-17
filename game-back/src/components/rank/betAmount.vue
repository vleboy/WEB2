<template>
    <div class="betamount">
        <p class="title">下注金额排名</p>
        <Table :columns="columns" :data="data1"></Table>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  data() {
    return {
      columns: [
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
      data1: [
        {
          name: "熊猫传奇",
          profit: 4356465
        },
         {
          name: "熊猫传奇",
          profit: 4356465
        },
         {
          name: "熊猫传奇",
          profit: 4356465
        }
      ]
    };
  }
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
