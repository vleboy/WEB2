<template>
  <div class="agetlist">
    <div class="nowList">
      <p class="title">
        当前代理
      </p>
      <Table :columns="columns1" :data="userInfo" size="small"></Table>
    </div>
    <div class="childList">
      <div class="top">
        <span class="title left">
          下级代理列表
        </span>
        <div class="search">
          <Input v-model="search1" placeholder="请输入搜索内容" style="width: 150px"></Input>
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
      </div>
      <div class="table">
        <Table :columns="columns1" :data="agentList" size="small"></Table>
      </div>
    </div>
    <div class="childList" v-for="(item,index) in agentChild" :key="index">
      <p class="title">
        ({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 下级代理列表
      </p>
      <Table :columns="columns1" :data="item" size="small"></Table>
    </div>
    <div class="playerList" id="playerList">
      <div class="top">
        <span class="title left">
          所属玩家列表
        </span>
        <div class="search">
          <Input v-model="search2" placeholder="请输入搜索内容" style="width: 150px"></Input>
          <Button type="primary" @click="search">搜索</Button>
          <Button type="ghost" @click="reset">重置</Button>
        </div>
      </div>
      <div class="table">
        <Table :columns="columns2" :data="playerList" size="small"></Table>
      </div>
    </div>
    <Spin size="large" fix v-if="$store.state.report.loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <Modal v-model="modal" @on-ok="ok" id="plusModal" @on-cancel='cancel'>
      <h2 v-if='plus'>加点操作</h2>
      <h2 v-else>减点操作</h2>
      <Form :label-width="100">
        <FormItem label="存入点数">
          <Input type="text" v-model="point" placeholder="请输入点数" style="width: 280px">
          </Input>
        </FormItem>
        <FormItem label="起始账户">
          {{parentDisplayName}}
        </FormItem>
        <FormItem label="备注">
          <Input v-model="remark" type="textarea" :rows="4" placeholder="注明备注,如没有可不填" style="width: 280px"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="agentModal" @on-ok="createAgent" width='550' title="创建代理" @on-cancel='resetAgent'>
      <Form ref='agentForm' :label-width="100" :model="agent" :rules='agentValidate'>
        <FormItem label="所属代理" :required='true'>
          <Select v-model="agent.parent" placeholder="请选择" @on-change='selectParent'>
            <Option v-for="item in parentList" :value="item.userId" :key="item.userId">{{ item.displayName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="代理类别" :required='true'>
          <Select v-model="agentType" placeholder="请选择" @on-change='selectType' :disabled='Topdisabled'>
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="代理标识" prop='sn'>
          <p v-if='defaultSn'>{{parentSn}}</p>
          <Input v-else v-model="agent.sn" placeholder="3~5位,只能包含中英文、数字、@、_"></Input>
        </FormItem>
        <FormItem label="代理用户名" prop='username'>
          <Input v-model="agent.username" placeholder="5~16位,只能包含英文或数字"></Input>
        </FormItem>
        <FormItem label="代理密码" prop='password'>
          <Input v-model="agent.password" placeholder="8~16位,必须包含英文、数字和符号任意两种组合"></Input>
        </FormItem>
        <FormItem label="代理昵称" prop='displayName'>
          <Input v-model="agent.displayName" placeholder="2~10位,只能包含中文、英文或数字"></Input>
        </FormItem>
        <FormItem label="备注">
          <textarea v-model="agent.remark" id="textRow" placeholder="注明备注,如没有可不填" rows="2" autocomplete="off" maxlength="2000"></textarea>
        </FormItem>
        <FormItem label="商户拥有的游戏" :required='true'>
          <Row>
            <Col span="10">
            <Select :disabled='disabled' placeholder="请选择" @on-change="selectCompany">
              <Option v-for="item in gameType" :value="item.company" :key="item.company">{{ item.company }}</Option>
            </Select>
            </Col>
            <Col span="10">
            <Select placeholder="请选择" @on-change="selectGame" :label-in-value='true'>
              <Option v-for="item in gameList" :value="item.code" :key="item.name">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem v-if="selected" prop='balance' :required='true'>
          <label for="" slot="label">{{game}}商家占成(%)</label>
          <Row>
            <Col span="10">
            <Tooltip :content="tipContent">
              <Input v-model="balance" placeholder="0~100,不超过上级洗码比"></Input>
            </Tooltip>
            </Col>
            <Col span="4">
            <span class="add" @click="addGame">添加</span>
            </Col>
          </Row>
        </FormItem>
        <Table :columns="columns" :data="gameDetail" class="table" size="small"></Table>
        <FormItem label="代理点数" prop='points'>
          <Tooltip :content="pointContent">
            <Input v-model="agent.points" placeholder="请输入点数,不超过上级点数"></Input>
          </Tooltip>
        </FormItem>
        <FormItem label="代理成数" prop='rate'>
          <Tooltip :content="rateContent">
            <Input v-model="agent.rate" placeholder="0~100,不超过上级成数"></Input>
          </Tooltip>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import dayjs from "dayjs";
import _ from "lodash";
import {
  availableAgents,
  userChangeStatus,
  checkAgentMix,
  gameBigType,
  companySelect,
  getBill,
  checkExit,
  getAdminInfo,
  agentNew
} from "@/service/index";
export default {
  data() {
    const validateSn = (rule, value, callback) => {
      if (!this.defaultSn) {
        if (value == "") {
          callback(new Error("标识不能为空"));
        } else {
          let nameReg = /^[\u4e00-\u9fa5A-Za-z0-9@_]{3,5}$/;
          if (!nameReg.test(value)) {
            callback(new Error("3~5位,只能包含中英文、数字、@、_"));
          } else {
            callback();
            // checkExit({ nick: { role: "10", displayName: value } }).then(res => {
            //   if (res.payload == true) {
            //     callback();
            //   } else {
            //     callback(new Error("昵称不可用,请重新输入"));
            //   }
            // });
          }
        }
      } else {
        callback();
      }
    };
    const validateName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("用户名不能为空"));
      } else {
        let nameReg = /^[A-Za-z0-9]{5,16}$/;
        if (!nameReg.test(value)) {
          callback(new Error("5~16位,只能包含英文或数字"));
        } else {
          checkExit({
            user: { role: "1000", suffix: "", username: value }
          }).then(res => {
            if (res.payload == true) {
              callback();
            } else {
              callback(new Error("用户名不可用,请重新输入"));
            }
          });
        }
      }
    };
    const validateNickname = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("昵称不能为空"));
      } else {
        let nameReg = /^[\u4e00-\u9fa5A-Za-z0-9]{2,10}$/;
        if (!nameReg.test(value)) {
          callback(new Error("2~10位,只能输入中英文及数字"));
        } else {
          checkExit({ nick: { role: "1000", displayName: value } }).then(
            res => {
              if (res.payload == true) {
                callback();
              } else {
                callback(new Error("昵称不可用,请重新输入"));
              }
            }
          );
        }
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("密码不能为空"));
      } else {
        let testReg = /^[a-zA-Z0-9@_#$%^&*!.~-]{6,16}$/;
        if (!testReg.test(value)) {
          callback(new Error("8~16位,必须包含英文、数字和符号任意两种组合"));
        } else {
          if (this.passwordLevel(value) < 3) {
            callback(new Error("密码强度不够"));
          } else {
            callback();
          }
        }
      }
    };
    const validatePoint = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("点数不能为空"));
      } else {
        let testReg = /^[1-9]\d*$/;
        if (!testReg.test(value)) {
          callback(new Error("点数需为数字"));
        } else {
          if (value > this.parentBalance) {
            callback(new Error("点数超过了上级余额"));
          } else {
            callback();
          }
        }
      }
    };
    const validateRate = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("成数不能为空"));
      } else {
        let testReg = /^[1-9]\d*$/;
        if (!testReg.test(value)) {
          callback(new Error("成数需为数字"));
        } else {
          if (value > this.parentRate) {
            callback(new Error("成数超过了上级成数"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      plus: null,
      modal: false,
      point: "",
      remark: "",
      search1: "",
      search2: "",
      parentDisplayName: "",
      dayjs: dayjs,
      playerPoint: false,
      agentChild: [],
      currentLevel: null,
      fromUserId: "", //modal data
      toRole: "",
      toUser: "",
      //创建agnet
      agentModal: false,
      Topdisabled: false,
      code: "",
      agentType: 1,
      defaultSn: true,
      parentSn: "",
      selected: false,
      game: "", //选择的游戏
      balance: "",
      parentList: [],
      tipContent: "该上级代理",
      pointContent: "上级代理余额为:",
      rateContent: "上级代理成数为:",
      parentBalace: 0,
      parentRate: 0,
      parentGameList: [],
      typeList: [
        {
          label: "与上级相同",
          value: 1
        },
        {
          label: "分配代理标识",
          value: 2
        }
      ],
      disabled: true,
      gameType: [],
      gameList: [],
      gameDetail: [],
      agent: {
        parent: "",
        sn: "",
        username: "",
        password: "",
        displayName: "",
        remark: "",
        points: "",
        rate: ""
      },
      agentValidate: {
        sn: [
          {
            validator: validateSn,
            trigger: "blur",
            required: true
          }
        ],
        username: [
          {
            validator: validateName,
            trigger: "blur",
            required: true
          }
        ],
        displayName: [
          {
            validator: validateNickname,
            trigger: "blur",
            required: true
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur",
            required: true
          }
        ],
        points: [
          {
            validator: validatePoint,
            trigger: "blur",
            required: true
          }
        ],
        rate: [
          {
            validator: validateRate,
            trigger: "blur",
            required: true
          }
        ]
      },
      columns: [
        {
          title: "公司",
          key: "company"
        },
        {
          title: "游戏",
          key: "name"
        },
        {
          title: "洗码比",
          key: "mix",
          render: (h, params) => {
            return h("span", params.row.mix + "%");
          }
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
                  click: () => {
                    let index = params.row._index;
                    this.gameDetail.splice(index, 1);
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      columns1: [
        {
          title: "管理员账号",
          key: "username",
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("span", params.row.username);
            } else {
              return h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    color: "#20a0ff"
                  },
                  on: {
                    click: async () => {
                      this.$store.commit("changePlayer", {
                        params: []
                      });
                      let userId = params.row.userId;
                      this.$store.commit("changeRowId", { params: userId });
                      let level = params.row.level;
                      this.currentLevel = level + 1;
                      let showList = await this.getNextAgent(
                        this.agentChild,
                        userId
                      );
                      showList = _.filter(showList, function(o) {
                        return o.length;
                      });
                      let len = showList.length;
                      if (len > 0) {
                        while (len--) {
                          if (showList[len][0].level > level + 1) {
                            showList.splice(len, 1);
                          }
                        }
                      }
                      this.agentChild = showList;
                      this.$store.dispatch("getAgentPlayer", {
                        fromUserId: userId
                      });
                    }
                  }
                },
                params.row.username
              );
            }
          }
        },
        {
          title: "代理昵称",
          key: "displayName"
        },
        {
          title: "上级代理",
          key: "parentDisplayName",
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("span", "");
            } else {
              return h("span", params.row.parentDisplayName);
            }
          }
        },
        {
          title: "代理游戏",
          key: "",
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("span", "");
            } else {
              let column = [
                {
                  title: "代理游戏",
                  key: "name"
                },
                {
                  title: "洗码比",
                  key: "mix"
                }
              ];
              let data = [];
              let gameList = params.row.gameList;
              let len = gameList.length;
              for (let item of gameList) {
                let obj = {};
                obj.mix = item.mix + "%";
                obj.name = item.name;
                data.push(obj);
              }
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover"
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        color: "#20a0ff"
                      }
                    },
                    len + "款游戏"
                  ),
                  h("Table", {
                    props: {
                      columns: column,
                      data: data,
                      border: true,
                      size: "small",
                      width: 250
                    },
                    slot: "content"
                  })
                ]
              );
            }
          }
        },
        {
          title: "代理成数",
          key: "rate",
          render: (h, params) => {
            return h("span", params.row.rate + "%");
          }
        },
        {
          title: "剩余点数",
          key: "balance",
          render: (h, params) => {
            if (params.row.parent == "00") {
            } else {
              return h("div", [
                h("p", params.row.balance),
                h("p", [
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          this.modal = true;
                          this.plus = true;
                          this.parentDisplayName =
                            "【" +
                            params.row.parentDisplayName +
                            "】" +
                            params.row.parentName;
                          if (params.row.parent == "01") {
                            this.fromUserId = JSON.parse(
                              localStorage.getItem("userInfo")
                            ).userId;
                          } else {
                            this.fromUserId = params.row.parent;
                          }
                          this.toRole = params.row.role;
                          this.toUser = params.row.username;
                        }
                      }
                    },
                    "加点"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer",
                        paddingLeft: "10px"
                      },
                      on: {
                        click: () => {
                          this.modal = true;
                          this.plus = false;
                          this.parentDisplayName =
                            "【" +
                            params.row.parentDisplayName +
                            "】" +
                            params.row.parentName;
                          this.fromUserId = params.row.userId;
                          this.toRole = params.row.parentRole;
                          this.toUser = params.row.parentName;
                        }
                      }
                    },
                    "减点"
                  )
                ])
              ]);
            }
          }
        },
        {
          title: "创建时间",
          key: "createdAt",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("span", "");
            } else {
              if (params.row.status == 1) {
                return h(
                  "Tag",
                  {
                    props: {
                      color: "green"
                    }
                  },
                  "正常"
                );
              } else {
                return h(
                  "Tag",
                  {
                    props: {
                      color: "red"
                    }
                  },
                  "锁定"
                );
              }
            }
          }
        },
        {
          title: "备注",
          key: "remark",
          render: (h, params) => {
            let remark = params.row.remark;
            let result = Object.prototype.toString.call(remark);
            if (result.includes("String")) {
              if (remark != "NULL!") {
                return h(
                  "Tooltip",
                  {
                    props: {
                      content: remark
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
              } else {
                return h("span", "");
              }
            } else {
              return h("span", "");
            }
          }
        },
        {
          title: "操作",
          key: "",
          minWidth: 240,
          render: (h, params) => {
            if (params.row.parent == "00") {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "#20a0ff",
                      cursor: "pointer",
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        //代理管理员
                        this.defaultSn = false;
                        this.agentModal = true;
                        this.agentType = 2;
                        this.Topdisabled = true;
                        this.parentSn = params.row.sn;
                        let parent =
                          params.row.level == 0 ? "01" : params.row.userId;
                        availableAgents({ parent }).then(res => {
                          if (res.code == 0) {
                            this.parentList = res.payload;
                          }
                        });
                        this.parentRate = params.row.rate;
                        this.rateContent = "上级代理成数为:" + params.row.rate;
                      }
                    }
                  },
                  "创建代理"
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "#20a0ff",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        console.log(1);
                      }
                    }
                  },
                  "创建玩家"
                )
              ]);
            } else {
              let color = "";
              let text = "";
              let status = null;
              if (params.row.status == 1) {
                text = "锁定";
                color = "#f30";
                status = 0;
                return h("div", [
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer",
                        marginRight: "10px"
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
                    "span",
                    {
                      style: {
                        color: color,
                        cursor: "pointer",
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.$Modal.confirm({
                            title: "提示!",
                            content: `<p>是否${text}该代理</p>`,
                            onOk: () => {
                              userChangeStatus({
                                role: "1000",
                                status,
                                userId: params.row.userId
                              }).then(res => {
                                if (res.code == 0) {
                                  this.$Message.success(`${text}成功`);
                                  this.init();
                                }
                              });
                            }
                          });
                        }
                      }
                    },
                    text
                  ),
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer",
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.agentModal = true;
                          this.parentSn = params.row.sn;
                          availableAgents({ parent: params.row.userId }).then(
                            res => {
                              if (res.code == 0) {
                                this.parentList = res.payload;
                              }
                            }
                          );
                          this.parentRate = params.row.rate;
                          this.rateContent =
                            "上级代理成数为:" + params.row.rate;
                        }
                      }
                    },
                    "创建代理"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          console.log(1);
                        }
                      }
                    },
                    "创建玩家"
                  )
                ]);
              } else {
                text = "解锁";
                color = "#19be6b";
                status = 1;
                return h("div", [
                  h(
                    "span",
                    {
                      style: {
                        color: "#20a0ff",
                        cursor: "pointer",
                        marginRight: "10px"
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
                    "span",
                    {
                      style: {
                        color: color,
                        cursor: "pointer",
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.$Modal.confirm({
                            title: "提示!",
                            content: `<p>是否${text}该代理</p>`,
                            onOk: () => {
                              userChangeStatus({
                                role: "1000",
                                status,
                                userId: params.row.userId
                              }).then(res => {
                                if (res.code == 0) {
                                  this.$Message.success(`${text}成功`);
                                  this.init();
                                }
                              });
                            }
                          });
                        }
                      }
                    },
                    text
                  )
                ]);
              }
            }
          }
        }
      ],
      columns2: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "点数",
          key: "balance",
          render: (h, params) => {
            return h("div", [
              h("p", params.row.balance),
              h("p", [
                h(
                  "span",
                  {
                    style: {
                      color: "#20a0ff",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.modal = true;
                        this.playerPoint = true;
                        this.plus = true;
                        this.parentDisplayName =
                          "【代理】" + params.row.parentName;
                        this.fromUserId = params.row.parent;
                        this.toUser = params.row.userName;
                      }
                    }
                  },
                  "加点"
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "#20a0ff",
                      cursor: "pointer",
                      paddingLeft: "10px"
                    },
                    on: {
                      click: () => {
                        this.modal = true;
                        this.playerPoint = true;
                        this.plus = false;
                        this.parentDisplayName =
                          "【代理】" + params.row.parentName;
                        this.fromUserId = params.row.parent;
                        this.toUser = params.row.userName;
                      }
                    }
                  },
                  "减点"
                )
              ])
            ]);
          }
        },
        {
          title: "直属代理",
          key: "parentName"
        },
        {
          title: "最后登录时间",
          key: "updateAt",
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.updateAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "状态",
          key: "state",
          render: (h, params) => {
            if (params.row.state == 1) {
              return h(
                "Tag",
                {
                  props: {
                    color: "green"
                  }
                },
                "正常"
              );
            } else {
              return h(
                "Tag",
                {
                  props: {
                    color: "red"
                  }
                },
                "锁定"
              );
            }
          }
        },
        {
          title: "操作",
          key: "",
          render: (h, params) => {
            let color = "";
            let text = "";
            let status = null;
            if (params.row.state == 1) {
              text = "锁定";
              color = "#f30";
              status = 0;
            } else {
              text = "解锁";
              color = "#19be6b";
              status = 1;
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#20a0ff",
                    cursor: "pointer",
                    marginRight: "10px"
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
                "span",
                {
                  style: {
                    color: color,
                    cursor: "pointer",
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示!",
                        content: `<p>是否${text}该玩家</p>`,
                        onOk: () => {
                          userChangeStatus({
                            role: "1000",
                            status,
                            userId: params.row.userId
                          }).then(res => {
                            if (res.code == 0) {
                              this.$Message.success(`${text}成功`);
                              this.init();
                            }
                          });
                        }
                      });
                    }
                  }
                },
                text
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    search() {
      console.log(2);
    },
    reset() {
      console.log(1);
    },
    resetAgent() {
      this.$refs["agentForm"].resetFields();
      this.parentList = [];
      this.selected = false;
      this.gameDetail = [];
      this.disabled = true;
      this.Topdisabled = false;
      this.agentType = 1;
    },
    selectParent(id) {
      if (id) {
        let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
        this.$store.commit("agentLoading", { params: true });
        this.disabled = false;
        companySelect({ parent: id }).then(res => {
          if (res.code == 0) {
            this.gameType = res.payload;
          }
        });
        let ids = id == "01" ? userId : id;
        getBill(ids).then(res => {
          if (res.code == 0) {
            this.parentBalance = res.payload.balance;
            this.pointContent = "上级代理余额为:" + res.payload.balance;
          }
        });
        if (id != "01") {
          getAdminInfo(id).then(res => {
            if (res.code == 0) {
              this.parentGameList = res.payload.gameList;
            }
          });
        }
        this.$store.commit("agentLoading", { params: false });
      }
    },
    selectType(v) {
      if (v == 2) {
        this.defaultSn = false;
      } else {
        this.defaultSn = true;
      }
    },
    selectCompany(value) {
      gameBigType({ companyIden: value }).then(res => {
        if (res.code == 0) {
          this.gameList = res.payload;
        }
      });
    },
    selectGame(o) {
      this.selected = true;
      this.game = o.label;
      this.code = o.value;
      let parentGameList = this.parentGameList;
      let maxMix = null;
      if (parentGameList.length > 0) {
        for (let item of parentGameList) {
          if (item.code == o.value) {
            maxMix = item.mix;
            this.tipContent = `上级游戏占成为:${maxMix}`;
          }
        }
      }
    },
    addGame() {
      let gamelist = this.gameList;
      let gameName = this.game;
      let gameItem = {};
      let balance = this.balance;
      let parentGameList = this.parentGameList;
      let maxMix = null;
      if (parentGameList.length > 0) {
        for (let item of parentGameList) {
          if (item.code == this.code) {
            maxMix = item.mix;
          }
        }
      }
      if (balance > maxMix && maxMix != null) {
        this.$Message.warning({
          content: "不能超过上级占成",
          duration: 2.5
        });
        return;
      }
      for (let item of gamelist) {
        if (item.name == gameName) {
          gameItem = item;
        }
      }
      gameItem.mix = balance;
      if (gameItem.mix) {
        this.gameDetail.push(gameItem);
        this.gameDetail = _.uniqWith(this.gameDetail, _.isEqual);
      }
    },
    createAgent() {
      this.$refs["agentForm"].validate(valid => {
        if (valid) {
          console.log(1);
          if (_.isEmpty(this.gameDetail)) {
            this.$Message.error("尚未选择游戏");
            return;
          }
          let agent = this.agent;
          this.$store.commit("agentLoading", { params: true });
          agentNew({
            sn: this.defaultSn == true ? this.parentSn : agent.sn,
            parent: agent.parent,
            username: agent.username,
            password: agent.password,
            displayName: agent.displayName,
            remark: agent.remark,
            points: agent.points,
            rate: agent.rate,
            role: "1000",
            gamelist: this.gameDetail
          }).then(res => {
            if (res.code == 0) {
              this.$Message.success("创建成功");
              this.resetAgent();
            }
          });
        } else {
          this.$Message.error("请检查输入项");
        }
      });
    },
    ok() {
      if (this.playerPoint == false) {
        this.$store
          .dispatch("transferBill", {
            amount: this.point,
            fromUserId: this.fromUserId,
            toRole: this.toRole,
            toUser: this.toUser,
            remark: this.remark
          })
          .then(() => {
            this.point = "";
            this.remark = "";
          });
      } else {
        if (this.plus == true) {
          this.$store
            .dispatch("playAddBill", {
              amount: this.point,
              fromUserId: this.fromUserId,
              remark: this.remark,
              toUser: this.toUser
            })
            .then(() => {
              this.point = "";
              this.remark = "";
              this.playerPoint = false;
            });
        } else {
          this.$store.dispatch("playReduceBill", {
            amount: this.point,
            fromUserId: this.fromUserId,
            remark: this.remark,
            toUser: this.toUser
          });
          this.point = "";
          this.remark = "";
          this.playerPoint = false;
        }
      }
    },
    cancel() {
      this.point = "";
      this.remark = "";
      this.playerPoint = false;
    },
    passwordLevel(password) {
      var Modes = 0;
      for (let i = 0; i < password.length; i++) {
        Modes |= CharMode(password.charCodeAt(i));
      }
      return bitTotal(Modes);
      //CharMode函数
      function CharMode(iN) {
        if (iN >= 48 && iN <= 57)
          //数字
          return 1;
        if (iN >= 65 && iN <= 90)
          //大写字母
          return 2;
        if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
          //大小写
          return 4;
        else return 8; //特殊字符
      }
      //bitTotal函数
      function bitTotal(num) {
        let modes = 0;
        for (let i = 0; i < 4; i++) {
          if (num & 1) modes++;
          num >>>= 1;
        }
        return modes;
      }
    },
    async getNextAgent(showList, userId) {
      let level = this.currentLevel;
      return new Promise((resolve, reject) => {
        this.$store.commit("agentLoading", { params: true });
        this.$store
          .dispatch("getAgentNext", {
            parent: userId,
            sort: "desc",
            sortkey: "createdAt",
            query: {}
          })
          .then(res => {
            let len = showList.length;
            if (len > 0) {
              while (len--) {
                if (showList[len][0].level >= level) {
                  showList.splice(len, 1);
                }
                showList.push(res.payload);
              }
            } else {
              showList.push(res.payload);
            }
            showList = _.uniqWith(showList, _.isEqual); //去重
            resolve(showList);
          });
      });
    },
    init() {
      this.$store.commit("agentLoading", { params: true });
      this.$store.dispatch("getAgentList", {
        parent: "01",
        query: {},
        sort: "desc",
        sortkey: "createdAt"
      });
    }
  },
  computed: {
    userInfo() {
      let arr = [];
      arr.push(JSON.parse(localStorage.getItem("userInfo")));
      return arr;
    },
    agentList() {
      return this.$store.state.report.agentList;
    },
    playerList() {
      return this.$store.state.report.playerList;
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.agetlist {
  min-height: 89vh;
  .top {
    clear: both;
    height: 50px;
    .left {
      float: left;
    }
    .search {
      float: right;
      line-height: 40px;
      padding-top: 4px;
    }
  }
  .title {
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem;
    font-weight: 600;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
}
#plusModal {
  h2 {
    margin-bottom: 22px;
  }
}
#textRow {
  display: block;
  resize: vertical;
  padding: 5px 7px;
  line-height: 1.5;
  width: 100%;
  color: #1f2d3d;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.add {
  color: #20a0ff;
  margin-left: 15px;
  cursor: pointer;
}
</style>
