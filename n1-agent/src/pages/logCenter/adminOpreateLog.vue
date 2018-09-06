<template>
    <div class="adminLog">
        <div class="reload">
        <Button type="primary" class="reset" @click="reset">刷新</Button>
        </div>
        <div class="table">
            <Table :columns="columns1" :data="adminLog" size="small" ></Table>
        </div>
        <div class="btn">
            <Button type="primary" :disabled='firstPage' class="lastpage" @click="homePage">首页</Button>
            <Button type="primary" class="nextpage" @click="nextPage">下一页</Button>
        </div>
        <Spin size="large" fix v-if="$store.state.log.loading">
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
      firstPage: true,
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
         {
           title: "操作人",
          key: "username",
          render:(h,params)=>{
            let name=''
            if(params.row.operateToken){
              name=params.row.operateToken.displayName
            }else{
              name=params.row.username
            }
            return h('span',name)
          }
        },
        {
          title: "操作时间",
          key: "",
          render: (h, params) => {
            return h(
              "span",
              dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "操作",
          key: "action"
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
    adminLog() {
      return this.$store.state.log.adminOpreateLog;
    }
  },
  methods: {
    nextPage() {
      let startKey = this.$store.state.log.startKey;
      this.$store.dispatch("getAdminLog", {
        role: "1000",
        type: "operate",
        pageSize: 100,
        level:0,
        startKey: startKey
      });
      this.firstPage = false;
    },
    homePage() {
      this.init();
      this.firstPage = true;
    },
    init() {
      this.$store.dispatch("getAdminLog", {
        role: "1000",
        type: "operate",
        pageSize: 100,
        level:0,
        startKey: null
      });
    },
    reset() {
      this.init();
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.adminLog {
  min-height: 89vh;
  .btn {
    text-align: right;
    .nextpage {
      margin: 20px;
    }
  }
  .reload {
    text-align: right;
    margin: 15px auto;
    padding-right: 10px;
  }
}
</style>

