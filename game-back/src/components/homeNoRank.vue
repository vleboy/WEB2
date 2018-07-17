<template>
    <div class="home">
        <sidebar/>
        <h2>老虎机数据统计后台</h2>
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
export default {
  data() {
    return {
     
    };
  },
  components: { sidebar }
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
