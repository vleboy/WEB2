<template>
  <div class="merchantDetail">
    <p class="userName">{{$route.params.displayName}} ({{$route.params.username }})</p>
    <Collapse v-model="value">
      <Panel name="1">
        基本信息 所属线路商: {{$route.params.parentDisplayName}}
        <Button type="primary" class="edit" @click.stop="editBtn" v-if="isedit">编辑</Button>
        <Button type="primary" class="edit" @click.stop="save" v-else>提交修改</Button>
        <div slot="content">
          <Form :model="basic" label-position="left" :label-width="100">
            <Row>
              <Col span="8">
              <FormItem label="商户ID">
                {{ merchantDetail.displayId }}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上级商户">
                {{ merchantDetail.parentDisplayName }}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户昵称">
                {{merchantDetail.displayName}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="商户密匙">
                {{merchantDetail.apiKey}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户线路号">
                {{merchantDetail.msn}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户前缀">
                {{merchantDetail.suffix}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="创建时间">
                {{dayjs(merchantDetail.createdAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="最后登录时间">
                {{dayjs(merchantDetail.updatedAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="标识">
                {{merchantDetail.sn}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="上次登录时间">
                {{dayjs(merchantDetail.loginAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上次登录IP">
                {{merchantDetail.lastIP}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="商户前端域名" v-if="edit">
                {{merchantDetail.frontURL}}
              </FormItem>
              <FormItem label="商户前端域名" v-else>
                <Row>
                  <Col span="10">
                  <Input v-model="basic.frontURL"></Input>
                  </Col>
                </Row>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户充值域名" v-if="edit">
                {{merchantDetail.moneyURL}}
              </FormItem>
              <FormItem label="商户充值域名" v-else>
                <Row>
                  <Col span="10">
                  <Input v-model="basic.moneyURL"></Input>
                  </Col>
                </Row>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户注册域名" v-if="edit">
                {{merchantDetail.registerURL}}
              </FormItem>
              <FormItem label="商户注册域名" v-else>
                <Row>
                  <Col span="10">
                  <Input v-model="basic.registerURL"></Input>
                  </Col>
                </Row>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="商户客服域名" v-if="edit">
                {{merchantDetail.feedbackURL}}
              </FormItem>
              <FormItem label="商户客服域名" v-else>
                <Row>
                  <Col span="10">
                  <Input v-model="basic.feedbackURL"></Input>
                  </Col>
                </Row>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户白名单" v-if="edit">
                {{merchantDetail.loginWhiteList}}
              </FormItem>
              <FormItem label="商户白名单" v-else>
                <Row>
                  <Col span="10">
                  <Input v-model="basic.loginWhiteList"></Input>
                  </Col>
                </Row>
              </FormItem>
              </Col>
              <Col span="8">
              <Checkbox class="browser" v-model="defaultBrower">是否在系统浏览器中打开</Checkbox>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="管理员账号" v-if="edit">
                {{ merchantDetail.uname}}
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
                {{merchantDetail.password}}
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
              <FormItem label="备注" v-if="edit">
                {{merchantDetail.remark}}
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
            <Row>
              <Col span="8">
              <FormItem label="LOGO">
                <img :src="merchantDetail.launchImg.logo[0]" alt="oo" class="logo">
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="NAME">
                <img :src="merchantDetail.launchImg.name[0]" alt="oo" class="logo">
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        游戏信息
        <div slot="content">
          <Form ref='gameList' :model="gameForm" :label-width="110" v-if="!edit">
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
            <FormItem v-if="selected" prop='balance'>
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
    <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import {
  waterFall,
  oneMerchants,
  companySelect,
  gameBigType,
  updateMerchant
} from "@/service/index";
import dayjs from "dayjs";
export default {
  data() {
    return {
      parent: "",
      value: "3",
      dayjs: dayjs,
      edit: true, //可编辑
      isedit: true,
      spinShow: false,
      defaultBrower: false,
      gameDetail: [],
      basic: {
        username: "",
        password: "",
        remark: "",
        frontURL: "",
        moneyURL: "",
        registerURL: "",
        feedbackURL: "",
        loginWhiteList: ""
      },
      gameForm: {
        gameType: "",
        gamelist: "",
        balance: ""
      },
      selected: false,
      merchantDetail: {
        launchImg: {
          logo: [],
          name: []
        }
      },
      gameType: [],
      gameList: [], //select
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
    this.init();
  },
  methods: {
    editBtn() {
      this.edit = false;
      this.isedit = false;
      this.value = ["1", "2", "3"];
      this.basic.username = this.merchantDetail.uname;
      this.basic.password = this.merchantDetail.password;
      this.basic.remark = this.merchantDetail.remark;
      this.basic.frontURL = this.merchantDetail.frontURL;
      this.basic.moneyURL = this.merchantDetail.moneyURL;
      this.basic.registerURL = this.merchantDetail.registerURL;
      this.basic.feedbackURL = this.merchantDetail.feedbackURL;
      this.basic.loginWhiteList = this.merchantDetail.loginWhiteList;
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
          this.$Message.warning("密码6~16位,包含字母、数字及符号");
          return;
        }
      }
      this.edit = true;
      this.isedit = true;
      let userId = this.parent;
      let suffix = this.merchantDetail.suffix;
      let params = this.merchantDetail;
      params.username = suffix + "_" + username;
      params.uname = username;
      params.password = password;
      params.remark = this.basic.remark;
      params.gameList = this.gameDetail;
      params.frontURL = this.basic.frontURL;
      params.moneyURL = this.basic.moneyURL;
      params.registerURL = this.basic.registerURL;
      params.feedbackURL = this.basic.feedbackURL;
      params.loginWhiteList = this.basic.loginWhiteList;
      params.isOpenBrowser = this.defaultBrower;
      this.spinShow = true;
      updateMerchant(userId, params).then(res => {
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
      gameItem.rate = this.gameForm.balance;
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
      this.basic.password = pw;
    },
    async init() {
      this.spinShow = true;
      let userId = this.$route.params.userId;
      this.parent = userId;
      let req1 = waterFall(userId);
      let req2 = oneMerchants(userId);
      let req3 = companySelect({ parent: userId });
      let [waterfall, merchant, company] = await this.axios.all([
        req1,
        req2,
        req3
      ]);
      this.spinShow = false;
      if (waterfall && waterfall.code == 0) {
        this.waterfall = waterfall.payload;
      }
      if (merchant && merchant.code == 0) {
        this.merchantDetail = merchant.payload;
        this.gameDetail = merchant.payload.gameList;
      }
      if (company && company.code == 0) {
        this.gameType = company.payload;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.merchantDetail {
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
  .add,
  .create {
    color: #20a0ff;
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>

