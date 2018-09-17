<template>
    <div class="player">
        <div class="search">
          <DatePicker type="datetimerange" :editable='false' v-model="defaultTime" placeholder="选择日期时间范围(默认最近一周)" style="width: 300px" @on-ok="confirm"></DatePicker>
            <span class="searchLabel">所属标识:</span>
            <Input v-model.trim="parent" placeholder="所属标识" style="width: 200px"></Input>
            <span class="searchLabel">请选择游戏:</span>
           <Select style="width:200px" @on-change='changeGame' v-model="game">
            <Option v-for="(item,index) in selectOption" :value="item.code" :key="index">{{ item.name }}</Option>
            </Select>
             <Checkbox v-model="isTest" :style="{marginLeft:'10px',fontSize:'14px'}" @on-change="hideTest">隐藏测试</Checkbox>
          <span class="btn">
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
          </span>
        </div>
      <Table :columns="columns1" :data="player" size="small" ref='table'></Table>
       <Row class="count_row">
            <Col span="3" offset="15">
            总下注次数: <span class="num">{{allBetCount}}</span>
            </Col>
            <Col span="3">
            总下注金额: <span class="num">{{allBetAmount}}</span>
            </Col>
            <Col span="3">
            总输赢金额: <span class="num">{{allWinLose}}</span>
            </Col>
        </Row>
      <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    </div>
