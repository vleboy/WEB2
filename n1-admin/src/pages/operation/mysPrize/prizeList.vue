<template>
    <div class="prizeList">
         <div class="search">
             <Input v-model="info" style="width: 200px" placeholder="请输入搜索内容"></Input>
            <DatePicker type="datetimerange" 
            :options="options" :editable='false' 
            v-model="defaultTime" 
            placeholder="选择日期时间范围(默认最近一周)" 
            style="width: 300px" @on-ok="search"></DatePicker>
            <Button type="primary" @click="search">搜索</Button>
            <Button type="ghost" @click="reset">重置</Button>
         </div>
      <Table :columns="columns1" :data="prizeList" size="small"></Table>
    </div>
</template>
<script>
import { getDefaultTime } from "@/config/getDefaultTime";
export default {
    name:'prizeList',
    components:{},
    filters:{

    },
    props:{

    },
    data(){
        return{
             options: {
                shortcuts: [
                {
                    text: "本周",
                    value() {
                    return [new Date(dayjs().startOf('week').valueOf() + 24 * 60 * 60 * 1000), new Date(dayjs().endOf('second').valueOf())]
                    }
                },
                {
                    text: "本月",
                    value() {
                    return [new Date(dayjs().startOf('month').valueOf()), new Date(dayjs().endOf('second').valueOf())]
                    }
                },
                {
                    text: "上周",
                    value() {
                    return [new Date(dayjs().add(-1, 'week').startOf('week').valueOf() + 24 * 60 * 60 * 1000), new Date(dayjs().startOf('week').valueOf() + 24 * 60 * 60 * 1000 - 1)]
                    }
                },
                {
                    text: "上月",
                    value() {
                    //-1 上月
                    return [new Date(dayjs().add(-1, 'month').startOf('month').valueOf()), new Date(dayjs().startOf('month').valueOf() - 1)]
                    }
                }
                ]
            }, 
             defaultTime: getDefaultTime(),
            info:'',
            columns1:[
                  {
                    title:'所属商户',
                    key:''
                },
                  {
                    title:'商户ID',
                    key:''
                },
                  {
                    title:'玩家账号',
                    key:''
                },
                  {
                    title:'玩家ID',
                    key:''
                },
                  {
                    title:'交易号',
                    key:''
                },
                  {
                    title:'日期',
                    key:''
                },
                  {
                    title:'游戏类型',
                    key:''
                },
                  {
                    title:'游戏ID',
                    key:''
                },
                  {
                    title:'中奖金额',
                    key:''
                },
            ],
            prizeList:[]

        }
    },
    computed:{

    },
    watch:{

    },
    created(){

    },
    methods:{
       reset(){

       },
       search(){

       }
    }
}
</script>
<style lang="less" scoped>
.prizeList{
    min-height: 87vh;
    .search{
        text-align: right;
    }
}
</style>
