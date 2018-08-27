<template>
  <div class="allGame">
    <basic-content :gameType="1"/>
  </div>
</template>
<script>
import BasicContent from '@/components/BasicContent'
export default {
  name:'allGame',
  components:{BasicContent},
  data(){
    return{

    }
  },
  computed:{

  },
  created(){
    this.$http.post('http://47.88.170.136:44445/main')
    .then(res=>{
      console.log(res.data);
    })
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>

</style>
