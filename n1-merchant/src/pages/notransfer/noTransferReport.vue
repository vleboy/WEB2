<template>
  <div class="notransfer">
    <div class="search">
      <Row class="row">
        <Col span="24" style="textAlign:right">
        <DatePicker type="datetimerange" :editable='false' v-model="defaultTime" placeholder="选择日期时间范围(默认最近一周)" style="width: 300px" @on-ok="search"></DatePicker>
        <Button type="primary" @click="search">搜索</Button>
        <Button type="ghost" @click="reset">重置</Button>
        </Col>
      </Row>
    </div>
    <Table :columns="columns" size="small" :data="reportList"></Table>
    <div v-if="showPlayer">
      <p class="sum"> {{parent}} 所属玩家汇总</p>
      <Table :columns="columns1" size="small" :data="playerList"></Table>
    </div>
    <Spin size="large" fix v-if="spin">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import { httpRequest } from "@/service/index";
import { getDefaultTime } from "@/config/getDefaultTime";
export default {
  name: "notransferReport",
  components: {},
  filters: {},
  props: {},
  data() {
    return {
      plat: "",
      spin: false,
      parent: "",
      showPlayer:false,
      defaultTime: getDefaultTime(),
      columns: [
        {
          title: "接入商标识",
          key: "plat",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#20a0ff",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.parent = params.row.plat;
                    this.showPlayer=true
                    this.getPlayerList(params.row.plat);
                  }
                }
              },
              params.row.plat
            );
          }
        },
        {
          title: "下注次数",
          key: "betCount"
        },
        {
          title: "下注金额",
          key: "betAmount"
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
          key: "winloseAmount",
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
        }
      ],
      columns1: [
        {
          title: "玩家ID",
          key: "userId",
          render:(h,params)=>{
            return h('span',{
              style: {
                  color: "#20a0ff",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$router.push({path:'/transfer/flow',query:{
                      userId:params.row.userId
                    }})
                  }
                }
            },params.row.userId)
          }
        },
         {
          title: "玩家昵称",
          key: "userNick"
        },
        {
          title: "下注次数",
          key: "betCount"
        },
        {
          title: "下注金额",
          key: "betAmount"
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
          key: "winloseAmount",
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
        }
      ],
      reportList: [],
      playerList: []
    };
  },
  computed: {
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
    this.getReportList();
  },
  methods: {
    search() {
      this.getReportList();
    },
    reset() {
      this.plat = "";
      this.defaultTime = getDefaultTime();
      this.reportList = [];
      this.showPlayer=false
      this.playerList=[];
      this.getReportList();
    },
    getReportList() {
      this.spin = true;
      httpRequest("post", "/transferUserStat", {
        startTime: this.changedTime[0],
        endTime: this.changedTime[1],
      })
        .then(res => {
          if (res.code == 0) {
            this.reportList = res.payload;
          }
        })
        .finally(() => {
          this.spin = false;
        });
    },
    getPlayerList(plat) {
      this.spin = true;
      httpRequest("post", "/transferUserStat", {
        startTime: this.changedTime[0],
        endTime: this.changedTime[1],
        handleType: "player"
      })
        .then(res => {
          if (res.code == 0) {
            this.playerList = res.payload;
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
.notransfer {
  min-height: 89vh;
  .search {
    margin-bottom: 10px;
    .label {
      padding-right: 15px;
    }
  }
  .sum {
    line-height: 36px;
  }
}
</style>
