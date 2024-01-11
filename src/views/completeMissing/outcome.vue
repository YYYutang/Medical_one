<template>
  <div class="container">
    <div class="right_step">
      <div class="step">
        <el-steps :active="active" align-center>
          <el-step title="选择数据"></el-step>
          <el-step title="特征选择"></el-step>
          <el-step title="方法选择"></el-step>
          <el-step title="结果展示"></el-step>
        </el-steps>
      </div>
      <div>outcome</div>
    </div>
  </div>
</template>
<script>
/*特征选择页面*/
export default ({
    name:'outcome',
    props:['active'],
    data(){
        return{

        }
    },
    methods:{

    },
    mounted(){
    }

})
</script>
<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.right_step {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.right_step .step {
  display: block;
  width: 100%;
}
</style>