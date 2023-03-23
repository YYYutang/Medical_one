<template>
<div>
<el-header>
<h3 >任务设置</h3>
<el-divider></el-divider>
</el-header>

<el-container id="maintest">
<div id="main">
<el-form ref="form" :model="form" label-width="80px"  v-show="showForm">
  <el-form-item label="任务名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="任务描述">
    <el-input v-model="form.description"></el-input>
  </el-form-item>
<el-form-item label="选择指标">
  <el-select
    v-model="value2"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in diseaseInOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item  label="使用模型">
    <el-select v-model="form.model" placeholder="请选择使用模型">
      <el-option label="apriori" value="apriori"></el-option>
      <el-option label="svm" value="svm"></el-option>
      <el-option label="xgboost" value="xgboost"></el-option>
      <el-option label="knn" value="knn"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item class="buttonDM" id="button1">
    <el-button type="primary" @click="onSubmitDM">运行</el-button>
  </el-form-item>
</el-form>
</div>
<div id="chart1" style="width:600px; height: 400px" v-show="showChart" >
</div>
</el-container>
</div>
</template>
<script>
export default {
  data() {
    return {

      showForm: true,
      showChart: false,
      form: {
        name: "",
        description: "",
        model: "",
      },

      diseaseInOptions:[
          {
          value: "选项1",
          label: "血脂",
        },
        {
          value: "选项2",
          label: "血压",
        },
        {
          value: "选项3",
          label: "血糖",
        },
        {
          value: "选项4",
          label: "年龄",
        },
      ],
      value1: [],
        value2: []
    }
    
  },
  methods: {
   onSubmitDM(){
        this.showForm = !this.showForm;
      this.showChart = !this.showChart;
   },
   drawChart() {
       let myChart1 = this.$echarts.init(document.getElementById("chart1"));
       let option1 = {
  xAxis: {
    type: 'category',

    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      areaStyle: {}
    }
  ]
};

myChart1.setOption(option1);
   }
  },
  mounted() {
    this.drawChart();
  },
  
};
</script>

<style scoped>

#maintest {
  display: flex;
  justify-content: center;
  align-items: center;
}
#button1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>