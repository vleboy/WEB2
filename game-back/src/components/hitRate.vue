<template>
    <div class="hitRate">
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
        <div class="title">
             <Row>
                <Col span="10">
                <p class="secTitle">游戏命中率</p>
                </Col>
                <Col span="5">
                <p><span class="rate">{{rate}}</span></p>
                <p class="count">{{count}} 局</p>
                </Col>
            </Row>
        </div>
        <div id="hitrateChart" class="barchart"></div>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  props: {},
  data() {
    return {
      rate: "43%",
      source:'',
      dateRange:'',
      count: thousandFormatter(234554)
    };
  },
  mounted(){
      this.drawBar()
  },
  methods:{
      changeSource(){
          console.log(this.source);
      },
      changeRange(){
          let range = this.dateRange.map(item => {
            return item.getTime();
            });
            console.log(range);
      },
       drawBar() {
      let option = {
        xAxis: {
          type: "category",
          data: ['Scat','Wild','SSO','SS1','SS2','SS3','SS4','NS0','NS1','NS2','NS3','NS4','NS5'],
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "命中率",
            data: [  120,   150,    120,  200,  150,  120,  200,  150, 120,   200,   150, 120,  200],
            type: "bar",
            barWidth:'50%'
          },
        ],
        tooltip: {
          show: true,
          trigger:'axis',
          axisPointer: {
              type: 'shadow'
            }
        }
      };
      const chart = document.getElementById("hitrateChart");
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.hitRate {
  background-color: #fff;
  margin-top: 15px;
  .secTitle {
    line-height: 38px;
    font-weight: bold;
    font-size: 16px;
    text-indent: 1em;
  }
  .search{
            padding-top: 10px;
            padding-bottom: 10px;
        }
  .rate{
      display: inline-block;
      margin-top: 10px;
      text-align: center;
      line-height: 40px;
      width: 150px;
      height: 40px;
      background-color: #00CCFF;
      color: #000;
      font-size: 16px;
      font-weight: bold;
  }
  .count{
      font-size: 16px;
      font-weight: bold;
      line-height: 40px;
  }
  .barchart{
      width: 100%;
      height: 300px;
  }
}
</style>
