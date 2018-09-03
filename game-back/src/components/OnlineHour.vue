<template>
    <div class="onlinehour">
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
                <p class="title">玩家在线时长</p>
                <p><Icon type="ios-people" class="icon"/></p>
            </div>
            <div class="detail">
                <ul class="gameul">
                    <li v-for="(item,index) in OnlineList" :key="index" class="gameList">
                        <i-circle :percent="80" stroke-color="#5cb85c">
                            <p>{{item.name}}</p>
                            <p>{{item.hour+'分'}}</p>
                        </i-circle>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHourOnline' @click="seeHourOnline">点击查看每小时在线玩家人数</Button>
        </div>
        <hour-online v-if="showHourOnline"/>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import HourOnline from '@/components/HourOnline'
import { mapState } from "vuex";
import {GAME_LIST} from '@/config/gameList'
export default {
    name:'onLine',
    components:{HourOnline},
    props:{

    },
    data(){
        return{
            source:'',
            range:'',
            showHourOnline:false,
            OnlineList:[ ],
            onlineTodayArr:[],
            onlineSevenAverage:[]
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
        changeSource(){
            console.log(this.source);
        },
        seeHourOnline(){
            this.showHourOnline=true
        },
        gameName(id){
            //遍历gametype 获取名字
            for (let key in GAME_LIST ){
                if(key === id){
                    return GAME_LIST[key]
                }
            }
        },
        init(){
            let today=this.login.loginToday;
             for(let item of today){
                let name=this.gameName(item.gameId);

                let onlineHour=(item.loginTimeTotal/(1000*60*60)).toFixed(2)
                this.OnlineList.push({
                    name,
                    hour:onlineHour
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.onlinehour{
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
    .content{
        display: flex;
        margin:15px auto;
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
