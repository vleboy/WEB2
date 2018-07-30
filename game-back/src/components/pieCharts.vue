<template>
  <div class="piechart">
    <Row>
      <Col span="12">
      <div class="singlePie" @click="goDetail('profitDetail')">
        <p class="pieTitle">盈利总和</p>
        <Row class="sumary">
          <Col span="12">
          <span class="hisTitle">历史</span> 85,474,571,548</Col>
          <Col span="12">
          <span class="hisTitle">今日</span> 85,474,571,548</Col>
        </Row>
        <div id="pie1" class="pie"></div>
      </div>
      </Col>
      <Col span="12">
      <div class="singlePie" @click="goDetail('betDetail')">
        <p class="pieTitle">下注总和</p>
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
    <Row>
      <Col span="12">
      <div class="singlePie" @click="goDetail('payDetail')">
        <p class="pieTitle">赔付总和</p>
        <Row class="sumary">
          <Col span="12">
          <span class="hisTitle">历史</span> 85,474,571,548</Col>
          <Col span="12">
          <span class="hisTitle">今日</span> 85,474,571,548</Col>
        </Row>
        <div id="pie3" class="pie"></div>
      </div>
      </Col>
      <Col span="12">
      <div class="singlePie" @click="goDetail('gameCountDetail')">
        <p class="pieTitle">游戏局数</p>
        <Row class="sumary">
          <Col span="12">
          <span class="hisTitle">历史</span> 85,474,571,548</Col>
          <Col span="12">
          <span class="hisTitle">今日</span> 85,474,571,548</Col>
        </Row>
        <div id="pie4" class="pie"></div>
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
    this.drawPie("pie1");
    this.drawPie("pie2");
    this.drawPie("pie3");
    this.drawPie("pie4");
  },
  methods: {
    goDetail(name) {
      this.$router.push({ name: name });
    },
    drawPie(id) {
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
            data: [
              { value: 10, name: "塔罗之谜" },
              { value: 5, name: "小厨娘" },
              { value: 15, name: "祥龙献瑞" },
              { value: 25, name: "四方神兽" },
              { value: 20, name: "财神进宝" },
              { value: 35, name: "福运亨通" },
              { value: 30, name: "熊猫传奇" },
              { value: 40, name: "幸运足球" }
            ]
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
  .singlePie {
    width: 400px;
    margin: 10px auto;
  }
  .pieTitle {
    background-color: #f3ecec;
    line-height: 32px;
    font-size: 14px;
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
  width: 400px;
  height: 300px;
  background-color: #f7f8fa;
}
</style>
