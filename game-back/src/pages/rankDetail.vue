<template>
    <div class="rankdetail">
        <Button type="primary">今天</Button>
        <Row>
            <Col span="8">
            <profit :profitRank="profitRank"></profit>
            </Col>
            <Col span="8">
            <bet-amount :amoutRank="amoutRank"></bet-amount>
            </Col>
            <Col span="8">
            <game-count :countRank="countRank"></game-count>
            </Col>
        </Row>
    </div>
</template>
<script>
import profit from "@/components/rank/profit";
import gameCount from "@/components/rank/gameCount";
import betAmount from "@/components/rank/betAmount";
export default {
  data() {
    return {
      amoutRank: [
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
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        },
      ],
      countRank: [
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
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        }
      ],
      profitRank: [
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
  },
  components: { profit, gameCount, betAmount }
};
</script>
<style lang="less" scoped>
.rankdetail {
  min-height: 91vh;
}
</style>
