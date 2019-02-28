<template>
  <div class="dayReport">
    <div class="nowList">
      <div class="top">
        <p class="title">
        <Row class="row -search-row" :gutter="16">
        <Col span="4" offset="2">商户ID</Col>
        <Col span="6">
        <Input v-model="buID" placeholder="请输入"></Input>
        </Col>
        <Col span="5">商户标识</Col>
        <Col span="6">
        <Input v-model="buSN" placeholder="请输入"></Input>
        </Col>
      </Row>
        </p>
        <div class="right">
          <DatePicker type="daterange" :options="options" :editable='false' :value="defaultTime" placeholder="选择日期时间范围(默认最近一个月)" style="width: 300px" confirm @on-ok="confirms" @on-change="handle"></DatePicker>
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
      </div>
    </div>
    <div v-if="showChat">
      <div id="myChart"></div>
     </div>
    <div class="playerList" id="playerList">
      <Table :columns="columns1" :data="dayStatList" size="small" ref="table_2"></Table>
    </div>
    <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import _ from "lodash";
import dayjs from 'dayjs'
import { thousandFormatter } from "@/config/format";
export default {
 
  data() {
    return {
      options: {
        shortcuts: [
          {
            text: "本周",
            value() {
              return [new Date(dayjs().startOf('week').valueOf() + 24 * 60 * 60 * 1000), new Date(dayjs().endOf('second').valueOf())]
            }
          },
          {
            text: "本月",
            value() {
              return [new Date(dayjs().startOf('month').valueOf()), new Date(dayjs().endOf('second').valueOf())]
            }
          },
          {
            text: "上周",
            value() {
              return [new Date(dayjs().add(-1, 'week').startOf('week').valueOf() + 24 * 60 * 60 * 1000), new Date(dayjs().startOf('week').valueOf() + 24 * 60 * 60 * 1000 - 1)]
            }
          },
          {
            text: "上月",
            value() {
              //-1 上月
              return [new Date(dayjs().add(-1, 'month').startOf('month').valueOf()), new Date(dayjs().startOf('month').valueOf() - 1)]
            }
          }
        ]
      }, 
      defaultTime: [],//getDefaultTime(),
      cacheTime:[],
      spinShow: false, //加载spin
      buID: "",
      buSN: "",
      dayStatList: [],
      showChat: false,
      columns1: [
        {
          title: "日期",
          key: "createdDate"
        },
        {
          title: "投注金额",
          key: "betAmount"
        },
        {
          title: "投注次数",
          key: "betCount"
        },
        {
          title: "退款金额",
          key: "refundAmount"
        },
        {
          title: "返还金额",
          key: "retAmount"
        },
        {
          title: "返奖金额",
          key: "winAmount"
        },
        {
          title: "输赢金额",
          key: "winloseAmount"
        }
      ]

      /* betAmount: -2.25  投加注金额
      betCount: 14 投注次数
      createdDate: "20190102" 日期
      refundAmount: 0 退款金额
      retAmount: 4.699999999999999 返还金额
      winAmount: 4.699999999999999 返奖金额
      winloseAmount: 2.45 输赢金额 */
    };
  },
  created() {
    this.getDate()
  },


  computed: {
    permission() {
      return JSON.parse(localStorage.getItem("userInfo")).subRolePermission;
    }
  },
  methods: {
    handle(daterange) {
      this.cacheTime = daterange
      console.log(daterange);
      
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let _this = this;
      //console.log(_this.dayStatList);

      let yArr = _this.dayStatList.map((item) => {return item.betCount})
      let xArr = _this.dayStatList.map((item) => {return item.createdDate})
     
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          data: xArr
        },
        tooltip: {
        trigger: 'axis'
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: ["投注次数"]
        },
        series: [
          {
            name: "投注次数",
            data: yArr,
            type: "line"
          }
        ]
      });
    },
    confirms() {
      let cacheTime = this.cacheTime.map(ite => {return ite.replace(/-/g,"")})
      this.getDate(cacheTime)
      this.init();
    },
    changeSource(value) {
      this.init();
    },
    reset() {
      this.getDate()
      this.buID = "",
      this.buSN = "",
      this.dayStatList = []
      this.showChat = false
    },
    search() {
      // if (this.dayStatList != "") {
        
      // }
      this.showChat = true
      this.init();
    },
    // permission() {
    //   return JSON.parse(localStorage.getItem("userInfo")).subRolePermission;
    // },
    async init() {

      let params = {
        displayId: parseInt(this.buID),//625615 数字
        sn: this.buSN,
        startTime: parseInt(this.defaultTime[0]), //当月一号
        endTime: parseInt(this.defaultTime[1]) //当日前一天
      };
      let req2 = this.$store.dispatch("getUserDayStat", params);
      this.spinShow = true;
      //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
      let [perms] = await this.axios.all([req2]);
      this.spinShow = false;

      this.dayStatList = perms.payload;

      if (this.dayStatList == "") {
        this.showChat = false
      }
      
      if (this.showChat) {
        this.drawLine();
      }
      
    },
    
    getDate(opt) {
      
      if(opt !== undefined) {
        this.defaultTime = opt
      } else {
        this.defaultTime = [dayjs().startOf('month').format('YYYYMMDD'), dayjs(dayjs().valueOf()-24 * 60 * 60 * 1000).format('YYYYMMDD')]
      }

      console.log(this.defaultTime);
      
    }
  },
  props: ['identity']
};
</script>
<style lang="less" scoped>
.dayReport {
  min-height: 90vh;
  .title {
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem;
    font-weight: 600;
    display: inline-block;
  }
  .top {
    clear: both;
    .right {
      float: right;
    }
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
}
#myChart {
  width: 100%;
  height: 300px;
}
</style>

