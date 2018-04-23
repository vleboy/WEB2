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
            <Input v-model="username" :maxlength='16'></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="密码">
          <Row>
            <Col span="8">
            <Input v-model="password" type="password" :maxlength='16'></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="验证码">
          <Row>
            <Col span="4">
            <Input v-model="captcha" @keyup.native.enter="login" :maxlength='4'></Input>
            </Col>
            <Col span="4">
            <div class="codebox" @click="getcaptcha">
              <Button class="get_code" type="text" v-if="$store.state.login.getcode==''">
                获取验证码
              </Button>
              <img v-else class="code-img" :src="$store.state.login.getcode">
            </div>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="8">
            <Button class="loginbtn" type="ghost" @click="login">登录</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
export default {
  data() {
    return {
      role: "1",
      username: "", // 用户名
      password: "", // 密码
      captcha: "" // 验证码
    };
  },
  watch: {},
  computed: {},
  methods: {
    getcaptcha() {
      this.$Message.config({
        top: 50
      });
      if (!this.username) {
        this.$Message.warning({
          content: "请输入用户名以获取验证码"
        });
      } else {
        let relKey = "Platform_" + this.username;
        let usage = "login";
        this.$store.dispatch("getcapcha", {
          usage: usage,
          relKey: relKey,
          err: () => {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    login() {
      let passReg = /^\w{8,16}$/;
      let nameReg = /^[a-zA-Z0-9@_-]{5,16}$/;
      let codeReg = /^\d{4}$/;
      if (!codeReg.test(this.captcha)) {
        this.$Message.warning({
          content: "验证码不是数字"
        });
        return;
      }
      if (!nameReg.test(this.username)) {
        this.$Message.warning({
          content: "用户名为5-16位的（英文、数字、@、_、-）"
        });
        return;
      }
      if (!passReg.test(this.password)) {
        this.$Message.warning({
          content: "密码为8-16位的(英文、数字、符号)"
        });
        return;
      }
      let password = bcrypt.hashSync(this.password, 10);
      this.$store.dispatch("userlogin", {
        role: "1",
        username: this.username,
        password: password,
        captcha: this.captcha,
        cb: () => {
          this.$router.push({ name: "home" });
        }
      });
    }
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
  .login-left {
    flex: 0.45;
    text-align: right;
  }
  .login-center {
    flex: 0.1;
    text-align: center;
  }
  .login-right {
    flex: 0.45;
    text-align: left;
  }
}
/**/
.title-big {
  font-size: 3rem;
}
.get_code {
  color: #20a0ff;
}
.loginbtn {
  width: 100%;
}
.code-img {
  width: 7.2rem;
  height: 32px;
  border: 1px solid #eee;
  border-radius: 2px;
}
.codebox {
  width: 7.2rem;
  height: 2.1rem;
  margin-left: 0.15rem;
  float: right;
}
</style>
