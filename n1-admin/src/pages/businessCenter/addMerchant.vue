<template>
  <div class="addMerchant">
    <Row>
      <Col span="12">
      <div class="basic">
        <h2>基本信息</h2>
        <Form ref='basicform' :model="basic" :label-width="120" :rules="basicValidate">
          <FormItem label="商户前缀" prop="suffix">
            <Row>
              <Col span="20">
              <Input v-model="basic.suffix" placeholder="2~6 位,只能输入英文和数字(以字母开头)"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="商户标识" prop="sn">
            <Row>
              <Col span="20">
              <Input v-model="basic.sn" placeholder="3~5位,只能输入中英文、数字、@、_"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="商户昵称" prop="displayName">
            <Row>
              <Col span="20">
              <Input v-model="basic.displayName" placeholder="2~10 位,只能输入中英文及数字"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="商户线路号" prop="msn">
            <Row>
              <Col span="20">
              <Input v-model="basic.msn" placeholder="请输入"></Input>
              </Col>
              <Col span="4">
              <span class="random" @click="randomMsn">随机分配</span>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="所属线路商" prop="parent">
            <Row>
              <Col span="20">
              <Select v-model="basic.parent" placeholder="请选择" @on-change='selectPre'>
                <Option v-for="item in subRoleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="商户初始点数" prop="points">
            <Row>
              <Col span="20">
              <Tooltip :content="tooltip" placement="top" :disabled='disabled'>
                <Input v-model="basic.points" :disabled='disabled' @on-focus='focus' placeholder="请输入"></Input>
              </Tooltip>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
      <div class="admin">
        <h2>管理账号</h2>
        <Form ref='adminform' :model="admin" :label-width="120" :rules="adminValidate">
          <FormItem label="商户管理员用户名" prop="username">
            <Row>
              <Col span="20">
              <Input v-model="admin.username" placeholder="5~16位,只能输入英文及数字"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="商户管理员密码" prop="password">
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
              <Input v-model="admin.remark" :maxlength='200' type="textarea" :rows="4" placeholder="请输入备注,最多不超过200个字符"></Input>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
      </Col>
      <Col span="12">
      <div class="detail">
        <h2>拓展信息</h2>
        <Form ref='gameList' :model="detail" :label-width="110" :rules="detailValidate">
          <FormItem label="商户拥有的游戏" prop="ownGame">
            <Row>
              <Col span="10">
              <Select v-model="detail.gameType" placeholder="请选择" @on-change="selectCompany">
                <Option v-for="item in gameType" :value="item.company" :key="item.company">{{ item.company }}</Option>
              </Select>
              </Col>
              <Col span="10">
              <Select v-model="detail.gamelist" placeholder="请选择" @on-change="selectGame">
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
          <FormItem label="商户API白名单">
            <Row>
              <Col span="20">
              <Input v-model="detail.loginWhiteList" type="textarea" :rows="4" placeholder="请输入IP地址或IP范围,一行一个规则,每行以分号结尾,0.0.0.0为不限制任何IP"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="商户域名">
            <Row>
              <Col span="10">
              <Select v-model="detail.httpType" placeholder="请选择">
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
              </Select>
              </Col>
              <Col span="10">
              <Input v-model="detail.url" placeholder="请输入"></Input>
              </Col>
              <Col span="4">
              <span class="check" @click="merchantUrl">验证</span>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="商户充值页面地址">
            <Row>
              <Col span="10">
              <Select v-model="detail.chargeType" placeholder="请选择">
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
              </Select>
              </Col>
              <Col span="10">
              <Input v-model="detail.chargeUrl" :rows="4" placeholder="选填"></Input>
              </Col>
              <Col span="4">
              <span class="check" @click="chargeurl">验证</span>
              </Col>
              <Checkbox class="browser" v-model="defaultBrower">是否在系统浏览器中打开</Checkbox>
            </Row>
          </FormItem>
          <FormItem label="商户注册页面地址">
            <Row>
              <Col span="10">
              <Select v-model="detail.registType" placeholder="请选择">
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
              </Select>
              </Col>
              <Col span="10">
              <Input v-model="detail.registUrl" :rows="4" placeholder="选填"></Input>
              </Col>
              <Col span="4">
              <span class="check" @click="registurl">验证</span>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="商户客服页面地址">
            <Row>
              <Col span="10">
              <Select v-model="detail.serviceType" placeholder="请选择">
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
              </Select>
              </Col>
              <Col span="10">
              <Input v-model="detail.serviceUrl" :rows="4" placeholder="选填"></Input>
              </Col>
              <Col span="4">
              <span class="check" @click="serviceurl">验证</span>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
      </Col>
    </Row>
    <Row>
      <div class="btn">
        <Button type="primary" @click="addMerchant">提交</Button>
        <Button type="primary" class="reset" @click="reset">重置</Button>
      </div>
    </Row>
    <Spin size="large" fix v-if="$store.state.login.loading">
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
  getOtherBill,
  msnRandom,
  checkMsn
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
          checkExit({ nick: { role: "100", displayName: value } }).then(res => {
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
        callback(new Error("前缀不能为空"));
      } else {
        let testReg = /^[a-zA-Z][a-zA-Z0-9]{1,5}$/;
        if (!testReg.test(value)) {
          callback(new Error("2~6位,只能输入中英文(字母开头)"));
        } else {
          checkExit({
            suffix: { role: "100", suffix: value }
          }).then(res => {
            if (res.code == 0) {
              if (res.payload == true) {
                callback();
              } else {
                callback(new Error("前缀不可用,请重新输入"));
              }
            }
          });
        }
      }
    };
    const validateSn = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("标识不能为空"));
      } else {
        let testReg = /^[a-zA-Z0-9@、_]{3,5}$/;
        if (!testReg.test(value)) {
          callback(new Error("3~5位,只能输入中英文、数字、@、_"));
        } else {
          checkExit({
            sn: { sn: value }
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
    const validateMsn = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("线路号不能为空"));
      } else {
        checkMsn(value).then(res => {
          if (res.code == 0) {
            if (res.payload.avalible == true) {
              callback();
            } else {
              callback(new Error("线路号不可用,请重新输入"));
            }
          }
        });
      }
    };
    const validateBalance = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("商户点数不能为空"));
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
        sn: "",
        displayName: "",
        msn: "",
        parent: "",
        points: null
      },
      selected: false,
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
        balance: "",
        gameType: "",
        gamelist: "",
        loginWhiteList: "",
        httpType: "http://",
        url: "",
        chargeType: "http://",
        chargeUrl: "",
        registType: "http://",
        registUrl: "",
        serviceType: "http://",
        serviceUrl: ""
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
      game: "",
      defaultBrower: false,
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
        msn: [
          {
            validator: validateMsn,
            trigger: "blur"
          }
        ],
        sn: [
          {
            validator: validateSn,
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
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      this.$store.commit("updateLoading", { params: true });
      this.disabled = false;
      let params = {};
      if (userId == id) {
        params = { parent: "01" };
      } else {
        params = { parent: id };
      }
      companySelect(params).then(res => {
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
    },
    randomMsn() {
      msnRandom().then(res => {
        if (res.code == 0) {
          this.basic.msn = res.payload;
        }
      });
    },
    //生成密码
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
    merchantUrl() {
      let url = this.detail.httpType + this.detail.url;
      window.open(url);
    },
    chargeurl() {
      let url = this.detail.chargeType + this.detail.chargeUrl;
      window.open(url);
    },
    registurl() {
      let url = this.detail.registType + this.detail.registUrl;
      window.open(url);
    },
    serviceurl() {
      let url = this.detail.serviceType + this.detail.serviceUrl;
      window.open(url);
    },
    addMerchant() {
      this.$refs["basicform"].validate(valid => {
        if (valid) {
          this.$refs["adminform"].validate(valid => {
            if (valid) {
              this.$store.commit("updateLoading", { params: true });
              this.$store
                .dispatch("newUser", {
                  role: "100",
                  ...this.admin,
                  ...this.basic,
                  gameList: this.gameDetail,
                  loginWhiteList: this.detail.loginWhiteList,
                  moneyURL: this.detail.chargeType + this.detail.chargeUrl,
                  registerURL: this.detail.registType + this.detail.registUrl,
                  frontURL: this.detail.httpType + this.detail.url,
                  feedbackURL: this.detail.serviceType + this.detail.serviceUrl,
                  isOpenBrowser: this.defaultBrower
                })
                .then(res => {
                  if (res.code == 0) {
                    this.$store.commit("updateLoading", { params: false });
                    this.$Message.success("添加成功");
                    this.$router.push({ name: "businessList" });
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
};
</script>

<style lang="less" scoped>
.addMerchant {
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
