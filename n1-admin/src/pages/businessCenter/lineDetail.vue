<template>
  <div class="lineDetail">
    <p class="userName">{{$route.params.displayName}} ({{$route.params.username }})</p>
    <Collapse v-model="value">
      <Panel name="1">
        基本信息
        <Button type="primary" class="edit" @click="editBtn" v-if="isedit">编辑</Button>
        <Button type="primary" class="edit" @click="save" v-else>提交修改</Button>
        <div slot="content">
          <Form :model="basic" label-position="left" :label-width="100">
            <Row>
              <Col span="8">
              <FormItem label="商户ID">
                {{ merchantDetail.displayId}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上级商户">
                {{merchantDetail.parentDisplayName}}
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
              <Checkbox class="browser" v-model="defaultBrower">是否在系统浏览器中打开</Checkbox>
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
              <FormItem label="商户前端域名">
                {{merchantDetail.frontURL}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户充值域名">
                {{merchantDetail.moneyURL}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户注册域名">
                {{merchantDetail.registerURL}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="商户客服域名">
                {{merchantDetail.feedbackURL}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="商户白名单">
                {{merchantDetail.loginWhiteList}}
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
              <FormItem label="管理员账号">
                {{ merchantDetail.username}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="管理员密码">
                {{merchantDetail.password}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上次登录时间">
                {{dayjs(merchantDetail.loginAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="上次登录IP">
                {{merchantDetail.lastIp}}
              </FormItem>
              </Col>
              <Col span="16">
              <FormItem label="备注">
                {{merchantDetail.remark}}
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
          <!-- <Form ref='gameList' :model="detail" :label-width="110">
                        <FormItem prop="ownGame">
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
                    </Form> -->
          <Table :columns="columns1" :data="gameDetail" width='500' class="table" size="small" no-data-text="暂无数据"></Table>
        </div>
      </Panel>
      <Panel name="3">
        财务信息
        <div slot="content">
          <Table :columns="columns" :data="waterfall" size="small" no-data-text="暂无数据"></Table>
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
import { waterFall, oneMerchants, companySelect } from "@/service/index";
import dayjs from "dayjs";
export default {
  data() {
    return {
      parent: "",
      value: "3",
      dayjs: dayjs,
      edit: false,
      isedit: true,
      spinShow: false,
      defaultBrower: false,
      gameDetail: [],
      basic: {},
      merchantDetail: null,
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
          minWidth: 80,
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
  methods: {
    editBtn() {
      this.edit = true;
      this.isedit = false;
      //   this.value=['1','2','3']
    },
    async init() {
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
        //   this.gameDetail = company.payload;
      }
    },
    save() {
      this.edit = false;
      this.isedit = true;
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
}
</style>

