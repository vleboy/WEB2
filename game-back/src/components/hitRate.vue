<template>
     <div class="hitRate">
            <p class="secTitle">游戏命中率</p>
            <div class="rateContent">
                <div class="circle">
                    <div class="todayRate">
                        <p>今日</p>
                        <i-circle :percent="80" stroke-color="#FF66CC">
                            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                        </i-circle>
                        <p>875746局</p>
                    </div>
                    <div class="predict">
                        预期:31.52%
                    </div>
                    <div class="historyRate">
                        <p>历史</p>
                        <i-circle :percent="80" stroke-color="#FF66CC">
                            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                        </i-circle>
                        <p>875746局</p>
                    </div>
                </div>
                <p class="rateTitle">图标命中次数</p>
                <ul>
                    <li><span class="red">Scat</span>  23次</li>
                    <li><span class="red">Wild</span>  23次</li>
                </ul>
                <div class="clear"></div>
                <ul>
                    <li><span class="orange">SS0</span>  23次</li>
                    <li><span class="orange">SS1</span>  23次</li>
                    <li><span class="orange">SS2</span>  23次</li>
                    <li><span class="orange">SS3</span>  23次</li>
                    <li><span class="orange">SS4</span>  23次</li>
                </ul>
                <div class="clear"></div>
                 <ul>
                    <li><span class="blue">NS0</span>  23次</li>
                    <li><span class="blue">NS1</span>  23次</li>
                    <li><span class="blue">NS2</span>  23次</li>
                    <li><span class="blue">NS3</span>  23次</li>
                    <li><span class="blue">NS4</span>  23次</li>
                    <li><span class="blue">NS5</span>  23次</li>
                </ul>
                <div class="clear"></div>
                <p class="rateTitle">线路命中次数</p>
                <p><span class="continueline"><span class="continue">3连</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
                <p><span class="continueline"><span class="continue">4连</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
                <p><span class="continueline"><span class="continue">5连</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
                <p class="sepreate"><span class="linNum"><span class="line">2条线</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
                <p><span class="linNum"><span class="line">3条线</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
                <p><span class="linNum"><span class="line">4条线</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
                <p><span class="linNum"><span class="line">5条线</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
                <p><span class="linNum"><span class="line">6条线</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
                <p><span class="linNum"><span class="line">6+条线</span>&nbsp;&nbsp;次数<span>12&nbsp;&nbsp;金额<span>156,454</span>&nbsp;&nbsp;占比:<span>43%</span></span></span></p>
            </div>
        </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.hitRate {
     .secTitle {
        line-height: 36px;
        font-weight: bold;
    }
    .rateContent {
      background-color: #fff5e0;
      .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 28px;
        .predict {
          background-color: #66ccff;
          width: 160px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 4px;
          margin: auto 80px;
        }
      }
      .rateTitle{
          font-weight: bold;
      }
      .clear{
          clear: both;
      }
      ul{
          li{
              width: 18%;
              line-height: 32px;
              border-bottom: 1px solid #3366FF;
              margin: auto 5px;
              float: left;
              list-style-type: none;
          }
      }
      .red{
          color: #FF0033;
          font-size: 16px;
          font-weight: bold;
      }
      .orange{
          color:#FF9900;
          font-size: 16px;
          font-weight: bold;
      }
      .blue{
          color:#66CCFF;
          font-size: 16px;
          font-weight: bold;
      }
      .continueline{
          line-height: 36px;
          border-bottom: 1px solid #3366FF;
          .continue{
              color: #FF9900;
              font-size: 18px;
              font-weight: bold;
          }
      }
      .sepreate{
          margin-top: 10px;
      }
      .linNum{
          line-height: 36px;
          border-bottom: 1px solid #3366FF;
          .line{
              color: #6699FF;
              font-size: 18px;
              font-weight: bold;
          }
      }
    }
  }
</style>
