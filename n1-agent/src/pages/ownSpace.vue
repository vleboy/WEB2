<template>
  <div class="personalcenter">
    <div class="manangeinfo">
      <div class="reload">
        <Button type="primary" class="searchbtn" @click="reset">刷新</Button>
      </div>
      <table cellspacing="0">
        <tr>
          <td>
            <span>代理管理员账号 : {{agentDetail.username}}</span>
          </td>
          <td>
            <Row>
              <Col span="10">代理管理员密码 :
              <span v-if="showPass">{{agentDetail.password}}</span>
              <span v-else>********</span>
              </Col>
              <Col span="12">
              <span class="newPassword" @click="showPass=!showPass" v-if="!showPass">显示</span>
              <span class="newPassword" @click="showPass=!showPass" v-else>隐藏</span>
              <h5 class="newPassword" @click="newPassword">修改密码</h5>
              </Col>
            </Row>
          </td>
          <td>
            <span>代理管理员成数 : {{ agentDetail.rate+'%' }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>代理创建时间 : {{ dayjs(agentDetail.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </td>
          <td>
            <span>上次登录时间 : {{dayjs(agentDetail.loginAt).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </td>
          <td>
            <span>上次登录IP : {{agentDetail.lastIP}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>剩余点数 : {{ agentDetail.balance }}</span>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="manager-copertion">
      <Table :columns="columns1" :data="showData" size="small"></Table>
      <Page :total="total" class="page" show-elevator :page-size='pageSize' show-total @on-change="changepage"></Page>
    </div>
    <Modal v-model="modal" title="修改密码" :width='350' @on-ok="ok" @on-cancel='cancel'>
      <p class="modal_input">
        <Row>
          <Col span="6" class="label">新密码</Col>
          <Col span="14">
          <Input v-model="password" placeholder="请输入新密码"></Input>
          </Col>
        </Row>
      </p>
      <p class="modal_input">
        <Row>
          <Col span="6" class="label">重复新密码</Col>
          <Col span="14">
          <Input v-model="repassword" placeholder="请重复新密码"></Input>
          </Col>
        </Row>
      </p>
    </Modal>
    <Spin size="large" fix v-if="$store.state.login.loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import { agentOne, getWaterfall } from "@/service/index";
import { thousandFormatter } from "@/config/format";
import dayjs from "dayjs";
export default {
  data() {
    return {
      modal: false,
      password: "",
      showPass:false,
      repassword: "",
      dayjs: dayjs,
      agentDetail: {},
      waterfall: [],
      pageSize: 50,
      showData: [], //
      columns1: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "账户余额",
          key: "oldBalance",
          sortable:true,
          render: (h, params) => {
            return h("span", thousandFormatter(params.row.oldBalance));
          }
        },
        {
          title: "交易点数",
          key: "amount",
          sortable:true,
          render: (h, params) => {
            let color = params.row.amount < 0 ? "#f30" : "#0c0";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              params.row.amount
            );
          }
        },
        {
          title: "交易时间",
          key: "createdAt",
          sortable:true,
          minWidth: 80,
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
          minWidth: 120,
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
          key: "amount",
          sortable:true,
          render: (h, params) => {
            let row = params.row;
            if (row.amount > 0) {
              return h(
                "span",
                // {
                //   style: {
                //     color: "#f30"
                //   }
                // },
                "减点"
              );
            } else {
              return h(
                "span",
                // {
                //   style: {
                //     color: "#0c0"
                //   }
                // },
                "加点"
              );
            }
          }
        },
        {
          title: "交易后余额",
          key: "balance",
          sortable:true,
           render: (h, params) => {
            return h("span", thousandFormatter(params.row.balance));
          }
        },
        {
          title: "操作人",
          key: "operator",
          sortable:true,
          render: (h, params) => {
            return h("span", params.row.operator);
          }
        },
        {
          title: "备注",
          key: "remark",
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
      ]
    };
  },
  computed: {
    total() {
      return this.waterfall.length;
    }
  },
  methods: {
    handlePage() {
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.total < this.pageSize) {
        this.showData = this.waterfall;
      } else {
        this.showData = this.waterfall.slice(0, this.pageSize);
      }
    },
    changepage(index) {
      let size = this.pageSize;
      var _start = (index - 1) * size;
      var _end = index * size;
      this.showData = this.waterfall.slice(_start, _end);
    },
    newPassword() {
      this.modal = true;
    },
    reset() {
      this.init();
    },
    ok() {
      let passReg = /^[a-zA-Z0-9@_-]{8,16}$/;
      if (!passReg.test(this.password)) {
        this.$Message.warning({
          content: "密码为8-16位的(英文、数字、符号)"
        });
        return;
      }
      if (this.password != this.repassword) {
        this.$Message.warning({
          content: "两次密码不一致"
        });
        return;
      }
      if (this.passwordLevel(this.repassword) < 3) {
        this.$Message.warning({
          content: "密码强度不够"
        });
        return;
      }
      let userId = "";
      if (localStorage.userId) {
        userId = localStorage.userId;
      }
      this.$store
        .dispatch("changePassword", {
          userId: userId,
          password: this.repassword
        })
        .then(() => {
          this.password = "";
          this.repassword = "";
        });
    },
    cancel() {
      this.password = "";
      this.repassword = "";
    },
    async init() {
      let userId = localStorage.userId;
      this.$store.commit("changeLoading", { params: true });
      let req1 = agentOne(userId);
      let req2 = getWaterfall(userId);
      let [agent, waterfall] = await this.axios.all([req1, req2]);
      this.$store.commit("changeLoading", { params: false });
      if (agent && agent.code == 0) {
        this.agentDetail = agent.payload;
      }
      if (waterfall && waterfall.code == 0) {
        this.waterfall = waterfall.payload;
      }
      this.handlePage();
    },
    passwordLevel(password) {
      var Modes = 0;
      for (let i = 0; i < password.length; i++) {
        Modes |= CharMode(password.charCodeAt(i));
      }
      return bitTotal(Modes);
      //CharMode函数
      function CharMode(iN) {
        if (iN >= 48 && iN <= 57)
          //数字
          return 1;
        if (iN >= 65 && iN <= 90)
          //大写字母
          return 2;
        if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
          //大小写
          return 4;
        else return 8; //特殊字符
      }
      //bitTotal函数
      function bitTotal(num) {
        let modes = 0;
        for (let i = 0; i < 4; i++) {
          if (num & 1) modes++;
          num >>>= 1;
        }
        return modes;
      }
    }
  },
  filters: {},
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.personalcenter {
  min-height: 89vh;
  .manangeinfo {
    width: 100%;
    margin: 10px auto 20px;
    .reload {
      text-align: right;
      margin-bottom: 10px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      td {
        border: 1px solid #e9eaec;
        width: 32%;
        height: 50px;
        padding-left: 10px;
      }
    }
    .newPassword {
      margin-left: 0.5rem;
      color: #20a0ff;
      display: inline-block;
      // font-size: 1rem;
      font-weight: normal;
      cursor: pointer;
    }
  }
  .page {
    text-align: right;
  }
}
.modal_input {
  margin-bottom: 10px;
}
.label {
  line-height: 32px;
}
</style>


