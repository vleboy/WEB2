<template>
  <div class="addLineMerchant">
    <Row>
      <Col span="12">
      <div class="basic">
        <h2>基本信息</h2>
        <Form ref="basicform" :model="basic" :label-width="120" :rules="basicValidate">
          <FormItem label="线路商标识" prop="suffix">
            <Row>
              <Col span="20">
              <Input v-model="basic.suffix" placeholder="2~6 位,只能输入英文和数字(以字母开头)"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="线路商昵称" prop="displayName">
            <Row>
              <Col span="20">
              <Input v-model="basic.displayName" placeholder="2~10 位,只能输入中英文及数字"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="上级线路商" prop="parent">
            <Row>
              <Col span="20">
              <Select v-model="basic.parent" placeholder="请选择" @on-change='selectPre'>
                <Option v-for="item in subRoleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="初始线路商点数" prop="points">
            <Row>
              <Col span="20">
              <Tooltip :content="tooltip" placement="top" :disabled='disabled'>
                <Input v-model="basic.points" placeholder="请输入" :disabled='disabled' @on-focus='focus'></Input>
              </Tooltip>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
      <div class="admin">
        <h2>线路商后台管理员</h2>
        <Form ref='adminform' :model="admin" :label-width="110" :rules="adminValidate">
          <FormItem label="管理员用户名" prop="username">
            <Row>
              <Col span="20">
              <Input v-model="admin.username" placeholder="5~16位,只能输入英文及数字"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="管理员密码" prop="password">
            <Row>
              <Col span="20">
              <Input v-model="admin.password" placeholder="6~16位,包含字母、数字及符号中任意三种组合"></Input>
              </Col>
              <Col span="4">
              <span class="create" @click="createPass">生成</span>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Row>
              <Col span="20">
              <Input v-model="admin.remark" type="textarea" :maxlength='200' :rows="4" placeholder="请输入备注,最多不超过200个字符"></Input>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
      </Col>
      <Col span="12">
      <div class="detail">
        <h2>线路商信息</h2>
        <Form ref='gameList' :model="detail" :label-width="120" :rules="detailValidate">
          <FormItem label="线路商拥有的游戏" prop="ownGame">
            <Row>
              <Col span="10">
              <Select v-model="detail.gameType" placeholder="请选择" @on-change="selectCompany">
                <Option v-for="item in gameType" :value="item.companyName" :key="item.companyName">{{ item.companyName }}</Option>
              </Select>
              </Col>
              <Col span="10">
              <Select v-model="detail.gameList" placeholder="请选择" @on-change="selectGame">
                <Option v-for="item in gameList" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem v-if="selected">
            <label for="" slot="label">{{game}}商家占成(%)</label>
            <Row>
              <Col span="20">
              <Input v-model="detail.balance" placeholder="请输入0.00~100.00之间的数字"></Input>
              </Col>
              <Col span="4">
              <span class="add" @click="addGame">添加</span>
              </Col>
            </Row>
          </FormItem>
          <Table :columns="columns" :data="gameDetail" class="table" size="small" no-data-text="暂无数据"></Table>
        </Form>
      </div>
      </Col>
    </Row>
    <Row>
      <div class="btn">
        <Button type="primary" @click="addlineMerchant">提交</Button>
        <Button type="primary" class="reset" @click="reset">重置</Button>
      </div>
    </Row>
    <Spin size="large" fix v-if="$store.state.admin.loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import {
  companySelect,
  checkExit,
  gameBigType,
  getOtherBill
} from "@/service/index";
export default {
  data() {
    const validateNickname = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("昵称不能为空"));
      } else {
        let nameReg = /^[a-zA-Z0-9]{2,10}$/;
        if (!nameReg.test(value)) {
          callback(new Error("2-10位,限英文和数字"));
        } else {
          checkExit({ nick: { role: "10", displayName: value } }).then(res => {
            if (res.payload == true) {
              callback();
            } else {
              callback(new Error("昵称不可用,请重新输入"));
            }
          });
        }
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("密码不能为空"));
      } else {
        let testReg = /^[a-zA-Z0-9@_#$%^&*!.~-]{6,16}$/;
        if (!testReg.test(value)) {
          callback(new Error("6~16位,包含字母、数字及符号"));
        } else {
          callback();
        }
      }
    };
    const validatesuffix = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("标识不能为空"));
      } else {
        let testReg = /^[a-zA-Z][a-zA-Z0-9]{1,5}$/;
        if (!testReg.test(value)) {
          callback(new Error("2~6位,只能输入中英文(字母开头)"));
        } else {
          checkExit({
            suffix: { role: "10", suffix: value }
          }).then(res => {
            if (res.code == 0) {
              if (res.payload == true) {
                callback();
              } else {
                callback(new Error("标识不可用,请重新输入"));
              }
            }
          });
        }
      }
    };
    const validateBalance = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("初始线路商点数不能为空"));
      } else {
        let testReg = /^[0-9]*$/;
        if (!testReg.test(value)) {
          callback(new Error("点数需为数字"));
        } else if (value > this.parentBalance) {
          callback(new Error("点数已超出上级余额数"));
        } else {
          callback();
        }
      }
    };
    const validateUserName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("用户名不能为空"));
      } else {
        let testReg = /^[a-zA-Z0-9]{5,16}$/;
        if (!testReg.test(value)) {
          callback(new Error("5-16位,限英文和数字"));
        } else {
          callback();
        }
      }
    };
    return {
      basic: {
        suffix: "",
        displayName: "",
        parent: "",
        points: null
      },
      selected: false,
      game: "",
      columns: [
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
          key: "rate"
        },
        {
          title: "操作",
          key: "opreate",
          render: (h, params) => {
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
      ],
      detail: {
        gameType: "",
        gameList: "",
        balance: ""
      },
      admin: {
        username: "",
        password: "",
        remark: ""
      },
      disabled: true,
      parentBalance: "",
      gameType: [],
      gameList: [],
      gameDetail: [],
      tooltip: "当前所属上级余额:",
      basicValidate: {
        subRole: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ],
        displayName: [
          {
            validator: validateNickname,
            trigger: "blur"
          }
        ],
        suffix: [
          {
            validator: validatesuffix,
            trigger: "blur"
          }
        ],
        points: [
          {
            validator: validateBalance,
            trigger: "blur"
          }
        ]
      },
      adminValidate: {
        username: [
          {
            validator: validateUserName,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      },
      detailValidate: {}
    };
  },
  beforeCreate() {
    this.$store.dispatch("getSubrole");
  },
  methods: {
    reset() {
      this.$refs["basicform"].resetFields();
      this.$refs["adminform"].resetFields();
      this.$refs["gameList"].resetFields();
    },
    selectPre(id) {
      this.$store.commit("updateLoading", { params: true });
      this.disabled = false;
      companySelect({ parent: id }).then(res => {
        if (res.code == 0) {
          this.gameType = res.payload;
        }
      });
      getOtherBill(id).then(res => {
        if (res.code == 0) {
          this.parentBalance = res.payload.balance;
          this.$store.commit("updateLoading", { params: false });
        }
      });
    },
    focus() {
      this.tooltip = "当前所属上级余额:" + this.parentBalance;
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
      gameItem.rate = this.detail.balance;
      this.gameDetail.push(gameItem);
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
      this.admin.password = pw;
    },
    addlineMerchant() {
      this.$refs["basicform"].validate(valid => {
        if (valid) {
          this.$refs["adminform"].validate(valid => {
            if (valid) {
              this.$store.commit("updateLoading", { params: true });
              this.$store
                .dispatch("newUser", {
                  role: "10",
                  ...this.admin,
                  ...this.basic,
                  gameList: this.gameDetail
                })
                .then(res => {
                  if (res.code == 0) {
                    this.$store.commit("updateLoading", { params: false });
                    this.$Message.success("添加成功");
                    this.$router.push({ name: "lineBusiness" });
                  }
                });
            } else {
              this.$Message.error("请检查输入项");
            }
          });
        } else {
          this.$Message.error("请检查输入项");
        }
      });
    }
  },
  computed: {
    subRoleList() {
      return this.$store.state.add.subRoleList;
    }
  }
  // watch: {
  //   $route(to, from) {
  //     this.$router.go(0);
  //   }
  // }
};
</script>

<style lang="less" scoped>
.addLineMerchant {
  min-height: 89vh;
  .basic,
  .admin,
  .detail {
    margin: 20px 60px;
    width: 500px;
  }
  .btn {
    width: 250px;
    margin: 0 auto;
    .reset {
      margin-left: 50px;
    }
  }
  .random,
  .add,
  .check,
  .create {
    color: #20a0ff;
    margin-left: 15px;
    cursor: pointer;
  }
  .table {
    margin-bottom: 24px;
  }
}
</style>
