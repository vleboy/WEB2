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
      //hitrate
      this.$store.commit('currentGameId',{params:this.gameType})
      let hitRate = this.gameDetail.hitDetail;
      let hitGames=hitRate.games;
      //winkind
      let winKindDetail=this.gameDetail.winKindDetail
      let winGames=winKindDetail.games;
      // freeSelect
      let freeSelect=this.gameDetail.freeModeSelectDetail;
      let freeSelectGames=freeSelect.games
      //hourChart
      let hourChart=this.gameDetail.todayDetail
      let hourGames=hourChart.games
      let detail,killItem,winItem,freeSelectItem,hourItem
      switch (this.gameType) {
        //全部游戏
        case 1:
          //kill
          killItem = hitRate.total;
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          //win
          winItem=winKindDetail.total
          this.getWinKind(winItem)
          //select
          freeSelectItem=freeSelect.total
          this.getFreeSelect(freeSelectItem)
          //hourChart
          hourItem=hourChart.total
          this.getHourChart(hourItem)
          break;
        case 41001:
          killItem=hitGames['41001']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['41001']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['41001']
          this.getFreeSelect(freeSelectItem)
          hourItem=hourGames['41001']
          this.getHourChart(hourItem)
          break;
         case 41002:
          killItem=hitGames['41002']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['41002']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['41002']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['41002']
          this.getHourChart(hourItem)
          break;
        case 41003:
          killItem=hitGames['41003']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
           winItem=winGames['41003']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['41003']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['41003']
          this.getHourChart(hourItem)
          break;
        case 42001:
          killItem=hitGames['42001']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42001']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42001']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42001']
          this.getHourChart(hourItem)
          break;
        case 42002:
          killItem=hitGames['42002']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42002']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42002']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42002']
          this.getHourChart(hourItem)
          break;
        case 42003:
          killItem=hitGames['42003']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42003']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42003']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42003']
          this.getHourChart(hourItem)
          break;
        case 42004:
          killItem=hitGames['42004']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42004']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42004']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42004']
          this.getHourChart(hourItem)
          break;
        case 42005:
          killItem=hitGames['42005']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42005']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42005']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42005']
          this.getHourChart(hourItem)
          break;
        case 42006:
          killItem=hitGames['42006']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42006']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42006']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42006']
          this.getHourChart(hourItem)
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
    getWinKind(item){
      let free=item.free
      let normal=item.normal
      let freeData=[]
      let normalData=[]
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
          this.$store.commit('savePriceNormalData',{params:normalData})
          this.$store.commit('savePriceFreeData',{params:freeData})
          this.$store.commit('savePriceFreeCount',{params:free.totalPay})
          this.$store.commit('savePriceNormalCount',{params:normal.totalPay})
    },
    getFreeSelect(item){
      let freeSelectData=[]
      for(let[key,val] of Object.entries(item)){
              freeSelectData.push({
                name:val.name,
                value:val.count,
                '比率':val.rate+'%',
                '0.25-2.5':val.level_1,
                '5-50':val.level_2,
                '125-500':val.level_3
              })
          }
      this.$store.commit('saveFreeChooseData',{params:freeSelectData})
    },
    getHourChart(item){
      console.log(item);
      this.$store.commit('saveProfitHourTodayArr',{params:item.today.earn})
      this.$store.commit('saveProfitHourAvArr',{params:item.lastWeekArg.earn})
      this.$store.commit('saveBetHourTodayArr',{params:item.today.bet})
      this.$store.commit('saveBetHourAvArr',{params:item.lastWeekArg.bet})
      this.$store.commit('saveCountHourTodayArr',{params:item.today.betCount})
      this.$store.commit('saveCountHourAvArr',{params:item.lastWeekArg.betCount})
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

