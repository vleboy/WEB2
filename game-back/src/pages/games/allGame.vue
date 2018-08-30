<template>
  <div class="allGame">
    <basic-content :gameType="1" v-if="showComponent"/>
  </div>
</template>
<script>
import BasicContent from '@/components/BasicContent'
import {httpRequest} from '@/service/index'
export default {
  name:'allGame',
  components:{BasicContent},
  data(){
    return{
      showComponent:false//存入state再渲染组件
    }
  },
  computed:{

  },
  created(){
    httpRequest('post','/main')
    .then(res=>{
      console.log(res);
      this.$store.commit('loginToday',{params:res.loginToday})
      this.$store.commit('saveGameDetail',{params:res.game})
      this.showComponent=true
    })
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>

</style>
