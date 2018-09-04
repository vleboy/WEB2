<template>
  <div class="basic">
    <div class="search clear">
      <div class="left">
        <Input v-model="acount" placeholder="输入账号" style="width: 200px"></Input>
        <Input v-model="id" placeholder="输入ID" style="width: 200px"></Input>
        <Button type="primary" @click="search">搜索</Button>
      </div>
    </div>
    <on-line/>
    <kill-profit/>
    <game-summary/>
    <on-line-hour/>
    <hit-rate 
    :hitRateCount="hitRateCount" 
    :gameCount="gameCount" 
    :xAxis="hitXaxis" 
    :data="hitRateData" />
    <price-mix/>
  </div>
</template>
<script>
import HitRate from "@/components/HitRate";
import OnLineHour from "@/components/OnlineHour";
import KillProfit from "@/components/KillProfit";
import OnLine from "@/components/Online";
import GameSummary from "@/components/GameSummary";
import PriceMix from "@/components/PriceMix";
import { mapState } from "vuex";
export default {
  name: "basicContent",
  components: {
    GameSummary,
    OnLine,
    KillProfit,
    OnLineHour,
    HitRate,
    PriceMix
  },
  props: {
    gameType: Number
  },
  data() {
    return {
      acount: "",
      id: "",
      source: "",
      range: "",
      hitRateCount: 0,
      gameCount: 0,
      hitXaxis: [],
      hitRateData: []
    };
  },
  computed: {
    ...mapState(["gameDetail"])
  },
  created() {
    // console.log(this.gameType);
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      let hitRate = this.gameDetail.hitDetail;
      switch (this.gameType) {
        case 1:
          let killTotal = hitRate.total;
          this.hitRateCount = killTotal.hitRate;
          this.gameCount = killTotal.roundCountTotal;
          let detail = killTotal.detail;
          for (let [key, val] of Object.entries(detail)) {
            this.hitXaxis.push(val.name);
            this.hitRateData.push({
              name: val.name,
              value: val.hitRate,
              命中局数: val.hitCount,
              赔付: val.hitPay.toFixed(2),
              "0.25-2.5": val.level_1,
              "5-50": val.level_2,
              "125-500": val.level_3
            });
          }
          break;
        case 41001:
      }
    },
    changeSource() {
      let range = {};
      switch (+this.source) {
        case 0:
          range.startTime = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
          range.endTime = new Date().getTime();
          break;
        case 1:
          range.startTime = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
          range.endTime = new Date().getTime();
          break;
        case 2:
          range.startTime = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;
          range.endTime = new Date().getTime();
          break;
        case 3:
          let zero = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
          range.startTime = zero - 86400000;
          range.endTime = zero;
          break;
      }
      console.log(range);
    },
    search() {
      console.log("id==>", this.id);
      console.log("acount==>", this.acount);
    }
  }
};
</script>
<style lang="less" scoped>
.basic {
  min-height: 91vh;
  .search {
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    padding-bottom: 15px;
  }
}
</style>

