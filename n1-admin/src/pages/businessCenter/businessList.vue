<template>
  <div class="business">
    <div class="search">
      <Row class="row">
        <Col span="2" offset="4">商户标识</Col>
        <Col span="4">
        <Input v-model="sn" placeholder="请输入"></Input>
        </Col>
        <Col span="2">商户线路号</Col>
        <Col span="4">
        <Input v-model="msn" placeholder="请输入"></Input>
        </Col>
        <Col span="5">
        <div class="btns">
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
        </Col>
      </Row>
      <Row class="row">
        <Col span="2" offset="4">商户昵称</Col>
        <Col span="4">
        <Input v-model="displayName" placeholder="请输入"></Input>
        </Col>
      </Row>
    </div>
    <div class="option">
      <p class="count">共搜索到{{ total }}条数据</p>
      <p class="create">
        <Button type="primary" @click="addMerchant">创建商户</Button>
      </p>
    </div>
    <div class="table">
      <Table :columns="columns1" :data="showData" size="small" ></Table>
    </div>
    <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <Modal v-model="modal" @on-ok="ok" id="plusModal" @on-cancel='cancel'>
      <h2 v-if='plus'>加点操作</h2>
      <h2 v-else>减点操作</h2>
      <Row class-name='modalrow'>
        <Col span="4" v-if='plus'>增加点数</Col>
        <Col span="4" v-else>减少点数</Col>
        <Col span="16">
        <Tooltip :content="tooltip" placement="top" :disabled='disabled'>
          <Input v-model="point" placeholder="请输入点数" :disabled='disabled' @on-focus='focus'></Input>
        </Tooltip>
        </Col>
      </Row>
      <Row class-name='modalrow'>
        <Col span="4">起始账户</Col>
        <Col span="16">
        <Select v-model="select" v-if='plus' @on-change='changeOption'>
          <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <p v-else>【商户】{{uname}}</p>
        </Col>
      </Row>
      <Row v-if="plus" class-name='modalrow'>
        <Col span="4">增加账户</Col>
        <Col span="16">
        <p>【商户】{{uname}}</p>
        </Col>
      </Row>
      <Row v-else class-name='modalrow'>
        <Col span="4">转入账户</Col>
        <Col span="16">
        <Select v-model="select" @on-change='changeOption'>
          <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      <Row class-name='textrow'>
        <Col span="4">备注</Col>
        <Col span="16">
        <textarea v-model="note" id="textRow" placeholder="注明备注,如没有可不填" rows="6" autocomplete="off" maxlength="180"></textarea>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { userChangeStatus } from "@/service/index";
