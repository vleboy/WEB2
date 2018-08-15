<template>
  <div class="piechart">
    <div class="search clear">
            <div class="right">
                <RadioGroup v-model="source" type="button" @on-change='changeSource'>
                    <Radio label="0">1月</Radio>
                    <Radio label="1">7天</Radio>
                    <Radio label="2">3天</Radio>
                    <Radio label="3">昨天</Radio>
                </RadioGroup>
                <DatePicker type="daterange" v-model="dateRange" :editable='false' @on-change="changeRange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
            </div>
         </div>
    <Row>
      <Col span="12">
      <Row>
        <Col span="18">
        <div class="singlePie">
          <p class="pieTitle">下注总和-今日 <span class="count">¥ {{count}}</span></p>
          <div id="pie1" class="pie"></div>
        </div>
        </Col>
        <Col span="5">
        <rank-item range="今日" :rankList='rankList' />
        </Col>
      </Row>
      </Col>
      <Col span="12">
      <Row>
        <Col span="18">
        <div class="singlePie">
          <p class="pieTitle">下注总和-历史 <span class="count">¥ {{count}}</span></p>
          <div id="pie2" class="pie"></div>
        </div>
        </Col>
        <Col span="5">
        <rank-item range="今日" :rankList='rankList' />
        </Col>
      </Row>
      </Col>
    </Row>
     <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHourBet' @click="seeHourBet">点击查看每小时下注金额</Button>
        </div>
      <hour-chart title="每小时下注" hourId="2" :legend='["今日下注", "7日平均下注"]' v-if="showHourBet"/>
    <Row>
      <Col span="12">
      <Row>
        <Col span="18">
        <div class="singlePie">
          <p class="pieTitle">游戏局数-今日 <span class="count">¥ {{count}}</span></p>
          <div id="pie3" class="pie"></div>
        </div>
        </Col>
        <Col span="5">
        <rank-item range="今日" :rankList='rankList' />
        </Col>
      </Row>
      </Col>
      <Col span="12">
      <Row>
        <Col span="18">
        <div class="singlePie">
          <p class="pieTitle">游戏局数-历史 <span class="count">¥ {{count}}</span></p>
          <div id="pie4" class="pie"></div>
        </div>
        </Col>
        <Col span="5">
        <rank-item range="今日" :rankList='rankList' />
        </Col>
      </Row>
      </Col>
    </Row>
    <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHourCount' @click="seeHourCount">点击查看每小时下注金额</Button>
        </div>
      <hour-chart title="每小时局数" hourId="3" :legend='["今日局数", "7日平均局数"]' v-if="showHourCount"/>
  </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import RankItem from "@/components/RankItem";
import HourChart from '@/components/HourChart'
export default {
  name: "gameSummary",
  components: { RankItem,HourChart},
  props: {},
  data() {
    return {
      count:thousandFormatter(234565),
      showHourBet:false,
      showHourCount:false,
      source:'',
      dateRange:'',
      rankList: [
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
  mounted() {
    let data1 = [
      { value: 10, name: "塔罗之谜" },
      { value: 5, name: "小厨娘" },
      { value: 15, name: "祥龙献瑞" },
      { value: 25, name: "四方神兽" },
      { value: 20, name: "财神进宝" },
      { value: 35, name: "福运亨通" },
      { value: 30, name: "熊猫传奇" },
      { value: 40, name: "幸运足球" },
      { value: 18, name: "神秘海域" }
    ];
    this.drawPie("pie1", data1);
    this.drawPie("pie2", data1);
    this.drawPie("pie3", data1);
    this.drawPie("pie4", data1);
  },
  methods: {
    goDetail(name) {
      this.$router.push({ name });
    },
    changeSource(){
      console.log(this.source);
    },
    changeRange(){
      let range = this.dateRange.map(item => {
            return item.getTime();
            });
            console.log(range);
    },
    seeHourBet(){
      this.showHourBet=true;
    },
    seeHourCount(){
      this.showHourCount=true
    },
    drawPie(id, data) {
      let option = {
        title: {
          text: "南丁格尔玫瑰图",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable: true,
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            roseType: "area",
            data: data
          }
        ]
      };
      const pie1 = document.getElementById(id);
      let myChart = this.$echarts.init(pie1);
      myChart.showLoading({
        text: "图表加载中...",
        color: "#20a0ff",
        textColor: "#000",
        zlevel: 0
      });
      myChart.setOption(option);
      myChart.hideLoading();
    }
  }
};
</script>
<style lang="less" scoped>
.piechart {
  background-color: #fff;
  margin-top: 15px;
  .singlePie {
    width: 100%;
    padding-left: 10px;
  }
  .singleBar {
    width: 100%;
  }
  .search{
            padding-top: 10px;
            padding-bottom: 10px;
        }
  .pieTitle {
    background-color: #fff;
    line-height: 32px;
    font-size: 16px;
    text-indent: 1em;
    font-weight: bold;
    .count{
      font-weight: bold;
      font-size: 14px;
      padding-left: 15px;
    }
  }
  .btn{
            text-align: center;
            .morebtn{
                width: 250px;
                margin-top: 10px;
                margin-bottom: 15px;
            }
        }
}
.pie {
  width: 100%;
  height: 300px;
  background-color: #fff;
}
</style>
