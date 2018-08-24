<template>
    <div class="killprofititem">
        <Row>
            <Col span="4">
            <i-circle :percent="80" stroke-color="#169BD5" class="circle">
                <p class="circle1">平均杀数</p>
                <p class="circle2" @click="changeToKill">
                    <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                </p>
                <Button type="default" class="switch">切换</Button>
            </i-circle>
            <p class="title">盈利总和-{{range}}</p>
            <p class="num" @click="changeToProfit">
                <Icon type="logo-yen" class="icon" />{{profit}} </p>
            </Col>
            <Col span="20">
            <div :id="'killProfit'+chartId" class="chart"></div>
            </Col>
        </Row>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  name: "killProfit",
  components: {},
  props: {
    range: String,
    chartId: String
  },
  data() {
    return {
      profit: thousandFormatter(1234556543)
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    let killData = [82, 50, 15, 82, 50, 15, 82, 50, 15];
    let color = ["#169BD5"];
    this.drawLineChart(killData, color);
  },
  methods: {
    drawLineChart(data, color) {
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
            "幸运足球",
            "神秘海域"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: this.range,
            data: data,
            type: "bar",
            barWidth: "30%"
          }
        ],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
          //   formatter(params){
          //       console.log(params)
          //   }
        },
        color: color
      };
      //  if (myChart != null && myChart != "" && myChart != undefined) {
      //         myChart.dispose();
      //         console.log(1);
      //  }
      let dom = "killProfit" + this.chartId;
      let myChart = this.$echarts.init(document.getElementById(dom));
      myChart.setOption(option);
    },
    changeToKill() {
      let killData = [82, 50, 15, 82, 50, 15, 82, 50, 15];
      let color = ["#169BD5"];
      this.drawLineChart(killData, color);
    },
    changeToProfit() {
      let profitData = [824, 5054, -154, 382, 250, 515, 82, -5210, 4315];
      let color = ["#c23531"];
      this.drawLineChart(profitData, color);
    }
  }
};
</script>
<style lang="less" scoped>
.killprofititem {
  background-color: #fff;
  text-align: center;
  margin: 10px auto;
  .circle {
    margin-top: 28px;
  }
  .circle1 {
    padding-top: 18px;
  }
  .circle2 {
    padding-top: 8px;
    cursor: pointer;
  }
  .switch {
    position: relative;
    top: 20px;
  }
  .title {
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
  }
  .num {
    font-size: 16px;
    font-weight: bold;
    color: #f00;
    cursor: pointer;
  }
  .chart {
    width: 100%;
    height: 250px;
  }
}
</style>