export default {
  data() {
    return {
      dayjs: dayjs,
      sn: "", //标识
      msn: "", //线路号
      displayName: "",
      uname: "", //modal增加账户
      point: "", //点数
      note: "", //备注
      options: [], //select
      plus: null, //加点
      modal: false, //加点弹窗
      select: "", //加点select
      fromUserId: "", //id
      toRole: " ",
      toUser: "",
      disabled: true, //加点禁用
      tooltip: "起始账户余额为", //tooltip content
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "商户标识",
          key: "sn"
        },
        {
          title: "商户昵称",
          key: "displayName"
        },
        {
          title: "线路号",
          key: "msn"
        },
        {
          title: "上级线路商",
          key: "parentDisplayName"
        },
        {
          title: "剩余点数",
          key: "",
          render: (h, params) => {
            let admininfo = JSON.parse(localStorage.getItem("userInfo"));
            let admin = admininfo.username.substr(9);
            let adminId = admininfo.userId;
            let userName = admininfo.username;
            return h("div", [
              h("p", params.row.lastBill.lastBalance.toFixed(2)),
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
                        this.plus = true;
                        this.modal = true;
                        this.disabled = true;
                        this.uname = params.row.uname;
                        let option = [
                          {
                            value: adminId,
                            label: "【管理员】" + admin
                          }
                        ];
                        if (params.row.parent != "01") {
                          let another = {
                            value: params.row.parent,
                            label: "【线路商】" + params.row.parentDisplayName
                          };
                          option.push(another);
                        }
                        this.options = option;
                        this.toRole = "100";
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
                        this.plus = false;
                        this.modal = true;
                        this.disabled = true;
                        this.uname = params.row.uname;
                        let option = [
                          {
                            value: adminId,
                            label: "【管理员】" + admin,
                            role: "1",
                            userName: userName
                          }
                        ];
                        if (params.row.parent != "01") {
                          let another = {
                            value: params.row.parent,
                            label: "【线路商】" + params.row.parentDisplayName,
                            role: params.row.role,
                            userName: params.row.parentName
                          };
                          option.push(another);
                        }
                        this.options = option;
                        this.fromUserId = params.row.userId;
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
          title: "商户游戏",
          key: "",
          render: (h, params) => {
            let column = [
              {
                title: "商户游戏",
                key: "name"
              },
              {
                title: "商户占成",
                key: "rate"
              }
            ];
            let data = [];
            let gameList = params.row.gameList;
            let len = gameList.length;
            for (let item of gameList) {
              let obj = {};
              obj.rate = item.rate + "%";
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
        },
        {
          title: "创建时间",
          key: "",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "最后登录时间",
          key: "",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.loginAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "状态",
          key: "",
          render: (h, params) => {
            if (params.row.status == 1) {
              return h(
                "span",
                {
                  style: {
                    color: "#20a0ff"
                  }
                },
                "已启用"
              );
            } else {
              return h(
                "span",
                {
                  style: {
                    color: "#f5141e"
                  }
                },
                "未启用"
              );
            }
          }
        },
        {
          title: "备注",
          key: "remark",
          maxWidth: 80,
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
          render: (h, params) => {
            let text = "";
            let status = null;
            let color='';
            if (params.row.status == 1) {
              text = "停用";
              status = 0;
              color='#f5141e'
            } else {
              text = "启用";
              status = 1;
              color='#20a0ff'
            }
            return h("div", [
              h(
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
                      let userId = params.row.userId;
                      let displayName = params.row.displayName;
                      let username = params.row.username;
                      let parentDisplayName = params.row.parentDisplayName;
                      this.$router.push({
                        name: "merchantDetail",
                        params: {
                          userId,
                          displayName,
                          username,
                          parentDisplayName
                        }
                      });
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: color
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示!",
                        content: `<p>是否${text}商户</p>`,
                        onOk: () => {
                          userChangeStatus({
                            role: "100",
                            status,
                            userId: params.row.userId
                          }).then(res => {
                            if (res.code == 0) {
                              this.$Message.success(`${text}成功`);
                              this.$store.dispatch("getMerchantsList", {
                                query: {},
                                sortkey: "createdAt",
                                sort: "desc"
                              });
                            }
                          });
                        },
                      });
                    }
                  }
                },
                text
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // changepage(index) {
    //   var _start = (index - 1) * 50;
    //   var _end = index * 50;
    //   this.showData = this.waterfall.slice(_start, _end);
    // },
    // handlePage() {
    //   // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
    //   if (this.total < 50) {
    //     this.showData = this.waterfall;
    //   } else {
    //     this.showData = this.waterfall.slice(0, 50);
    //   }
    // },
    addMerchant() {
      this.$router.push({ name: "addMerchant" });
    },
    changeOption(id) {
      this.disabled = false;
      if (id != "") {
        this.$store.dispatch("otherBill", id);
      }
    },
    focus() {
      this.tooltip = "起始账户余额为" + this.$store.state.merchants.bill;
    },
    ok() {
      if (this.plus == true) {
        this.fromUserId = this.select;
      } else {
        let selectId = this.select;
        let option = this.options;
        for (let key in option) {
          if (option[key].value == selectId) {
            this.toRole = option[key].role;
            this.toUser = option[key].userName;
          }
        }
      }
      // console.log(this.toRole, this.select);
      this.$store
        .dispatch("transferBussnessBill", {
          fromUserId: this.fromUserId,
          toRole: this.toRole,
          toUser: this.toUser,
          amount: this.point,
          remark: this.note
        })
        .then(() => {
          this.select = "";
          this.note = "";
          this.point = "";
        });
    },
    cancel() {
      this.select = "";
      this.note = "";
      this.point = "";
    },
    reset() {
      this.sn = "";
      this.displayName = "";
      this.msn = "";
    },
    search() {
      let query = {
        sn: this.sn,
        msn: this.msn,
        displayName: this.displayName
      };
      if (!query.sn) {
        delete query.sn;
      }
      if (!query.displayName) {
        delete query.displayName;
      }
      if (!query.msn) {
        delete query.msn;
      }
      this.$store.dispatch("getMerchantsList", {
        query,
        sortkey: "createdAt",
        sort: "desc"
      });
    }
  },
  computed: {
    showData() {
      return this.$store.state.merchants.merchantsList;
    },
    total() {
      return this.showData.length;
    },
    spinShow() {
      return this.$store.state.merchants.spinShow;
    }
  },
  created() {
    this.$store.dispatch("getMerchantsList", {
      query: {
        // suffix: "a",
        // displayName: "a"
      },
      sortkey: "createdAt",
      sort: "desc"
    });
  },
  watch: {
    $route(to, from) {
      if (from.name == "addMerchant") {
        this.$store.dispatch("getMerchantsList", {
          query: {},
          sortkey: "createdAt",
          sort: "desc"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.business {
  min-height: 89vh;
}
.row {
  line-height: 32px;
  text-align: center;
  padding: 15px 10px;
}
.search {
  // background-color: #f2f2f2;
  height: 126px;
}
.option {
  .count {
    line-height: 28px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .create {
    padding-bottom: 15px;
  }
}
.table {
  .page {
    text-align: right;
  }
}
#textRow {
  display: block;
  resize: vertical;
  padding: 5px 7px;
  line-height: 1.5;
  width: 100%;
  color: #1f2d3d;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
#plusModal {
  h2 {
    margin-bottom: 22px;
  }
}
.modalrow {
  height: 36px;
  line-height: 36px;
  margin-bottom: 22px;
}
.ivu-modal-body {
  padding: 30px 20px;
  font-size: 14px;
}
.ivu-modal-footer {
  text-align: center;
}
</style>
