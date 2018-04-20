<template>
  <div class="ug">
    <div class="nowList">
      <div class="top">
        <p class="title">
          当前选择列表
        </p>
        <div class="right">
            <DatePicker type="daterange" :editable="false" placement="bottom-end" placeholder="选择日期" style="width: 250px" @on-change="changeDate"></DatePicker>
            <Button type="primary">搜索</Button>
            <Button type="ghost">重置</Button>
        </div>
      </div>
      <Table :columns="columns1" :data="data1" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="childList">
      <p class="title">
        直属下级列表
      </p>
      <Table :columns="columns1" :data="data1" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="palyerList">
      <p class="title">
        所属玩家列表
      </p>
      <Table :columns="columns2" :data="data2" size="small" no-data-text="暂无数据"></Table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "昵称",
          key: "name"
        },
        {
          title: "管理员账号",
          key: "acount"
        },
        {
          title: "交易次数",
          key: "tradetime"
        },
        {
          title: "投注金额",
          key: "betcount"
        },
        {
          title: "输赢金额",
          key: "winlose"
        },
        {
          title: "商家占成",
          key: "business"
        },
        {
          title: "商家交公司",
          key: "company"
        },
        {
          title: "获利比例",
          key: "proportion"
        }
      ],
      data1: [
        {
          type: "s",
          name: "John Brown",
          acount: "na",
          tradetime: 23,
          betcount: 1222,
          winlose: 323,
          business: 0.2,
          company: "ncs",
          proportion: "12%"
        },
        {
          type: "s",
          name: "John Brown",
          acount: "na",
          tradetime: 23,
          betcount: 1222,
          winlose: 323,
          business: 0.2,
          company: "ncs",
          proportion: "12%"
        }
      ],
      columns2: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "交易次数",
          key: "tradetime"
        },
        {
          title: "投注金额",
          key: "betcount"
        },
        {
          title: "输赢金额",
          key: "winlose"
        },
        {
          title: "洗码量",
          key: "egug"
        }
      ],
      data2: [
        {
          name: "张三",
          nickname: "张三疯",
          tradetime: 23,
          betcount: 1222,
          winlose: 199,
          egug: 23
        },
        {
          name: "张三",
          nickname: "张三疯",
          tradetime: 23,
          betcount: 1222,
          winlose: 199,
          egug: 23
        }
      ],
      data3: []
    };
  },
  methods:{
    changeDate(time){
      console.log(time);
    }
  }
};
</script>
<style lang="less" scoped>
.ug {
  min-height: 90vh;
  .title {
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem;
    font-weight: 600;
    display: inline-block;
  }
  .top {
    clear: both;
    .right {
      float: right;
    }
  }
}
</style>
