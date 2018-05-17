<template>
  <div class="lineDetail">
    <p class="userName">{{$route.params.displayName}} ({{$route.params.username }})</p>
    <Collapse v-model="value">
      <Panel name="1">
        基本信息
        <Button type="primary" class="edit" @click="editBtn" v-if="isedit">编辑</Button>
        <Button type="primary" class="edit" @click="save" v-else>提交修改</Button>
        <div slot="content">
          <Form :model="basic" label-position="left" :label-width="100">
            <Row>
              <Col span="8">
              <FormItem label="线路商ID">
                {{ lineDetail.displayId}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上级线路商">
                {{lineDetail.parentDisplayName}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="线路商前缀">
                {{lineDetail.suffix}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="创建时间">
                {{dayjs(lineDetail.createdAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="最后登录时间">
                {{dayjs(lineDetail.updatedAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上次登录时间">
                {{dayjs(lineDetail.loginAt).format("YYYY-MM-DD HH:mm:ss")}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <FormItem label="管理员账号">
                {{ lineDetail.username}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="管理员密码">
                {{lineDetail.password}}
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="上次登录IP">
                {{lineDetail.lastIP}}
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="16">
              <FormItem label="备注">
                {{lineDetail.remark}}
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        游戏信息
        <div slot="content">
          <!-- <Form ref='gameList' :model="detail" :label-width="110">
                        <FormItem prop="ownGame">
                            <Row>
                                <Col span="10">
                                <Select v-model="detail.gameType" placeholder="请选择" @on-change="selectCompany">
                                    <Option v-for="item in gameType" :value="item.company" :key="item.company">{{ item.company }}</Option>
                                </Select>
                                </Col>
                                <Col span="10">
                                <Select v-model="detail.gamelist" placeholder="请选择" @on-change="selectGame">
                                    <Option v-for="item in gameList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                </Select>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem v-if="selected">
                            <label for="" slot="label">{{game}}商家占成(%)</label>
                            <Row>
                                <Col span="20">
                                <Input v-model="detail.balance" placeholder="请输入0.00~100.00之间的数字"></Input>
                                </Col>
                                <Col span="4">
                                <span class="add" @click="addGame">添加</span>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form> -->
          <Table :columns="columns1" :data="gameDetail" width='500' class="table" size="small" ></Table>
        </div>
      </Panel>
      <Panel name="3">
        财务信息
        <div slot="content">
          <Table :columns="columns" :data="waterfall" size="small" ></Table>
        </div>
      </Panel>
    </Collapse>
    <div class="next">
      <h2>下级线路商列表</h2>
    <Table :columns="columns2" :data="nextLine" size="small" ></Table>
    </div>
    <div class="ownedMerchant">
      <h2>拥有商户列表</h2>
    <Table :columns="columns3" :data="ownedbusiness" size="small" ></Table>
    </div>
    <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import { waterFall, oneManagers, companySelect,childList } from "@/service/index";
import dayjs from "dayjs";
export default {
  data() {
    return {
      parent: "",
      value: "3",
      dayjs: dayjs,
      edit: false,
      isedit: true,
      spinShow: false,
      defaultBrower: false,
      gameDetail: [],
      basic: {},
      lineDetail: {},
      nextLine:[],//下级线路商列表
      ownedbusiness:[],//拥有商户列表
      columns2:[
        {
         title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "线路商标识",
          key: "sn"
        },
        {
          title: "线路商昵称",
          key: "displayName"
        },
        {
          title: "剩余点数",
          key: "points"
        },
        {
          title: "操作人",
          key: "op"
        },
        {
          title: "操作时间",
          key: ""
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title:'操作(对旗下线路商操作)',
          key:''
        }
      ],
      columns3:[
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
          title: "剩余点数",
          key: "points"
        },
        {
          title: "操作人",
          key: "op"
        },
        {
          title: "操作时间",
          key: ""
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title:'操作(对旗下商户操作)',
          key:''
        }
      ],
      columns1: [
        {
          title: "公司",
          key: "company"
        },
        {
          title: "游戏",
          key: "name"
        },
        {
          title: "商家占成",
          key: "rate"
        },
        {
          title: "操作",
          key: "opreate",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#20a0ff",
                  cursor: "pointer"
                },
                on: {
                  click: index => {
                    this.gameDetail.splice(index, 1);
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      columns: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "交易前余额",
          key: "oldBalance"
        },
        {
          title: "交易点数",
          key: "amount"
        },
        {
          title: "交易时间",
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
          title: "交易对象",
          key: "toUser",
          minWidth: 250,
          render: (h, params) => {
            let row = params.row;
            if (row.fromLevel > row.toLevel) {
              return h(
                "span",
                row.toDisplayName + " 对 " + row.fromDisplayName
              );
            } else {
              return h(
                "span",
                row.fromDisplayName + " 对 " + row.toDisplayName
              );
            }
          }
        },
        {
          title: "交易类型",
          key: "action",
          render: (h, params) => {
            let row = params.row;
            if (row.amount > 0) {
              return h("span", "减点");
            } else {
              return h("span", "加点");
            }
          }
        },
        {
          title: "交易后余额",
          key: "balance"
        },
        {
          title: "操作人",
          key: "operator",
          render: (h, params) => {
            return h("span", params.row.operator.split("_")[1]);
          }
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 80,
          render: (h, params) => {
            if (params.row.remark == "NULL!" || params.row.remark == null) {
              return h("span", "");
            } else {
              return h(
                "Tooltip",
                {
                  props: {
                    content: params.row.remark
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "search",
                      color: "#20a0ff"
                    }
                  })
                ]
              );
            }
          }
        }
      ],
      waterfall: []
    };
  },
  created() {
    this.spinShow = true;
    this.init();
  },
  methods: {
    editBtn() {
      this.edit = true;
      this.isedit = false;
      //   this.value=['1','2','3']
    },
    async init() {
      let userId = this.$route.params.userId;
      this.parent = userId;
      let req1 = waterFall(userId);
      let req2 = oneManagers(userId);
      let req3 = companySelect({ parent: userId });
      let req4=childList(userId,'10');//线路商
      let req5=childList(userId,'100')//商户
      let [waterfall, managers, company,lineChild,ownBusiness] = await this.axios.all([
        req1,
        req2,
        req3,req4,req5
      ]);
      this.spinShow = false;
      if (waterfall && waterfall.code == 0) {
        this.waterfall = waterfall.payload;
      }
      if (managers && managers.code == 0) {
        this.lineDetail = managers.payload;
        this.gameDetail = managers.payload.gameList;
      }
      if (company && company.code == 0) {
        //   this.gameDetail = company.payload;
      }
      if(lineChild&&lineChild.code==0){
        console.log(lineChild);
        this.nextLine=lineChild.payload;
      }
      if(ownBusiness&&ownBusiness.code==0){
        console.log(ownBusiness);
        this.ownedbusiness=ownBusiness.payload;
      }
    },
    save() {
      this.edit = false;
      this.isedit = true;
    }
  }
};
</script>
<style lang="less" scoped>
.lineDetail {
  min-height: 89vh;
  .userName {
    line-height: 36px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .edit {
    float: right;
    margin-right: 20px;
    height: 38px;
  }
  .logo {
    width: 200px;
  }
  .next,.ownedMerchant{
    margin: 20px auto;
  }
}
</style>

