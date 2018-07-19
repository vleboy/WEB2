<template>
    <div class="onlineDetail">
        <div class="hour">
            <p class="secTitle">每小时在线人数</p>
            <div id="barChart1" class="charts"></div>
        </div>
        <div class="average">
            <p class="secTitle">玩家平均在线时长</p>
            <p>
                <span class="sumItem">7日: {{hour1}}小时</span>
                <span class="sumItem">昨日: {{hour2}}小时</span>
            </p>
            <div id="barChart1" class="charts"></div>
        </div>
        <div class="everytime">
            <p class="secTitle">玩家每次登陆平均在线时长</p>
            <p>
                <span class="sumItem">7日: {{hour1}}小时</span>
                <span class="sumItem">昨日: {{hour2}}小时</span>
            </p>
            <div id="barChart1" class="charts"></div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
</style>

