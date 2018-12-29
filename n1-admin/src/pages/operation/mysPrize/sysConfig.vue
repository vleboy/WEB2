<template>
  <div class="sysConfig">
    <Select v-model="gameSeries" style="width:100px">
      <Option v-for="item in seriesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Table :columns="columns1" :data="priceList" size="small"></Table>
    <p>机器人系列</p>
    <Table :columns="columns2" :data="robotList" size="small"></Table>
    <Modal v-model="editPrice" @on-ok="ok" title="神秘大奖" id="editPrice" @on-cancel="cancel">
      <Row class="modalrow">
        <Col span="8">
          <span>
            <span class="required">*</span>奖池初始金额
          </span>
        </Col>
        <Col span="8">
          <span>当前设置: &nbsp;{{}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input></Input>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row class="modalrow">
        <Col span="8">
          <span>
            <span class="required">*</span>奖池基础掉落金额
          </span>
        </Col>
        <Col span="8">
          <span>当前设置: &nbsp;{{}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input></Input>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row class="modalrow">
        <Col span="8">
          <span>
            <span class="required">*</span> 奖池必掉金额
          </span>
        </Col>
        <Col span="8">
          <span>当前设置: &nbsp;{{}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input></Input>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row class="modalrow">
        <Col span="8">
          <span>
            <span class="required">*</span>下注抽取比例
          </span>
        </Col>
        <Col span="8">
          <span>当前设置: &nbsp;{{}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input></Input>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row class="modalrow">
        <Col span="8">
          <span>
            <span class="required">*</span> 机器人休眠值
          </span>
        </Col>
        <Col span="8">
          <span>当前设置: &nbsp;{{}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input></Input>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
    <Modal v-model="editRobot" @on-ok="ok" title="机器人" id="editRobot" @on-cancel="cancel">
      <p>
        <span class="required">*</span>机器人参数设置
      </p>
      <div class="modal_content">
        <Row class="modalrow">
          <Col span="12">
            <span>机器人ID: &nbsp; {{}}</span>
          </Col>
          <Col span="12">
            <span>状态: &nbsp;
              <span>{{}}</span>
            </span>
          </Col>
        </Row>
        <Row class="modalrow">
          <Col span="12">
            <span>下注金额:
              <Input style="width: 150px"></Input>
            </span>
          </Col>
          <Col span="12">
            <span>下注间隔:
              <Input style="width: 150px"></Input>
            </span>
          </Col>
        </Row>
        <Row class="modalrow" v-for="(item,index) in timeList" :key="index">
          <Col span="12">
            <span>启用时间:
              <TimePicker type="time" placeholder="选择时间" style="width: 150px"></TimePicker>
            </span>
          </Col>
          <Col span="12">
            <span>停用时间:
              <TimePicker type="time" placeholder="选择时间" style="width: 150px"></TimePicker>
              <span class="del" @click="delTime(index)">删除</span>
            </span>
          </Col>
        </Row>
        <p class="addOne" @click="addTime">继续添加启用时段</p>
      </div>
    </Modal>
  </div>
</template>
<script>
const list={
          gameType: "moneytree",
          bonusPool: 0,
          bonusHitMin: 10000,
          bonusHitMax: 20000,
          bonusPoolRate: 0.0004,
          bonusRobotLimit: 15000,
          bonusRobots: [
            {
              id: 952700,
              isActive: true,
              bet: 25,
              betInterval: 5000,
              workTimes: [
                {
                  start: "17:00",
                  end: "18:00"
                },
                {
                  start: "6:00",
                  end: "8:00"
                }
              ]
            },
            {
              id: 952800,
              isActive: true,
              bet: 25,
              betInterval: 5000,
              workTimes: [
                {
                  start: "17:00",
                  end: "18:00"
                }
              ]
            }
          ]
        }
export default {
  name: "sysConfig",
  components: {},
  filters: {},
  props: {},
  data() {
    return {
      editPrice: false,
      editRobot: false,
      gameSeries: 1,
      timeList: [{}, {}],
      seriesList: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "na"
        }
      ],
      columns1: [
        {
          title: "游戏系列",
          key: "gameType"
        },
        {
          title: "当前奖池金额",
          key: "bonusPool"
        },
        {
          title: "奖池初始金额",
          key: ""
        },
        {
          title: "奖池基础掉落金额",
          key: ""
        },
        {
          title: "奖池必掉金额",
          key: ""
        },
        {
          title: "NA机器人数量",
          key: ""
        },
        {
          title: "下注抽取比例",
          key: "bonusPoolRate"
        },
        {
          title: "NA机器人注入奖池金额",
          key: ""
        },
        {
          title: "机器人休眠值",
          key: "bonusRobotLimit"
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
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {
                      this.editPrice = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {
                      this.editRobot = true;
                    }
                  }
                },
                "添加机器人"
              )
            ]);
          }
        }
      ],
      priceList: [
        list
      ],
      columns2: [
        {
          title: "所属系列",
          key: ""
        },
        {
          title: "机器人ID",
          key: "id"
        },
        {
          title: "状态",
          key: "isActive"
        },
        {
          title: "下注金额",
          key: "bet"
        },
        {
          title: "下注间隔(秒)",
          key: "betInterval"
        },
        {
          title: "启用时段",
          key: ""
        },
        {
          title: "工作时长",
          key: ""
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
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "禁用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      robotList: list.bonusRobots
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    ok() {},
    cancel() {},
    addTime() {
      this.timeList.push({});
    },
    delTime(index) {
      this.timeList.splice(index, 1);
    }
  }
};
</script>
<style lang="less" scoped>
.sysConfig {
  min-height: 87vh;
}
.required {
  color: red;
}
.modalrow {
  line-height: 32px;
  padding-bottom: 5px;
}
.del {
  color: red;
  padding-left: 5px;
  cursor: pointer;
}
.modal_content {
  border: 1px solid #ccc;
  padding: 5px;
}
.addOne {
  border: 1px solid #f2f2f2;
  height: 28px;
  padding-top: 8px;
  text-align: center;
  cursor: pointer;
}
</style>
