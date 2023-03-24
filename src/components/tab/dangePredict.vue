<template>
  <div>
    <el-header>
      <h3>任务设置</h3>
      <el-divider></el-divider>
    </el-header>

    <el-container id="maintest">
      <div id="main">
        <el-form ref="form" :model="form" label-width="80px" v-show="showForm">
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
              placeholder="请选择"
            >
              <el-option
                v-for="item in diseaseInOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用模型">
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
      <div id ="charts">
        <div
          id="chart1"
          style="width: 600px; height: 400px"
          v-show="showChart"
        ></div>
        <div
          id="chart2"
          style="width: 700px; height: 400px"
          v-show="showChart"
        ></div>
      
      <div
        id="chart3"
        style="width: 700px; height: 400px"
        v-show="showChart"
      ></div>
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

      diseaseInOptions: [
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
      value2: [],
    };
  },
  methods: {
    onSubmitDM() {
      this.showForm = !this.showForm;
      this.showChart = !this.showChart;
    },
    drawChart() {
      let myChart1 = this.$echarts.init(document.getElementById("chart1"));
      let myChart2 = this.$echarts.init(document.getElementById("chart2"));
      let myChart3 = this.$echarts.init(document.getElementById("chart3"));
      let option1 = {
        title: {
          text: "ROC曲线图",
          left: "center",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [0, 0.5, 0.7, 0.8, 0.9, 0.91, 0.92],
            type: "line",
            areaStyle: {},
          },
          {
            data: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8],
            type: "line",
            smooth: true,
          },
        ],
        color: "#75AAF2",
      };
      let option2 = {
        title: {
          text: "Precision-Recall分析图",
          left: "center",
        },
     tooltip: {
          trigger: "axis",
          formatter: "Recall：{b} <br>Precision: {c}%",
        },
        xAxis: {
          name: "Recall",
          type: "category",
          boundaryGap: false,
          data: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
        yAxis: {
          name: "Precision",
          type: "value",
        },
        series: [
          {
            data: [0.4, 0.5, 0.44, 0.6, 0.65, 0.66, 0.64],
            type: "line",
          },
        ],
        color: "#75AAF2",
      };
      let option3 = {
        title: {
          text: "肺癌及相关疾病患病几率",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          formatter: "患病几率 : <br/>{b} : {c}",
        },
        xAxis: {
          type: "category",
          data: [
            "胃癌",
            "脑卒中",
            "高血压",
            "高血压",
            "前列腺癌",
            "糖尿病",
            "肺癌",
          ],
          axisLabel: {
      formatter: '{value} '
    },
        },
        yAxis: {
          type: "value",
          data: [0, 20, 40, 60, 80, 100],
          axisLabel: {
      formatter: '{value} %'
    }
        },
        series: [
          {
            data: [40, 20, 15, 80, 70, 10, 70],
            type: "bar",
          },
        ],
        color: "#75AAF2",
      };

      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
    },
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
#charts{

  justify-content: center;
  align-items: center;

}
</style>