<template>
  <div class="naAll">
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
      gameType: [10000, 30000, 40000, 50000],
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
                    //代理
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
          title: "总游戏输赢金额",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let count = 0;
            for (let item of arr) {
              count += item.winloseAmount;
            }
            if (params.row.level == 0) {
              return h("span", count.toFixed(2));
            } else {
              return h("span", params.row.winloseAmount);
            }
          }
        },
        {
          title: "总游戏交公司",
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
          title: "NA真人游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let count = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (key == "30000") {
                  count += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            if (params.row.level == 0) {
              return h("span", count.toFixed(2));
            } else {
              let winloseAmount = 0;
              if (params.row.gameTypeMap["30000"] !== undefined) {
                winloseAmount = params.row.gameTypeMap[
                  "30000"
                ].winloseAmount.toFixed(2);
              }
              return h("span", winloseAmount);
            }
          }
        },
        {
          title: "NA真人游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", 0);
            } else {
              let submitAmount = 0;
              if (params.row.gameTypeMap["30000"] !== undefined) {
                submitAmount = params.row.gameTypeMap[
                  "30000"
                ].submitAmount.toFixed(2);
              }
              return h("span", submitAmount);
            }
          }
        },
        {
          title: "NA电子游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let count = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (key == "40000") {
                  count += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            if (params.row.level == 0) {
              return h("span", count.toFixed(2));
            } else {
              let winloseAmount = 0;
              if (params.row.gameTypeMap["40000"] !== undefined) {
                winloseAmount = params.row.gameTypeMap[
                  "40000"
                ].winloseAmount.toFixed(2);
              }
              return h("span", winloseAmount);
            }
          }
        },
        {
          title: "NA电子游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", 0);
            } else {
              let submitAmount = 0;
              if (params.row.gameTypeMap["40000"] !== undefined) {
                submitAmount = params.row.gameTypeMap[
                  "40000"
                ].submitAmount.toFixed(2);
              }
              return h("span", submitAmount);
            }
          }
        },
        {
          title: "NA街机游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let count = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (key == "50000") {
                  count += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            if (params.row.level == 0) {
              return h("span", count.toFixed(2));
            } else {
              let winloseAmount = 0;
              if (params.row.gameTypeMap["50000"] !== undefined) {
                winloseAmount = params.row.gameTypeMap[
                  "50000"
                ].winloseAmount.toFixed(2);
              }
              return h("span", winloseAmount);
            }
          }
        },
        {
          title: "NA街机游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", 0);
            } else {
              let submitAmount = 0;
              if (params.row.gameTypeMap["50000"] !== undefined) {
                submitAmount = params.row.gameTypeMap[
                  "50000"
                ].submitAmount.toFixed(2);
              }
              return h("span", submitAmount);
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
          title: "总游戏输赢金额",
          key: "winloseAmount"
        },
        {
          title: "NA真人游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let winloseAmount = 0;
            if (params.row.gameTypeMap["30000"] !== undefined) {
              winloseAmount = params.row.gameTypeMap[
                "30000"
              ].winloseAmount.toFixed(2);
            }
            return h("span", winloseAmount);
          }
        },
        {
          title: "NA电子游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let winloseAmount = 0;
            if (params.row.gameTypeMap["40000"] !== undefined) {
              winloseAmount = params.row.gameTypeMap[
                "40000"
              ].winloseAmount.toFixed(2);
            }
            return h("span", winloseAmount);
          }
        },
        {
          title: "NA街机游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let winloseAmount = 0;
            if (params.row.gameTypeMap["50000"] !== undefined) {
              winloseAmount = params.row.gameTypeMap[
                "50000"
              ].winloseAmount.toFixed(2);
            }
            return h("span", winloseAmount);
          }
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
  }
};
</script>
<style lang="less" scoped>
.naAll {
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
