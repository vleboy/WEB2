<template>
    <div class="home">
        <sidebar/>
        <div class="breadcrumb">
            <bread-crumb :currentPath="currentPath"></bread-crumb>
        </div>
        <Layout :style="{marginLeft: '200px',marginRight:'310px'}">
            <Content>
                <Card :style="{backgroundColor:'#f5f5f5'}">
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
        let fromvuex=this.$store.state.app.currentPath
        if(fromvuex.length!=0){
            return fromvuex
        }else{
            return JSON.parse(localStorage.pathArr)
        }
    }
  },
  created() {},
  watch: {
    $route(to, from) {
      let pathArr = [];
      let current = {
        title: to.meta.title,
        path: to.path,
        name: to.name
      };
      pathArr.push(current);
      if (to.name.includes("Detail")) {
        let prePath = {
          title: from.meta.title,
          path: from.path,
          name: from.name
        };
        pathArr.unshift(prePath);
      }
      localStorage.pathArr=JSON.stringify(pathArr);
      this.$store.commit("setCurrentPath", pathArr);
    }
  },
  components: { sidebar, rank, breadCrumb }
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
