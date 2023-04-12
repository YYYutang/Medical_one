<template>
    <div>
        k:
        <el-input prop= "outputParams" v-model="outputParams[0].knn_inputk" placeholder="请输入k的值" style="width:280px"></el-input>
    </div>
</template>
<script>

export default ({
    name:'knn',
    data() {
        return{
            outputParams:[
               { knn_inputk:""},
            ]
        }
    },
    props:'outputParams',
    methods:{

    },
})
</script>
<style>

</style>
