<template>
    <div class="basic">
        <div class="search">
            <div class="left">
                <Input v-model="acount" placeholder="输入账号" style="width: 200px"></Input>
                <Input v-model="id" placeholder="输入ID" style="width: 200px"></Input>
                <Button type="primary">搜索</Button>
            </div>
            <div class="right">
                <RadioGroup v-model="source" type="button" @on-change='changeSource'>
                    <Radio label="0">1月</Radio>
                    <Radio label="1">7天</Radio>
                    <Radio label="2">3天</Radio>
                    <Radio label="3">昨天</Radio>
                </RadioGroup>
                <DatePicker type="daterange" v-model="range" :editable='false' @on-change="changeRange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
            </div>
        <div class="clear"></div>
        </div>
         <kill/>
        <div class="piechart">
            <Row>
                <Col span="12">
                <div class="singlePie">
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
        <div class="hour">
            <p>每小时在线人数</p>
            <div class="content">
                <div id="barchart" class="barchart"></div>
                <div class="sumary">
                    <p>玩家平均在线时长</p>
                    <p>
                        <span class="sumItem">7日: {{hour1}}小时</span>
                        <span class="sumItem">昨日: {{hour2}}小时</span>
                    </p>
                    <p>玩家每次登陆平均在线时长</p>
                    <p>
                        <span class="sumItem">7日: {{hour3}}小时</span>
                        <span class="sumItem">昨日: {{hour4}}小时</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="showmore">
            <Button type="primary" class="morebtn" v-if='!showMore' @click="more">点击加载更多</Button>
        </div>
        <basic-more v-if='showMore'></basic-more>
    </div>
</template>
<script>
import basicMore from '@/components/basicMore'
import kill from '@/components/kill'
export default {
  data() {
    return {
      showMore:false,
      acount: "",
      id: "",
      source: "",
      range: "",
      hour1: 123,
      hour2: 443,
      hour3: 121,
      hour4: 34
    };
  },
  components:{basicMore,kill},
  mounted() {
    this.drawPie("pie1");
    this.drawPie("pie2");
    this.drawPie("pie3");
    this.drawPie("pie4");
    this.drawBar();
  },
  methods: {
    changeSource() {
      console.log(this.source);
    },
    changeRange() {
      console.log(this.range);
    },
    more(){
        this.showMore=true;
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
    },
    drawBar() {
      let option = {
        xAxis: {
          type: "category",
          data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: ["7日平均人数", "今日在线人数"]
        },
        series: [
          {
            name: "7日平均人数",
            data: [
              120,
              200,
              150,
              120,
              200,
              150,
              120,
              200,
              150,
              120,
              200,
              150,
              120,
              200,
              150,
              120,
              200,
              150,
              120,
              200,
              150,
              120,
              200,
              150
            ],
            type: "bar"
          },
          {
            name: "今日在线人数",
            data: [  120,   150,    120,  200,  150,  120,  200,  150, 120,   200,   150, 120,  200,
              150,
              120,
              200,
              150,
              120,
              200,
              150,
              120,
              200,
              150
            ],
            type: "bar"
          }
        ],
        tooltip: {
          show: true
        }
      };
      const chart = document.getElementById("barchart");
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.basic {
  min-height: 91vh;
  .clear {
    clear: both;
  }
  .search {
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    padding-bottom: 15px;
  }
  .pie {
    width: 400px;
    height: 300px;
    background-color: #f3f3f3;
  }
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
  .hour {
    width: 100%;
    .content {
      background-color: #ccfff5;
      .sumary {
        text-indent: 2em;
        padding-bottom: 10px;
        .sumItem {
          border: 3px solid #ffcc00;
          width: 200px;
          height: 40px;
          line-height: 36px;
          display: inline-block;
          background-color: #fff;
        }
      }
    }
    p {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .showmore{
      text-align: center;
      .morebtn{
          width: 250px;
          margin-top: 20px;
      }
  }
  #barchart {
    width: 100%;
    height: 400px;
  }
}
</style>

