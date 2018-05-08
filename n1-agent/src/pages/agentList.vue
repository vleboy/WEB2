<template>
	<div class="agetlist">
		<div class="nowList">
			<p class="title">
				当前代理
			</p>
			<Table :columns="columns1" :data="userInfo" size="small" no-data-text="暂无数据"></Table>
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
			<Table :columns="columns1" :data="nextLevel" size="small" no-data-text="暂无数据"></Table>
			</div>
		</div>
		<div class="playerList" id="playerList">
			<div class="top">
				<span class="title left">
					所属玩家列表
				</span>
				<div class="search">
					<Input v-model="search1" placeholder="请输入搜索内容" style="width: 150px"></Input>
					<Button type="primary" @click="search">搜索</Button>
					<Button type="ghost" @click="reset">重置</Button>
				</div>
			</div>
			<div class="table">
			<Table :columns="columns2" :data="playerList" size="small" no-data-text="暂无数据"></Table>
			</div>
		</div>
		<Spin size="large" fix v-if="spinShow">
			<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载中...</div>
		</Spin>
	</div>
</template>
<script>
export default {
  data() {
    return {
      search1: "",
      spinShow: false,
      columns1: [
        {
          title: "管理员账号",
          key: "username"
        },
        {
          title: "代理昵称",
          key: "displayName"
        },
        {
          title: "上级代理",
					key: "parentDisplayName",
					render:(h,params)=>{
						if(params.row.level==0){
							return h('span','')
						}else{
							return h('span',params.row.parentDisplayName)
						}
					}
        },
        {
          title: "代理游戏",
					key: "",
					render:(h,params)=>{
						if(params.row.level==0){
							return h('span','')
						}else{
							return h('span','parentDisplayName')
						}
					}
        },
        {
          title: "代理成数",
					key: "rate",
					render:(h,params)=>{
						return h('span',params.row.rate+'%')
					}
        },
        {
          title: "剩余点数",
          key: "banlence"
        },
        {
          title: "创建时间",
          key: "username"
        },
        {
          title: "状态",
          key: "displayName"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          key: ""
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
          key: "nickname"
        },
        {
          title: "直属代理",
          key: "betCount"
        },
        {
          title: "最后登录时间",
          key: "betAmount"
        },
        {
          title: "状态",
          key: "winloseAmount"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          key: ""
        }
      ],
      nextLevel: [],
      playerList: []
    };
  },
  methods: {
    search() {
      console.log(2);
    },
    reset() {
      console.log(1);
    }
	},
	computed:{
		userInfo(){
			let arr=[];
			arr.push(JSON.parse(localStorage.getItem('userInfo')))
			return arr
		}
	}
};
</script>
<style lang="less" scoped>
.agetlist {
	min-height: 89vh;
	.top{
		clear: both;
		height: 50px;
		.left{
			float: left;
		}
		.search{
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
</style>
