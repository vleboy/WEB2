<template>
    <div class="sider">
        <Sider width='256px' collapsible hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu ref="sideMenu" :active-name="$route.name" :open-names="openName" theme="dark" width="auto" @on-select='selectMenu'>
                <MenuItem name="home">
                <span>看板</span>
                </MenuItem>
                <MenuItem name="ownspace-index">
                <span>个人中心</span>
                </MenuItem>
                <Submenu name="report">
                    <template slot="title">
                        输赢报表
                    </template>
                    <MenuItem name="allreport">公司输赢总报表</MenuItem>
                    <Submenu name='ugreport'>
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
                    <Submenu name='mgreport'>
                        <template slot="title">MG游戏报表</template>
                        <MenuItem name="mgvideo">MG电子游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='agreport'>
                        <template slot="title">AG游戏报表</template>
                        <MenuItem name="agtrue">AG真人游戏报表</MenuItem>
                    </Submenu>
                    <Submenu name='ugreport'>
                        <template slot="title">UG游戏报表</template>
                        <MenuItem name="ugsport">UG体育游戏报表</MenuItem>
                    </Submenu>
                </Submenu>
                <Submenu name="8">
                    <template slot="title">
                        商户中心
                    </template>
                    <Submenu name='22'>
                        <template slot="title">线路商管理</template>
                        <MenuItem name="aa">线路商列表</MenuItem>
                        <MenuItem name="bb">创建线路商</MenuItem>
                    </Submenu>
                    <Submenu name='23'>
                        <template slot="title">商户管理</template>
                        <MenuItem name="aaa">商户列表</MenuItem>
                        <MenuItem name="bbb">创建商户</MenuItem>
                    </Submenu>
                    <MenuItem name="8-1">接入商点数警告列表</MenuItem>
                </Submenu>
                <Submenu name="9">
                    <template slot="title">
                        玩家中心
                    </template>
                    <MenuItem name="9-1">玩家列表</MenuItem>
                </Submenu>
                <Submenu name="10">
                    <template slot="title">
                        游戏中心
                    </template>
                    <MenuItem name="10-1">游戏列表</MenuItem>
                </Submenu>
                <Submenu name="11">
                    <template slot="title">
                        运营中心
                    </template>
                    <Submenu name='24'>
                        <template slot="title">公告管理</template>
                        <MenuItem name="aac">游戏公告列表</MenuItem>
                        <MenuItem name="bbba">跑马灯列表</MenuItem>
                    </Submenu>
                    <Submenu name='25'>
                        <template slot="title">邮件管理</template>
                        <MenuItem name="322">游戏邮件列表</MenuItem>
                    </Submenu>
                    <Submenu name='26'>
                        <template slot="title">展位管理</template>
                        <MenuItem name="3">展位列表</MenuItem>
                    </Submenu>
                    <MenuItem name="11-1">商户运营记录</MenuItem>
                    <MenuItem name="11-2">道具造价</MenuItem>
                </Submenu>
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
  methods: {
    selectMenu(name) {
      if (name == "jump") {
        this.$Message.success('跳转中,如有弹窗拦截,请允许')
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
</style>