<template>
<div class="countDetail">
    <free-count title="免费模式次数选择"></free-count>
    <free-count title="额度0.25—2.5"></free-count>
    <free-count title="额度5—50"></free-count>
    <free-count title="额度125—500"></free-count>
</div>
</template>
<script>
import freeCount from '@/components/freeCount'
export default {
    data(){
        return{

        }
    },
    components:{freeCount}
}
</script>
<style lang="less" scoped>
.countDetail{
    min-height: 91vh;
}
</style>
