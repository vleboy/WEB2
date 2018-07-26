<template>
    <div class="home">
        <sidebar/>
        <div class="breadcrumb">
            <bread-crumb :currentPath="currentPath"></bread-crumb>
        </div>
        <Layout :style="{marginLeft: '200px',marginRight:'300px'}">
            <Content>
                <Card>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </Card>
            </Content>
        </Layout>
        <rank></rank>
    </div>
</template>
<script>
import sidebar from "@/components/sidebar";
import breadCrumb from "@/components/bread-crumb";
import rank from "@/components/rank";
export default {
  data() {
    return {};
  },
  computed: {
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    }
  },
  created() {},
  watch: {
    $route(to, from) {
       console.log(to);
    }
  },
  components: { sidebar, rank, breadCrumb }
};
</script>
<style lang="less" scoped>
.home {
  .breadcrumb {
    height: 36px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 200px;
  }
}
</style>
