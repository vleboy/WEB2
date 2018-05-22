<template>
  <div class="agetlist">
    <div class="nowList">
      <p class="title">
        当前代理
      </p>
      <Table :columns="columns1" :data="userInfo" size="small"></Table>
    </div>
    <div class="childList">
      <div class="top">
        <span class="title left">
          下级代理列表
        </span>
        <div class="search">
          <Input v-model="search1" placeholder="请输入搜索内容" style="width: 150px"></Input>
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
      </div>
      <div class="table">
        <Table :columns="columns1" :data="agentList" size="small"></Table>
      </div>
    </div>
    <div class="childList" v-for="(item,index) in agentChild" :key="index">
      <p class="title">
        ({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 下级代理列表
      </p>
      <Table :columns="columns1" :data="item" size="small"></Table>
    </div>
    <div class="playerList" id="playerList">
      <div class="top">
        <span class="title left">
          所属玩家列表
        </span>
        <div class="search">
          <Input v-model="search2" placeholder="请输入搜索内容" style="width: 150px"></Input>
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
      </div>
      <div class="table">
        <Table :columns="columns2" :data="playerList" size="small"></Table>
      </div>
    </div>
    <Spin size="large" fix v-if="$store.state.report.loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <Modal v-model="modal" @on-ok="ok" id="plusModal" @on-cancel='cancel'>
      <h2 v-if='plus'>加点操作</h2>
      <h2 v-else>减点操作</h2>
      <Form :label-width="100">
        <FormItem label="存入点数">
          <Input type="text" v-model="point" placeholder="请输入点数" style="width: 280px">
          </Input>
        </FormItem>
        <FormItem label="起始账户">
          {{parentDisplayName}}
        </FormItem>
        <FormItem label="备注">
          <Input v-model="remark" type="textarea" :rows="4" placeholder="注明备注,如没有可不填" style="width: 280px"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import dayjs from "dayjs";
import _ from "lodash";
import { userChangeStatus } from "@/service/index";
export default {
  data() {
    return {
      plus: null,
      modal: false,
      point: "",
      remark: "",
      search1: "",
      search2: "",
      parentDisplayName: "",
      dayjs: dayjs,
      playerPoint: false,
      agentChild: [],
      currentLevel: null,
      fromUserId: "", //modal data
      toRole: "",
      toUser: "",
      columns1: [
        {
          title: "管理员账号",
          key: "username",
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("span", params.row.username);
            } else {
              return h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    color: "#20a0ff"
                  },
                  on: {
                    click: async () => {
                      this.$store.commit("changePlayer", {
                        params: []
                      });
                      let userId = params.row.userId;
                      this.$store.commit("changeRowId", { params: userId });
                      let level = params.row.level;
                      this.currentLevel = level + 1;
                      let showList = await this.getNextAgent(
                        this.agentChild,
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
                      this.agentChild = showList;
                      this.$store.dispatch("getAgentPlayer", {
                        fromUserId: userId
                      });
                    }
                  }
                },
                params.row.username
              );
            }
          }
        },
        {
          title: "代理昵称",
          key: "displayName"
        },
        {
          title: "上级代理",
          key: "parentDisplayName",
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("span", "");
            } else {
              return h("span", params.row.parentDisplayName);
            }
          }
        },
        {
          title: "代理游戏",
          key: "",
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("span", "");
            } else {
              let column = [
                {
                  title: "代理游戏",
                  key: "name"
                },
                {
                  title: "洗码比",
                  key: "mix"
                }
              ];
              let data = [];
              let gameList = params.row.gameList;
              let len = gameList.length;
              for (let item of gameList) {
                let obj = {};
                obj.mix = item.mix + "%";
                obj.name = item.name;
                data.push(obj);
              }
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover"
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        color: "#20a0ff"
                      }
                    },
                    len + "款游戏"
                  ),
                  h("Table", {
                    props: {
                      columns: column,
                      data: data,
                      border: true,
                      size: "small",
                      width: 250
                    },
                    slot: "content"
                  })
                ]
              );
            }
          }
        },
        {
          title: "代理成数",
          key: "rate",
          render: (h, params) => {
            return h("span", params.row.rate + "%");
          }
        },
        {
          title: "剩余点数",
          key: "balance",
          render: (h, params) => {
            if (params.row.parent == "00") {
            } else {
              return h("div", [
                h("p", params.row.balance),
                h("p", [
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          this.modal = true;
                          this.plus = true;
                          this.parentDisplayName =
                            "【" +
                            params.row.parentDisplayName +
                            "】" +
                            params.row.parentName;
                          if (params.row.parent == "01") {
                            this.fromUserId = JSON.parse(
                              localStorage.getItem("userInfo")
                            ).userId;
                          } else {
                            this.fromUserId = params.row.parent;
                          }
                          this.toRole = params.row.role;
                          this.toUser = params.row.username;
                        }
                      }
                    },
                    "加点"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer",
                        paddingLeft: "10px"
                      },
                      on: {
                        click: () => {
                          this.modal = true;
                          this.plus = false;
                          this.parentDisplayName =
                            "【" +
                            params.row.parentDisplayName +
                            "】" +
                            params.row.parentName;
                          this.fromUserId = params.row.userId;
                          this.toRole = params.row.parentRole;
                          this.toUser = params.row.parentName;
                        }
                      }
                    },
                    "减点"
                  )
                ])
              ]);
            }
          }
        },
        {
          title: "创建时间",
          key: "createdAt",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("span", "");
            } else {
              if (params.row.status == 1) {
                return h(
                  "Tag",
                  {
                    props: {
                      color: "green"
                    }
                  },
                  "正常"
                );
              } else {
                return h(
                  "Tag",
                  {
                    props: {
                      color: "red"
                    }
                  },
                  "锁定"
                );
              }
            }
          }
        },
        {
          title: "备注",
          key: "remark",
          render: (h, params) => {
            let remark = params.row.remark;
            let result = Object.prototype.toString.call(remark);
            if (result.includes("String")) {
              if (remark != "NULL!") {
                return h(
                  "Tooltip",
                  {
                    props: {
                      content: remark
                    }
                  },
                  [
                    h("Icon", {
                      props: {
                        type: "search",
                        color: "#20a0ff"
                      }
                    })
                  ]
                );
              } else {
                return h("span", "");
              }
            } else {
              return h("span", "");
            }
          }
        },
        {
          title: "操作",
          key: "",
          minWidth: 240,
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("div", [
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
                        console.log(1);
                      }
                    }
                  },
                  "创建代理"
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "#20a0ff",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        console.log(1);
                      }
                    }
                  },
                  "创建玩家"
                )
              ]);
            } else {
              let color = "";
              let text = "";
              let status = null;
              if (params.row.status == 1) {
                text = "锁定";
                color = "#f30";
                status = 0;
                return h("div", [
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
                          console.log(1);
                        }
                      }
                    },
                    "查看"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        color: color,
                        cursor: "pointer",
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.$Modal.confirm({
                            title: "提示!",
                            content: `<p>是否${text}该代理</p>`,
                            onOk: () => {
                              userChangeStatus({
                                role: "1000",
                                status,
                                userId: params.row.userId
                              }).then(res => {
                                if (res.code == 0) {
                                  this.$Message.success(`${text}成功`);
                                  this.init();
                                }
                              });
                            }
                          });
                        }
                      }
                    },
                    text
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
                          console.log(1);
                        }
                      }
                    },
                    "创建代理"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          console.log(1);
                        }
                      }
                    },
                    "创建玩家"
                  )
                ]);
              } else {
                text = "解锁";
                color = "#19be6b";
                status = 1;
                return h("div", [
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
                          console.log(1);
                        }
                      }
                    },
                    "查看"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        color: color,
                        cursor: "pointer",
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.$Modal.confirm({
                            title: "提示!",
                            content: `<p>是否${text}该代理</p>`,
                            onOk: () => {
                              userChangeStatus({
                                role: "1000",
                                status,
                                userId: params.row.userId
                              }).then(res => {
                                if (res.code == 0) {
                                  this.$Message.success(`${text}成功`);
                                  this.init();
                                }
                              });
                            }
                          });
                        }
                      }
                    },
                    text
                  )
                ]);
              }
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
          title: "点数",
          key: "balance",
          render: (h, params) => {
            return h("div", [
              h("p", params.row.balance),
              h("p", [
                h(
                  "span",
                  {
                    style: {
                      color: "#20a0ff",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.modal = true;
                        this.playerPoint = true;
                        this.plus = true;
                        this.parentDisplayName =
                          "【代理】" + params.row.parentName;
                        this.fromUserId = params.row.parent;
                        this.toUser = params.row.userName;
                      }
                    }
                  },
                  "加点"
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "#20a0ff",
                      cursor: "pointer",
                      paddingLeft: "10px"
                    },
                    on: {
                      click: () => {
                        this.modal = true;
                        this.playerPoint = true;
                        this.plus = false;
                        this.parentDisplayName =
                          "【代理】" + params.row.parentName;
                        this.fromUserId = params.row.parent;
                        this.toUser = params.row.userName;
                      }
                    }
                  },
                  "减点"
                )
              ])
            ]);
          }
        },
        {
          title: "直属代理",
          key: "parentName"
        },
        {
          title: "最后登录时间",
          key: "updateAt",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.updateAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "状态",
          key: "state",
          render: (h, params) => {
            if (params.row.state == 1) {
              return h("span", "正常");
            } else {
              return h("span", "冻结");
            }
          }
        },
        {
          title: "操作",
          key: ""
        }
      ]
    };
  },
  methods: {
    search() {
      console.log(2);
    },
    reset() {
      console.log(1);
    },
    ok() {
      if (this.playerPoint == false) {
        this.$store
          .dispatch("transferBill", {
            amount: this.point,
            fromUserId: this.fromUserId,
            toRole: this.toRole,
            toUser: this.toUser,
            remark: this.remark
          })
          .then(() => {
            this.point = "";
            this.remark = "";
          });
      } else {
        if (this.plus == true) {
          this.$store
            .dispatch("playAddBill", {
              amount: this.point,
              fromUserId: this.fromUserId,
              remark: this.remark,
              toUser: this.toUser
            })
            .then(() => {
              this.point = "";
              this.remark = "";
              this.playerPoint = false;
            });
        } else {
          this.$store.dispatch("playReduceBill", {
            amount: this.point,
            fromUserId: this.fromUserId,
            remark: this.remark,
            toUser: this.toUser
          });
          this.point = "";
          this.remark = "";
          this.playerPoint = false;
        }
      }
    },
    cancel() {
      this.point = "";
      this.remark = "";
      this.playerPoint = false;
    },
    async getNextAgent(showList, userId) {
      let level = this.currentLevel;
      return new Promise((resolve, reject) => {
        this.$store.commit("agentLoading", { params: true });
        this.$store
          .dispatch("getAgentNext", {
            parent: userId,
            sort: "desc",
            sortkey: "createdAt",
            query: {}
          })
          .then(res => {
            let len = showList.length;
            if (len > 0) {
              while (len--) {
                if (showList[len][0].level >= level) {
                  showList.splice(len, 1);
                }
                showList.push(res.payload);
              }
            } else {
              showList.push(res.payload);
            }
            showList = _.uniqWith(showList, _.isEqual); //去重
            resolve(showList);
          });
      });
    },
    init() {
      this.$store.commit("agentLoading", { params: true });
      this.$store.dispatch("getAgentList", {
        parent: "01",
        query: {},
        sort: "desc",
        sortkey: "createdAt"
      });
    }
  },
  computed: {
    userInfo() {
      let arr = [];
      arr.push(JSON.parse(localStorage.getItem("userInfo")));
      return arr;
    },
    agentList() {
      return this.$store.state.report.agentList;
    },
    playerList() {
      return this.$store.state.report.playerList;
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.agetlist {
  min-height: 89vh;
  .top {
    clear: both;
    height: 50px;
    .left {
      float: left;
    }
    .search {
      float: right;
      line-height: 40px;
      padding-top: 4px;
    }
  }
  .title {
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem;
    font-weight: 600;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
}
#plusModal {
  h2 {
    margin-bottom: 22px;
  }
}
</style>
