<template>
    <div class="pricemix">
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
        <Row>
            <Col span="12">
                <pie-item 
                    title="大奖占比—普通模式"
                    :count="priceNormalCount"
                    pieId="1"
                    :data="priceNormalData"
                />
            </Col>
            <Col span="12">
                <pie-item 
                    title="大奖占比—免费模式"
                    :count="priceFreeCount"
                    pieId="2"
                    :data="priceFreeData"
                />
            </Col>
        </Row>
         <Row>
            <Col span="12">
                <pie-item 
                    title="免费模式—选择次数"
                    :count="-1"
                    pieId="3"
                    :data="freeChooseData"
                />
            </Col>
            <Col span="12">
                <pie-item 
                    title="免费模式—赔付金额"
                    :count="-1"
                    pieId="4"
                    :data="pieData2"
                />
            </Col>
        </Row>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import PieItem from '@/components/PieItem'
import { mapState } from "vuex";
export default {
    name:'pricemix',
    components:{PieItem},
    filters:{

    },
    props:{

    },
    data(){
        return{
            source:'',
            range:'',
            pieData2:[
                { value: 335, name: "5次" },
                { value: 310, name: "8次" },
                { value: 234, name: "10次" },
                { value: 123, name: "15次" },
                { value: 654, name: "20次" }
            ]
        }
    },
    computed:{
    ...mapState(["priceNormalCount","priceNormalData","priceFreeCount","priceFreeData","freeChooseData"]),
    },
    watch:{

    },
    created(){

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
       }
    }
}
</script>
<style lang="less" scoped>
.pricemix{
    background-color: #fff;
    margin-top: 15px;
     .search{
            padding-top: 10px;
            padding-bottom: 10px;
        }
}
</style>
