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
                    <li v-for="(item,index) in OnlineList" :key="index" class="gameList">
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
import { mapState } from "vuex";
import {GAME_LIST} from '@/config/gameList'
export default {
    name:'onLine',
    components:{},
    props:{

    },
    data(){
        return{
            source:'',
            range:'',
            sum:0,
            OnlineList:[]
        }
    },
    computed:{
        ...mapState(["login"])
    },
    watch:{

    },
    created(){
        this.init()
    },
    methods:{
        changeRange(){
           let range = this.range.map(item => {
            return item.getTime();
            });
            console.log(range);
        },
        gameName(id){
            //遍历gametype 获取名字
            for (let key in GAME_LIST ){
                if(key === id){
                    return GAME_LIST[key]
                }
            }
        },
        changeSource(){
            console.log(this.source);
        },
        init(){
            let today=this.login.loginToday;
            let currentPeople=0;
            console.log(today);
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
                font-size: 28px;
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
