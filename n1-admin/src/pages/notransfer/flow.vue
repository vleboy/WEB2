<template>
  <div class="flow">
    <div class="top">
      <div class="search">
        <Row class="row">
          <Col span="2">运营商标识</Col>
          <Col span="2">
          <Input v-model="plat" placeholder="请输入"></Input>
          </Col>
          <Col span="2" style="paddingLeft: 10px">玩家ID</Col>
          <Col span="2">
          <Input v-model="userId" placeholder="请输入"></Input>
          </Col>
          <Col span="2" style="paddingLeft: 10px">交易号</Col>
          <Col span="3">
          <Input v-model="businessKey" placeholder="请输入"></Input>
          </Col>
          <Col span="7" style="textAlign:right">
          <DatePicker type="datetimerange" :editable='false' v-model="defaultTime" placeholder="选择日期时间范围(默认最近一周)" style="width: 300px" @on-ok="search"></DatePicker>
          </Col>
          <Col span="4" style="textAlign:right">
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
          </Col>
        </Row>
      </div>
    </div>
    <Row class="row">
      <Col span="8">
      <RadioGroup v-model="reportType" type="button" :style="{paddingBottom:'10px'}" @on-change="search">
        <Radio label="1">流水记录</Radio>
        <Radio label="2">交易记录</Radio>
      </RadioGroup>
      </Col>
      <!-- <Col span="8">
       <span>分页数量:</span>
      <Select v-model="pageSize" style="width:90px" @on-change="search">
        <Option v-for="item in sizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col> -->
      <Col span="8" :offset='8' style="textAlign:right">
      <Select v-model="status" style="width:90px" v-if="reportType=='1'" @on-change="search">
        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
    </Row>
    <Table :columns="columns" size="small" v-if="reportType==1" :data="showData"></Table>
    <Table :columns="columns1" size="small" v-else :data="showData"></Table>
    <Row class="count_row" v-if="reportType=='2'">
      <Col span="4">
      总下注次数: <span class="num">{{allBetCount|format}}</span>
      </Col>
      <Col span="4">
      总下注金额: <span class="num">{{allBetAmount|format}}</span>
      </Col>
      <Col span="4">
      总返还金额: <span class="num">{{allRet|format}}</span>
      </Col>
      <Col span="4">
      总返奖金额: <span class="num">{{allWin|format}}</span>
      </Col>
      <Col span="4">
      总退款金额: <span class="num">{{allRefund|format}}</span>
      </Col>
      <Col span="4">
      总输赢金额: <span class="num">{{allWinLose|format}}</span>
      </Col>
    </Row>
    <Page :total="total" class="page" show-elevator :page-size='pageSize' show-total @on-change="changepage"></Page>
    <Spin size="large" fix v-if="spin">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <Modal title="流水详情" v-model="isOpenModalRunning" class="g-text-center" width="800">
      <Row class="g-text-left" style="margin-bottom: 15px">
        <Col span="12">交易号：{{rowDetail.businessKey}}</Col>
        <Col span="4">下注金额:<span :class="rowDetail.betAmount>0?'green':'red'">{{rowDetail.betAmount}}</span></Col>
        <Col span="4">返奖金额：{{rowDetail.winAmount}}</Col>
        <Col span="4">退款金额：{{rowDetail.refundAmount}}</Col>
      </Row>
      <Row class="g-text-left" style="margin-bottom: 15px">
        <Col span="4">返还金额：{{rowDetail.retAmount}}</Col>
        <Col span="4">输赢金额:
        <span :class="{'green':rowDetail.winloseAmount>0,'red':rowDetail.winloseAmount<0}">{{rowDetail.winloseAmount}}</span>
        </Col>
      </Row>
      <Table size="small" :columns="columns2" :data="runningDetail"></Table>
    </Modal>
  </div>
