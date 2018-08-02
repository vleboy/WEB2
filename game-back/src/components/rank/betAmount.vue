<template>
  <div class="betamount">
    <p class="title">下注金额排名</p>
    <Table :columns="columns" :data="amoutRank"></Table>
  </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  props: ["amoutRank"],
  data() {
    return {
      columns: [
        {
          title: "排名",
          type: "index",
          maxWidth: 60,
          className: "demo-table-info-column"
        },
        {
          title: "游戏名",
          key: "name",
           className: 'column-test'
        },
        {
          title: '下注金额',
          key: "profit",
          render: (h, params) => {
            return h("span", thousandFormatter(params.row.profit));
          }
        }
      ]
    };
  },
};
</script>
<style lang="less" scoped>
.betamount {
  width: 300px;
  margin:0 auto;
  .ivu-table td.column-test{
    background-color: #ff0;
  }
  .title {
    line-height: 36px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
