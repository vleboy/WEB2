<template>
  <div class="piechart">
    <Row>
      <Col span="16">
      <div class="singleBar" @click="goDetail('profitDetail')">
        <p class="pieTitle">盈利总和</p>
        <Row class="sumary">
          <Col span="12">
          <span class="hisTitle">历史</span> 85,474,571,548</Col>
          <Col span="12">
          <span class="hisTitle">今日</span> 85,474,571,548</Col>
        </Row>
        <div id="bar1" class="bar"></div>
      </div>
      </Col>
      <Col span="8">
      <div class="singlePie" @click="goDetail('betDetail')">
        <p class="pieTitle">下注总和</p>
        <Row class="sumary">
          <Col span="12">
          <span class="hisTitle">历史</span> 85,474,571,548</Col>
          <Col span="12">
          <span class="hisTitle">今日</span> 85,474,571,548</Col>
        </Row>
        <div id="pie1" class="pie"></div>
      </div>
      </Col>
    </Row>
    <Row>
      <Col span="16">
      <div class="singleBar" @click="goDetail('payDetail')">
        <p class="pieTitle">赔付总和</p>
        <Row class="sumary">
          <Col span="12">
          <span class="hisTitle">历史</span> 85,474,571,548</Col>
          <Col span="12">
          <span class="hisTitle">今日</span> 85,474,571,548</Col>
        </Row>
        <div id="bar2" class="bar"></div>
      </div>
      </Col>
      <Col span="8">
      <div class="singlePie" @click="goDetail('gameCountDetail')">
        <p class="pieTitle">游戏局数</p>
        <Row class="sumary">
          <Col span="12">
          <span class="hisTitle">历史</span> 85,474,571,548</Col>
          <Col span="12">
          <span class="hisTitle">今日</span> 85,474,571,548</Col>
        </Row>
        <div id="pie2" class="pie"></div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  data() {
    return {};
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
      { value: 40, name: "幸运足球" }
    ];
    let data2 = [100, 300, -233, 235, 500, -400, 106, -150];
    let data3 = [1234, 342, -357, 457, 432, -453, 453, -657];
    this.drawPie("pie1", data1);
    this.drawPie("pie2", data1);
    this.drawBar("bar1", data2, "盈利");
    this.drawBar("bar2", data3, "赔付");
  },
  methods: {
    goDetail(name) {
      this.$router.push({ name });
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
    },
    drawBar(id, data, name) {
      let option = {
        xAxis: {
          type: "category",
          data: [
            "塔罗之谜",
            "小厨娘",
            "祥龙献瑞",
            "四方神兽",
            "财神进宝",
            "福运亨通",
            "熊猫传奇",
            "幸运足球"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: name,
            data: data,
            type: "bar"
          }
        ],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        }
      };
      const chart = document.getElementById(id);
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.piechart {
  .singlePie {
    width: 100%;
    padding-left: 10px;
  }
  .singleBar {
    width: 100%;
  }
  .pieTitle {
    background-color: #d7d7d7;
    line-height: 32px;
    font-size: 14px;
    text-indent: 1em;
    font-weight: bold;
  }
  .sumary {
    line-height: 32px;
    background-color: #f7f8fa;
    .hisTitle {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.pie {
  width: 100%;
  height: 300px;
  background-color: #fff;
}
.bar {
  width: 100%;
  height: 300px;
  background-color: #fff;
}
</style>
