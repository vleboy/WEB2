<template>
  <div class="rankdetail">
    <div class="search">
      <RadioGroup v-model="source" type="button" @on-change='changeSource'>
        <Radio label="0">1月</Radio>
        <Radio label="1">7天</Radio>
        <Radio label="2">3天</Radio>
        <Radio label="3">昨天</Radio>
      </RadioGroup>
      <DatePicker type="daterange" v-model="range" :editable='false' @on-change="changeRange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
    </div>
    <Button type="primary">{{dateRange}}</Button>
    <Row>
      <Col span="8">
      <profit-rank :profitRank="profitRank" />
      </Col>
      <Col span="8">
      <bet-amount :amoutRank="amoutRank" />
      </Col>
      <Col span="8">
      <game-count :countRank="countRank" />
      </Col>
    </Row>
  </div>
</template>
<script>
import ProfitRank from "@/components/rank/ProfitRank";
import GameCount from "@/components/rank/GameCount";
import BetAmount from "@/components/rank/BetAmount";
export default {
  components: { ProfitRank, GameCount, BetAmount },
  data() {
    return {
      range: "",
      source: "",
      dateRange: "今天",
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
  methods: {
    changeRange() {
      let range = this.range.map(item => {
        return item.getTime();
      });
      let format=this.range.map(item=>{
        let y=item.getFullYear();
        let m=item.getMonth()+1;
        let d=item.getDate();
        return y+'-'+m+'-'+d
      })
      this.dateRange=format[0]+' 至 '+format[1];
      console.log(range);
    },
    changeSource() {
      let range = {};
      switch (+this.source) {
        case 0:
          range.endTime = new Date().getTime();
          range.startTime = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
          this.dateRange = "1月";
          break;
        case 1:
          range.endTime = new Date().getTime();
          range.startTime = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
          this.dateRange = "7天";
          break;
        case 2:
          range.endTime = new Date().getTime();
          range.startTime = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;
          this.dateRange = "3天";
          break;
        case 3:
          let zero = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
          range.endTime = zero;
          range.startTime = zero - 86400000;
          this.dateRange = "昨天";
          break;
      }
      console.log(range);
    }
  },
  created() {
  },
};
</script>
<style lang="less" scoped>
.rankdetail {
  min-height: 91vh;
  .search {
    text-align: right;
    margin-right: 40px;
  }
}
</style>
