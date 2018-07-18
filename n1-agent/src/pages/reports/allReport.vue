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
        <Button type="ghost" @click="exportdata('table_0')">导出数据</Button>
        </p>
        <div class="right">
          <DatePicker type="datetimerange" :editable='false' v-model="defaultTime" placeholder="选择日期时间范围(默认最近一周)" style="width: 300px" @on-ok="confirm"></DatePicker>
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
      </div>
      <Table :columns="columns1" :data="user" size="small" ref='table_0'></Table>
    </div>
    <div class="childList">
      <p class="title">
        直属下级列表
        <Button type="ghost" @click="exportdata('table_1')">导出数据</Button>
      </p>
      <Table :columns="columns1" :data="child" size="small" ref='table_1'></Table>
    </div>
    <div class="childList" v-for="(item,index) in reportChild" :key="index">
      <p class="title">
        ({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 直属下级列表
        <Button type="ghost" @click="exportdata(index)">导出数据</Button>

      </p>
      <Table :columns="columns1" :data="item" size="small" :ref="'table'+index"></Table>
    </div>
    <div class="playerList" id="playerList">
      <p class="title">
        <span v-show="showName"> ({{ userName }})</span>所属玩家列表
        <Button type="ghost" @click="exportdata('table_2')">导出数据</Button>
      </p>
      <Table :columns="columns2" :data="playerList" size="small" ref='table_2'></Table>
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
        3, //NA棋牌
        30000,
        40000,
        50000,
        1010000,
        10300000,
        1050000,
        1060000,
        1140000,
        1110000,
        1130000,
        1150000
      ],
      // option: {
      //   disabledDate(date) {
      //     return date && date.valueOf() > Date.now() - 180000;
      //   }
      // },
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth:60
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
                    let userId = localStorage.getItem("userId");
                    this.spinShow = true;
                    this.reportChild = [];
                    //代理
                    if (params.row.userId == userId) {
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
                      const anchor = this.$el.querySelector("#playerList");
                      document.documentElement.scrollTop = anchor.offsetTop;
                    }
                  }
                  // console.log(params.row);
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
            let color = "";
            if (params.row.level == 0) {
              color = count < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(count.toFixed(2))
              );
            } else {
              color = params.row.winloseAmount < 0 ? "#f30" : "#0c0";
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
          }
        },
        {
          title: "总游戏交公司",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
              if (params.row.submitAmount) {
                return h("span", thousandFormatter(params.row.submitAmount.toFixed(2)));
              } else {
                return h("span", "0.00");
              }
            }
          }
        },
        {
          title: "总游戏洗码量",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
               let arr = this.child;
            let count = 0;
            for (let item of arr) {
              count += item.mixAmount;
            }
              return h("span",  thousandFormatter(count) );
            } else {
              return h("span", thousandFormatter(params.row.mixAmount));
            }
          }
        },
        {
          title: "NA游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let allCount = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (["3", "30000", "40000", "50000"].includes(key)) {
                  allCount += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            let color = "";
            if (params.row.level == 0) {
              color = allCount < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
               thousandFormatter(allCount.toFixed(2))
              );
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (["3", "30000", "40000", "50000"].includes(key)) {
                  count += obj[key].winloseAmount;
                }
              }
              color = count < 0 ? "#f30" : "#0c0";
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
        },
        {
          title: "NA游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (["3", "30000", "40000", "50000"].includes(key)) {
                  count += obj[key].submitAmount;
                }
              }
              return h("span", thousandFormatter(count.toFixed(2)));
            }
          }
        },
        {
          title: "NA游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              let arr = this.child;
              let allCount = 0;
              for (let item of arr) {
                for (let key in item.gameTypeMap) {
                  if (["3", "30000", "40000", "50000"].includes(key)) {
                    allCount += item.gameTypeMap[key].mixAmount;
                  }
                }
              }
              return h("span", thousandFormatter(allCount));
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (["3", "30000", "40000", "50000"].includes(key)) {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "TTG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let allCount = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (["1010000"].includes(key)) {
                  allCount += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            let color = "";
            if (params.row.level == 0) {
              color = allCount < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(allCount.toFixed(2))
              );
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1010000") {
                  count = obj[key].winloseAmount;
                }
              }
              color = count < 0 ? "#f30" : "#0c0";
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
        },
        {
          title: "TTG游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1010000") {
                  count = obj[key].submitAmount;
                }
              }
              return h("span", thousandFormatter(count.toFixed(2)));
            }
          }
        },
        {
          title: "TTG游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              let arr = this.child;
              let allCount = 0;
              for (let item of arr) {
                for (let key in item.gameTypeMap) {
                  if (key=='1010000') {
                    allCount += item.gameTypeMap[key].mixAmount;
                  }
                }
              }
              return h("span", thousandFormatter(allCount));
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1010000") {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "SA游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let allCount = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (["1060000", "1110000"].includes(key)) {
                  allCount += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            let color = "";
            if (params.row.level == 0) {
              color = allCount < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(allCount.toFixed(2))
              );
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (["1060000", "1110000"].includes(key)) {
                  count += obj[key].winloseAmount;
                }
              }
              color = count < 0 ? "#f30" : "#0c0";
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
        },
        {
          title: "SA游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (["1060000", "1110000"].includes(key)) {
                  count += obj[key].submitAmount;
                }
              }
              return h("span", thousandFormatter(count.toFixed(2)));
            }
          }
        },
        {
          title: "SA游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              let arr = this.child;
              let allCount = 0;
              for (let item of arr) {
                for (let key in item.gameTypeMap) {
                  if (["1060000", "1110000"].includes(key)) {
                    allCount += item.gameTypeMap[key].mixAmount;
                  }
                }
              }
              return h("span", thousandFormatter(allCount));
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (["1060000", "1110000"].includes(key)) {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "MG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let allCount = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (["10300000"].includes(key)) {
                  allCount += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            let color = "";
            if (params.row.level == 0) {
              color = allCount < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(allCount.toFixed(2))
              );
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "10300000") {
                  count = obj[key].winloseAmount;
                }
              }
              color = count < 0 ? "#f30" : "#0c0";
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
        },
        {
          title: "MG游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "10300000") {
                  count = obj[key].submitAmount;
                }
              }
              return h("span", thousandFormatter(count.toFixed(2)));
            }
          }
        },
        {
          title: "MG游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              let arr = this.child;
              let allCount = 0;
              for (let item of arr) {
                for (let key in item.gameTypeMap) {
                  if (key == "10300000") {
                    allCount += item.gameTypeMap[key].mixAmount;
                  }
                }
              }
              return h("span", thousandFormatter(allCount));
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "10300000") {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "AG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let allCount = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (["1050000"].includes(key)) {
                  allCount += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            let color = "";
            if (params.row.level == 0) {
              color = allCount < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(allCount.toFixed(2))
              );
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1050000") {
                  count = obj[key].winloseAmount;
                }
              }
              color = count < 0 ? "#f30" : "#0c0";
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
        },
        {
          title: "AG游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1050000") {
                  count = obj[key].submitAmount;
                }
              }
              return h("span", thousandFormatter(count.toFixed(2)));
            }
          }
        },
        {
          title: "AG游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              let arr = this.child;
              let allCount = 0;
              for (let item of arr) {
                for (let key in item.gameTypeMap) {
                  if (key == "1050000") {
                    allCount += item.gameTypeMap[key].mixAmount;
                  }
                }
              }
              return h("span", thousandFormatter(allCount));
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1050000") {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "RTG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let allCount = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (key=='1140000') {
                  allCount += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            let color = "";
            if (params.row.level == 0) {
              color = allCount < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(allCount)
              );
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1140000") {
                  count = obj[key].winloseAmount;
                }
              }
              color = count < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(count)
              );
            }
          }
        },
        {
          title: "RTG游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1140000") {
                  count = obj[key].submitAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "RTG游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              let arr = this.child;
              let allCount = 0;
              for (let item of arr) {
                for (let key in item.gameTypeMap) {
                  if (key == "1140000") {
                    allCount += item.gameTypeMap[key].mixAmount;
                  }
                }
              }
              return h("span", thousandFormatter(allCount));
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1140000") {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "DT游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let allCount = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (key=='1150000') {
                  allCount += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            let color = "";
            if (params.row.level == 0) {
              color = allCount < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(allCount)
              );
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1150000") {
                  count = obj[key].winloseAmount;
                }
              }
              color = count < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(count)
              );
            }
          }
        },
        {
          title: "DT游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1150000") {
                  count = obj[key].submitAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "DT游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              let arr = this.child;
              let allCount = 0;
              for (let item of arr) {
                for (let key in item.gameTypeMap) {
                  if (key == "1150000") {
                    allCount += item.gameTypeMap[key].mixAmount;
                  }
                }
              }
              return h("span", thousandFormatter(allCount));
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1150000") {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
        {
          title: "YSB游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let arr = this.child;
            let allCount = 0;
            for (let item of arr) {
              for (let key in item.gameTypeMap) {
                if (["1130000"].includes(key)) {
                  allCount += item.gameTypeMap[key].winloseAmount;
                }
              }
            }
            let color = "";
            if (params.row.level == 0) {
              color = allCount < 0 ? "#f30" : "#0c0";
              return h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                thousandFormatter(allCount.toFixed(2))
              );
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1130000") {
                  count = obj[key].winloseAmount;
                }
              }
              color = count < 0 ? "#f30" : "#0c0";
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
        },
        {
          title: "YSB游戏(商家交公司)",
          key: "submitAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              return h("span", "0.00");
            } else {
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
        },
        {
          title: "YSB游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
            if (params.row.level == 0) {
              let arr = this.child;
              let allCount = 0;
              for (let item of arr) {
                for (let key in item.gameTypeMap) {
                  if (key == "1130000") {
                    allCount += item.gameTypeMap[key].mixAmount;
                  }
                }
              }
              return h("span", thousandFormatter(allCount));
            } else {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key == "1130000") {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
          }
        },
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
          title: "总游戏洗码量",
          key: "mixAmount",
          render: (h, params) => {
            return h( "span", thousandFormatter(params.row.mixAmount) );
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
          title: "NA游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (["3", "30000", "40000", "50000"].includes(key)) {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
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
          title: "TTG游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key=='1010000') {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
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
          title: "SA游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (["1060000", "1110000"].includes(key)) {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
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
          title: "MG游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key=='10300000') {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
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
          title: "AG游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key=='1050000') {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
        },
         {
          title: "RTG游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key=='1140000') {
                count += obj[key].winloseAmount;
              }
            }
            let color=count<0?'#f30':'#0c0';
            return h("span",{
              style:{
                color:color
              }
            }, thousandFormatter(count));
          }
        },
         {
          title: "RTG游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key=='1140000') {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
        },
        {
          title: "DT游戏(输赢金额)",
          key: "winloseAmount",
          render: (h, params) => {
            let obj = params.row.gameTypeMap;
            let count = 0;
            for (let key in obj) {
              if (key=='1150000') {
                count += obj[key].winloseAmount;
              }
            }
            let color=count<0?'#f30':'#0c0';
            return h("span",{
              style:{
                color:color
              }
            }, thousandFormatter(count));
          }
        },
         {
          title: "DT游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key=='1150000') {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
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
        },
        {
          title: "YSB游戏(洗码量)",
          key: "mixAmount",
          render: (h, params) => {
              let obj = params.row.gameTypeMap;
              let count = 0;
              for (let key in obj) {
                if (key=='1130000') {
                  count += obj[key].mixAmount;
                }
              }
              return h("span", thousandFormatter(count));
            }
        },
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
      this.init();
    },
    changeSource() {
      this.init();
      this.reportChild=[]
      this.playerList=[]
      this.showName=false
    },
     exportdata(table) {
      if(table=='table_0'){
        this.$refs.table_0.exportCsv({filename:'current'});
      }else if(table=='table_1'){
        this.$refs.table_1.exportCsv({filename:'next'});
      }else if(table=='table_2'){
        this.$refs.table_2.exportCsv({filename:'player'});
      }else{
        let ref='table'+table;
        this.$refs[ref][0].exportCsv({filename:ref})
      }
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
    //获取下级
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
    //初始化
    async init() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let userId = userInfo.userId;
      let level = userInfo.level;
      let parent = "";
      if (level == 0) {
        parent = "01";
      } else {
        parent = userId;
      }
      let params1 = {};
      let params2 = {
        parent: parent,
        isTest: this.isTest,
        gameType: this.gameType,
        query: {
          createdAt: this.changedTime
        }
      };
      if (level == 0) {
        params1 = { userId: userId, isTest: this.isTest };
      } else {
        params1 = {
          userId: userId,
          isTest: this.isTest,
          gameType: this.gameType,
          query: {
            createdAt: this.changedTime
          }
        };
      }
       if (this.isTest == 2) {
        delete params1.isTest;
        delete params2.isTest;
      }
      let req1 = this.$store.dispatch("getUserList", params1);
      let req2 = this.$store.dispatch("getUserChild", params2);
      this.spinShow = true;
      let [acct, perms] = await this.axios.all([req1, req2]);
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
        });
      this.user = [];
      if (acct && acct.code == 0) {
        this.user.push(acct.payload);
      }
      if (perms && perms.code == 0) {
        this.child = perms.payload;
      }
      this.spinShow = false;
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
  min-height: 88vh;
  width: 210%;
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
