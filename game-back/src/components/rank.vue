<template>
    <div class="rank">
        <profit :profitRank="profitRank" @click.native="toDetail"></profit>
        <bet-amount :amoutRank="amoutRank" @click.native="toDetail"></bet-amount>
        <game-count :countRank="countRank" @click.native="toDetail"></game-count>
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
        }
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
        }
      ],
      profitRank:[
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
    };
  },
  methods:{
      toDetail(){
          this.$router.push({name:'rankDetail'})
      }
  },
  components: { profit, betAmount, gameCount }
};
</script>
<style lang="less" scoped>
.rank {
  width: 300px;
  min-width: 200px;
  max-width: 300px;
  flex: 0 0 300px;
  position: fixed;
  height: 100vh;
  right: 0px;
  top: 40px;
  overflow: auto;
}
</style>
