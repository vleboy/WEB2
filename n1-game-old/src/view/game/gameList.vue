<template>
  <div>
    <el-radio-group v-model="companyInfo" @change="startSearch" class="searchbox">
      <el-radio-button v-for="(item,index) of companyOptions" :key="index" :label="item.company">{{item.company}}</el-radio-button>
    </el-radio-group>
    <p class="searchResult">共搜索到 {{counts.length||0}} 条数据</p>
    <el-row class="justfy1">
      <el-col :span="12">
        <el-button type="primary"  @click="goCreate">创建新游戏</el-button>
      </el-col>
      <el-col  :span="12" style="text-align: right">
        <el-select v-model="searchInfo.gameStatus" placeholder="请选择状态" filterable clearable @change="startSearch">
          <el-option value="2" label="全部"></el-option>
          <el-option value="1" label="正常"></el-option>
          <el-option value="0" label="下线"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="outresult">
      <el-table stripe :data="gameItems">
        <el-table-column label="游戏名称" prop="gameName" align="center" width="130"></el-table-column>

        <!--<el-table-column label="游戏标识" prop="gameIden" align="center" width="130"></el-table-column>-->
        <!--<el-table-column label="所属供应商" prop="company.companyName" align="center" width="150">-->
        <!--</el-table-column>-->
        <el-table-column label="供应商标识" prop="companyIden" align="center"></el-table-column>
        <el-table-column label="分类" :formatter="getType" align="center"></el-table-column>
        <el-table-column label="kindId" prop="kindId" align="center" width="130"></el-table-column>
        <!--<el-table-column label="网页游戏" prop="isWebGame" align="center" width="130">-->
          <!--<template scope="scope">-->
            <!--{{scope.row.isWebGame!='0' ? '是' : '否' }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="游戏链接" prop="gameLink" align="center" width="320"></el-table-column>
        <!--<el-table-column label="创建时间" prop="createdAt" :formatter="getAtime" width="150"></el-table-column>-->
        <el-table-column label="状态" align="center">
          <template scope="scope">
            <el-tag :type="scope.row.gameStatus ? 'success' : 'danger'">
              {{gameStatus[scope.row.gameStatus]}}
            </el-tag>
          </template>
        </el-table-column>
        <!--<el-table-column label="服务器ip" prop="ip" align="center" width="130"></el-table-column>-->

        <el-table-column label="操作" align="center" width="200">
          <template scope="scope">
            <el-button type="text" class="myBtn" @click="goDetail(scope.row)">查看</el-button>
            <el-button type="text" class="myBtn" @click="goUpdate(scope.row)">编辑</el-button>
            <el-button type="text" class="myBtn" @click="gameOperation(scope.row)">{{scope.row.gameStatus ? '停用':'启用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="counts.length"
                       :page-sizes="[50, 100]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import dateformat from 'dateformat'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'gameList'
    })
  },
  created () {
    this.getCompanyList() // 获取所属游戏商信息
    this.getGameType()
    this.$store.dispatch('getGamelist')
  },
  data () {
    return {
      nowSize: 50,
      nowPage: 1,
      gameTypeList: [],
      companyInfo: '全部厂商',
      companyOptions: [],
      gameStatus: ['下线', '正常'],
      searchInfo: {
        gameStatus: '2',
        companyIden: '',
      }
    }
  },
  computed: {
    counts () {
      return this.$store.state.variable.gameList
    },
    gameItems () {
      if (this.nowPage === 1) {
        return this.$store.state.variable.gameList.slice(0, this.nowSize)
      } else {
        return this.$store.state.variable.gameList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    goCreate () {
      this.$router.push('addGame')
      this.$store.commit('isCloseEdit')
    },
    goUpdate(item){
      this.$router.push('addGame')
      this.$store.commit('isOpenEdit')
      this.$store.commit({
        type: 'storageGameOneItem',
        data: item
      })
    },
    getAtime (row, col) {
      var now = new Date(parseFloat(row.createdAt))
      var formatprev = dateformat(now, 'isoDate')
      return formatprev
    }, // 格式化创建时间
    goDetail (row) {
      this.$store.commit('startLoading')
      invoke({
        url: `${api.gameOne}/${row.gameType}/${row.gameId}`,
        method: api.get
      }).then((data) => {
        let [err, res] = data
        if (err) {
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.$store.commit({
            type: 'gameReadyDetailInfo',
            data: res.data.payload
          })
        }
        this.$store.commit('closeLoading')
      })
      this.$router.push('gamedetail')
    },
    getType (row) {
      for (var i = 0; i < this.gameTypeList.length; i++) {
        if (this.gameTypeList[i].code === row.gameType) {
          return this.gameTypeList[i].name
        }
      }
    },
    gameState (row) {
      return this.gameStatus[row.gameStatus]
    },
    getGameType () {
      invoke({
        url: api.allGames,
        method: api.post
      })
        .then(res => {
          const [err, ret] = res
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.gameTypeList = ret.data.payload
          }
          this.$store.commit('closeLoading')
        })
    },
    getNowsize (size) {
      this.nowSize = size
      console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    },
    gameOperation (data) {
      this.$confirm(`${data.gameStatus ? '此操作将停用该游戏！服务器会踢掉所有正在此游戏的玩家，并且停用游戏！， 是否继续？' :
        '此操作将启用该游戏，是否继续？'}`,
        '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$store.commit('startLoading')
        invoke({
          url: api.changeGame,
          method: api.post,
          data:{
            gameType: data.gameType,
            gameId: data.gameId,
            status: data.gameStatus ? 0 : 1
          }
        }).then((data) => {
          let [err, res] = data
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.$store.dispatch('getGamelist')
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }
          this.$store.commit('closeLoading')
        })
      });
    },
    getCompanyList () {
      invoke({
        url: api.companySelect,
        method: api.post,
        data: {
          parent: localStorage.loginRole == 1 ? '' : localStorage.loginId
        }
      }).then((data) => {
        let [err, res] = data
        if (err) {
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.companyOptions = res.data.payload
          this.companyOptions.unshift({
            company:'全部厂商'
          })
        }
      })
    },
    startSearch () {
      this.searchInfo.companyIden = this.companyInfo == '全部厂商' ? '' : this.companyInfo
      this.$store.commit({
        type: 'gerSearchcondition',
        data: JSON.parse(JSON.stringify(this.searchInfo))
      }) // 发送搜索条件
      this.$store.dispatch('getGamelist')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .searchbox{    padding: 0 2rem;}
  .outresult{padding: 2rem; padding-top: 1rem}
  .searchResult{padding: 1rem 2rem}
  .justfy1{margin:0rem 2rem;}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
</style>