</template>
<script>
import { httpRequest } from "@/service/index";
import dayjs from "dayjs";
import { getDefaultTime } from "@/config/getDefaultTime";
export default {
  name: "",
  components: {},
  filters: {
    format(v) {
      return v.toLocaleString();
    }
  },
  props: {},
  data() {
    return {
      allBetCount: 0,
      allBetAmount: 0,
      allRefund: 0,
      allWinLose: 0,
      allRet: 0,
      allWin: 0,
      rowDetail: {},
      // pageSize:200,
      //  sizeList: [
      //   {
      //     value: 200,
      //     label: "200"
      //   },
      //   {
      //     value: 100,
      //     label: "100"
      //   },
      //   {
      //     value: 20,
      //     label: "20"
      //   }
      // ],
      status: "A",
      statusList: [
        {
          value:'A',
          label:'全部'
        },
        {
          value: "Y",
          label: "同步成功"
        },
        {
          value: "N",
          label: "下注成功"
        },
        {
          value: "E",
          label: "下注失败"
        }
      ],
      typeList: {
        "3": "下注",
        "4": "返奖",
        "5": "返还",
        "10": "系统升级原账结余",
        "11": "中心钱包",
        "12": "代理操作",
        "13": "商城"
      },
      showData: [],
      spin: false,
      pageSize: 20,
      runningDetail: [],
      isOpenModalRunning: false,
      plat: "",
      userId: "",
      businessKey: "",
      reportType: "1",
      defaultTime: getDefaultTime(),
      columns: [
        {
          title: "交易号",
          width: 200,
          key: "businessKey",
        },
        {
          title: "流水号",
          key: "sn",
          width: 250,
        },
        {
          title: "接入方",
          key: "plat",
          width: 100,
          align: "center"
        },
        {
          title: "玩家ID",
          key: "userId",
          width: 100,
          align: "center"
        },
        {
          title: "玩家昵称",
          key: "userNick",
          width: 100,
          align: "center"
        },
        {
          title: "游戏大类",
          key: "gameType",
          width: 100,
          align: "center"
        },
        {
          title: "游戏ID",
          key: "gameId",
          width: 100,
          align: "center"
        },
        {
          title: "帐变金额",
          key: "amount",
          width: 100,
          align: "center",
          render: (h, params) => {
            let color = params.row.amount > 0 ? "#0c0" : "#f30";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              params.row.amount
            );
          }
        },
        {
          title: "余额",
          key: "balance",
          width: 100,
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          width: 100,
          render: (h, params) => {
            return h("span", this.typeList[params.row.type]);
          }
        },
        {
          title: "状态",
          key: "status",
          width: 100,
          render: (h, params) => {
            let color, text;
            switch (params.row.status) {
              case "Y":
                color = "#0c0";
                text = "同步成功";
                break;
              case "N":
                color = "#0c0";
                text = "下注成功";
                break;
              case "E":
                color = "#f30";
                text = "下注失败";
                break;
            }
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "同步时间",
          key: "createdAt",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h(
              "span",
              dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        }
      ],
      columns1: [
        {
          title: "交易号",
          key: "businessKey",
          width: 200
        },
        {
          title: "接入方",
          key: "plat",
          width: 100,
          align: "center"
        },
        {
          title: "玩家ID",
          key: "userId",
          width: 100,
          align: "center"
        },
        {
          title: "玩家昵称",
          key: "userNick",
          width: 100,
          align: "center"
        },
        {
          title: "游戏大类",
          key: "gameType",
          width: 100,
          align: "center"
        },
        {
          title: "游戏ID",
          key: "gameId",
          width: 100,
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          width: 100,
          align: "center",
          render: (h, params) => {
            let color, text;
            switch (params.row.status) {
              case "Y":
                color = "#0c0";
                text = "成功";
                break;
              case "N":
                color = "#f30";
                text = "失败";
                break;
              case "E":
                color = "#f30";
                text = "错误";
                break;
            }
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "下注金额",
          key: "betAmount",
          width: 100,
          align: "center"
        },
        {
          title: "下注次数",
          key: "betCount",
          width: 100,
          align: "center"
        },
        {
          title: "返奖金额",
          key: "winAmount",
          width: 100,
          align: "center"
        },
        {
          title: "退款金额",
          key: "refundAmount",
          width: 100,
          align: "center"
        },
        {
          title: "返还金额",
          key: "retAmount",
          width: 100,
          align: "center"
        },
        {
          title: "输赢金额",
          key: "winloseAmount",
          width: 100,
          align: "center",
          render: (h, params) => {
            let color = params.row.winloseAmount > 0 ? "#0c0" : "#f30";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              params.row.winloseAmount
            );
          }
        },
        {
          title: "操作",
          key: "",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: "#20a0ff"
                },
                on: {
                  click: () => {
                    this.openModalRunning(params.row.content);
                    this.rowDetail = params.row;
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
      columns2: [
        {
          title: "流水号",
          key: "sn"
        },
        {
          title: "类型",
          key: "type",
          render: (h, params) => {
            return h("span", this.typeList[params.row.type]);
          }
        },
        {
          title: "帐变金额",
          key: "amount"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            let color, text;
            switch (params.row.status) {
              case "Y":
                color = "#0c0";
                text = "成功";
                break;
              case "N":
                color = "#f30";
                text = "失败";
                break;
              case "E":
                color = "#f30";
                text = "错误";
                break;
            }
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "余额",
          key: "balance"
        },
        {
          title: "交易时间",
          key: "createdAt",
          render: (h, params) => {
            return h(
              "span",
              dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        }
      ],
      tradeRecord: [],
      flowList: []
    };
  },
  computed: {
    total() {
      let data = this.reportType == "1" ? this.flowList : this.tradeRecord;
      return data.length;
    },
    changedTime() {
      let time = this.defaultTime;
      time = time.map((item, index) => {
        if (index == 1 && item.getTime() > Date.now() - 180000) {
          return Date.now() - 180000;
        }
        return item.getTime();
      });
      this.defaultTime = [new Date(time[0]), new Date(time[1])];
      return time;
    }
  },
  watch: {},
  created() {
    //   this.init()
  },
  methods: {
    getAllCount(list) {
      this.allBetCount = 0;
      this.allBetAmount = 0;
      this.allWinLose = 0;
      this.allRefund = 0;
      this.allWin = 0;
      this.allRet = 0;
      for (let item of list) {
        this.allBetCount += item.betCount;
        this.allBetAmount += item.betAmount;
        this.allWinLose += item.winloseAmount;
        this.allRefund += item.refundAmount;
        this.allRet += item.retAmount;
        this.allWin += item.winAmount;
      }
      this.allBetAmount = +this.allBetAmount.toFixed(2);
      this.allWinLose = +this.allWinLose.toFixed(2);
      this.allRefund = +this.allRefund.toFixed(2);
      this.allWin = +this.allWin.toFixed(2);
      this.allRet = +this.allRet.toFixed(2);
    },
    handlePage() {
      let data = this.reportType == "1" ? this.flowList : this.tradeRecord;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.total < this.pageSize) {
        this.showData = data;
      } else {
        this.showData = data.slice(0, this.pageSize);
      }
      this.getAllCount(this.showData);
    },
    changepage(index) {
      let data = this.reportType == "1" ? this.flowList : this.tradeRecord;
      let size = this.pageSize;
      let _start = (index - 1) * size;
      let _end = index * size;
      this.showData = data.slice(_start, _end);
      this.getAllCount(this.showData);
      // console.log(this.showData);
    },
    openModalRunning(data) {
      this.isOpenModalRunning = true;
      this.runningDetail = data;
    },
    reset() {
      this.userId = "";
      this.plat = "";
      this.businessKey = "";
      this.status = "";
      this.defaultTime = getDefaultTime();
    },
    search() {
      if (this.plat == "" && this.userId == "" && this.businessKey == "") {
        return this.$Message.warning("请输入查询条件");
      }
      this.spin = true;
      httpRequest("post", "/transferDetail", {
        userId: this.userId,
        isRound: this.reportType == "1" ? false : true,
        plat: this.plat,
        status: this.status,
        // pageSize:this.pageSize,
        businessKey: this.businessKey,
        startTime: this.changedTime[0],
        endTime: this.changedTime[1]
      })
        .then(res => {
          if (res.code == 0) {
            if (res.payload) {
              if (this.reportType == "1") {
                this.flowList = res.payload.Items;
              } else {
                this.tradeRecord = res.payload.Items;
              }
              this.handlePage();
            }
          }
        })
        .finally(() => {
          this.spin = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.flow {
  min-height: 89vh;
  .row {
    line-height: 32px;
    padding-bottom: 16px;
  }
  .page {
    text-align: right;
    margin-top: 20px;
  }
  .count_row {
    line-height: 32px;
    padding: 20px 0;
  }
}
.green {
  color: #0c0;
}
.red {
  color: #f30;
}
</style>
