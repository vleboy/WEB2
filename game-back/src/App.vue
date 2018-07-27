<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route(to, from) {
      let path = [
        {
          title: to.meta.title,
          path: to.path,
          name: to.name
        }
      ];
      if (from.name == "rankDetail"||to.name == "rankDetail") {
        this.$store.commit("setCurrentPath", path);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./assets/css/common.less";
</style>

