<template>
  <div class="login">
    <div class="login-left">
      <p class="title-big">N1后台管理系统</p>
    </div>
    <div class="login-center"></div>
    <div class="login-right">
    <Form label-position="left" :label-width="80">
        <FormItem label="用户名">
            <Row>
                <Col span="8">
                <Input v-model="user"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="密码">
             <Row>
                <Col span="8">
            <Input v-model="password" type="password"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="验证码">
               <Row>
                <Col span="4">
                 <Input v-model="code"></Input>
                </Col>
                <Col span="4">
                 <Button type="text">
                   <span class="get_code">获取验证码</span>
                 </Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
          <Row>
          <Col span="8">
           <Button class="loginbtn" type="ghost">登录</Button>
          </Col>
             </Row>
        </FormItem>
    </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: null,
      code: ""
    };
  }
};
</script>

<style lang='less' scoped>
.login {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
/**/
.login .login-left {
  flex: 0.45;
  text-align: right;
}
.login .login-center {
  flex: 0.1;
  text-align: center;
}
.login .login-right {
  flex: 0.45;
  text-align: left;
}
.title-big {
  font-size: 3rem;
}
.get_code {
  color: #20a0ff;
}
.loginbtn {
  width: 100%;
}
</style>
