<template>
    <div class="rankdetail">
        <Button type="primary">今天</Button>
        <Row>
            <Col span="8">
            <profit></profit>
            </Col>
            <Col span="8">
            <bet-amount></bet-amount>
            </Col>
            <Col span="8">
            <game-count></game-count>
            </Col>
        </Row>
    </div>
</template>
<script>
import profit from "@/components/rank/profit";
import gameCount from "@/components/rank/gameCount";
import betAmount from "@/components/rank/betAmount";
export default {
  data() {
      return{

      }
  },
  components:{profit,gameCount,betAmount}
};
</script>
<style lang="less" scoped>
.rankdetail{
    min-height: 91vh;
}
</style>
