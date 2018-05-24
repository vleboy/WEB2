<template>
    <div class="sider">
        <Sider width='256px' collapsible hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <img class="logoimg" src="../../static/logo.png" alt="">
            <Menu ref="sideMenu" :active-name="$route.name" :open-names="openName" theme="dark" width="auto" @on-select='selectMenu'>
                <!-- <MenuItem name="home">
                <span>看板</span>
                </MenuItem>-->
                <MenuItem name="ownspace-index" v-if='permission.includes("个人中心")'>
                <span>个人中心</span>
                </MenuItem>
                <Submenu name="report" v-if='authorityStr.includes("报表")'>
                    <template slot="title">
                        输赢报表
                    </template>
                    <MenuItem name="allreport" v-if='permission.includes("公司输赢总报表")'>公司输赢总报表</MenuItem>
                    <Submenu name='nareport' v-if='authorityStr.includes("NA")'>
                        <template slot="title">NA游戏报表</template>
                        <MenuItem name="naAll" v-if='permission.includes("NA游戏总报表")'>NA游戏总报表</MenuItem>
                        <MenuItem name="navideo" v-if='permission.includes("NA电子游戏报表")'>NA电子游戏报表</MenuItem>
                        <MenuItem name="nastreet" v-if='permission.includes("NA街机游戏报表")'>NA街机游戏报表</MenuItem>
                        <MenuItem name="natrue" v-if='permission.includes("NA真人游戏报表")'>NA真人游戏报表</MenuItem>
                        <MenuItem name="jump" v-if='permission.includes("NA真人游戏报表")'>NA真人游戏报表(跳转)</MenuItem>
                        <MenuItem name="nacard" v-if='permission.includes("NA棋牌游戏报表")'>NA棋牌游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='ttgreport' v-if='authorityStr.includes("TTG")'>
                        <template slot="title">TTG游戏报表</template>
                        <MenuItem name="ttgvideo" v-if='permission.includes("TTG电子游戏报表")'>TTG电子游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='sareport' v-if='authorityStr.includes("SA")'>
                        <template slot="title">SA游戏报表</template>
                        <MenuItem name="saAll" v-if='permission.includes("SA游戏总报表")'>SA游戏总报表</MenuItem>
                        <MenuItem name="satrue" v-if='permission.includes("SA真人游戏报表")'>SA真人游戏报表</MenuItem>
                        <MenuItem name="safishing" v-if='permission.includes("SA捕鱼游戏报表")'>SA捕鱼游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='mgreport' v-if='authorityStr.includes("MG")'>
                        <template slot="title">MG游戏报表</template>
                        <MenuItem name="mgvideo" v-if='permission.includes("MG电子游戏报表")'>MG电子游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='agreport' v-if='authorityStr.includes("AG")'>
                        <template slot="title">AG游戏报表</template>
                        <MenuItem name="agtrue" v-if='permission.includes("AG真人游戏报表")'>AG真人游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='ugreport' v-if='authorityStr.includes("UG")'>
                        <template slot="title">UG游戏报表</template>
                        <MenuItem name="ugsport" v-if='permission.includes("UG体育游戏报表")'>UG体育游戏报表</MenuItem>
                    </Submenu>
                </Submenu>
                <Submenu name="businessCenter" v-if='authorityStr.includes("线路商列表")||authorityStr.includes("商户列表")||authorityStr.includes("接入商点数警告列表")'>
                    <template slot="title">
                        商户中心
                    </template>
                    <MenuItem name="lineBusiness" v-if='permission.includes("线路商列表")'>线路商列表</MenuItem>
                    <MenuItem name="businessList" v-if='permission.includes("商户列表")'>商户列表</MenuItem>
                    <MenuItem name="warnList" v-if='permission.includes("接入商点数警告列表")'>接入商点数警告列表</MenuItem>
                </Submenu>
                <Submenu name="playerCenter" v-if='authorityStr.includes("玩家列表")'>
                  <template slot="title">
                    玩家中心
                  </template>
                  <MenuItem name="playList" v-if='permission.includes("玩家列表")'>玩家列表</MenuItem>
                </Submenu>
                <Submenu name="adminCenter" v-if='authorityStr.includes("管理员列表")||authorityStr.includes("线路号列表")||authorityStr.includes("管理员角色列表")'>
                    <template slot="title">
                        管理员中心
                    </template>
                    <MenuItem name="adminList" v-if='permission.includes("管理员列表")'>管理员列表</MenuItem>
                    <MenuItem name="adminRole" v-if='permission.includes("管理员角色列表")'>管理员角色列表</MenuItem>
                    <MenuItem name="lineNumList" v-if='permission.includes("线路号列表")'>线路号列表</MenuItem>
                </Submenu>
                <Submenu name="logCenter" v-if='authorityStr.includes("日志")'>
                    <template slot="title">
                        日志中心
                    </template>
                    <MenuItem name="lineLoginLog" v-if='permission.includes("线路商登录日志")'>线路商登录日志</MenuItem>
                    <MenuItem name="merchantLog" v-if='permission.includes("商户登录日志")'>商户登录日志</MenuItem>
                    <MenuItem name="adminLog" v-if='permission.includes("管理员操作日志")'>管理员操作日志</MenuItem>
                    <MenuItem name="debugLog" v-if='permission.includes("DEBUG日志")'>DEBUG日志</MenuItem>
                </Submenu>

                <Submenu name="operation">
                    <template slot="title">
                      运营中心
                    </template>
                    <MenuItem name="gameNoticeList" v-if='permission.includes("游戏公告列表")'>游戏公告列表</MenuItem>
                    <MenuItem name="gameMailList" v-if='permission.includes("游戏邮件列表")'>游戏邮件列表</MenuItem>
                    <MenuItem name="horseRaceLampList" v-if='permission.includes("跑马灯列表")'>跑马灯列表</MenuItem>
                    <MenuItem name="businessRecord" v-if='permission.includes("商户运营记录")'>商户运营记录</MenuItem>
                    <MenuItem name="boothList" v-if='permission.includes("展位列表")'>展位列表</MenuItem>
                    <MenuItem name="propPrice" v-if='permission.includes("道具定价")'>道具定价</MenuItem>
                </Submenu>
              <!--
                <Submenu name="12">
                    <template slot="title">
                        系统设置
                    </template>
                    <Submenu name='27'>
                        <template slot="title">登录日志</template>
                        <MenuItem name="271">线路商登录日志</MenuItem>
                        <MenuItem name="272">商户登录日志</MenuItem>
                    </Submenu>
                    <Submenu name='28'>
                        <template slot="title">操作日志</template>
                        <MenuItem name="281">管理员操作日志</MenuItem>
                    </Submenu>
                    <Submenu name='29'>
                        <template slot="title">管理员管理</template>
                        <MenuItem name="291">管理员列表</MenuItem>
                        <MenuItem name="292">添加管理员</MenuItem>
                        <MenuItem name="293">管理员角色列表</MenuItem>
                        <MenuItem name="294">新增管理员角色</MenuItem>
                    </Submenu>
                    <MenuItem name="12-1">线路号列表</MenuItem>
                    <MenuItem name="12-2">Debug操作日志</MenuItem>
                </Submenu> -->
            </Menu>
        </Sider>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // let permission = this.permission;
    // let str = permission.toString();
    // console.log(str.includes("报表"));
  },
  methods: {
    selectMenu(name) {
      if (name == "jump") {
        this.$Message.success("跳转中,如有弹窗拦截,请允许");
        this.$store.dispatch("getGameSign", { gameType: 30000 }).then(res => {
          window.open(res.url);
        });
      } else {
        this.$router.push({ name: name });
      }
    }
  },
  computed: {
    permission() {
      return JSON.parse(localStorage.getItem("userInfo")).subRolePermission;
    },
    authorityStr() {
      return this.permission.toString();
    }
  },
  props: ["openName"],
  updated() {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened();
      }
    });
  }
};
</script>

<style scoped>
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.logoimg {
  max-width: 180px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
