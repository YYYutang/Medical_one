<template>
    <div>
        k:
        <el-input  v-model="outputParams[0].knn_inputk" placeholder="请输入k的值" style="width:280px" @input="sendparams"></el-input>
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
    methods:{
        sendparams(){
            this.$emit('outputParams',this.outputParams)
            console.log(this.outputParams)
        }

    },
})
</script>
<style>

</style>
