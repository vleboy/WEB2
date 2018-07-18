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
            <div class="singlePie">
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
            <div class="singlePie">
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
            <div class="singlePie">
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
    goDetail(name){
      this.$router.push({name:name})
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
              { value: 10, name: "rose1" },
              { value: 5, name: "rose2" },
              { value: 15, name: "rose3" },
              { value: 25, name: "rose4" },
              { value: 20, name: "rose5" },
              { value: 35, name: "rose6" },
              { value: 30, name: "rose7" },
              { value: 40, name: "rose8" }
            ]
          }
        ]
      };
      const pie1 = document.getElementById(id);
      let myChart = this.$echarts.init(pie1);
      myChart.setOption(option);
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
    background-color: #d7d7d7;
    line-height: 32px;
    font-size: 14px;
    font-weight: bold;
  }
  .sumary {
    line-height: 32px;
    background-color: #f3f3f3;
    .hisTitle {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.pie {
    width: 400px;
    height: 300px;
    background-color: #f3f3f3;
  }
</style>
