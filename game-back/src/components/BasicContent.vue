<template>
    <div class="basic">
        <div class="search clear">
            <div class="left">
                <Input v-model="acount" placeholder="输入账号" style="width: 200px"></Input>
                <Input v-model="id" placeholder="输入ID" style="width: 200px"></Input>
                <Button type="primary" @click="search">搜索</Button>
            </div>
        </div>
        <on-line/>
        <kill-profit/>
        <game-summary/>
        <on-line-hour/>
        <hit-rate/>
        <price-mix/>
    </div>
</template>
<script>
import HitRate from '@/components/HitRate'
import OnLineHour from '@/components/OnlineHour'
import KillProfit from '@/components/KillProfit'
import OnLine from '@/components/Online'
import GameSummary from '@/components/GameSummary'
import PriceMix from '@/components/PriceMix'
export default {
  name:'basicContent',
  components:{GameSummary,OnLine,KillProfit,OnLineHour,HitRate,PriceMix},
  props:{
    gameType:Number
  },
  data() {
    return {
      acount: "",
      id: "",
      source: "",
      range: "",
    };
  },
  computed:{

  },
  created(){
    // console.log(this.gameType);
  },
  mounted() {
    
  },
  methods: {
    changeSource() {
      let range = {};
      switch (+this.source) {
        case 0:
          range.startTime = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
          range.endTime = new Date().getTime();
          break;
        case 1:
          range.startTime = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
          range.endTime = new Date().getTime();
          break;
        case 2:
          range.startTime = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;
          range.endTime = new Date().getTime();
          break;
        case 3:
          let zero = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
          range.startTime = zero - 86400000;
          range.endTime = zero;
          break;
      }
      console.log(range);
    },
    search(){
      console.log('id==>',this.id);
      console.log('acount==>',this.acount);
    },
  }
};
</script>
<style lang="less" scoped>
.basic {
  min-height: 91vh;
  .search {
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    padding-bottom: 15px;
  }

}
</style>

