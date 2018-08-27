<template>
  <div class="allGame">
    <basic-content :gameType="1"/>
  </div>
</template>
<script>
import BasicContent from '@/components/BasicContent'
export default {
  components:{BasicContent},
  data(){
    return{

    }
  },
  created(){
    this.$http.post('http://47.88.170.136:44445/main')
    .then(res=>{
      console.log(res.data);
    })
  }
}
</script>
<style lang="less" scoped>

</style>
