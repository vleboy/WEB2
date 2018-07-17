<template>
    <div class="sider">
        <Sider width='200px' collapsible hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu ref="sideMenu" :active-name="$route.name" :open-names="openName" theme="dark" width="auto" @on-select='selectMenu'>
                <MenuItem name="allGame">
                    <Icon type="stats-bars"></Icon>
                    <span>全部游戏—基本信息</span>
                </MenuItem>
                <MenuItem name="taluo">
                    <Icon type="person"></Icon>
                    <span>塔罗之谜</span>
                </MenuItem>
                <MenuItem name="chuliang">
                    <Icon type="person"></Icon>
                    <span>小厨娘</span>
                </MenuItem>
                <MenuItem name="xianglong">
                    <Icon type="person"></Icon>
                    <span>祥龙献瑞</span>
                </MenuItem>
                <MenuItem name="shengshou">
                    <Icon type="person"></Icon>
                    <span>四方神兽</span>
                </MenuItem>
                <MenuItem name="caisheng">
                    <Icon type="person"></Icon>
                    <span>财神进宝</span>
                </MenuItem>
                <MenuItem name="hengtong">
                    <Icon type="person"></Icon>
                    <span>福运亨通</span>
                </MenuItem>
                <MenuItem name="panda">
                    <Icon type="person"></Icon>
                    <span>熊猫传奇</span>
                </MenuItem>
                <MenuItem name="football">
                    <Icon type="person"></Icon>
                    <span>幸运足球</span>
                </MenuItem>
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
      this.$router.push({ name: name });
    }
  },
  computed: {},
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
