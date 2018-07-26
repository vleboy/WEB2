<template>
    <div class="home">
        <sidebar/>
        <div class="breadcrumb">
            <bread-crumb :currentPath="currentPath"></bread-crumb>
        </div>
        <Layout :style="{marginLeft: '200px'}">
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
import breadCrumb from "@/components/bread-crumb";
export default {
  data() {
    return {};
  },
  computed: {
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    }
  },
  components: { sidebar, breadCrumb }
};
</script>
<style lang="less" scoped>
.home {
  .breadcrumb {
    height: 40px;
    line-height: 40px;
    margin-left: 210px;
  }
}
</style>
