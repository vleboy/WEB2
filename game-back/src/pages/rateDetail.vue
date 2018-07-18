<template>
    <div class="rateDetail">
        <hit-rate title="游戏命中率"></hit-rate>
        <hit-rate title="额度0.25-2.5"></hit-rate>
        <hit-rate title="额度5-50"></hit-rate>
        <hit-rate title="额度125-500"></hit-rate>
    </div>
</template>
<script>
import hitRate from '@/components/hitRate'
export default {
    data(){
        return{

        }
    },
    components:{hitRate}
}
</script>
<style lang="less" scoped>

</style>