</template>
<script>
import { httpRequest } from "@/service/index";
import { thousandFormatter } from "@/config/format";
import { getDefaultTime } from "@/config/getDefaultTime";
export default {
  name:'playerReport',
    components:{},
    filters:{

    },
    props:{

    },
    data(){
        return{
            defaultTime:getDefaultTime(),
            spinShow:false,
            allBetCount:0,
            allBetAmount:0,
            allWinLose:0,
            selectOption:[],
            game:'-1',
            isTest:false,
            parent:'',
            gameType: [
                3,
                30000,
                40000,
                50000,
                60000,
                1010000,
                10300000,
                1050000,
                1060000,
                1100000,
                1110000,
                1130000,
                1140000,
                1150000,
                1160000,
                1120000,
                1080000
            ],
            columns1:[
                {
                title: "序号",
                type: "index",
                maxWidth: 60
                },
                {
                title: "类型",
                key: "isTest",
                render: (h, params) => {
                    return h("span", params.row.isTest==0?'正式':'测试');
                   }
                },
                 {
                    title:'所属用户',
                    key:'parentName'
                },
                {
                    title:'所属昵称',
                    key:'parentDisplayName'
                },
                {
                    title:'所属标识',
                    key:'parentSn' 
                },
                {
                  title: "玩家账号",
                  key: "userName" ,
                  render:(h,params)=>{
                      return h('span',{
                          style:{
                            cursor: "pointer",
                            color: "#20a0ff"
                          },
                          on:{
                              click:()=>{
                                  localStorage.setItem("playerName", params.row.userName);
                                   this.$router.push({
                                        name: "playDetail",
                                        query: {
                                        name: params.row.userName
                                        }
                                    });
                              }
                          }
                      },params.row.userName)
                  }
                },
                {
                  title: "玩家ID",
                  key: "userId" 
                },
                {
                    title:'下注次数',
                    key:'betCount'
                },
                {
                    title:'下注金额',
                    key:'betAmount',
                    render:(h,params)=>{
                        return h('span',thousandFormatter(params.row.betAmount))
                    }
                },
                {
                    title:'输赢金额',
                    key:'winloseAmount',
                    render:(h,params)=>{
                        let color=params.row.winloseAmount < 0 ? "#f30" : "#0c0";
                        return h('span',{
                            style:{color:color}
                        },thousandFormatter(params.row.winloseAmount))
                    }
                },
                {
                    title:'游戏详情',
                    key:'gameTypeMap',
                    render:(h,params)=>{
                        let column=[
                            {
                                title: "游戏名",
                                key: "gameTypeName"
                            },
                            {
                                title:'下注次数',
                                key:'betCount'
                            },
                            {
                                title:'下注金额',
                                key:'betAmount'
                            },
                            {
                                title:'输赢金额',
                                key:'winloseAmount',
                            }
                        ]
                        let gameList = params.row.gameTypeMap;
                        let data=[]
                        for (let key in gameList) {
                            let obj = {};
                            let item=gameList[key]
                            obj.gameTypeName = item.gameTypeName;
                            obj.betCount=item.betCount;
                            obj.betAmount=item.betAmount;
                            obj.winloseAmount=item.winloseAmount;
                            data.push(obj);
                        }
                        let len = data.length;
                        return h(
                        "Poptip",
                        {
                            props: {
                            trigger: "hover",
                            placement:'left-end'
                            }
                        },
                        [
                            h(
                            "span",
                            {
                                style: {
                                cursor: "pointer",
                                color: "#20a0ff"
                                }
                            },
                            len + "款游戏"
                            ),
                            h("Table", {
                            props: {
                                columns: column,
                                data: data,
                                border: true,
                                size: "small",
                                width: 500
                            },
                            slot: "content"
                            })
                        ]
                        );
                    }

                }
               

            ],
            player:[]
        }
    },
    computed:{
        changedTime() {
            let time = this.defaultTime;
            time = time.map((item, index) => {
                if (index == 1 && item.getTime() > Date.now() - 180000) {
                return Date.now() - 180000;
                }
                return item.getTime();
            });
            this.defaultTime = [new Date(time[0]), new Date(time[1])];
            return time;
            },
    },
    watch:{

    },
    created(){
        this.getGames()
        this.init(this.gameType)
    },
    methods:{
       init(gameList){
           this.getPlayerList(gameList)
       },
       getPlayerList(gameList){
            this.spinShow=true;
            this.allBetCount=0
            this.allBetAmount=0
            this.allWinLose=0
            httpRequest('post','/queryRealPlayerStat',{
               gameType:gameList,
               query:{
                  createdAt:this.changedTime,
                  parent:this.parent
               }
           }).then(res=>{
               if(res.code==0){
                   let list=res.payload
                   this.player=list
                   for(let item of list){
                       this.allBetCount+=item.betCount;
                       this.allBetAmount+=item.betAmount;
                       this.allWinLose+=item.winloseAmount;
                   }
                   this.allBetAmount=this.allBetAmount.toFixed(2)
                   this.allWinLose=this.allWinLose.toFixed(2)
               }
           }).finally(()=>{
               this.spinShow=false
           })
       },
       getGames(){
            httpRequest('post','/gameType',{},'game').then(res=>{
               if(res.code==0){
                   this.selectOption=res.payload
                    this.selectOption.unshift({
                       name:'全部游戏',
                       code:'-1'
                   })
               }
           })
       },
       changeGame(){
           this.search()
       },
       confirm(){
        this.init(this.gameType)
       },
       search(){
        if(this.game!='' && +this.game>0){
            let list=[];
            list.push(this.game)
            this.init(list)
        }else{
        this.init(this.gameType)
        }
       },
       hideTest(v){
           let player=this.player;
           const notTest=player.filter(item=> item.isTest==0)
           if(v==true){
               this.player=notTest
           }else{
               this.getPlayerList(this.gameType)
           }
       },
       reset(){
        this.defaultTime = getDefaultTime();
        this.game='-1';
        this.parent=''
        this.init(this.gameType)
       }
    }
}
</script>
<style lang="less" scoped>
.player{
    min-height: 89vh;
    .search{
        margin-bottom: 10px;
        .searchLabel{
            padding: 10px;
        }
        .btn{
            position: absolute;
            right: 18px;
        }
    }
    .count_row{
        line-height: 32px;
        padding: 10px 0;
    }
    .num{
        font-weight: bold;
    }
}
</style>
