<template>
  <div class="sifang">
     <basic-content :gameType="42004" v-if="showComponent"/>
  </div>
</template>
<script>
import BasicContent from '@/components/BasicContent'
import {httpRequest} from '@/service/index'
export default {
  name:'sifang',
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
