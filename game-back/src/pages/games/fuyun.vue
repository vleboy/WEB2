<template>
  <div class="fuyun">
     <basic-content :gameType="42006" v-if="showComponent"/>
  </div>
</template>
<script>
import BasicContent from '@/components/BasicContent'
import {httpRequest} from '@/service/index'
export default {
  name:'fuyun',
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
      this.$store.commit('login',{params:res.login})
      this.$store.commit('saveGameDetail',{params:res.game})
      this.showComponent=true
    })
  },
}
</script>
<style lang="less" scoped>

</style>
