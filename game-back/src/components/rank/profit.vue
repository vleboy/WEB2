<template>
    <div class="profit">
        <p class="title">游戏盈利排名</p>
        <Table :columns="columns" :data="profitRank"></Table>
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
          title: "今日盈利",
          key: "profit",
          render: (h, params) => {
            return h("span", thousandFormatter(params.row.profit));
          }
        }
      ],
    };
  },
  props:['profitRank']
};
</script>
<style lang="less" scoped>
.profit {
  width: 300px;
  .title {
    line-height: 36px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
