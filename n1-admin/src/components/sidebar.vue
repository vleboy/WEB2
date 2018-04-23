<template>
    <div class="sider">
        <Sider width='256px' collapsible hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1" theme="dark" width="auto" :open-names="['1']" @on-select='selectMenu'>
                <MenuItem name="1-1">
                    <span>看板</span>
                </MenuItem>
                <MenuItem name="1-2">
                    <span>个人中心</span>
                </MenuItem>
                <Submenu name="1">
                    <template slot="title">
                    输赢报表
                    </template>
                    <MenuItem name="1-3">公司输赢总报表</MenuItem>
                    <Submenu name='2'>
                        <template slot="title">NA游戏总报表</template>
                        <MenuItem name="2-1">NA电子游戏报表</MenuItem>
                        <MenuItem name="2-2">NA街机游戏报表</MenuItem>
                        <MenuItem name="2-3">NA真人游戏报表</MenuItem>
                        <MenuItem name="2-4">NA电子游戏报表（跳转）</MenuItem>
                        <MenuItem name="2-5">NA棋牌游戏报表</MenuItem>
                    </Submenu>
                     <Submenu name='3'>
                        <template slot="title">TTG游戏报表</template>
                        <MenuItem name="3-1">TTG电子游戏报表</MenuItem>
                    </Submenu>
                     <Submenu name='4'>
                        <template slot="title">SA游戏报表</template>
                        <MenuItem name="4-1">SA游戏总报表</MenuItem>
                        <MenuItem name="4-2">SA真人游戏报表</MenuItem>
                        <MenuItem name="4-3">SA捕鱼游戏报表</MenuItem>
                    </Submenu>
                      <Submenu name='5'>
                        <template slot="title">MG游戏报表</template>
                        <MenuItem name="5-1">MG电子游戏报表</MenuItem>
                    </Submenu>
                      <Submenu name='6'>
                        <template slot="title">AG游戏报表</template>
                        <MenuItem name="6-1">AG电子游戏报表</MenuItem>
                    </Submenu>
                     <Submenu name='7'>
                        <template slot="title">UG游戏报表</template>
                        <MenuItem name="7-1">UG电子游戏报表</MenuItem>
                    </Submenu>
                </Submenu>
                <Submenu name="8">
                    <template slot="title">
                        商户中心
                    </template>
                    <MenuItem name="8-1">TTG游戏报表</MenuItem>
                </Submenu>
                <Submenu name="9">
                    <template slot="title">
                        玩家中心
                    </template>
                    <MenuItem name="9-1">Option 1</MenuItem>
                    <MenuItem name="9-2">Option 2</MenuItem>
                </Submenu>
                 <Submenu name="10">
                    <template slot="title">
                        游戏中心
                    </template>
                    <MenuItem name="10-1">Option 1</MenuItem>
                    <MenuItem name="10-2">Option 2</MenuItem>
                </Submenu>
                 <Submenu name="11">
                    <template slot="title">
                        运营中心
                    </template>
                    <MenuItem name="11-1">Option 1</MenuItem>
                    <MenuItem name="11-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="12">
                    <template slot="title">
                        系统设置
                    </template>
                    <MenuItem name="12-1">Option 1</MenuItem>
                    <MenuItem name="12-2">Option 2</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
    ,methods:{
        selectMenu(name){
            console.log(name);
            if(name=='7-1'){
                this.$router.push({name:'ugreport-index'})
            }
            if(name='1-2'){
                this.$router.push({name:"ownspace-index"})
            }
        }
    }
};
</script>

<style scoped>
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

</style>