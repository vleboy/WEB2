<template>
     <Breadcrumb>
        <BreadcrumbItem 
            v-for="item in currentPath" 
            :to="item.path" 
            :key="item.name"
        >{{ item.title }}</BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
export default {
    name:'breadcrumb',
    props:{
        currentPath:Array
    },
}
</script>
