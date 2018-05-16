<template>
  <div class="line">
    <div class="search">
      <Row class="row">
        <Col span="2" offset="4">线路商前缀</Col>
        <Col span="4">
        <Input v-model="suffix" placeholder="请输入"></Input>
        </Col>
        <Col span="2">线路商昵称</Col>
        <Col span="4">
        <Input v-model="displayName" placeholder="请输入"></Input>
        </Col>
        <Col span="5">
        <div class="btns">
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
        </Col>
      </Row>
    </div>
    <div class="option">
      <p class="count">共搜索到{{ total }}条数据</p>
      <p class="create">
        <Button type="primary" @click="createLine">创建线路商</Button>
      </p>
    </div>
    <div class="table">
      <Table :columns="columns1" :data="showData" size="small" no-data-text="暂无数据"></Table>
      <!-- <Page :total="total" class="page" show-elevator :page-size='50' show-total @on-change="changepage"></Page> -->
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
        <p v-else>【线路商】{{uname}}</p>
        </Col>
      </Row>
      <Row v-if="plus" class-name='modalrow'>
        <Col span="4">增加账户</Col>
        <Col span="16">
        <p>【线路商】{{uname}}</p>
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
import dayjs from "dayjs"
import { userChangeStatus } from "../service/index"
export default {
  data() {
    return {
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
      dayjs: dayjs,
      displayName: "",
      suffix: "", //前缀
      disabled: true, //加点禁用
      tooltip: "起始账户余额为", //tooltip content
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "线路商前缀",
          key: "suffix"
        },
        {
          title: "线路商昵称",
          key: "displayName"
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
                        this.toRole = "10";
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
          title: "线路商游戏",
          key: "",
          render: (h, params) => {
            let column = [
              {
                title: "线路商游戏",
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
              if (result != "NULL!") {
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
            if (params.row.status == 1) {
              text = "停用";
              status = 0;
            } else {
              text = "启用";
              status = 1;
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
                    color: "#1d90e6"
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
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#1d90e6"
                  },
                  on: {
                    click: () => {
                      userChangeStatus({
                        role: "10",
                        status,
                        userId: params.row.userId
                      }).then(res => {
                        if (res.code == 0) {
                          this.$Message.success("修改成功");
                          this.$store.dispatch("getManagerList", {
                            query: { },
                            sortkey: "createdAt",
                            sort: "desc"
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
      ]
    };
  },
  methods: {
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
        .dispatch("transferBill", {
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
    changeOption(id) {
      this.disabled = false;
      if (id != "") {
        this.$store.dispatch("otherBill", id);
      }
    },
    focus() {
      this.tooltip = "起始账户余额为" + this.$store.state.merchants.bill;
    },
    createLine() {
      this.$router.push({ name: "addLineMerchant" });
    },
    reset() {
      this.suffix = "";
      this.displayName = "";
    },
    search() {
      let query = {
        suffix: this.suffix,
        displayName: this.displayName
      };
      if (!query.suffix) {
        delete query.suffix;
      }
      if (!query.displayName) {
        delete query.displayName;
      }
      this.$store.dispatch("getManagerList", {
        query,
        sortkey: "createdAt",
        sort: "desc"
      });
    }
  },
  computed: {
    showData() {
      return this.$store.state.merchants.managerList;
    },
    total() {
      return this.showData.length;
    },
    spinShow() {
      return this.$store.state.merchants.spinShow;
    }
  },
  created() {
    this.$store.dispatch("getManagerList", {
      query: {
        // suffix: "a",
        // displayName: "a"
      },
      sortkey: "createdAt",
      sort: "desc"
    });
  }
};
</script>
<style lang="less" scoped>
.line {
  min-height: 89vh;
  .row {
    line-height: 32px;
    text-align: center;
    padding: 15px 10px;
  }
  .search {
    // background-color: #f2f2f2;
    height: 63px;
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
