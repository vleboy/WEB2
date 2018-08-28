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
            :profit="profitCountAll"
            :KillRate="killRateAll"
        />
        <kill-profit-item range="今日" chartId="2"/>
        <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHour' @click="seeHourChart">点击查看每小时盈利曲线</Button>
        </div>
        <hour-chart title="每小时盈利" hourId="1" :legend="['今日下注', '7日平均下注']" v-if="showHour"/>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import KillProfitItem from '@/components/KillProfitItem'
import HourChart from '@/components/HourChart'
export default {
    name:'',
    components:{KillProfitItem,HourChart},
    filters:{
        
    },
    props:{

    },
    data(){
        return{
            source:'',
            range:'',
            showHour:false,
            profitCountAll:0,
            killRateAll:[]
        }
    },
    computed:{

    },
    watch:{

    },
    created(){
        let game=this.$store.state.gameDetail;
        console.log(game);
        let rateAverage=0;
        let profitCount=0;
        let level1=0;
        let level2=0;
        let level3=0;
        let len=0;
        for (let [key, value] of Object.entries(game)){
            console.log(value);
            len=key.length
            level1+= value.betLevel.level_1.killRate
            level2+= value.betLevel.level_2.killRate
            level3+= value.betLevel.level_3.killRate
           for (let [k, v] of Object.entries(value.betLevel)){
               profitCount+=v.earn
               rateAverage+=v.killRate
           }
        }
        profitCount=profitCount.toFixed(2)
        this.profitCountAll=profitCount
        console.log(rateAverage);
        // console.log(level1,level2,level3);
        let killRate=[];

    },
    mounted(){

    },
    methods:{
       changeSource(){
           console.log(this.source);
       },
       changeRange(){
           let range = this.range.map(item => {
            return item.getTime();
            });
            console.log(range);
       },
       seeHourChart(){
           this.showHour=true;
       },
    }
}
</script>
<style lang="less" scoped>
    .killprofit{
        background-color: #fff;
        margin-top: 15px;
        .search{
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .btn{
            text-align: center;
            .morebtn{
                width: 250px;
                margin-top: 10px;
                margin-bottom: 15px;
            }
        }
    }
</style>
