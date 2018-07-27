<template>
     <div class="priceCount">
            <p class="secTitle">{{title}}</p>
            <div class="freecontent">
                 <Row>
                    <Col span="14">
                        <ul>
                            <li>
                                 <Row>
                                    <Col span="3">
                                    <span>Bwin次数</span>
                                    </Col>
                                     <Col span="2">
                                        <span>总计</span>
                                    </Col>
                                     <Col span="12">
                                        <span class="datas"><Icon type="pricetag"></Icon> 5,451 <span>占比</span><span>0.24%</span></span>
                                    </Col>
                                </Row>
                            </li>
                             <li>
                                 <Row>
                                    <Col span="3">
                                    <span>Mwin次数</span>
                                    </Col>
                                     <Col span="2">
                                        <span>总计</span>
                                    </Col>
                                     <Col span="12">
                                        <span class="datas"><Icon type="pricetag"></Icon> 5,451 <span>占比</span><span>0.24%</span></span>
                                    </Col>
                                </Row>
                            </li>
                             <li>
                                <Row>
                                    <Col span="3">
                                    <span>Swin次数</span>
                                    </Col>
                                     <Col span="2">
                                        <span>总计</span>
                                    </Col>
                                     <Col span="12">
                                        <span class="datas"><Icon type="pricetag"></Icon> 5,451 <span>占比</span><span>0.24%</span></span>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </Col>
                    <Col span="10">
                        <div :id="'pricePie'+num" class="pie"></div>
                    </Col>
                </Row>
            </div>
        </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    mounted(){
        this.drawPie("pricePie1")
    },
    methods:{
        drawPie(id){
          let option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        let dom='pricePie'+this.num;
        const pie =document.getElementById(dom);
        let myChart=this.$echarts.init(pie);
        myChart.setOption(option)
      }
    },
    props:["title","num"],
}
</script>
<style lang="less" scoped>
.priceCount{
     .secTitle {
    line-height: 36px;
    font-weight: bold;
  }
      .freecontent{
          background-color: rgb(15, 201, 214);
          ul{
              padding-top: 60px;
              li{
                  line-height: 36px;
                  text-indent: 2em;
                  list-style-type: none;
                  .datas{
                      border-bottom: 1px solid #3366FF;
                  }
              }
          }
          .pie{
              width: 350px;
              height: 230px;
          }
      }
  }
</style>

