<template>
    <div class="mys">
        <div class="number">
            <img  v-for="(item,index) in numberList" :key='index' :src="item" alt="oops" class="number_img">
        </div>
    </div>
</template>
<script>
export default {
  name: "secretBonus",
//   components: {},
//   filters: {
    
//   },
  props: {
    secretBonus: Number|String
  },
  data() {
    return {};
  },
  computed: {
    numberList() {
     let secretBonus=this.secretBonus;
     let list=secretBonus.split('')
     let imgList=list.map(item=>{
         if(item=='.'){
             return 'http://img.na77.com/adminh5/common/_.png'
         }
         return `http://img.na77.com/adminh5/common/${item}.png`
     })
     return imgList
    },
   
  },
//   watch: {},
//   created() {
//   },
//   methods: {}
};
</script>
<style lang="less" scoped>
.mys {
    height: 300px;
    background: url(http://img.na77.com/adminh5/common/bg_bouns.png) no-repeat;
    background-size: contain;
    .number{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 120px;
    }
    .number_img{
        width: 50px;
    }
}
</style>
