<template>
    <div class="basic">
        <div class="search">
            <div class="left">
                <Input v-model="acount" placeholder="输入账号" style="width: 200px"></Input>
                <Input v-model="id" placeholder="输入ID" style="width: 200px"></Input>
                <Button type="primary" @click="search">搜索</Button>
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
        <kill title='游戏杀数' date="历史" @click.native="goKillDetail" num=1 />
        <pie-charts></pie-charts>
        <div class="hour" @click="goOnlineDetail">
            <p>每小时在线人数</p>
            <div class="content">
                <div id="barchart" class="barchart"></div>
                <div class="sumary">
                    <p>玩家平均在线时长</p>
                    <p>
                        <span class="sumItem"><Icon type="ios-clock-outline" size="18" color="#6699FF"></Icon>  7日: {{hour1}}小时</span>
                        <span class="sumItem">昨日: {{hour2}}小时</span>
                    </p>
                    <p>玩家每次登陆平均在线时长</p>
                    <p>
                        <span class="sumItem"><Icon type="ios-clock-outline" size="18" color="#6699FF"></Icon>  7日: {{hour3}}小时</span>
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
import pieCharts from '@/components/pieCharts'
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
  components:{basicMore,kill,pieCharts},
  props:['gameType'],
  mounted() {
    this.drawBar();
  },
  created(){
      // console.log(this.gameType);
  },
  methods: {
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
    },
    search(){
      console.log('id==>',this.id);
      console.log('acount==>',this.acount);
    },
    changeRange() {
       let range = this.range.map(item => {
        return item.getTime();
      });
      console.log(range);
    },
    more(){
        this.showMore=true;
    },
    goKillDetail(){
      this.$router.push({name:'killDetail'})
    },
    goOnlineDetail(){
      this.$router.push({name:'onlineDetail'})
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
            data: [  120,   150,    120,  200,  150,  120,  200,  150, 120,   200,   150, 120,  200, 150,120, 200,  150, 120,  200,  150,120,200,  150 ,12],
            type: "bar"
          },
          {
            name: "今日在线人数",
            data: [  120,   150,    120,  200,  150,  120,  200,  150, 120,   200,   150, 120,  200, 150,120, 200,  150, 120,  200,  150,120,200,  150 ,122].reverse(),
            type: "bar"
          }
        ],
        tooltip: {
          show: true,
          trigger:'axis',
          axisPointer: {
              type: 'shadow'
            }
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
  .hour {
    width: 100%;
    .content {
      background-color: #fff;
      .sumary {
        text-indent: 1em;
        padding-bottom: 10px;
        p{
          line-height: 32px;
        }
        .sumItem {
          border: 2px solid #2db7f5;
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

