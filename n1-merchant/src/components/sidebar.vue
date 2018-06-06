<template>
    <div class="sider">
        <Sider width='256px' collapsible hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <img class="logoimg" src="../../static/logo.png" alt="">
            <Menu ref="sideMenu" :active-name="$route.name" :open-names="openName" theme="dark" width="auto" @on-select='selectMenu'>
                <MenuItem name="board">
                <span>看板</span>
                </MenuItem>
                <MenuItem name="ownspace-index">
                <span>个人中心</span>
                </MenuItem>
                <Submenu name="report" v-if="gameList.length>0">
                    <template slot="title">
                        输赢报表
                    </template>
                    <MenuItem name="allreport" v-if="gameList.length>0">公司输赢总报表</MenuItem>
                    <Submenu name='nareport' v-if="gameStr.includes('NA')">
                        <template slot="title">NA游戏报表</template>
                        <MenuItem name="naAll" v-if="gameStr.includes('NA')">NA游戏总报表</MenuItem>
                        <MenuItem name="navideo" v-if="gameList.includes('NA电子游戏')">NA电子游戏报表</MenuItem>
                        <MenuItem name="nastreet" v-if="gameList.includes('NA街机游戏')">NA街机游戏报表</MenuItem>
                        <MenuItem name="natrue" v-if="gameStr.includes('NA真人')">NA真人游戏报表</MenuItem>
                        <MenuItem name="jump" v-if="gameStr.includes('NA真人')">NA真人游戏报表(跳转)</MenuItem>
                        <MenuItem name="nacard" v-if="gameList.includes('NA棋牌游戏')">NA棋牌游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='ttgreport' v-if="gameList.includes('TTG电子游戏')">
                        <template slot="title">TTG游戏报表</template>
                        <MenuItem name="ttgvideo" v-if="gameList.includes('TTG电子游戏')">TTG电子游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='sareport' v-if="gameStr.includes('SA')">
                        <template slot="title">SA游戏报表</template>
                        <MenuItem name="saAll" v-if="gameStr.includes('SA')">SA游戏总报表</MenuItem>
                        <MenuItem name="satrue" v-if="gameStr.includes('SA真人')">SA真人游戏报表</MenuItem>
                        <MenuItem name="safishing" v-if="gameStr.includes('SA捕鱼')">SA捕鱼游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='mgreport' v-if="gameList.includes('MG电子游戏')">
                        <template slot="title">MG游戏报表</template>
                        <MenuItem name="mgvideo" v-if="gameList.includes('MG电子游戏')">MG电子游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='agreport' v-if="gameStr.includes('AG真人')">
                        <template slot="title">AG游戏报表</template>
                        <MenuItem name="agtrue" v-if="gameStr.includes('AG真人')">AG真人游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='ugreport' v-if="gameList.includes('UG体育游戏')">
                        <template slot="title">UG游戏报表</template>
                        <MenuItem name="ugsport" v-if="gameList.includes('UG体育游戏')">UG体育游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='ysbReport' v-if="gameList.includes('YSB体育游戏')">
                        <template slot="title">YSB游戏报表</template>
                        <MenuItem name="ysbSport" v-if="gameList.includes('YSB体育游戏')">YSB体育游戏报表</MenuItem>
                    </Submenu>
                </Submenu>
                <Submenu name="playerCenter">
                    <template slot="title">
                        玩家中心
                    </template>
                    <MenuItem name="playList">玩家列表</MenuItem>
                </Submenu>
                <Submenu name="operation">
                    <template slot="title">
                        运营中心
                    </template>
                    <MenuItem name="gameNoticeList">游戏公告列表</MenuItem>
                    <MenuItem name="gameMailList">游戏邮件列表</MenuItem>
                    <MenuItem name="horseRaceLampList" >跑马灯列表</MenuItem>
                    <MenuItem name="boothList">展位列表</MenuItem>
                </Submenu>
                <Submenu name="logCenter">
                    <template slot="title">
                        日志中心
                    </template>
                    <MenuItem name="opreateLog">操作日志</MenuItem>
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
      return arr
    },
    gameStr(){
        return this.gameList.toString()
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
