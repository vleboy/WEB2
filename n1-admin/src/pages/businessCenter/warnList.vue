<template>
    <div class="warn">
        <div class="head">
            <p>
                <span class="title">管理员直管接入商 </span>
                <span class="endtime">统计截止时间:{{countTime}}</span>
            </p>
            <Table :columns="columns" :data="warnList" size="small"></Table>
        </div>
        <Spin size="large" fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
        <Progress :percent="100">
            898
        </Progress>
    </div>
</template>
<script>
import { configOne, queryUserStat } from "@/service/index";
import dayjs from "dayjs";
export default {
  data() {
    return {
      endTime: "",
      dayjs: dayjs,
      columns: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "类型",
          key: "",
          render: (h, params) => {
            return h("span", this.types(params.row.role));
          }
        },
        {
          title: "接入商标识",
          key: "",
          render: (h, params) => {
            if (params.row.role == "10") {
              return h("span", params.row.suffix);
            } else {
              return h("span", params.row.sn);
            }
          }
        },
        {
          title: "接入商昵称",
          key: "displayName",
          render: (h, params) => {
            if (params.row.role == "10") {
              return h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {
                      console.log(1);
                    }
                  }
                },
                params.row.displayName
              );
            } else {
              return h("span", params.row.displayName);
            }
          }
        },
        {
          title: "接入商",
          key: "",
          render: (h, params) => {
            if (params.row.companyList) {
              let companyList = params.row.companyList;
              return h(
                "div",
                companyList.map(item => {
                  return h(
                    "p",
                    {
                      style: {
                        textAlign: "center",
                        margin: "5px 0",
                        backgroundColor: "#e4e8f1",
                        borderRadius: " 4px",
                        width: "80%"
                      }
                    },
                    item.company
                  );
                })
              );
            } else {
              return h("span", "");
            }
          }
        },
        {
          title: "游戏状态",
          key: "",
          render: (h, params) => {
            if (params.row.companyList) {
              let companyList = params.row.companyList;
              return h(
                "div",
                companyList.map(item => {
                  let text = "";
                  let color = "";
                  if (item.status == 1) {
                    text = "正常";
                    color = "#0c0";
                  } else {
                    text = "已停用";
                    color = "#f30";
                  }
                  return h(
                    "p",
                    {
                      style: {
                        textAlign: "center",
                        margin: "5px 0",
                        backgroundColor: "#e4e8f1",
                        borderRadius: " 4px",
                        width: "80%",
                        color: color
                      }
                    },
                    text
                  );
                })
              );
            } else {
              return h("span", "");
            }
          }
        },
        {
          title: "游戏点数消耗分布",
          key: "",
          render: (h, params) => {
            if (params.row.companyList) {
              let companyList = params.row.companyList;
              return h(
                "div",
                companyList.map(item => {
                  let text = item.winloseAmount + "/" + item.topAmount;
                  return h(
                    "div",
                    {
                      style: {
                        margin: "8px 0px",
                        border: "1px solid rgb(0, 0, 0)",
                        borderRadius: "5px",
                        textAlign: "center"
                      }
                    },
                    text
                  );
                })
              );
            } else {
              return h("span", "");
            }
          }
        },
        {
          title: "操作",
          key: "",
          render: (h, params) => {
            if (params.row.companyList) {
              let companyList = params.row.companyList;
              return h(
                "div",
                companyList.map(item => {
                  return h("p", [
                    h(
                      "span",
                      {
                        style: {
                          color: "#20a0ff",
                          cursor: "pointer",
                          marginRight: "10px"
                        },
                        on: {
                          click: () => {
                            console.log(item.userId);
                          }
                        }
                      },
                      "设定点数告警上限"
                    ),
                    h(
                      "span",
                      {
                        style: {
                          color: "#20a0ff",
                          cursor: "pointer",
                          marginRight: "10px"
                        },
                        on: {
                          click: () => {
                            console.log(2);
                          }
                        }
                      },
                      "停用"
                    )
                  ]);
                })
              );
            } else {
              return h("span", "");
            }
          }
        }
      ],
      warnList: []
    };
  },
  computed: {
    countTime() {
      if (this.endTime == 0 || this.endTime == "") {
        return "";
      } else {
        return this.dayjs(this.endTime).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  },
  methods: {
    async init() {
      this.spinShow = true;
      let req1 = configOne({
        code: "roundLast"
      });
      let req2 = queryUserStat({
        parent: "01"
      });
      let [config, userStat] = await this.axios.all([req1, req2]);
      this.spinShow = false;
      if (config && config.code == 0) {
        this.endTime = config.payload.lastAllAmountTime;
      }
      if (userStat && userStat.code == 0) {
        this.warnList = userStat.payload;
      }
    },
    types(value) {
      switch (value) {
        case "10":
          return "线路商";
          break;
        case "100":
          return "商户";
          break;
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.warn {
  min-height: 89vh;
  .head {
    p {
      margin: 15px auto;
      .title {
        font-size: 26px;
        font-weight: bold;
      }
      .endtime {
        font-size: 16px;
      }
    }
  }
}
</style>
