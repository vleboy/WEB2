<template>
    <div class="more">
        <div class="login">
            <p class="secTitle">玩家登陆次数</p>
            <div class="content">
                <p class="logincount">目前登陆次数：{{loginCount}}次</p>
                <ul>
                    <li>
                        <span class="word">昨日登陆</span>
                        <span class="circle1">5875次</span>
                        <span class="line"></span>
                        <span class="circle2">68.7%</span>
                        <span class="stay">留存</span>
                    </li>
                    <li>
                        <span class="word">3日登陆</span>
                        &nbsp;&nbsp;<span class="circle1">5875次</span>
                        <span class="line"></span>
                        <span class="circle2">68.7%</span>
                        <span class="stay">留存</span>
                    </li>
                    <li>
                        <span class="word">7日登陆</span>
                        <span class="circle1">5875次</span>
                        <span class="line"></span>
                        <span class="circle2">68.7%</span>
                        <span class="stay">留存</span>
                    </li>
                    <li>
                        <span class="word">30日登陆</span>
                        <span class="circle1">5875次</span>
                        <span class="line"></span>
                        <span class="circle2">68.7%</span>
                        <span class="stay">留存</span>
                    </li>
                </ul>
            </div>
        </div>
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
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      loginCount: 22
    };
  }
};
</script>
<style lang="less" scoped>
.more {
  ul li {
    list-style: none;
  }
  .secTitle {
    line-height: 28px;
  }
  .login {
    .content {
      background-color: #e1ffff;
      .logincount {
        font-size: 16px;
        font-weight: bold;
        color: red;
        text-align: center;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 48%;
          margin: 10px;
        }
      }
      .word {
        margin-left: 20px;
      }
      .circle1 {
        border: 2px solid #ff9900;
        display: inline-block;
        background-color: #fff;
        width: 120px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
      }
      .line {
        display: inline-block;
        width: 50px;
        height: 2px;
        position: relative;
        top: -5px;
        background-color: #6699ff;
      }
      .circle2 {
        border: 2px solid #ff9900;
        display: inline-block;
        background-color: #fff;
        width: 80px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
      }
      .stay {
        color: #66ccff;
      }
    }
  }
  .hitRate {
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
    }
  }
}
</style>

