<template>
 <div class="home">
      <sidebar></sidebar>
        <Layout :style="{marginLeft: '256px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                   <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-right: 10px;"></Avatar>
                            <Dropdown transfer trigger="click" @click="handleClickUserDropdown">
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
                    <div style="height: 600px">content</div>
                </Card>
            </Content>
        </Layout>
 </div>
</template>
<script>
import sidebar from "@/components/sidebar";
export default {
  data() {
    return {
      avatorPath: "",
      userName: "test"
    };
  },
  methods: {
    handleClickUserDropdown() {
      if (name === "ownSpace") {

      } else if (name === "loginout") {
        // 退出登录
      }
    }
  },
  components: { sidebar }
};
</script>
<style lang="scss" scoped>

</style>
