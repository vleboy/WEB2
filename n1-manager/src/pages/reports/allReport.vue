<template>
  <div class="allreport">
    <div class="nowList">
      <div class="top">
        <p class="title">
          当前用户列表
          <RadioGroup v-model="source" type="button" @on-change='changeSource'>
            <Radio label="正式"></Radio>
            <Radio label="测试"></Radio>
            <Radio label="全部"></Radio>
          </RadioGroup>
        </p>
        <div class="right">
          <DatePicker type="datetimerange" :editable='false' v-model="defaultTime" placeholder="选择日期时间范围(默认最近一周)" style="width: 300px" @on-ok="confirm"></DatePicker>
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
      </div>
      <Table :columns="columns1" :data="user" size="small"></Table>
    </div>
    <div class="childList">
      <p class="title">
        直属下级列表
      </p>
      <Table :columns="columns1" :data="child" size="small"></Table>
    </div>
    <div class="childList" v-for="(item,index) in reportChild" :key="index">
      <p class="title">
        ({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 直属下级列表
      </p>
      <Table :columns="columns1" :data="item" size="small"></Table>
    </div>
    <div class="playerList" id="playerList">
      <p class="title">
        <span v-show="showName"> ({{ userName }})</span>所属玩家列表
      </p>
      <Table :columns="columns2" :data="playerList" size="small"></Table>
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
import { thousandFormatter } from "@/config/format";
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
      source: "正式",
      gameType: [
        3,
        30000,
        40000,
        50000,
        1010000,
        10300000,
        1050000,
        1060000,
        1100000,
        1110000,
        1130000
      ],
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth: 60
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
                    let userId = localStorage.loginId;
                    if (params.row.role == "100") {
                      //商户
                      this.userName = params.row.displayName;
                      this.showName = true;
                      let userId = params.row.userId;
                      let level = params.row.level;
                      let oldArr = this.reportChild;
                      let len = oldArr.length;
                      if (len > 0) {
                        while (len--) {
                          if (oldArr[len][0].level >= level + 1) {
                            oldArr.splice(len, 1);
                          }
                        }
                      }
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
                        });
                      let anchor = this.$el.querySelector("#playerList");
                      document.documentElement.scrollTop = anchor.offsetTop;
                    } else if (params.row.role == "10") {
                      //线路商
                      let id = localStorage.loginId;
                      if ((params.row.userId = id)) {
                        this.$store
                          .dispatch("getUserChild", {
                            parent: id,
                            gameType: this.gameType,
                            query: {
                              createdAt: this.changedTime
                            }
                          })
                          .then(res => {
                            this.child = res.payload;
                            this.spinShow = false;
                          });
                      } else {
                        this.playerList = [];
                        this.showName = false;
                        let userId = params.row.userId;
                        let level = params.row.level;
                        if (level == 1) {
                          this.reportChild = [];
                        }
                        let oldArr = this.reportChild;
                        let len = oldArr.length;
                        if (len > 0) {
                          while (len--) {
                            if (oldArr[len][0].level > level + 1) {
                              oldArr.splice(len, 1);
                            }
                          }
                        }
                        let showList = await this.getNextLevel(
                          this.reportChild,
                          userId
                        );
                        showList = _.filter(showList, function(o) {
                          return o.length;
                        });
                        this.reportChild = showList;
                      }
                    }
                  }
                }
              },
              params.row.uname
            );
          }
        },
        {
          title: "交易次数",
          key: "betCount"
        },
        {
          title: "总游戏输赢金额",
          key: "winloseAmount",
          render: (h, params) => {
            let color = params.row.winloseAmount < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(params.row.winloseAmount)
            );
          }
        },
        {
          title: "总游戏交公司",
          key: "submitAmount",
          render: (h, params) => {
            return h("span", thousandFormatter(params.row.submitAmount));
          }
        },
        {
          title: "NA游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["3", "30000", "40000", "50000"].includes(key)) {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "NA游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["3", "30000", "40000", "50000"].includes(key)) {
                count += obj[key].submitAmount;
              }
            }
            return h("span", thousandFormatter(count.toFixed(2)));
          }
        },
        {
          title: "TTG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1010000") {
                count = obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "TTG游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1010000") {
                count = obj[key].submitAmount;
              }
            }
            return h("span", thousandFormatter(count.toFixed(2)));
          }
        },
        {
          title: "SA游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["1060000", "1110000"].includes(key)) {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "SA游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["1060000", "1110000"].includes(key)) {
                count += obj[key].submitAmount;
              }
            }
            return h("span", thousandFormatter(count.toFixed(2)));
          }
        },
        {
          title: "MG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "10300000") {
                count = obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "MG游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "10300000") {
                count = obj[key].submitAmount;
              }
            }
            return h("span", thousandFormatter(count.toFixed(2)));
          }
        },
        {
          title: "AG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1050000") {
                count = obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "AG游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1050000") {
                count = obj[key].submitAmount;
              }
            }
            return h("span", thousandFormatter(count.toFixed(2)));
          }
        },
        {
          title: "RTG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
             let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1140000") {
                count = obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "RTG游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1140000") {
                count = obj[key].submitAmount;
              }
            }
            return h("span", thousandFormatter(count.toFixed(2)));
          }
        },
        {
          title: "YSB游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1130000") {
                count = obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "YSB游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1130000") {
                count = obj[key].submitAmount;
              }
            }
            return h("span", thousandFormatter(count.toFixed(2)));
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
          key: "winloseAmount",
          render: (h, params) => {
            let color = params.row.winloseAmount < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(params.row.winloseAmount)
            );
          }
        },
        {
          title: "NA游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["3", "30000", "40000", "50000"].includes(key)) {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "TTG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["1010000"].includes(key)) {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "SA游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["1060000", "1110000"].includes(key)) {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "MG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["10300000"].includes(key)) {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "AG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["1050000"].includes(key)) {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
       {
          title: "RTG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key == "1140000") {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        },
        {
          title: "YSB游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (["1130000"].includes(key)) {
                count += obj[key].winloseAmount;
              }
            }
            let color = count < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              thousandFormatter(count.toFixed(2))
            );
          }
        }
      ]
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
    },
    isTest() {
      let source = this.source;
      if (source == "正式") {
        return 0;
      } else if (source == "测试") {
        return 1;
      } else {
        return 2;
      }
    }
  },
  methods: {
    confirm() {
      this.reportChild = [];
      this.init();
    },
    reset() {
      this.defaultTime = getDefaultTime();
      this.reportChild = [];
      this.init();
    },
    search() {
      this.reportChild = [];
      this.init();
    },
    changeSource() {
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
      let params1 = {
        userId: userId,
        isTest: this.isTest,
        gameType: this.gameType,
        query: {
          createdAt: this.changedTime
        }
      };
      let params2 = {
        parent: userId,
        isTest: this.isTest,
        gameType: this.gameType,
        query: {
          createdAt: this.changedTime
        }
      };
      if (this.isTest == 2) {
        delete params1.isTest;
        delete params2.isTest;
      }
      let req1 = this.$store.dispatch("getUserList", params1);
      let req2 = this.$store.dispatch("getUserChild", params2);
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
.allreport {
  min-height: 87vh;
  width: 150%;
  .title {
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem;
    font-weight: 600;
    display: inline-block;
  }
  .top {
    .right {
      display: inline-block;
      padding-left: 20px;
    }
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
}
</style>
