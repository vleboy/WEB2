<template>
  <div class="allGame">
    <basic-content :gameType="1" v-if="showComponent"/>
  </div>
</template>
<script>
import BasicContent from '@/components/BasicContent'
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
    this.$http.post('http://47.88.170.136:44445/main')
    .then(res=>{
      console.log(res.data);
      this.$store.commit('loginToday',{params:res.data.loginToday})
      this.$store.commit('saveGameDetail',{params:res.data.game})
      this.showComponent=true
    })
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>

</style>
