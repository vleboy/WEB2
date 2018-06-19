<template>
  <div class="repair">
    <Alert type="warning">该页面功能涉及底层系统数据修复，请务必在技术人员的协作下慎重使用</Alert>
    <Row class="row">
      <Col span="12" offset='12'>
      <Button type="primary" @click="checkLog">日志检查</Button>
      </Col>
    </Row>
    <Row class="row">
      <Col span="12" class="date">
      <DatePicker type="datetimerange" :editable='false' v-model="range" placeholder="选择日期时间" style="width: 300px"></DatePicker>
      </Col>
      <Col span="12">
      <Button type="primary" @click="rangeCount">局表统计</Button>
      <span class="warning">该功能使用前请先根据需求调整【局表】吞吐</span>
      </Col>
    </Row>
    <Row class="row">
      <Col span="12" class="date">
      <DatePicker type="date" v-model="day" placeholder="选择日期" style="width: 200px"></DatePicker>
      </Col>
      <Col span="12">
      <Button type="primary" @click="dayCount">天表统计</Button>
      <span class="warning">该功能使用前请先根据需求调整【局天表】吞吐</span>
      </Col>
    </Row>
  </div>
</template>
<script>
import { httpRequest } from "@/service/index";
export default {
  data() {
    return {
      range: [],
      day: ""
    };
  },
  computed: {
    changedTime() {
      let time = this.range;
      time = time.map(item => {
        return item.getTime();
      });
      return time;
    }
  },
  methods: {
    checkLog() {
      httpRequest("post", "/checkRound", {}, "data").then(res => {
        console.log(res);
      });
    },
    rangeCount() {
      console.log(this.changedTime);
      let time = this.changedTime;
         httpRequest('post','/fixRound',{
        start:time[0],
          end:time[1]
        },'data').then(
          res => {
              console.log(res);
          }
        )
    },
    dayCount() {
      let time = this.day;
      let date = new Date(time);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      if (m < 10) {
        m = "0" + m;
      }
      let d = date.getDate();
      if (d < 10) {
        d = "0" + d;
      }
      let str = y + m + d;
      console.log(str);
         httpRequest("post", "/fixRoundDay", {
             updateDay:str
         }, "data").then(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.repair {
  min-height: 81vh;
  .row {
    margin: 80px auto;
    .date {
      text-align: right;
      padding-right: 20px;
    }
  }
  .warning {
    padding-left: 20px;
    color: #f00;
  }
}
</style>
