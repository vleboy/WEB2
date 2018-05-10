<template>
    <div class="adminLog">
        <div class="option">
            <p class="count">共搜索到{{ count }}条数据</p>
        </div>
        <div class="table">
            <Table :columns="columns1" :data="showLog" size="small" no-data-text="暂无数据"></Table>
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
      firstPage: true,
      pageIndex: 0,
      showList: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "操作",
          key: "action"
        },
        {
          title: "操作时间",
          key: "",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "操作人",
          key: "username"
        },
        {
          title: "操作结果",
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
                "成功"
              );
            } else {
              return h(
                "span",
                {
                  style: {
                    color: "#f30"
                  }
                },
                "失败"
              );
            }
          }
        }
      ]
    };
  },
  computed: {
    count() {
      return this.showLog.length;
    },
    adminLog() {
      return this.$store.state.admin.adminLog;
    },
    allAdminLog() {
      return this.$store.state.admin.allAdminLog;
    },
    showLog: {
      get() {
        return this.showList;
      },
      // setter
      set(newValue) {
        this.showList = newValue;
      }
    }
  },
  methods: {
    nextPage() {
      this.pageIndex += 1;
      let startKey = this.$store.state.admin.startKey;
      this.$store.dispatch("getAdminLog", {
        role: "1",
        type: "operate",
        pageSize: 50,
        startKey: startKey
      });
      this.firstPage = false;
      this.showLog = this.adminLog;
    },
    homePage() {
      let index = this.pageIndex - 1;
      let allLog = this.allAdminLog;
      this.pageIndex -= 1;
      if (this.pageIndex == 0) {
        this.firstPage = true;
      }
      this.showLog = allLog[index];
    }
  },
  created() {
    this.$store
      .dispatch("getAdminLog", {
        role: "1",
        type: "operate",
        pageSize: 50,
        startKey: null
      })
      .then(() => {
        this.showLog = this.adminLog;
      });
  }
};
</script>
<style lang="less" scoped>
.adminLog {
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
}
</style>

