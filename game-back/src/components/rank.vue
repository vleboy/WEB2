<template>
    <div class="rank">
        <profit></profit>
        <bet-amount></bet-amount>
        <game-count></game-count>
    </div>
</template>
<script>
import profit from '@/components/rank/profit'
import gameCount from '@/components/rank/gameCount'
import betAmount from '@/components/rank/betAmount'
export default {
    data(){
        return{

        }
    },
    components:{profit,betAmount,gameCount}
}
</script>
<style lang="less" scoped>
.rank{
    width: 300px;
    min-width: 200px;
    max-width: 300px;
    flex: 0 0 300px;
    position: fixed;
    height: 100vh;
    right: 0px;
    top: 40px;
    overflow: auto
}
</style>
