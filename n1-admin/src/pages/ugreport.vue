<template>
  <div class="ug">
    <div class="nowList">
      <div class="top">
        <p class="title">
          当前选择列表
        </p>
        <div class="right">
          <DatePicker type="daterange" :editable="false" placement="bottom-end" placeholder="选择日期" style="width: 250px" @on-change="changeDate"></DatePicker>
          <Button type="primary">搜索</Button>
          <Button type="ghost">重置</Button>
        </div>
      </div>
      <Table :columns="columns1" :data="user" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="childList">
      <p class="title">
        直属下级列表
      </p>
      <Table :columns="columns1" :data="child" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="childList" v-for="(item,index) in reportChild" :key="index">
      <p class="title">
        ({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 直属下级列表
      </p>
      <Table :columns="columns1" :data="item" size="small" no-data-text="暂无数据"></Table>
    </div>
    <div class="palyerList">
      <p class="title">
        <span v-show="showName"> ({{ userName }})</span>所属玩家列表
      </p>
      <Table :columns="columns2" :data="playerList" size="small" no-data-text="暂无数据"></Table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reportChild: [], //点击渲染的下级
      showName: false, //上级商家
      userName: "", //上级商家名字
      playerList: [],
      user: [],
      child: [],
      columns1: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "类型",
          key: "role",
          render: (h, params) => {
            return h("span", this.types(params.row.role));
          }
        },
        {
          title: "昵称",
          key: "displayName"
        },
        {
          title: "管理员账号",
          key: "username",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  cursor: "pointer",
                  color: "#20a0ff"
                },
                on: {
                  click: async () => {
                    if (params.row.role == "1") {
                      console.log("admin");
                    } else if (params.row.role == "100") {
                      //商户
                      this.userName = params.row.displayName;
                      this.showName = true;
                      let userId = params.row.userId;
                      this.$store
                        .dispatch("getPlayerList", { parentId: userId })
                        .then(res => {
                          this.playerList = res.payload;
                          console.log(res);
                        });
                    } else if (params.row.role == "10") {
                      //线路商
                      this.playerList = [];
                      this.showName = false;
                      let userId = params.row.userId;
                      let level = params.row.level;
                      if (level == 1) {
                        this.reportChild = [];
                      }
                      console.log(level);
                      // let showList = this.reportChild;
                      let showList = await this.testme(this.reportChild,userId)
                      console.log(showList);
                      let copyList = [...showList];
                      for (let i = 0; i <= showList.length; i++) {
                        // console.log(showList[i]);
                        // for (let j=0;j<=showList[i].length;j++){
                        //   if(showList[i][j].level>level+1){
                        //     showList.slice(j,1)
                        //   }
                        // }
                      }
                      // showList = copyList;
                      // console.log(this.reportChild);
                    }
                    console.log(params.row);
                  }
                }
              },
              params.row.username
            );
          }
        },
        {
          title: "交易次数",
          key: "bet"
        },
        {
          title: "投注金额",
          key: "betCount"
        },
        {
          title: "输赢金额",
          key: "winlose"
        },
        {
          title: "商家占成",
          key: "suffix"
        },
        {
          title: "商家交公司",
          key: "level"
        },
        {
          title: "获利比例",
          key: "rate"
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
          title: "昵称",
          key: "nickname"
        },
        {
          title: "交易次数",
          key: "tradetime"
        },
        {
          title: "投注金额",
          key: "betcount"
        },
        {
          title: "输赢金额",
          key: "winlose"
        },
        {
          title: "洗码量",
          key: "egug"
        }
      ]
      // data2: [
      //   {
      //     name: "张三",
      //     nickname: "张三疯",
      //     tradetime: 23,
      //     betcount: 1222,
      //     winlose: 199,
      //     egug: 23
      //   },
      // ]
    };
  },
  computed: {},
  methods: {
    types(value) {
      switch (value) {
        case "0":
          return "超级管理员";
          break;
        case "1":
          return "管理员";
          break;
        case "10":
          return "线路商";
          break;
        case "100":
          return "商户";
          break;
        case "1000":
          return "代理";
          break;
        case "10000":
          return "玩家";
          break;
      }
    },
    changeDate(time) {
      console.log(time);
    },
    async testme(showList,userId){
       return new Promise((resolve, reject) => {
        this.$store
          .dispatch("getUserChild", { parent: userId })
          .then(res => {
            showList.push(res.payload);
            showList = [...new Set(showList)];
            resolve(showList);
          });
      });
    }
  },
  created() {
    let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
    let req1 = this.$store.dispatch("getUserList", { userId: userId });
    let req2 = this.$store.dispatch("getUserChild", { parent: "01" });
    let _this = this;
    _this.axios.all([req1, req2]).then(
      _this.axios.spread(function(acct, perms) {
        //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
        if (acct.code == 0) {
          _this.user.push(acct.payload);
        }
        if (perms.code == 0) {
          _this.child = perms.payload;
        }
        _this.user[0].username = _this.user[0].username.slice(9);
        console.log(_this.user);
        console.log(_this.child);
      })
    );
  }
};
</script>
<style lang="less" scoped>
.ug {
  min-height: 90vh;
  .title {
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem;
    font-weight: 600;
    display: inline-block;
  }
  .top {
    clear: both;
    .right {
      float: right;
    }
  }
}
</style>
