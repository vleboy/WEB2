<template>
  <div class="p-transaction">
    <div class="-p-header">
      <Row>
        <Col class="-p-h-bottom">
          <RadioGroup v-model="companyInfo" @on-change="changeCompany" type="button">
            <Radio v-for="(item,index) of companyList" :key="index" :label="item.company">{{item.company}}</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col class="-p-h-bottom">
          <RadioGroup v-model="radioInfo" @on-change="changeRadio" type="button">
            <Radio v-for="(item,index) of gameTypeList" :key="index" :label="item.code">{{item.name}}</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col span="12" style="float: right; text-align: right">
          <DatePicker
            v-model="amountDate"
            type="datetimerange"
            :transfer='true'
            style="width: 300px"
            @on-ok="searchAmount"
            placeholder="选择日期时间范围">
          </DatePicker>
          <Button type="primary" @click="searchAmount">搜索</Button>
          <Button type="primary" @click="exportData">导出数据</Button>
        </Col>
        <Col span="12">
          <span class="justfy2">当前剩余点数：<span style="color: #F7BA2A">{{formatPoints(balance)}}</span></span>
          <Button type="text" @click="resultGetPlayerDetail">刷新</Button>
        </Col>
      </Row>
    </div>

    <div class="-p-content">
      <Table :columns="columns" :data="dataList"></Table>
      <Row  style="padding: 20px 0">
        <Col span="12" class="g-text-right">
          <div style="margin-bottom: 10px;font-size: 15px;" v-if='radioInfo!=-1'>本页输赢总计:
              <span :class="{'-p-green':this.allAmount>0,'-p-red':this.allAmount<0}">
                {{formatPoints(allAmountFun)}}
              </span>
          </div>
        </Col>
        <Col span="12" style="text-align: right;font-size: 12px">
          <Page :total="playerDetailList.length"
                show-elevator
                :page-size="20"
                :current.sync="currentPage"
                @on-change="getNowpage"></Page>
        </Col>
      </Row>
    </div>

    <Modal title="战绩详细" v-model="isOpenModalBill" class="g-text-center"  width="940" cancel-text="">
      <!--<OneArmBanditModal ref="childMethod" v-if="propChild.gameType =='40000'" :dataProp="propChild"></OneArmBanditModal>-->
      <RealLifeModal ref="childMethod" v-if="propChild.gameType =='30000'" :dataProp="propChild"></RealLifeModal>
      <!--<ArcadeModal ref="childMethod" v-if="propChild.gameType =='50000'" :dataProp="propChild"></ArcadeModal>-->
    </Modal>

    <Modal title="流水详情"  v-model="isOpenModalRunning" class="g-text-center" width="800" cancel-text="">
      <oneRunningAccount :dataProp="runningDetail"></oneRunningAccount>
    </Modal>

    <Spin size="large" fix v-if="isFetching">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>

