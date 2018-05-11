<template>
  <div class="merchantLog">
    <div class="search">
      <Row class="row">
        <Col span='2' offset='4'> 代理昵称:
        </Col>
        <Col span="4">
        <Input v-model="username" placeholder="请输入"></Input>
        </Col>
        <Col span='2'> 代理账号:
        </Col>
        <Col span="4">
        <Input v-model="useracount" placeholder="请输入"></Input>
        </Col>
        <Col span="2">
        <div class="btns">
          <Button type="primary" class="searchbtn">搜索</Button>
        </div>
        </Col>
      </Row>
    </div>
    <div class="option">
      <p class="count">共搜索到{{ count }}条数据</p>
    </div>
    <div class="table">
      <Table :columns="columns1" :data="merchantLog" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="btn">
      <Button type="primary" :disabled='firstPage' class="lastpage" @click="homePage">首页</Button>
      <Button type="primary" class="nextpage" @click="nextPage">下一页</Button>
    </div>
    <Spin size="large" fix v-if="$store.state.admin.loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      dayjs: dayjs,
      username: "",
      useracount: "",
      firstPage: true,
      showList: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "代理昵称",
          key: "displayName"
        },
        {
          title: "代理账号",
          key: "username"
        },
        {
          title: "最后登录IP",
          key: "lastIP"
        },
        {
          title: "最后登录时间",
          key: "",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.lastLogin).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "账号详情",
          key: "",
          render: (h, params) => {
            if (params.row.ret == "Y") {
              return h(
                "span",
                {
                  style: {
                    color: "#0c0"
                  }
                },
                params.row.detail
              );
            } else {
              return h(
                "span",
                {
                  style: {
                    color: "#f30"
                  }
                },
                params.row.detail
              );
            }
          }
        },
        {
          title: "登录状态",
          key: "",
          render: (h, params) => {
            if (params.row.ret == "Y") {
              return h(
                "span",
                {
                  style: {
                    color: "#0c0"
                  }
                },
                "正常"
              );
            } else {
              return h(
                "span",
                {
                  style: {
                    color: "#f30"
                  }
                },
                "异常"
              );
            }
          }
        }
      ]
    };
  },
  computed: {
    count() {
      return this.merchantLog.length;
    },
    merchantLog() {
      return this.$store.state.admin.merchantLog;
    }
  },
  methods: {
    nextPage() {
      let startKey = this.$store.state.admin.startKey;
      this.$store.dispatch("getMerchantLog", {
        role: "1000",
        type: "login",
        pageSize: 50,
        startKey: startKey,
        level: -1,
        query: {}
      });
      this.firstPage = false;
    },
    homePage() {
      this.$store.dispatch("getMerchantLog", {
        role: "1000",
        type: "login",
        pageSize: "50",
        startKey: null,
        level: -1,
        query: {}
      });
      this.firstPage = true;
    }
  },
  created() {
    this.$store.dispatch("getMerchantLog", {
      role: "1000",
      type: "login",
      pageSize: "50",
      startKey: null,
      level: -1,
      query: {}
    });
  }
};
</script>
<style lang="less" scoped>
.merchantLog {
  min-height: 89vh;
  .option {
    .count {
      line-height: 28px;
      padding-top: 5px;
      padding-bottom: 10px;
    }
  }
  .btn {
    text-align: right;
    .nextpage {
      margin: 20px;
    }
  }
  .search {
    .row {
      line-height: 32px;
      text-align: center;
      padding: 10px 10px;
      .searchbtn {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
}
</style>

