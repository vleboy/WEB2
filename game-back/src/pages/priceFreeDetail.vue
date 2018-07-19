<template>
    <div class="priceDetail">
        <price-count title="免费模式下大奖次数" num=1></price-count>
        <price-count title="额度0.25—2.5" num=2></price-count>
        <price-count title="额度5—50" num=3></price-count>
        <price-count title="额度125—500" num=4></price-count>
    </div>
</template>
<script>
import priceCount from '@/components/priceCount'
export default {
    data(){
        return{
            
        }
    },
    components:{priceCount}
}
</script>
<style lang="less" scoped>

</style>
