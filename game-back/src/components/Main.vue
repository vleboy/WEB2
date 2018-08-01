<template>
    <div class="home">
        <side-bar/>
        <div class="breadcrumb">
            <bread-crumb :currentPath="currentPath"/>
        </div>
        <Layout :style="{marginLeft: '200px',marginRight:'300px'}">
            <Content>
                <Card :style="{backgroundColor:'#f5f5f5'}">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </Card>
            </Content>
        </Layout>
        <game-rank/>
    </div>
</template>
<script>
import SideBar from "@/components/SideBar";
import BreadCrumb from "@/components/BreadCrumb";
import GameRank from "@/components/GameRank";
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
  components: { SideBar, GameRank, BreadCrumb }
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
