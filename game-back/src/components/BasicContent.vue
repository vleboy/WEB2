<template>
  <div class="basic">
    <div class="search clear">
      <div class="left">
        <Input v-model="acount" placeholder="输入账号" style="width: 200px"></Input>
        <Input v-model="id" placeholder="输入ID" style="width: 200px"></Input>
        <Button type="primary" @click="search">搜索</Button>
      </div>
    </div>
    <on-line 
    :sum="sum"
    :OnlineList="OnlineList"
    />
    <kill-profit/>
    <game-summary/>
    <on-line-hour/>
    <hit-rate 
    :hitRateCount="hitRateCount" 
    :gameCount="gameCount" 
    :xAxis="hitXaxis" 
    :data="hitRateData" />
    <price-mix/>
  </div>
</template>
<script>
import HitRate from "@/components/HitRate";
import OnLineHour from "@/components/OnlineHour";
import KillProfit from "@/components/KillProfit";
import OnLine from "@/components/Online";
import GameSummary from "@/components/GameSummary";
import PriceMix from "@/components/PriceMix";
import { mapState } from "vuex";
import {GAME_LIST} from '@/config/gameList'
export default {
  name: "basicContent",
  components: {
    GameSummary,
    OnLine,
    KillProfit,
    OnLineHour,
    HitRate,
    PriceMix
  },
  props: {
    gameType: Number
  },
  data() {
    return {
      acount: "",
      id: "",
      source: "",
      range: "",
      hitRateCount: 0,
      gameCount: 0,
      hitXaxis: [],
      hitRateData: [],
      //online
      OnlineList:[],
      sum:0,
    };
  },
  computed: {
    ...mapState(["gameDetail","login"]),
  },
  created() {
    // console.log(this.gameType);
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      let hitRate = this.gameDetail.hitDetail;
      let winKindDetail=this.gameDetail.winKindDetail
      let hitGames=hitRate.games;
      let detail,killItem
      switch (this.gameType) {
        //全部游戏
        case 1:
          killItem = hitRate.total;
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          let free=winKindDetail.total.free
          let normal=winKindDetail.total.normal
          let freeSelect=this.gameDetail.freeModeSelectDetail.total
          let freeData=[]
          let normalData=[]
          let freeSelectData=[]
          for(let[key,val] of Object.entries(free)){
            if(key!='totalPay'){
              freeData.push({
                name:val.name,
                value:val.pay,
                '比率':val.rate+'%',
                '总次数':val.count,
                '0.25-2.5':val.level_1,
                '5-50':val.level_2,
                '125-500':val.level_3
              })
            }
          }
          for(let[key,val] of Object.entries(normal)){
            if(key!='totalPay'){
              normalData.push({
                name:val.name,
                value:val.pay,
                '比率':val.rate+'%',
                '总次数':val.count,
                '0.25-2.5':val.level_1,
                '5-50':val.level_2,
                '125-500':val.level_3
              })
            }
          }
          for(let[key,val] of Object.entries(freeSelect)){
              freeSelectData.push({
                name:val.name,
                value:val.count,
                '比率':val.rate+'%',
                '0.25-2.5':val.level_1,
                '5-50':val.level_2,
                '125-500':val.level_3
              })
          }
          this.$store.commit('savePriceNormalData',{params:normalData})
          this.$store.commit('savePriceFreeData',{params:freeData})
          this.$store.commit('saveFreeChooseData',{params:freeSelectData})
          this.$store.commit('savePriceFreeCount',{params:free.totalPay})
          this.$store.commit('savePriceNormalCount',{params:normal.totalPay})
          break;
          //单个游戏
        case 41001:
          killItem=hitGames['41001']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
         case 41002:
          killItem=hitGames['41002']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
        case 41003:
          killItem=hitGames['41003']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
        case 42001:
          killItem=hitGames['42001']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
        case 42002:
          killItem=hitGames['42002']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
        case 42003:
          killItem=hitGames['42003']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
        case 42004:
          killItem=hitGames['42004']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
        case 42005:
          killItem=hitGames['42005']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
        case 42006:
          killItem=hitGames['42006']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          break;
      }
      //当前在线
      let today=this.login.loginToday;
      let currentPeople=0;
      let now=new Date().getHours();
      for(let item of today){
          let name=this.gameName(item.gameId);
          let onlineCount=item.onlineUserCount[now]
          currentPeople+=item.onlineUserCount[now];
          this.OnlineList.push({
              name,
              count:onlineCount
          })
      }
      this.sum=currentPeople;
    },
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
    getKillRate(detail){
      for (let [key, val] of Object.entries(detail)) {
            this.hitXaxis.push(val.name);
            this.hitRateData.push({
              name: val.name,
              value: val.hitRate,
              '命中局数': val.hitCount,
              '赔付': val.hitPay.toFixed(2),
              "0.25-2.5": val.level_1,
              "5-50": val.level_2,
              "125-500": val.level_3
            });
          }
    },
    gameName(id){
            //遍历gametype 获取名字
            for (let key in GAME_LIST ){
                if(key === id){
                    return GAME_LIST[key]
                }
            }
        },
    search() {
      console.log("id==>", this.id);
      console.log("acount==>", this.acount);
    }
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

