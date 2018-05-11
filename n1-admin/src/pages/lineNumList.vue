<template>
  <div class="lineNumList">
    <div class="search">
      <Row class="row">
        <Col span="3" offset="18">
        <Input v-model="msn" placeholder="请输入需要查询的线路号"></Input>
        </Col>
        <Col span="2">
        <div class="btns">
          <Button type="primary" class="searchbtn" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
        </Col>
      </Row>
    </div>
    <div class="table">
      <Table :columns="columns1" :data="lineNumList" size="small" no-data-text="暂无数据"></Table>
    </div>
    <Spin size="large" fix v-if="$store.state.admin.loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { changeLineStatus } from "../service/index";
export default {
  data() {
    return {
      msn: "",
      dayjs: dayjs,
      columns1: [
        {
          title: "线路号",
          key: "msn"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            if (params.row.status == 1) {
              return h(
                "span",
                {
                  style: {
                    color: "#f30"
                  }
                },
                "已使用"
              );
            } else if (params.row.status == 0) {
              return h(
                "span",
                {
                  style: {
                    color: "#0c0"
                  }
                },
                "未使用"
              );
            } else if(params.row.status == 2){
              return h(
                "span",
                {
                  style: {
                    color: "#108de9"
                  }
                },
                "已停用"
              );
            }
          }
        },
        {
          title: "商户",
          key: "displayName",
          render: (h, params) => {
            if (params.row.displayName != undefined) {
              return h("span", params.row.displayName);
            } else {
              return h("span", "暂无");
            }
          }
        },
        {
          title: "操作",
          key: "",
          render: (h, params) => {
            if (params.row.status == 0) {
              return h(
                "span",
                {
                  style: {
                    color: "#0c0",
                    cursor: "pointer"
                  },
                  on: {
                    click: async() => {
                      let msn = params.row.msn;
                      await changeLineStatus(msn, 2);
                      this.$store.dispatch("getLineNumList", {});
                      this.$store.commit("updateLoading", { params: true });
                    }
                  }
                },
                "停用"
              );
            } else if (params.row.status == 2) {
              return h(
                "span",
                {
                  style: {
                    color: "#20a0ff",
                    cursor: "pointer"
                  },
                  on: {
                    click: async() => {
                      let msn = params.row.msn;
                      await changeLineStatus(msn, 0);
                      this.$store.dispatch("getLineNumList", {});
                      this.$store.commit("updateLoading", { params: true });
                    }
                  }
                },
                "启用"
              );
            } else {
              return h("span", "");
            }
          }
        }
      ],
      spinShow: false
    };
  },
  computed: {
    lineNumList() {
      return this.$store.state.admin.lineNumList;
    }
  },
  methods:{
    reset(){
      this.msn=''
    },
    search(){
    this.$store.dispatch("getLineNumList", {
      msn:this.msn
    });
    }
  },
  created() {
    this.$store.dispatch("getLineNumList", {});
    this.$store.commit("updateLoading", { params: true });
  }
};
</script>
<style lang="less" scoped>
.lineNumList {
  min-height: 89vh;
  .search {
    // background-color: #f2f2f2;
    // height: 60px;
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
  .option {
    .count {
      line-height: 28px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .create {
      padding-bottom: 15px;
    }
  }
}
</style>
