<template>
    <div class="killprofititem">
        <Row>
            <Col span="4">
            <i-circle :percent="80" stroke-color="#169BD5" class="circle">
                <p class="circle1">平均杀数</p>
                <p class="circle2" @click="changeToKill">
                    <u><span class="demo-Circle-inner" style="font-size:20px">{{rate|filterRate}}</span></u>
                </p>
                <p class="circle3">{{level}}</p>
                <Button type="default" class="switch" @click="switchLevel">切换</Button>
            </i-circle>
            <p class="title">盈利总和-{{range}}</p>
            <p class="num" @click="changeToProfit">
                <u><Icon type="logo-yen" class="icon" />{{formatProfit}}</u></p>
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
  filters:{
    filterRate(v){
      return v + '%'
    }
  },
  props: {
    range: String,
    chartId: String,
    profit:[Number,String],
    killRate:Object,
    profitArr:Array,
    killRateArr:Array
  },
  data() {
    return{
      rate:'',
      level:'',
      index:1
    }
  },
  computed: {
    formatProfit(){
      return thousandFormatter(+this.profit)
    },
    entries(){
      return Object.entries(this.killRate)
    }
  },
  watch: {},
  created() {
    let kill=this.killRate;
    this.rate=kill.total;
    this.level='total'
  },
  mounted() {
    let color = ["#169BD5"];
    this.drawLineChart(this.killRateArr, color);
  },
  methods: {
    drawLineChart(data, color) {
      let option = {
        xAxis: {
          type: "category",
          data: [
            "熊猫传奇",
            "财富足球",
            "神秘海域",
            "塔罗之谜",
            "小厨娘",
            "祥龙献瑞",
            "四方神兽",
            "财神进宝",
            "福运亨通"
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
      let color = ["#169BD5"];
      this.drawLineChart(this.killRateArr, color);
    },
    changeToProfit() {
      let color = ["#c23531"];
      this.drawLineChart(this.profitArr, color);
    },
    switchLevel(){
      let entries=this.entries;
      let index=this.index;
      if (index > entries.length - 1) {
					index = 0;
      }
      this.level=entries[index][0]
      this.rate=entries[index][1]
      index ++;
      this.index=index;
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
  .circle3{
    padding-top: 4px;
    line-height: 24px;
  }
  .switch {
    position: relative;
    top: 8px;
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
