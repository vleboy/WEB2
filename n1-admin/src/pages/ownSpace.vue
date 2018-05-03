<template>
  <div class="personalcenter">
    <div class="manangeinfo">
      <table cellspacing="0">
        <tr>
          <td>
            <span>管理员账号 : {{adminInfo.uname}}</span>
          </td>
          <td>
            <span>管理员密码 : {{adminInfo.password}}
              <h5 class="newPassword" @click="newPassword">修改密码</h5>
            </span>
          </td>
          <td>
            <span>管理员余额 : {{ }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>管理员角色 : {{ }}</span>
          </td>
          <td>
            <span>上次登录时间 : {{(adminInfo.loginAt)}}</span>
          </td>
          <td>
            <span>上次登录IP : {{adminInfo.lastIP}}</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="manager-copertion">
      <Table :columns="columns1" :data="copertion" size="small" no-data-text="暂无数据"></Table>
    </div>
    <Modal v-model="modal" title="修改密码" @on-ok="ok" @on-cancel="cancel">
      <p class="modal_input">
        <Row>
          <Col span="4">新密码</Col>
          <Col span="16">
          <Input v-model="password" size="small" placeholder="请输入新密码"></Input>
          </Col>
        </Row>
      </p>
      <p class="modal_input">
        <Row>
          <Col span="4">重复新密码</Col>
          <Col span="16">
          <Input v-model="repassword" size="small" placeholder="请重复新密码"></Input>
          </Col>
        </Row>
      </p>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal: false,
      balance: 12,
      adminInfo: {
        displayName: "超级管理员",
        parent: "11",
        parentName: "管理员2",
        uname: "abc",
        password: 123456,
        rate: 23,
        createdAt: "2018-2-23",
        loginAt: "2018-3-3",
        lastIP: "192.156.2.1",
        remark: "notes"
      },
      columns1: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "账户余额",
          key: "count"
        },
        {
          title: "交易点数",
          key: "amount"
        },
        {
          title: "交易时间",
          key: "time"
        },
        {
          title: "交易对象",
          key: "object"
        },
        {
          title: "交易类型",
          key: "type"
        },
        {
          title: "交易详情(原账+当前操作额=现在余额)",
          key: "detail"
        },
        {
          title: "操作人",
          key: "opreator"
        },
        {
          title: "备注",
          key: "note"
        }
      ],
      copertion: []
    };
  },
  methods: {
    newPassword() {
      this.modal = true;
    }
  }
};
</script>
<style lang="less" scoped>
.personalcenter {
  min-height: 84vh;
  .manangeinfo {
    width: 100%;
    margin: 10px auto 20px;
    table {
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
  .modal_input{
      margin-bottom: 6px;
    }
}
</style>


