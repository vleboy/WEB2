<template>
    <div class="online">
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
        <div class="content">
            <div class="sum">
                <p class="title">当前在线人数</p>
                <p><Icon type="ios-people" class="icon"/><span class="sum">{{sum}}</span></p>
            </div>
            <div class="detail">
                <ul class="gameul">
                    <li v-for="item in OnlineList" :key="item.count" class="gameList">
                        <p>{{item.name}}</p>
                        <p>{{item.count}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
    name:'onLine',
    components:{},
    props:{

    },
    data(){
        return{
            source:'',
            range:'',
            sum:thousandFormatter(45432),
            OnlineList:[
                {
                    name:'罗塔之迷',
                    count:234
                },
                {
                    name:'罗塔之迷',
                    count:32
                },
                {
                    name:'罗塔之迷',
                    count:13
                },
                {
                    name:'罗塔之迷',
                    count:64
                },
                {
                    name:'罗塔之迷',
                    count:43
                },
                {
                    name:'罗塔之迷',
                    count:212
                },
                {
                    name:'罗塔之迷',
                    count:45
                },
                {
                    name:'罗塔之迷',
                    count:343
                },
                {
                    name:'罗塔之迷',
                    count:56
                },
            ]
        }
    },
    computed:{

    },
    watch:{

    },
    created(){

    },
    methods:{
        changeRange(){
            console.log(this.range);
        },
        changeSource(){
            console.log(this.source);
        }
    }
}
</script>
<style lang="less" scoped>
.online{
    background-color: #fff;
    .search{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .content{
        display: flex;
        height: 80px;
        .sum{
            width: 15%;
            text-align: center;
            .title{
                font-size: 18px;
                font-weight: bold;
                line-height: 32px;
            }
            .icon{
                font-size: 36px;
            }
            .sum{
                font-size: 18px;
                color:#f00;
                font-weight: bold;
            }
        }
        .detail{
            display: flex;
            flex-wrap: nowrap;
            width: 85%;
            .gameul{
                width: 100%;
                .gameList{
                    float: left;
                    width: 11%;
                    text-align: center;
                    line-height: 32px;
                    font-size: 16px;
                }

            }
        }
    }
}
</style>
