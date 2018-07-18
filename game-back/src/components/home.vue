<template>
    <div class="home">
        <sidebar/>
        <h2>老虎机数据统计后台:{{$route.meta.title}}</h2>
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
import rank from '@/components/rank'
export default {
  data() {
    return {
     
    };
  },
  computed:{

  },
  created(){
     
  },
  watch:{
    $route(to, from) {
    //  console.log(to);
    }
  },
  components: { sidebar,rank }
};
</script>
<style lang="less" scoped>
.home {
  h2 {
    text-align: center;
    line-height: 50px;
  }
}
</style>
