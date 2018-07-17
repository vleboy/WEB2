<template>
    <div class="profit">
        <p class="title">游戏盈利排名</p>
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
          title: "今日盈利",
          key: "profit",
          render: (h, params) => {
            return h("span", thousandFormatter(params.row.profit));
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
.profit {
  width: 300px;
  .title {
    line-height: 36px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
