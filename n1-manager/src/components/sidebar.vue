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
                <Submenu name="businessCenter">
                    <template slot="title">
                        <Icon type="model-s"></Icon>
                        商户中心
                    </template>
                    <MenuItem name="managerList">线路商列表</MenuItem>
                    <MenuItem name="merchantList">商户列表</MenuItem>
                </Submenu>
                <Submenu name="playerCenter">
                    <template slot="title">
                        <Icon type="ios-game-controller-b"></Icon>
                        玩家中心
                    </template>
                    <MenuItem name="playList">玩家列表</MenuItem>
                </Submenu>
                <Submenu name="logCenter">
                    <template slot="title">
                        <Icon type="bug"></Icon>
                        日志中心
                    </template>
                    <MenuItem name="managerLog">线路商登录日志</MenuItem>
                    <MenuItem name="merchantLog">商户登录日志</MenuItem>
                    <MenuItem name="opreateLog">管理员操作日志</MenuItem>
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
  created() {
    // let game=this.gameList;
    // console.log(game);
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
    gameList() {
      let games = JSON.parse(localStorage.userInfo).gameList;
      let arr = [];
      for (let item of games) {
        arr.push(item.name);
      }
      return arr;
    },
    gameStr() {
      return this.gameList.toString();
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
