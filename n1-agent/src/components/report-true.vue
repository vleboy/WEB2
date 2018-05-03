<template>
  <div class="report">
    <div class="nowList">
      <div class="top">
        <p class="title">
          当前用户列表
        </p>
        <div class="right">
          <DatePicker type="datetimerange" :editable='false' :options="option" v-model="defaultTime" placeholder="选择日期时间范围(默认最近一周)" style="width: 300px" @on-change="changeTime" @on-ok="confirm"></DatePicker>
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
      </div>
      <Table :columns="columns1" :data="user" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="childList">
      <p class="title">
        直属下级列表
      </p>
      <Table :columns="columns1" :data="child" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="childList" v-for="(item,index) in reportChild" :key="index">
      <p class="title">
        ({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 直属下级列表
      </p>
      <Table :columns="columns1" :data="item" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="playerList" id="playerList">
      <p class="title">
        <span v-show="showName"> ({{ userName }})</span>所属玩家列表
      </p>
      <Table :columns="columns2" :data="playerList" size="small" no-data-text="暂无数据"></Table>
    </div>
    <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import _ from "lodash";
import { getDefaultTime } from "@/config/getDefaultTime";
export default {
  data() {
    return {
      defaultTime: getDefaultTime(),
      spinShow: false, //加载spin
      showName: false, //上级商家
      userName: "", //上级商家名字
      reportChild: [], //点击渲染的下级
      playerList: [], //玩家列表
      user: [], //当前管理员
      child: [], //管理员下级
      option: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now() - 180000;
        }
      },
      columns1: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "类型",
          key: "role",
          render: (h, params) => {
            return h("span", this.types(params.row.role));
          }
        },
        {
          title: "昵称",
          key: "displayName"
        },
        {
          title: "管理员账号",
          key: "username",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  cursor: "pointer",
                  color: "#20a0ff"
                },
                on: {
                  click: async () => {
                    this.spinShow = true;
                    if (params.row.level == 0) {
                      this.$store
                        .dispatch("getUserChild", {
                          parent: "01",
                          gameType: this.gameType,
                          query: {
                            createdAt: this.changedTime
                          }
                        })
                        .then(res => {
                          // console.log(res);
                          this.child = res.payload;
                          this.spinShow = false;
                        });
                    } else {
                      this.userName = params.row.displayName;
                      this.showName = true;
                      let userId = params.row.userId;
                      let level = params.row.level;
                      let showList = await this.getNextLevel(
                        this.reportChild,
                        userId
                      );
                      showList = _.filter(showList, function(o) {
                        return o.length;
                      });
                      let len = showList.length;
                      if (len > 0) {
                        while (len--) {
                          if (showList[len][0].level > level + 1) {
                            showList.splice(len, 1);
                          }
                        }
                      }
                      this.reportChild = showList;
                      this.$store
                        .dispatch("getPlayerList", {
                          parentId: userId,
                          gameType: this.gameType,
                          query: {
                            createdAt: this.changedTime
                          }
                        })
                        .then(res => {
                          this.playerList = res.payload;
                          this.spinShow = false;
                          // console.log(res);
                        });
                      var anchor = this.$el.querySelector("#playerList");
                      document.documentElement.scrollTop = anchor.offsetTop;
                    }
                    // console.log(params.row);
                  }
                }
              },
              params.row.username
            );
          }
        },
        {
          title: "交易次数",
          key: "betCount",
          render: (h, params) => {
            let arr = this.child;
            let count = 0;
            for (let item of arr) {
              count += item.betCount;
            }
            if (params.row.level == 0) {
              return h("span", count);
            } else {
              return h("span", params.row.betCount);
            }
          }
        },
        {
          title: "投注金额",
          key: "betAmount",
          render: (h, params) => {
            let arr = this.child;
            let count = 0;
            for (let item of arr) {
              count += item.betAmount;
            }
            if (params.row.level == 0) {
              return h("span", count.toFixed(2));
            } else {
              return h("span", params.row.betAmount);
            }
          }
        },
        {
          title: "输赢金额",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let count = 0;
            for (let item of arr) {
              count += item.winloseAmount;
            }
            if (params.row.level == 0) {
              // sessionStorage.setItem("winloseAmount", count.toFixed(2));
              return h("span", count.toFixed(2));
            } else {
              return h("span", params.row.winloseAmount);
            }
          }
        },
        {
          title: "返水比例",
          key: "",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", 0);
            } else {
              let obj = params.row.gameList;
              let mix = 0;
              for (let item of arr) {
                for (let key in item) {
                  if (item.code == this.gameType) {
                    mix = parseFloat(item.mix);
                  }
                }
              }
              return h("span", mix.toFixed(2) + "%");
            }
          }
        },
        {
          title: "洗码量",
          key: "",
          render: (h, params) => {
            let arr = this.child;
            let mixAmount = 0;
            for (let item of arr) {
              mixAmount += item.mixAmount;
            }
            if (params.row.level == 0) {
              return h("span", mixAmount.toFixed(2));
            } else {
              return h("span", params.row.mixAmount.toFixed(2));
            }
          }
        },
        {
          title: "佣金",
          key: "",
          render: (h, params) => {
            let arr = this.child;
            let boundsSum = 0;
            for (let item of arr) {
              boundsSum += item.boundsSum;
            }
            if (params.row.level == 0) {
              return h("span", boundsSum.toFixed(2));
            } else {
              return h("span", params.row.boundsSum.toFixed(2));
            }
          }
        },
        {
          title: "代理总金额",
          key: "",
          render: (h, params) => {
            let arr = this.child;
            let totalSum = 0;
            for (let item of arr) {
              totalSum += item.totalSum;
            }
            if (params.row.level == 0) {
              return h("span", totalSum.toFixed(2));
            } else {
              return h("span", params.row.totalSum.toFixed(2));
            }
          }
        },
        {
          title: "代理占成",
          key: "",
          render: (h, params) => {
            let rate = params.row.rate + "%";
            return h("span", rate);
          }
        },
        {
          title: "代理交公司",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", 0);
            } else {
              return h("span", params.row.submitAmount);
            }
          }
        },
        {
          title: "获利比例",
          key: "rate",
          render: (h, params) => {
            if (params.row.level == 0) {
              let totalSum = 0;
              let betAmount = 0;
              let arr = this.child;
              for (let item of arr) {
                betAmount += item.betAmount;
                totalSum += item.totalSum;
              }
              let result = "";
              if (totalSum != 0) {
                result = (100 * totalSum / betAmount).toFixed(2) + "%";
              } else {
                result = 0;
              }
              return h("span", result);
            } else {
              return h(
                "span",
                (100 * (params.row.totalSum / params.row.betAmount)).toFixed(
                  2
                ) + "%"
              );
            }
          }
        }
      ],
      columns2: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "交易次数",
          key: "betCount"
        },
        {
          title: "投注金额",
          key: "betAmount"
        },
        {
          title: "输赢金额",
          key: "winloseAmount"
        },
        {
          title: "洗码量",
          key: "mixAmount"
        }
      ]
    };
  },
  computed: {
    changedTime() {
      let time = this.defaultTime;
      time = time.map(item => {
        return item.getTime();
      });
      return time;
    }
  },
  methods: {
    changeTime(time) {
      console.log(this.changedTime);
    },
    confirm() {
      this.init();
    },
    reset() {
      this.defaultTime = getDefaultTime();
      this.init();
    },
    search() {
      this.init();
    },
    types(value) {
      switch (value) {
        case "0":
          return "超级管理员";
          break;
        case "1":
          return "管理员";
          break;
        case "10":
          return "线路商";
          break;
        case "100":
          return "商户";
          break;
        case "1000":
          return "代理";
          break;
        case "10000":
          return "玩家";
          break;
      }
    },
    async getNextLevel(showList, userId) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("getUserChild", {
            parent: userId,
            gameType: this.gameType,
            query: {
              createdAt: this.changedTime
            }
          })
          .then(res => {
            showList.push(res.payload);
            showList = _.uniqWith(showList, _.isEqual);
            this.spinShow = false;
            resolve(showList);
          });
      });
    },
    async init() {
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let req1 = this.$store.dispatch("getUserList", { userId: userId });
      let req2 = this.$store.dispatch("getUserChild", {
        parent: "01",
        gameType: this.gameType,
        query: {
          createdAt: this.changedTime
        }
      });
      this.spinShow = true;
      //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
      let [acct, perms] = await this.axios.all([req1, req2]);
      this.spinShow = false;
      this.user = [];
      if (acct && acct.code == 0) {
        this.user.push(acct.payload);
      }
      if (perms && perms.code == 0) {
        this.child = perms.payload;
      }
    }
  },
  created() {
    // console.log(this.defaultTime);
    this.init();
  },
  props: ["gameType"]
};
</script>
<style lang="less" scoped>
.report {
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
</style>
