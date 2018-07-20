<template>
    <div class="sider">
        <Sider width='256px' collapsible hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <img class="logoimg" src="../../static/logo.png" alt="">
            <Menu ref="sideMenu" :active-name="$route.name" :open-names="openName" theme="dark" width="auto" @on-select='selectMenu'>
                <MenuItem name="board">
                <Icon type="stats-bars"></Icon>
                  <span>看板</span>
                </MenuItem>
                <MenuItem name="ownspace-index">
                <Icon type="person"></Icon>
                <span>个人中心</span>
                </MenuItem>
                <Submenu name="report">
                    <template slot="title">
                        <Icon type="ios-paper-outline"></Icon>
                        输赢报表
                    </template>
                    <MenuItem name="allreport">公司输赢总报表</MenuItem>
                    <Submenu name='nareport'>
                        <template slot="title">NA游戏报表</template>
                        <MenuItem name="naAll">NA游戏总报表</MenuItem>
                        <MenuItem name="navideo">NA电子游戏报表</MenuItem>
                        <MenuItem name="nastreet">NA街机游戏报表</MenuItem>
                        <MenuItem name="natrue">NA真人游戏报表</MenuItem>
                        <MenuItem name="jump">NA真人游戏报表(跳转)</MenuItem>
                        <MenuItem name="nacard">NA棋牌游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='ttgreport'>
                        <template slot="title">TTG游戏报表</template>
                        <MenuItem name="ttgvideo">TTG电子游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='sareport'>
                        <template slot="title">SA游戏报表</template>
                        <MenuItem name="saAll">SA游戏总报表</MenuItem>
                        <MenuItem name="satrue">SA真人游戏报表</MenuItem>
                        <MenuItem name="safishing">SA捕鱼游戏报表</MenuItem>
                    </Submenu>
                     <Submenu name='sbreport'>
                        <template slot="title">SB游戏报表</template>
                        <MenuItem name="sbAll">SB游戏总报表</MenuItem>
                        <MenuItem name="sbvideo">SB电子游戏报表</MenuItem>
                        <MenuItem name="sbtrue">SB真人游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='mgreport'>
                        <template slot="title">MG游戏报表</template>
                        <MenuItem name="mgvideo">MG电子游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='agreport'>
                        <template slot="title">AG游戏报表</template>
                        <MenuItem name="agtrue">AG真人游戏报表</MenuItem>
                    </Submenu>
                     <Submenu name='rtgReport' >
                        <template slot="title">RTG游戏报表</template>
                        <MenuItem name="rtgGame">RTG电子游戏报表</MenuItem>
                    </Submenu>
                     <Submenu name='dtReport'>
                        <template slot="title">DT游戏报表</template>
                        <MenuItem name="dtGame">DT电子游戏报表</MenuItem>
                    </Submenu>
                     <Submenu name='ysbReport' >
                        <template slot="title">YSB游戏报表</template>
                        <MenuItem name="ysbSport">YSB体育游戏报表</MenuItem>
                    </Submenu>
                </Submenu>
                <Submenu name="agentCenter">
                    <template slot="title">
                        <Icon type="model-s"></Icon>
                        代理中心
                    </template>
                    <MenuItem name="agentList">代理列表</MenuItem>
                    <MenuItem name="warnList">接入商点数警告列表</MenuItem>
                </Submenu>
                <Submenu name="playerCenter">
                  <template slot="title">
                        <Icon type="ios-game-controller-b"></Icon>
                    玩家中心
                  </template>
                  <MenuItem name="playList" >玩家列表</MenuItem>
                </Submenu>
                <Submenu name="adminCenter" v-if="level==0">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        管理中心
                    </template>
                    <MenuItem name="adminList">管理员列表</MenuItem>
                    <!-- <MenuItem name="adminRole">管理员角色列表</MenuItem> -->
                </Submenu>
                <Submenu name="gameCenter" v-if="level==0">
                    <template slot="title">
                        <Icon type="gear-b"></Icon>
                        游戏中心
                    </template>
                    <MenuItem name="gameConfig">包房代理游戏配置</MenuItem>
                </Submenu>
                <Submenu name="logCenter">
                    <template slot="title">
                        <Icon type="bug"></Icon>
                        日志中心
                    </template>
                    <MenuItem name="adminLoginLog" v-if="level==0">管理员登录日志</MenuItem>
                    <MenuItem name="agentLoginLog">代理登录日志</MenuItem>
                    <MenuItem name="adminOpreateLog" v-if="level==0">管理员操作日志</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed:{
      level(){
          return JSON.parse(localStorage.getItem('userInfo')).level
      }
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
