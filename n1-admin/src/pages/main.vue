<template>
    <div class="home">
        <sidebar></sidebar>
        <Layout :style="{marginLeft: '256px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <div class="tags-con">
                    <tag-close :pageTagsList="pageTagsList"></tag-close>
                </div>
                <div class="user-dropdown-menu-con">
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Avatar :src="avatorPath" style="background: #619fe7;margin-right: 10px;"></Avatar>
                        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)">
                                <span class="main-user-name">{{ userName }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Row>
                </div>
            </Header>
            <Content>
                <Card>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import sidebar from "@/components/sidebar";
import tagClose from "@/components/tags-close.vue";
export default {
  data() {
    return {
      avatorPath: "",
      userName: "test"
    };
  },
  computed: {
    pageTagsList() {
      return this.$store.state.home.pageOpenedList; // 打开的页面的页面对象
    }
  },
  methods: {
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        this.$router.push({ name: "ownspace" });
      } else if (name === "loginout") {
        // 退出登录
      }
    }
  },
  components: { sidebar, tagClose }
};
</script>
<style lang="less" scoped>
.tags-con {
  height: 64px;
  z-index: 111;
  overflow: hidden;
//   background: #f0f0f0;
  float: left;
}
.user-dropdown-menu-con {
  float: right;
}
.ivu-layout-header{
    padding:0 50px 0 10px;
}
</style>
