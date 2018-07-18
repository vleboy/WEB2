<template>
    <div class="profitDetail">
        <div class="sumary">
            <p class="title">盈利总和</p>
            <div class="sumary_content">
                <Row>
                    <Col span="2">
                    <span class="bigfont">历史</span>
                    </Col>
                    <Col span="6" class="num">
                    <span >
                        <Icon type="social-yen"></Icon> 45458</span>
                    </Col>
                    <Col span="2"><span class="bigfont">今日</span></Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen"></Icon> 45458</span>
                    </Col>
                    <Col span="2">
                    <span>占比</span>
                    </Col>
                    <Col span="4">
                    <i-circle :percent="80" :size="80" stroke-color="#54DA54" class="circles">
                        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                    </i-circle>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.profitDetail{
    .sumary{
        p{
            line-height: 36px;
            font-weight: bold;
        }
        .sumary_content{
            background-color: #FFE6CC;
            line-height: 80px;
            .bigfont{
                font-size: 18px;
                font-weight: bold;
                padding-left: 15px
            }
            .num {
                border-bottom: 1px solid #3366FF;
            }
            .circles{
                padding-top: 15px;
            }
        }
    }
}
</style>
