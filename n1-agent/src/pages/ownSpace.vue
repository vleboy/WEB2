<template>
    <div class="personalcenter">
        <div style="text-align:center">
            <h2 style="font-size: 2rem;margin:1.5rem 0 0 0">{{adminInfo.displayName}}</h2>
        </div>
        <div class="manangeinfo">
            <h4 style="display:inline-block">管理信息</h4>
            <!-- <span style="margin-left:0.4rem" v-if="this.adminInfo.parent !== '00'">
                所属代理: {{adminInfo.parentName}}
            </span> -->
            <div class="manangeform">
                <p>
                    <span>管理员账号: {{adminInfo.uname}}</span>
                    <!-- <span v-if="this.adminInfo.suffix !== 'Agent'">代理标识: {{adminInfo.suffix}}</span> -->
                    <span>管理员密码: {{adminInfo.password}}
                        <h5 class="newPassword" @click="newPassword">修改密码</h5>
                    </span>
                    <span>管理员成数: {{adminInfo.rate}}%</span>
                </p>
                <p>
                    <span>创建时间: {{(adminInfo.createdAt)}}</span>
                    <span>上次登录时间: {{(adminInfo.loginAt)}}</span>
                    <span>上次登录IP: {{adminInfo.lastIP}}</span>
                </p>
                <p>
                    <span style="width: 95%;word-break: break-all">备注: {{(adminInfo.remark)}}</span>
                </p>
            </div>
        </div>
        <div class="manager-copertion">
            <h4>代理点数操作记录</h4>
            <div class="copertion-form">
                <div class="form-header">
                    <span class="points">当前代理剩余点数:
                        <span style="color:#FF9900">{{balance}}</span>
                    </span>
                </div>
                <div class="propertyform-form">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
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
      }
    };
  },
  methods: {
    newPassword() {
      console.log("1");
    }
  }
};
</script>
<style lang="less" scoped>
.personalcenter .manangeinfo,
.personalcenter .manager-copertion {
  width: 99%;
  margin: 0 auto;
  vertical-align: baseline;
}
.personalcenter {
  .manangeform {
    background-color: #f5f5f5;
    margin-bottom: 2rem;
  }
  .copertion-form {
    background-color: #f5f5f5;
    padding-left: 1.5%;
  }
  .form-header {
    padding: 1rem 0;
  }
  .manangeform {
    span {
      display: inline-block;
      width: 25%;
      padding: 2rem 1.5rem 1.5rem 2rem;
    }
  }
  h4 {
    font-size: 1.8rem;
    font-weight: normal;
    padding: 2rem 0;
    color: #5a5a5a;
  }
  .right {
    float: right;
    margin-bottom: 1rem;
    padding-right: 2.6rem;
  }
  .points {
    vertical-align: -0.75rem;
  }
  .input {
    width: 20rem;
    margin-right: 0.4rem;
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
</style>


