<template>
    <div class="business">
        <div class="search">
            <Row class="row">
                <Col span="2" offset="4">商户标识</Col>
                <Col span="4">
                <Input v-model="value2" placeholder="请输入"></Input>
                </Col>
                <Col span="2">商户线路号</Col>
                <Col span="4">
                <Input v-model="value1" placeholder="请输入"></Input>
                </Col>
                <Col span="5">
                <div class="btns">
                    <Button type="primary">搜索</Button>
                    <Button type="ghost">重置</Button>
                    <Button type="text" @click="show = !show" v-show="show">
                        展开
                        <Icon type="chevron-down"></Icon>
                    </Button>
                    <Button type="text" @click="show = !show" v-show="!show">
                        收起
                        <Icon type="chevron-up"></Icon>
                    </Button>
                </div>
                </Col>
            </Row>
            <Row class="row" v-if="show">
                <Col span="2" offset="4">商户昵称</Col>
                <Col span="4">
                <Input v-model="value3" placeholder="请输入"></Input>
                </Col>
                <Col span="2"></Col>
                <Col span="4">

                </Col>
            </Row>
        </div>
        <div class="option">
            <p class="count">共搜索到{{ total }}条数据</p>
            <p class="create">
                <Button type="primary">创建商户</Button>
            </p>
        </div>
        <div class="table">
            <Table :columns="columns1" :data="showData" size="small" no-data-text="暂无数据"></Table>
            <Page :total="total" class="page" show-elevator :page-size='50' show-total @on-change="changepage"></Page>
        </div>
    </div>
</template>
<script>
import dayjs from "dayjs";
import { Poptip, Table, Button } from "iview";
export default {
  data() {
    return {
      show: false,
      dayjs: dayjs,
      option: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now() - 180000;
        }
      },
      defaultTime: "",
      value1: "",
      value2: "",
      value3: "",
      columns1: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "商户标识",
          key: "sn"
        },
        {
          title: "商户昵称",
          key: "displayName"
        },
        {
          title: "线路号",
          key: "msn"
        },
        {
          title: "上级线路商",
          key: "parentDisplayName"
        },
        {
          title: "剩余点数",
          key: "",
          render: (h, params) => {
            return h("span", params.row.lastBill.lastBalance.toFixed(2));
          }
        },
        {
          title: "商户游戏",
          key: "",
          render: (h, params) => {
            let column = [
              {
                title: "商户游戏",
                key: "name"
              },
              {
                title: "商户占成",
                key: "rate"
              }
            ];
            let data = [];
            let gameList = params.row.gameList;
            let len = gameList.length;
            let obj = {};
            for (let item of gameList) {
              obj.rate = item.rate;
              obj.name = item.name;
              data.push(obj);
            }
            // <Table columns="column" data="data" size="small" no-data-text="暂无数据"></Table>
            return (
              <Poptip trigger="hover">
                <Button type="text">{len}款游戏</Button>
                <div slot="content" class="content">
                  <table>
                    <thead>
                      <tr>
                        <th>Update Time</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0.9.5</td>
                        <td>2016-10-26</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Poptip>
            );
          }
        },
        {
          title: "创建时间",
          key: "",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "最后登录时间",
          key: "",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.loginAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "状态",
          key: "",
          render: (h, params) => {
            if (params.row.status == 1) {
              return h("span", "已启用");
            } else {
              return h("span", "未启用");
            }
          }
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          key: "",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#1d90e6"
                  },
                  on: {
                    click: () => {
                      console.log(1);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#1d90e6"
                  },
                  on: {
                    click: () => {
                      console.log(2);
                    }
                  }
                },
                "停用"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    changepage(index) {
      var _start = (index - 1) * 50;
      var _end = index * 50;
      this.showData = this.waterfall.slice(_start, _end);
    },
    handlePage() {
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.total < 50) {
        this.showData = this.waterfall;
      } else {
        this.showData = this.waterfall.slice(0, 50);
      }
    }
  },
  computed: {
    showData() {
      return this.$store.state.merchants.merchantsList;
    },
    total() {
      return this.showData.length;
    }
  },
  created() {
    this.$store.dispatch("getMerchantsList", {
      query: {
        // suffix: "a",
        // displayName: "a"
      },
      sortkey: "createdAt",
      sort: "desc"
    });
  }
};
</script>
<style lang="less" scoped>
.business {
  min-height: 89vh;
}
.row {
  line-height: 32px;
  text-align: center;
  padding: 15px 10px;
}
.search {
  background-color: #f2f2f2;
  height: 126px;
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
.table {
  .page {
    text-align: right;
  }
}
</style>
