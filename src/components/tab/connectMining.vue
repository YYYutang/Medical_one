<template>
  <div>
    <el-header>
      <h3>任务设置</h3>
      <el-divider></el-divider>
    </el-header>

    <el-container id="maintest">
      <div id="main">
        <el-form ref="form" :model="form" label-width="120px" v-show="showForm">
          <el-form-item label="任务名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="选择病种">
            <el-select v-model="value1" multiple placeholder="请选择">
              <el-option
                v-for="item in diseaseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择病种的指标">
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
      <div id="charts1" v-show="showChart">
        <div id="inlineForm">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="病种1">
              <el-select
                v-model="formInline.value3"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in chartOneOptionsOne"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="病种1的指标">
              <el-select
                v-model="formInline.value4"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in chartOneOptionsTwo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="病种2">
              <el-select
                v-model="formInline.value5"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in chartOneOptionsOne"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="病种2的指标">
              <el-select
                v-model="formInline.value6"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in chartOneOptionsTwo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div
          id="chart1"
          style="width: 600px; height: 400px"
          v-show="showChart"
        ></div>
        <div
          id="chart2"
          style="width: 800px; height: 400px"
          v-show="showChart"
        ></div>
      </div>
      <div id="charts2">
        <div
          id="chart3"
          style="width: 600px; height: 400px"
          v-show="showChart"
        ></div>
        <div
          id="chart4"
          style="width: 600px; height: 400px"
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
      diseaseOptions: [
        {
          value: "选项1",
          label: "高血压",
        },
        {
          value: "选项2",
          label: "糖尿病",
        },
        {
          value: "选项3",
          label: "肺癌",
        },
        {
          value: "选项4",
          label: "胃癌",
        },
        {
          value: "选项5",
          label: "阿尔兹海默症",
        },
      ],
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
      chartOneOptionsOne: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      chartOneOptionsTwo: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: [],
      value2: [],
      formInline: { value3: "", value4: "", value5: "", value6: "" },
    };
  },
  methods: {
    goBack() {
      console.log("go back");
    },
    onSubmit() {
      console.log("submit!");
    },
    onSubmitDM() {
      this.showForm = !this.showForm;
      this.showChart = !this.showChart;
    },

    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart1 = this.$echarts.init(document.getElementById("chart1"));
      let myChart2 = this.$echarts.init(document.getElementById("chart2"));
      let myChart3 = this.$echarts.init(document.getElementById("chart3"));
      let myChart4 = this.$echarts.init(document.getElementById("chart4"));
      // 指定图表的配置项和数据
      //散点图
      let option1 = {
        xAxis: {},
        yAxis: {},
        color: "#75AAF2",
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68],
            ],
            type: "scatter",
          },
        ],
      };
      const disease1 = ["高血压", "糖尿病", "肺癌", "胃癌", "阿尔兹海默症"];
      // prettier-ignore
      const disease2 = ['高血压', '糖尿病', '肺癌', '胃癌', '阿尔兹海默症'];
      // prettier-ignore
      const data = [[0, 0, 0], [0, 1, 1], [0, 2, 1], [0, 3, 0], [0, 4, 1],  [1, 0, 1], [1, 2, 1], [1, 3, 3], [1, 4, 3],  [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 1], [2, 4, 1],  
      [3, 0, 0], [3, 1, 3], [3, 2, 1], [3, 4, 0], [4, 0, 1], [4, 1, 3], [4, 2, 1], [4, 3, 0], [4, 4, 0]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
      //热力图
      let option2 = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            const d1 = disease1[params.data[1]];
            const level = params.data[2];
            return d1 + "与" + params.name + "的关联度为" + level;
          },
        },
        grid: {
          height: "50%",
          top: "10%",
        },
        xAxis: {
          type: "category",
          data: disease1,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: disease2,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "15%",
        },

        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: data,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      //饼状图
      let option3 = {
        title: {
          text: "分布图",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "数据分布图",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "0-20" },
              { value: 735, name: "20-30" },
              { value: 580, name: "30-40" },
              { value: 484, name: "40-50" },
              { value: 300, name: "50-60" },
              { value: 200, name: "60-70" },
              { value: 121, name: "70-80" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      //关系图
      let option4 = {
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 70,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data: [
              {
                name: "高血压",
                x: 300,
                y: 300,
              },
              {
                name: "胃癌",
                x: 800,
                y: 300,
              },
              {
                name: "肺癌",
                x: 550,
                y: 100,
              },
              {
                name: "阿尔兹海默症",
                x: 450,
                y: 500,
              },
              {
                name: "糖尿病",
                x: 650,
                y: 500,
              },
            ],
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                lineStyle: {
                  width: 5,
                  curveness: 0.2,
                },
              },
              {
                source: "胃癌",
                target: "高血压",
                lineStyle: {
                  curveness: 0.2,
                },
              },
              {
                source: "高血压",
                target: "肺癌",
              },
              {
                source: "胃癌",
                target: "肺癌",
              },
              {
                source: "胃癌",
                target: "阿尔兹海默症",
              },
              {
                source: "高血压",
                target: "阿尔兹海默症",
              },
              {
                source: "糖尿病",
                target: "高血压",
              },
              {
                source: "糖尿病",
                target: "胃癌",
              },
              {
                source: "阿尔兹海默症",
                target: "糖尿病",
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
      myChart4.setOption(option4);
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
#inlineForm {
  margin-top: 50px;
}
</style> 