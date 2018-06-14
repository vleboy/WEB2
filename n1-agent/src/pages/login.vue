<template>
  <div class="login">
    <div class="login-left">
      <p class="title-big">NA代理管理系统</p>
    </div>
    <div class="login-center"></div>
    <div class="login-right">
      <Form label-position="left" :label-width="80">
        <FormItem label="账号">
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
        <FormItem label="验证">
          <Row>
            <Col span="8">
            <div id="vaptcha_container">
              <div class="vaptcha-init-main">
                <div class="vaptcha-init-loading">
                  <img src="https://cdn.vaptcha.com/vaptcha-loading.gif" />
                  <span class="vaptcha-text">智能验证码加载中...</span>
                </div>
              </div>
            </div>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="8">
            <Button class="loginbtn" :loading="$store.state.login.loading" type="ghost" @click="login">
              <span v-if="!loading">登录</span>
              <span v-else>Loading...</span>
            </Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
import { api } from "@/service/urlConfig";
export default {
  data() {
    return {
      role: "1",
      username: "", // 用户名
      password: "", // 密码
      userdata: {},
      vaptchaObj: null
    };
  },
  watch: {},
  computed: {
    loading(){
      return this.$store.state.login.loading;
    }
  },
  created() {
    this.initVaptcha();
  },
  methods: {
    clearData(msg) {
      this.$Message.warning({
        content: msg
      });
    },
    initVaptcha() {
      let self = this;
      this.axios.post(api.getVaptcha, {}).then(function(r) {
        const options = {
          vid: r.data.vid,
          challenge: r.data.challenge,
          type: "float", //验证码类型,string,默认float,可选择float,popup,embed,
          checkingAnimation: "display", //是否显示智能检测动画，"hide"则为隐藏
          outage: api.getDownTime,
          container: "#vaptcha_container",
          success: function(token, challenge) {
            //当验证成功时执行回调,function,参数token为string,必选
            self.userdata.token = token;
            self.userdata.challenge = challenge;
          },
          fail: function() {
            self.clearData("人机验证失败");
          }
        };
        //vaptcha对象初始化
        window.vaptcha(options, function(obj) {
          self.vaptchaObj = obj;
          self.vaptchaObj.init();
        });
      });
    },
    login() {
      let passReg = /^[a-zA-Z0-9@_-]{8,16}$/;
      let nameReg = /^[a-zA-Z0-9@_-]{5,16}$/;
      let self = this;
      if (!this.userdata.challenge) {
        this.$Message.warning({
          content: "请进行人机验证"
        });
        return;
      }
      if (!nameReg.test(this.username)) {
        this.$Message.warning({
          content: "用户名为5-16位的（英文、数字、@、_、-）"
        });
        return;
      }
      // if (!passReg.test(this.password)) {
      //   this.$Message.warning({
      //     content: "密码为8-16位的(英文、数字、符号)"
      //   });
      //   return;
      // }
      this.$store.commit('changeLoading',{params:true})
      let password = bcrypt.hashSync(this.password, 10);
      this.$store.dispatch("userlogin", {
        role: "1000",
        username: this.username,
        password: password,
        challenge: this.userdata.challenge,
        vid:this.userdata.token,
        cb: () => {
          this.$router.push({ name: "home" });
        },
        err:()=>{
          this.userdata={};
          this.initVaptcha();
        }
      })
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
#vaptcha_container {
  width: 100%;
  .vaptcha-init-main {
    display: table;
    width: 100%;
    height: 100%;
    background-color: #eee;
    .vaptcha-init-loading {
      text-align: center;
      display: table-cell;
      vertical-align: middle;
      img{
        vertical-align: middle;
      }
    }
  }
}
</style>
