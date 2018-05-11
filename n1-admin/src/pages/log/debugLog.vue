<template>
  <div class="debugLog">
    <div class="option">
      <Row class="row">
        <Col span="4">
        <p class="count">共搜索到{{ count }}条数据</p>
        </Col>
        <Col span="5" offset='15'>
        <Select style="width:200px" @on-change='changeRole' v-model="role">
          <Option v-for="item in selectOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
    </div>
    <div class="table">
      <Table :columns="columns1" :data="debugLog" size="small" no-data-text="暂无数据"></Table>
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
      firstPage: true,
      role:'',
      selectOption: [
        {
          value: "2",
          label: "账号结果异常"
        },
        {
          value: "3",
          label: "超时流水异常"
        },
        {
          value: "4",
          label: "第三方战绩异常"
        }
      ],
      columns1: [
        {
          title: "时间",
          key: "",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "状态",
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
                "已处理"
              );
            } else {
              return h(
                "span",
                {
                  style: {
                    color: "#f30"
                  }
                },
                "未处理"
              );
            }
          }
        },
        {
          title: "详情",
          key: "detail"
        },
        {
          title: "参数",
          key: "inparams",
          render: (h, params) => {
            return h("span", JSON.stringify(params.row.inparams));
          }
        }
      ]
    };
  },
  computed: {
    count() {
      return this.debugLog.length;
    },
    debugLog() {
      return this.$store.state.admin.debugLog;
    }
  },
  methods: {
    nextPage() {
      let startKey = this.$store.state.admin.startKey;
      let role=this.role;
      this.$store.dispatch("getAdminLog", {
        role: role,
        type: "settlement",
        pageSize: 20,
        startKey: startKey
      });
      this.firstPage = false;
    },
    homePage() {
      let role=this.role;
      this.$store.dispatch("getDebugLog", {
        role: role,
        type: "settlement",
        pageSize: 20,
        startKey: ""
      });
      this.firstPage = true;
    },
    changeRole(val) {
      this.$store.dispatch("getDebugLog", {
        role: val,
        type: "settlement",
        pageSize: 20,
        startKey: ""
      });
    }
  },
  created() {
    this.$store.dispatch("getDebugLog", {
      role: 2,
      type: "settlement",
      pageSize: 20,
      startKey: ""
    });
  }
};
</script>
<style lang="less" scoped>
.debugLog {
  min-height: 89vh;
  .option {
    .count {
      line-height: 28px;
      padding-top: 5px;
      padding-bottom: 10px;
    }
    .searchbtn {
      margin-left: 10px;
    }
  }
  .btn {
    text-align: right;
    .nextpage {
      margin: 20px;
    }
  }
}
</style>

