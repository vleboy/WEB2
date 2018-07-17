<template>
    <div class="freeCount">
            <p class="secTitle">免费模式次数选择</p>
            <div class="freeCountContent">
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择  <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">5次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择  <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">8次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择 <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">10次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择  <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">15次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择  <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">20次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
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
 .freeCount{
      .secTitle {
            line-height: 36px;
            font-weight: bold;
        }
      .freeCountContent{
          background-color: #E4E4E4;
          display: flex;
          justify-content: center;
          align-items: center;
          .item{
              width: 18%;
              padding: 15px;
              font-size: 18px;
              font-weight: bold;
          }
      }
  }
</style>


