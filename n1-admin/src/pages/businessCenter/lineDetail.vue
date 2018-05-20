<template>
  <div class="lineDetail">
    <p class="userName">{{$route.query.displayName}} ({{$route.query.username }})</p>
    <Collapse v-model="value">
      <Panel name="1">
        基本信息
        <Button type="primary" class="edit" @click.stop="editBtn" v-if="isedit">编辑</Button>
        <Button type="primary" class="edit" @click.stop="save" v-else>提交修改</Button>
        <div slot="content">
          <Form ref='basicform' :model="basic" label-position="left" :label-width="100">
            <Row>
              <Col span="8">
              <FormItem label="线路商ID">
                {{ lineDetail.displayId}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上级线路商">
                {{lineDetail.parentDisplayName}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="线路商前缀">
                {{lineDetail.suffix}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="创建时间">
                {{dayjs(lineDetail.createdAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="最后登录时间">
                {{dayjs(lineDetail.updatedAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上次登录时间">
                {{dayjs(lineDetail.loginAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="管理员账号" v-if="edit">
                {{ lineDetail.uname}}
              </FormItem>
              <FormItem label="管理员账号" prop="username" v-else>
                <Row>
                  <Col span="10">
                  <Input v-model="basic.username" placeholder="5~16位,只能输入英文及数字"></Input>
                  </Col>
                </Row>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="管理员密码" v-if="edit">
                {{lineDetail.password}}
              </FormItem>
              <FormItem label="管理员密码" prop="password" v-else>
                <Row>
                  <Col span="10">
                  <Input v-model="basic.password" placeholder="6~16位,包含字母、数字及符号中任意三种组合"></Input>
                  </Col>
                  <Col span="4">
                  <span class="create" @click="createPass">生成</span>
                  </Col>
                </Row>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上次登录IP">
                {{lineDetail.lastIP}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="16">
              <FormItem label="备注" v-if="edit">
                {{lineDetail.remark}}
              </FormItem>
              <FormItem label="备注" prop="remark" v-else>
                <Row>
                  <Col span="20">
                  <Input v-model="basic.remark" type="textarea" :maxlength='200' :rows="1" placeholder="请输入备注,最多不超过200个字符"></Input>
                  </Col>
                </Row>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        游戏信息
        <div slot="content">
          <Form ref='gameList' :model="gameForm" :label-width="110" v-if="!edit" :rules="gameValidate">
            <FormItem prop="ownGame">
              <Row>
                <Col span="3">
                <Select v-model="gameForm.gameType" placeholder="请选择" @on-change="selectCompany">
                  <Option v-for="item in gameType" :value="item.company" :key="item.company">{{ item.company }}</Option>
                </Select>
                </Col>
                <Col span="3">
                <Select v-model="gameForm.gamelist" placeholder="请选择" @on-change="selectGame">
                  <Option v-for="item in gameList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem v-if="selected">
              <label slot="label">{{game}}商家占成(%)</label>
              <Row>
                <Col span="4">
                <Input v-model="gameForm.balance" placeholder="请输入0.00~100.00之间的数字"></Input>
                </Col>
                <Col span="2">
                <span class="add" @click="addGame">添加</span>
                </Col>
              </Row>
            </FormItem>
          </Form>
          <Table :columns="columns1" :data="gameDetail" width='500' class="table" size="small"></Table>
        </div>
      </Panel>
      <Panel name="3">
        财务信息
        <div slot="content">
          <Table :columns="columns" :data="waterfall" size="small"></Table>
        </div>
      </Panel>
    </Collapse>
    <div class="next">
      <h2>下级线路商列表</h2>
      <Table :columns="columns2" :data="nextLine" size="small"></Table>
    </div>
    <div class="ownedMerchant">
      <h2>拥有商户列表</h2>
      <Table :columns="columns3" :data="ownedbusiness" size="small"></Table>
    </div>
    <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import {
  getWaterfall,
  oneManagers,
  companySelect,
  childList,
  gameBigType,
  updateManagers,
  userChangeStatus 
} from "@/service/index";
import dayjs from "dayjs";
import _ from "lodash";
export default {
  data() {
    const validateRate = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("占成不能为空"));
      } else {
        let testReg = /^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/;
        if (!testReg.test(value)) {
          callback(new Error("请输入0.00~100.00之间的数字"));
        } else {
          callback();
        }
      }
    };
    return {
      parent: "",
      value: "3",
      dayjs: dayjs,
      edit: true, //可编辑
      game: "",
      isedit: true,
      spinShow: false,
      defaultBrower: false,
      gameDetail: [],
      selected: false,
      gameForm: {
        gameType: "",
        gamelist: "",
        balance: ""
      },
      gameValidate: {
        balance: [
          {
            required: true,
            trigger: "blur",
            validator: validateRate
          }
        ]
      },
      basic: {
        username: "",
        password: "",
        remark: ""
      },
      gameType: [],
      gameList: [], //select
      lineDetail: {},
      nextLine: [], //下级线路商列表
      ownedbusiness: [], //拥有商户列表
      columns2: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "线路商标识",
          key: "suffix"
        },
        {
          title: "线路商昵称",
          key: "displayName"
        },
        {
          title: "剩余点数",
          key: "balance"
        },
        {
          title: "操作人",
          key: "",
          render: (h, params) => {
            return h("span", params.row.lastBill.operator);
          }
        },
        {
          title: "操作时间",
          key: "",
          render: (h, params) => {
            let time = params.row.lastBill.updateAt;
            return h("span", this.dayjs(time).format("YYYY-MM-DD HH:mm:ss"));
          }
        },
        {
          title: "备注",
          key: "remark",
          maxWidth: 80,
          render: (h, params) => {
            if (
              params.row.lastBill.remark == "NULL!" ||
              params.row.lastBill.remark == null
            ) {
              return h("span", "");
            } else {
              return h(
                "Tooltip",
                {
                  props: {
                    content: params.row.lastBill.remark
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
            }
          }
        },
        {
          title: "操作(对旗下线路商操作)",
          key: "",
          render: (h, params) => {
            let userId = this.$route.query.userId;
            let text = "";
            let status = null;
            let color = "";
            let role = params.row.role;
            if (params.row.status == 1) {
              text = "停用";
              status = 0;
              color = "#f5141e";
            } else {
              text = "开启";
              status = 1;
              color = "#20a0ff";
            }
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
                "加点"
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
                "减点"
              ),
              h(
                "span",
                {
                  style: {
                    color: color,
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示!",
                        content: `<p>是否${text}线路商</p>`,
                        onOk: () => {
                          userChangeStatus({
                            role,
                            status,
                            userId: params.row.userId
                          }).then(res => {
                            if (res.code == 0) {
                              this.$Message.success(`${text}成功`);
                              childList(userId, "10").then(res => {
                                this.nextLine = res.payload;
                              });
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
      ],
      columns3: [
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
          title: "剩余点数",
          key: "balance"
        },
        {
          title: "操作人",
          key: "",
          render: (h, params) => {
            return h("span", params.row.lastBill.operator);
          }
        },
        {
          title: "操作时间",
          key: "",
          render: (h, params) => {
            let time = params.row.lastBill.updateAt;
            return h("span", this.dayjs(time).format("YYYY-MM-DD HH:mm:ss"));
          }
        },
        {
          title: "备注",
          key: "",
          maxWidth: 80,
          render: (h, params) => {
            if (
              params.row.lastBill.remark == "NULL!" ||
              params.row.lastBill.remark == null
            ) {
              return h("span", "");
            } else {
              return h(
                "Tooltip",
                {
                  props: {
                    content: params.row.lastBill.remark
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
            }
          }
        },
        {
          title: "操作(对旗下商户操作)",
          key: "",
          render: (h, params) => {
            let userId = this.$route.query.userId;
            let text = "";
            let status = null;
            let color = "";
            let role = params.row.role;
            if (params.row.status == 1) {
              text = "停用";
              status = 0;
              color = "#f5141e";
            } else {
              text = "开启";
              status = 1;
              color = "#20a0ff";
            }
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
                "加点"
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
                "减点"
              ),
              h(
                "span",
                {
                  style: {
                    color: color,
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示!",
                        content: `<p>是否${text}线路商</p>`,
                        onOk: () => {
                          userChangeStatus({
                            role,
                            status,
                            userId: params.row.userId
                          }).then(res => {
                            if (res.code == 0) {
                              this.$Message.success(`${text}成功`);
                              childList(userId, "100").then(res => {
                                this.ownedbusiness = res.payload;
                              });
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
      ],
      columns1: [
        {
          title: "公司",
          key: "company"
        },
        {
          title: "游戏",
          key: "name"
        },
        {
          title: "商家占成",
          key: "rate",
          render: (h, params) => {
            return h("span", params.row.rate + "%");
          }
        },
        {
          title: "操作",
          key: "opreate",
          render: (h, params) => {
            if (!this.edit) {
              return h(
                "span",
                {
                  style: {
                    color: "#20a0ff",
                    cursor: "pointer"
                  },
                  on: {
                    click: index => {
                      this.gameDetail.splice(index, 1);
                    }
                  }
                },
                "删除"
              );
            }
          }
        }
      ],
      columns: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "交易前余额",
          key: "oldBalance"
        },
        {
          title: "交易点数",
          key: "amount"
        },
        {
          title: "交易时间",
          key: "createdAt",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "交易对象",
          key: "toUser",
          minWidth: 250,
          render: (h, params) => {
            let row = params.row;
            if (row.fromLevel > row.toLevel) {
              return h(
                "span",
                row.toDisplayName + " 对 " + row.fromDisplayName
              );
            } else {
              return h(
                "span",
                row.fromDisplayName + " 对 " + row.toDisplayName
              );
            }
          }
        },
        {
          title: "交易类型",
          key: "action",
          render: (h, params) => {
            let row = params.row;
            if (row.amount > 0) {
              return h("span", "减点");
            } else {
              return h("span", "加点");
            }
          }
        },
        {
          title: "交易后余额",
          key: "balance"
        },
        {
          title: "操作人",
          key: "operator",
          render: (h, params) => {
            return h("span", params.row.operator.split("_")[1]);
          }
        },
        {
          title: "备注",
          key: "remark",
          maxWidth: 80,
          render: (h, params) => {
            if (params.row.remark == "NULL!" || params.row.remark == null) {
              return h("span", "");
            } else {
              return h(
                "Tooltip",
                {
                  props: {
                    content: params.row.remark
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
            }
          }
        }
      ],
      waterfall: []
    };
  },
  created() {
    this.spinShow = true;
    this.init();
  },
  watch: {
    $route(to, from) {
      if (to.name == "lineDetail") {
        this.spinShow = true;
        this.init();
      }
    }
  },
  methods: {
    editBtn() {
      this.edit = false;
      this.isedit = false;
      this.value = ["1", "2", "3"];
      this.basic.username = this.lineDetail.uname;
      this.basic.password = this.lineDetail.password;
      this.basic.remark = this.lineDetail.remark;
    },
    save() {
      let username = this.basic.username;
      if (username == "") {
        this.$Message.warning("用户名不能为空");
        return;
      } else {
        let testReg = /^[a-zA-Z0-9]{5,16}$/;
        if (!testReg.test(username)) {
          this.$Message.warning("用户名为5-16位,限英文和数字");
          return;
        }
      }
      let password = this.basic.password;
      if (password == "") {
        this.$Message.warning("密码不能为空");
        return;
      } else {
        let testReg = /^[a-zA-Z0-9@_#$%^&*!.~-]{6,16}$/;
        if (!testReg.test(password)) {
          this.$Message.warning("密码为6~16位,包含字母、数字及符号");
          return;
        }
      }
      this.edit = true;
      this.isedit = true;
      let userId = this.userId;
      let params = this.lineDetail;
      let suffix = this.lineDetail.suffix;
      params.username = suffix + "_" + username;
      params.password = password;
      params.uname = username;
      params.remark = this.basic.remark;
      params.gameList = this.gameDetail;
      this.spinShow = true;
      if (_.isEmpty(params.gameList)) {
        this.$Message.success("尚未选择游戏");
        this.spinShow = false;
        return;
      }
      updateManagers(userId, params).then(res => {
        if (res.code == 0) {
          this.$Message.success("修改成功");
          this.spinShow = false;
        } else {
          this.spinShow = false;
        }
      });
    },
    selectCompany(value) {
      gameBigType({ companyIden: value }).then(res => {
        if (res.code == 0) {
          this.gameList = res.payload;
        }
      });
    },
    selectGame(value) {
      this.selected = true;
      this.game = value;
    },
    addGame() {
      let gamelist = this.gameList;
      let gameName = this.game;
      let gameItem = {};
      for (let item of gamelist) {
        if (item.name == gameName) {
          gameItem = item;
        }
      }
      let re = /^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/;
      if (re.test(this.gameForm.balance)) {
        gameItem.rate = this.gameForm.balance;
        this.gameDetail.push(gameItem);
        this.gameDetail = _.uniqWith(this.gameDetail, _.isEqual);
      }
    }, //生成密码
    createPass() {
      let text = [
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "1234567890",
        "@_#$%^&*!.~-"
      ];
      let rand = function(min, max) {
        return Math.floor(Math.max(min, Math.random() * (max + 1)));
      };
      let len = rand(6, 16);
      let pw = "";
      for (let i = 0; i < len; ++i) {
        let strpos = rand(0, 3);
        pw += text[strpos].charAt(rand(0, text[strpos].length));
      }
      this.basic.password = pw;
    },
    async init() {
      let userId = this.$route.query.userId;
      let parent = this.$route.query.parent;
      this.parent = parent;
      this.userId = userId;
      this.edit = true;
      this.isedit = true;
      let req1 = getWaterfall(userId);
      let req2 = oneManagers(userId);
      let req3 = companySelect({ parent });
      let req4 = childList(userId, "10"); //线路商
      let req5 = childList(userId, "100"); //商户
      let [
        waterfall,
        managers,
        company,
        lineChild,
        ownBusiness
      ] = await this.axios.all([req1, req2, req3, req4, req5]);
      this.spinShow = false;
      if (waterfall && waterfall.code == 0) {
        this.waterfall = waterfall.payload;
      }
      if (managers && managers.code == 0) {
        this.lineDetail = managers.payload;
        this.gameDetail = managers.payload.gameList;
      }
      if (company && company.code == 0) {
        this.gameType = company.payload;
      }
      if (lineChild && lineChild.code == 0) {
        this.nextLine = lineChild.payload;
      }
      if (ownBusiness && ownBusiness.code == 0) {
        this.ownedbusiness = ownBusiness.payload;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.lineDetail {
  min-height: 89vh;
  .userName {
    line-height: 36px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .edit {
    float: right;
    margin-right: 20px;
    height: 38px;
  }
  .logo {
    width: 200px;
  }
  .next,
  .ownedMerchant {
    margin: 20px auto;
  }
  .add,
  .create {
    color: #20a0ff;
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>

