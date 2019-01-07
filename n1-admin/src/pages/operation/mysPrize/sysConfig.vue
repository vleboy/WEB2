<template>
  <div class="sysConfig">
   <div class="search">
     <!-- @on-change='init' -->
      <Select v-model="gameSeries" style="width:100px">
      <Option v-for="item in seriesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Button class="reset" type="primary" @click="init">刷新</Button>
   </div>
    <Table :columns="columns1" :data="prizeList" size="small"></Table>
   <div v-if="gameSeries!='all'">
      <p class="robot_title">机器人系列</p>
    <Table :columns="columns2" :data="robotList" size="small"></Table>
   </div>
     <Spin size="large" fix v-if="spin">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <Modal v-model="editPrice" @on-ok="ok" title="神秘大奖" id="editPrice" @on-cancel="cancel">
      <Row class="modalrow">
        <Col span="8">
          <span>
            <span class="required">*</span>奖池初始金额
          </span>
        </Col>
        <Col span="8">
          <span>当前设置: &nbsp;{{rowParams.bonusPoolInit}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input v-model="newParams.bonusPoolInit"></Input>
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
          <span>当前设置: &nbsp;{{rowParams.bonusHitMin}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input v-model="newParams.bonusHitMin"></Input>
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
          <span>当前设置: &nbsp;{{rowParams.bonusHitMax}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input v-model="newParams.bonusHitMax"></Input>
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
          <span>当前设置: &nbsp;{{rowParams.bonusPoolRate}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input v-model="newParams.bonusPoolRate"></Input>
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
          <span>当前设置: &nbsp;{{rowParams.bonusRobotLimit}}</span>
        </Col>
        <Col span="8">
          <Row>
            <Col span="6">修改为</Col>
            <Col span="18">
              <Input v-model="newParams.bonusRobotLimit"></Input>
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
      gameSeries: 'all',
      spin:false,
      timeList: [{}, {}],
      rowParams:{
        bonusPoolInit:0,
        bonusHitMin:0,
        bonusHitMax:0,
        bonusPoolRate:0,
        bonusRobotLimit:0
      },
      newParams:{
        bonusPoolInit:'',
        bonusHitMin:'',
        bonusHitMax:'',
        bonusHitMax:'',
        bonusRobotLimit:''
      },
      seriesList: [
        {
          value: 'all',
          label: "全部"
        },
        {
          value: 'na',
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
          key: "bonusPoolInit"
        },
        {
          title: "奖池基础掉落金额",
          key: "bonusHitMin"
        },
        {
          title: "奖池必掉金额",
          key: "bonusHitMax"
        },
        {
          title: "机器人数量",
          key: "",
          render:(h,params)=>{
            let bonusRobots=params.row.bonusRobots
            return h('span',bonusRobots.length)
          }
        },
        {
          title: "下注抽取比例",
          key: "bonusPoolRate"
        },
        {
          title: "机器人注入奖池金额",
          key: "bonusRobotInput"
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
                      this.rowParams=params.row
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
      prizeList: [
        list
      ],
      columns2: [
        {
          title: "机器人ID",
          key: "id"
        },
        {
          title: "状态",
          key: "isActive",
          render: (h,params) =>{
            let status=params.row.isActive
            let color=status?"#20a0ff":"#f5141e"
            let text=status?'启用':'禁用' 
            return h('span',{
              style:{
                color:color
              }
            },text)
          }

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
          key: "",
          render:(h,params)=>{
            let work=params.row.workTimes;
            return h('div',
              work.map(item =>{
                return h('p',{
                  style:{
                    textAlign: "center",
                    backgroundColor: "#e4e8f1",
                    borderRadius: " 4px",
                    height: "26px",
                    lineHeight:'26px'
                  }
                },`${item.start}--${item.end}`)
              })
            )
          }
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
  created() {
    this.init()
  },
  methods: {
    ok() {
      let params=this.rowParams;
      let newConfig=this.newParams;
      params.bonusPoolInit=newConfig.bonusPoolInit;
      params.bonusHitMin=newConfig.bonusHitMin;
      params.bonusHitMax=newConfig.bonusHitMax;
      params.bonusHitMax=newConfig.bonusHitMax;
      params.bonusRobotLimit=newConfig.bonusRobotLimit;
      this.axios.post('http://192.168.3.200:45557/setBonusConfig',params).then((res)=>{
        if(res.status=200){
          this.$Message.success('修改成功');
          this.init()
        }
      })
    },
    cancel() {
      this.newParams={
        bonusPoolInit:'',
        bonusHitMin:'',
        bonusHitMax:'',
        bonusHitMax:'',
        bonusRobotLimit:''
      }
    },
    addTime() {
      this.timeList.push({});
    },
    delTime(index) {
      this.timeList.splice(index, 1);
    },
    init(){
      this.spin=true;
       this.axios.post('http://192.168.3.200:45557/getBonusConfig',{
      gameType:this.gameSeries
    }).then(res=>{
      if(res.status==200){
        this.prizeList=res.data.config;
        let robotList=[]
        for(let item of this.prizeList){
          robotList.push(...item.bonusRobots)
        }
        this.robotList=robotList
      }
    }).finally(()=>{
      this.spin=false
    })
    }
  }
};
</script>
<style lang="less" scoped>
.sysConfig {
  min-height: 87vh;
  .robot_title{
    font-size: 14px;
    font-weight: bold;
    margin: 10px auto;
  }
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
.search{
  margin-bottom: 10px;
}
.reset{
  float: right;
}
</style>
