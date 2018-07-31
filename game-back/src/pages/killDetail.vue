<template>
    <div class="killDetail">
        <kill title='游戏杀数' date="历史" num=1></kill>
        <kill title='游戏杀数—本月' date="本月" num=2></kill>
        <kill title='游戏杀数—上月' date="上月" num=3></kill>
    </div>
</template>
<script>
import kill from '@/components/kill'
export default {
    data(){
        return{

        }
    },
    components:{kill},

}
</script>
<style lang="less" scoped>
.killDetail{
    min-height: 91vh;
}
</style>