<script type="text/ecmascript-6">
  import { thousandFormatter } from '@/config/format'
  import dayjs from "dayjs";
  import { httpRequest } from '@/service/index'

  // import ArcadeModal from '@/components/record/arcadeModal'
  import RealLifeModal from '@/components/record/realLifeModal'
  // import OneArmBanditModal from '@/components/record/oneArmBanditModal'
  import oneRunningAccount from '@/components/player/oneRunningAccount'

  export default {
    components: { oneRunningAccount, RealLifeModal },
    name: 'transactionRecord',
    props:['dataProp'],
    data () {
      return {
        nowSize: 20,
        nowPage: 1,
        pageSize: 100,
        currentPage: 1,
        allAmount: 0,
        isFetching: false,
        isLastMessage: false, // 主要判断是否是后台返回最后一次信息
        isOpenModalBill: false,
        isOpenModalRunning: false,
        radioInfo: '',
        amountDate: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        companyList: [],
        gameTypeList: [],
        companyInfo: '全部厂商',
        playerDetailList: [],
        playerDetailListStorage: [],
        playerDetailStartKey: '',
        balance: '',
        propChild: {},
        runningDetail: {},
        columns: [
          {
            title: '交易号',
            key: 'businessKey',
            width: 200
          },
          {
            title: '交易时间',
            key: '',
            width: 160,
            render: (h, params) => {
              return h("span", dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"));
            }
          },
          {
            title: '结算前余额',
            key: '',
            width: 140,
            render: (h, params) => {
              return h('span', thousandFormatter(params.row.originalAmount))
            }
          },
          {
            title: '操作金额',
            key: '',
            render: (h, params) => {
              return h('span', thousandFormatter(params.row.betAmount))
            }
          },
          {
            title: '返还金额',
            key: '',
            render: (h, params) => {
              return h('span', thousandFormatter(params.row.retAmount))
            }
          },
          {
            title: '净利润',
            key: '',
            render: (h, params) => {
              return h('span', {
                class: {
                  '-p-green': params.row.profitAmount >= 0,
                  '-p-red': params.row.profitAmount < 0
                },
              },thousandFormatter(params.row.profitAmount))
            }
          },
          {
            title: '成数',
            key: '',
            render: (h, params) => {
              return h('span', `${params.row.rate}%`)
            }
          },
          {
            title: '洗码比',
            key: '',
            render: (h, params) => {
              return h('span', `${params.row.mix}%`)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 90,
            align: 'center',
            render: (h, params) => {
              if (params.row.gameType != 1 && params.row.gameType != 2 && params.row.gameType != 3) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      color:'#20a0ff',
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.openModalBill(params.row)
                      }
                    }
                  }, '查看战绩'),
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      color:'#20a0ff'
                    },
                    on: {
                      click: () => {
                        this.openModalRunning(params.row)
                      }
                    }
                  }, '流水详情')
                ])
              }
            }
          }
        ],
      }
    },
    computed:{
      dataList () {
        if (this.nowPage === 1) {
          return this.playerDetailList.slice(0, this.nowSize)
        } else {
          return this.playerDetailList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      },
      allAmountFun () {
        this.allAmount = 0
        for (let item of this.dataList) {
          if (item.gameType != '2') {
            this.allAmount = item.winloseAmount + this.allAmount
          }
        }
        return this.allAmount
      }
    },
    mounted () {
      // this.getTransactionRecord()
      this.companySelectList()
    },
    methods:{
      getNowpage (page) {
        this.nowPage = page
        if((page == Math.ceil(this.playerDetailList.length/this.nowSize) && !this.isFetching) && page != 1 && !this.isLastMessage) {
          this.playerDetailListStorage = JSON.parse(JSON.stringify(this.playerDetailList))
          this.getTransactionRecord()
        }
      },
      openModalBill (data) {
        this.propChild = data;
        // if (this.propChild.gameType == '40000') {
        //   this.isOpenModalBill = true
        //   setTimeout(()=>{
        //     this.$refs.childMethod.getOneArmBandit()
        //   },0)
        // } else if (this.propChild.gameType == '30000') {
        //   this.isOpenModalBill = true
        //   setTimeout(()=>{
        //     this.$refs.childMethod.getRealLife()
        //   },0)
        // } else if (this.propChild.gameType == '50000') {
        //   this.isOpenModalBill = true
        //   setTimeout(()=>{
        //     this.$refs.childMethod.getRecordSLXY()
        //   },0)
        // }
        if (this.propChild.gameType == '30000') {
          this.isOpenModalBill = true
          setTimeout(()=>{
            this.$refs.childMethod.getRealLife()
          },0)
        } else {
          this.$Message.error('对不起，该游戏不支持查看战绩')
        }
      },
      openModalRunning (data) {
        this.isOpenModalRunning = true
        this.runningDetail = data
      },
      changeRadio () {
        this.initData()
        this.getTransactionRecord()
      },
      getTransactionRecord () {
        if(this.isFetching) return
        this.isFetching = true
        this.initTime()
        let name = localStorage.playerName
        let [startTime, endTime] = this.amountDate
        startTime = new Date(startTime).getTime()
        endTime = new Date(endTime).getTime()

        httpRequest('post','/player/bill/detail',{
          userName: name,
          company: this.companyInfo == '全部厂商' ? '-1' : this.companyInfo,
          gameType: this.radioInfo,
          startTime: startTime,
          endTime: endTime,
          startKey: this.playerDetailStartKey,
          pageSize: this.pageSize
        }).then(
          result => {
            this.isLastMessage = result.list < this.pageSize
            this.playerDetailList = result.list
            this.balance = result.balance
            this.playerDetailStartKey = result.startKey
            this.playerDetailListStorage.length && (this.playerDetailList = this.playerDetailListStorage.concat(this.playerDetailList))
            this.isFetching = false
          }
        )
      },
      companySelectList () {
        httpRequest('post','/companySelect',{
          parent: localStorage.loginRole == 1 ? '' : localStorage.loginId
        },'game').then(
          result => {
            this.companyList = result.payload || []
            this.companyList.unshift({
              company: '全部厂商',
            })
            this.changeCompany()
            // this.$store.commit('closeLoading')
          }
        )
      }, //获取运营商列表
      changeCompany () {
        httpRequest('post','/gameBigType',{
          companyIden: this.companyInfo == '全部厂商' ? '-1' : this.companyInfo
        },'game').then(
          result => {
            this.gameTypeList = result.payload
            if(this.radioInfo=='') {
              this.initData()
              this.getTransactionRecord()
            }
            this.gameTypeList.unshift({
              code: '',
              name: '全部'
            })
            this.radioInfo = ''
          }
        )
      },
      searchAmount () {
        this.initData()
        this.getTransactionRecord()
      },
      initTime () {
        const start = this.amountDate[0] ? new Date(this.amountDate[0]) : new Date();
        const end = this.amountDate[1] ? new Date(this.amountDate[1]) : new Date();
        !this.amountDate[0] && start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
        this.amountDate = [start,end];
      },
      resultGetPlayerDetail (){
        this.amountDate = [] // 处理时间不更新，列表页筛选不了最新数据问题
        this.initData()
        this.getTransactionRecord()
      },
      initData () {
        this.currentPage = 1;
        this.nowPage = 1;
        this.playerDetailList = [];
        this.playerDetailListStorage = []
        this.playerDetailStartKey = ''
      },
      formatPoints (data) {
        return thousandFormatter(data)
      },
      exportData () {
        let url = process.env.NODE_ENV == 'production' ? 'https://n1admin.na12345.com' : 'https://d3rqtlfdd4m9wd.cloudfront.net'
        let [startTime, endTime] = this.amountDate
        startTime = new Date(startTime).getTime()
        endTime = new Date(endTime).getTime()
        window.open(`${url}/player/bill/detail/download?userName=${localStorage.playerName}&company=${this.companyInfo}&gameType=${this.radioInfo}&startTime=${startTime}&endTime=${endTime}`)
      }
    }
  }
</script>

<style lang="less" scoped type="text/less">
  .p-transaction{
    .-p-content{
      padding: 16px 0 0 0;
    }
    .-p-h-bottom{
      margin-bottom: 16px;
    }

    .-p-green{color: #00CC00}
    .-p-red{color: #FF3300}
  }

</style>
