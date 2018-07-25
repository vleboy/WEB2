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
      range: "",
      source: "",
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
  components: { profit, gameCount, betAmount },
  methods: {
    changeRange() {
      let range=this.range.map(item=>{
        return item.getTime()
      })
      console.log(range);
    },
    changeSource() {
      let range = {};
      switch (+this.source) {
        case 0:
          range.endTiem = new Date().getTime();
          range.startTime = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
          break;
        case 1:
          range.endTiem = new Date().getTime();
          range.startTime = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
          break;
        case 2:
          range.endTiem = new Date().getTime();
          range.startTime = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;
          break;
        case 3:
          let zero=new Date(new Date().setHours(0,0,0,0)).getTime()
          range.endTiem = zero;
          range.startTime = zero-86400000 
          break;
      }
      console.log(range);
    }
  }
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
