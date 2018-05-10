<template>
  <div class="adminList">
    <div class="search">
      <Row class="row">
        <Col span="2" offset="14">用户名</Col>
        <Col span="4">
        <Input v-model="username" placeholder="请输入"></Input>
        </Col>
        <Col span="3">
        <div class="btns">
          <Button type="primary" class="searchbtn">搜索</Button>
          <Button type="ghost">重置</Button>
        </div>
        </Col>
      </Row>
    </div>
    <div class="option">
      <p class="count">共搜索到{{ count }}条数据</p>
      <p class="create">
        <Button type="primary">创建管理员</Button>
      </p>
    </div>
    <div class="table">
      <Table :columns="columns1" :data="adminList" size="small" no-data-text="暂无数据"></Table>
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
      username: "",
      dayjs: dayjs,
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "用户名",
          key: "uname"
        },
        {
          title: "真实姓名",
          key: "adminName"
        },
        {
          title: "管理员角色",
          key: "subRole"
        },
        {
          title: "剩余点数",
          key: "balance"
        },
        {
          title: "创建时间",
          key: "createdAt",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "邮箱",
          key: "adminEmail"
        },
        {
          title: "操作",
          key: "",
          render: (h, params) => {
            return h("p", [
              h(
                "span",
                {
                  style: {
                    color: "#20a0ff",
                    cursor: "pointer",
                    paddingRight:'5px'
                  },
                  on: {
                    click: () => {
                      console.log(1);
                    }
                  }
                },
                "修改密码"
              ),
              h("span", "|"),
              h(
                "span",
                {
                  style: {
                    color: "#20a0ff",
                    cursor: "pointer",
                    paddingLeft:'5px'
                  },
                  on: {
                    click: () => {
                      console.log(1);
                    }
                  }
                },
                "修改角色"
              )
            ]);
          }
        }
      ],
      spinShow: false
    };
  },
  computed: {
    count() {
      return this.adminList.length;
    },
    adminList() {
      return this.$store.state.admin.adminList;
    }
  },
  created() {
    this.$store.dispatch("getAdminList", {
      query: {},
      sortkey: "createdAt",
      sort: "desc"
    });
    this.$store.commit('updateLoading',{params:true})
  }
};
</script>
<style lang="less" scoped>
.adminList {
  min-height: 89vh;
  .search {
    // background-color: #f2f2f2;
    // height: 60px;
    .row {
      line-height: 32px;
      text-align: center;
      padding: 10px 10px;
      .searchbtn {
        margin-left: -15px;
        margin-right: 10px;
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
