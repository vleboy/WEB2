<template>
    <div class="killprofit">
        <div class="search clear">
            <div class="right">
                <RadioGroup v-model="source" type="button" @on-change='changeSource'>
                    <Radio label="0">1月</Radio>
                    <Radio label="1">7天</Radio>
                    <Radio label="2">3天</Radio>
                    <Radio label="3">昨天</Radio>
                </RadioGroup>
                <DatePicker type="daterange" v-model="range" :editable='false' @on-change="changeRange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
            </div>
        </div>
        <kill-profit-item
         range="历史"
         chartId="1"
         :profit="profitCountHistory" 
         :killRate="killRateHistory"
         :profitArr="profitTotalArr"
         :killRateArr="killTotalArr"         
          />
        <kill-profit-item 
        range="今日" 
        chartId="2"
        :profit="profitCountToday" 
        :killRate="killRateToday"
        :profitArr="profitTodayArr"
        :killRateArr="killTodayArr" 
         />
        <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHour' @click="seeHourChart">点击查看每小时盈利曲线</Button>
        </div>
        <hour-chart title="每小时盈利"
         hourId="1"
         :legend="['今日盈利', '7日平均盈利']"
         :todayArr="profitHourTodayArr"
         :avarageArr="profitHourAvArr"
          v-if="showHour" />
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import KillProfitItem from "@/components/KillProfitItem";
import HourChart from "@/components/HourChart";
import { mapState } from "vuex";
export default {
  name: "",
  components: { KillProfitItem, HourChart },
  filters: {},
  props: {},
  data() {
    return {
      source: "",
      range: "",
      showHour: false,
      //kill
      profitCountHistory: 0,
      profitCountToday:0,
      killRateHistory: {},
      killRateToday:{},
      //chartdata
      killTotalArr:[],
      profitTotalArr:[],
      profitTodayArr:[],
      killTodayArr:[],
      profitHourTodayArr:[],
      profitHourAvArr:[],//7day avrage
    };
  },
  computed: {
    // gameDetail(){
    //     return this.$store.state.gameDetail
    // },
    ...mapState(["gameDetail"])
  },
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init(){
      let game = this.gameDetail; 
      let today=game.killRateAndEarn_today
      let total=game.killRateAndEarn_total
      this.profitCountHistory=total.earn.total.total;
      this.killRateHistory=total.killRate.total
      this.profitCountToday=today.earn.total.total;
      this.killRateToday=today.killRate.total
      //历史
      let profitTotalArr=[];
      let killTotalArr=[]
      for(let [key,val] of Object.entries(total.earn.games)){
          profitTotalArr.push({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
      }
      for(let [key,val] of Object.entries(total.killRate.games)){
          killTotalArr.push({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
      }
      this.profitTotalArr=profitTotalArr
      this.killTotalArr=killTotalArr
      //今日
      let profitTodayArr=[];
      let killTodayArr=[]
      for(let [key,val] of Object.entries(today.earn.games)){
          profitTodayArr.push({
            value:val.total,
          '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
      }
      for(let [key,val] of Object.entries(today.killRate.games)){
          killTodayArr.push({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
      }
      this.profitTodayArr=profitTodayArr
      this.killTodayArr=killTodayArr;
      this.profitHourTodayArr=game.todayDetail.today.total.earn
      this.profitHourAvArr=game.todayDetail.lastWeekArg.total.earn
    },
    changeSource() {
      console.log(this.source);
    },
    changeRange() {
      let range = this.range.map(item => {
        return item.getTime();
      });
      console.log(range);
    },
    seeHourChart() {
      this.showHour = true;
    }
  }
};
</script>
<style lang="less" scoped>
.killprofit {
  background-color: #fff;
  margin-top: 15px;
  .search {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .btn {
    text-align: center;
    .morebtn {
      width: 250px;
      margin-top: 10px;
      margin-bottom: 15px;
    }
  }
}
</style>
