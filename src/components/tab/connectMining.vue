<template>
  <div>
    <el-header>
      <h3>任务设置</h3>
      <el-divider></el-divider>
    </el-header>

    <el-container id="maintest">
      <div id="mainform">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          v-show="showForm"
          style="margin-top: 150px"
        >
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
        <el-card
          shadow="hover"
          id="card1"
          class="zoomOut chart-center"
          :class="{
            zoomIn: isZoomIn,
          }"
        >
          <div id="inlineForm">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
              v-show="showForm2"
            >
              <el-form-item>
                <el-tooltip
                  effect="dark"
                  :content="fullScreen ? `缩小` : `放大`"
                  placement="bottom"
                >
                  <i
                    class="el-icon-full-screen"
                    v-on:click="handleFullScreen('card1')"
                  ></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="病种1">
                <el-select
                  v-model="formInline.value3"
                  placeholder="请选择"
                  style="width: 100px"
                  @change="drawChart"
                      :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in diseaseOptions"
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
                  @change="drawChart"
                      :popper-append-to-body="false"
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
              <el-form-item label="病种2">
                <el-select
                  v-model="formInline.value5"
                  placeholder="请选择"
                  style="width: 100px"
                  @change="drawChart"
                      :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in diseaseOptions"
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
                  @change="drawChart"
                      :popper-append-to-body="false"
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
            </el-form>
          </div>
          <div
            id="chart1"
            style="width: 600px; height: 400px"
            v-show="showChart"
          ></div>
        </el-card>
        <el-card shadow="hover" id="card2" class="chart-center">
          <i
            class="el-icon-full-screen"
            v-on:click="handleFullScreen('card2')"
          ></i>
          <div
            id="chart2"
            style="width: 800px; height: 400px"
            v-show="showChart"
          ></div>
        </el-card>
      </div>
      <div id="charts2" v-show="showChart">
        <el-card shadow="hover" id="card3" class="chart-center">
          <div id="formInLine2">
            <el-form :inline="true" :model="formInline2" v-show="showForm3">
              <el-form-item>
                <i
                  class="el-icon-full-screen"
                  v-on:click="handleFullScreen('card3')"
                ></i>
              </el-form-item>
              <el-form-item label="病种">
                <el-select
                  v-model="formInline2.value"
                  placeholder="请选择"
                  style="width: 100px"
                  @change="drawChart"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in diseaseOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="病种的指标">
                <el-select
                  v-model="formInline2.value2"
                  placeholder="请选择"
                  style="width: 100px"
                  @change="drawChart"
                  :popper-append-to-body="false"
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
            </el-form>
          </div>
          <div id="chart3" style="width: 600px; height: 400px"></div>
        </el-card>
        <el-card shadow="hover" id="card4" class="chart-center">
          <i
            class="el-icon-full-screen"
            v-on:click="handleFullScreen('card4')"
          ></i>
          <div id="chart4" style="width: 600px; height: 400px"></div>
        </el-card>
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
      isFull: {
        ok: false,
      },
      fullScreen: false,
      isZoomIn: false,
      diseaseOptions: [
        {
          value: "高血压",
          label: "高血压",
        },
        {
          value: "糖尿病",
          label: "糖尿病",
        },
        {
          value: "肺癌",
          label: "肺癌",
        },
        {
          value: "胃癌",
          label: "胃癌",
        },
        {
          value: "阿尔兹海默症",
          label: "阿尔兹海默症",
        },
      ],
      diseaseInOptions: [
        {
          value: "血脂",
          label: "血脂",
        },
        {
          value: "血压",
          label: "血压",
        },
        {
          value: "血糖",
          label: "血糖",
        },
        {
          value: "年龄",
          label: "年龄",
        },
      ],

      value1: [],
      value2: [],
      formInline: { value3: "", value4: "", value5: "", value6: "" },
      formInline2: { value: "", value2: "" },
      showForm2: true,
      showForm3: true,
      barData: [
        { value: 1048, name: "0-20" },
        { value: 735, name: "20-30" },
        { value: 580, name: "30-40" },
        { value: 484, name: "40-50" },
        { value: 300, name: "50-60" },
        { value: 200, name: "60-70" },
        { value: 121, name: "70-80" },
      ],
      barData2: [
        { value: 100, name: "60-65" },
        { value: 89, name: "65-70" },
        { value: 76, name: "75-80" },
        { value: 78, name: "85-90" },
        { value: 128, name: "95-100" },
        { value: 113, name: "105-110" },
        { value: 105, name: "110-115" },
      ],
      dotData: [
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
      dotData2: [
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
        [7.08, 5.82],
        [5.02, 5.68],
      ],
      myChart1: {},
      myChart2: {},
      myChart3: {},
      myChart4: {},
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
      this.myChart1 = this.$echarts.init(document.getElementById("chart1"));
      this.myChart2 = this.$echarts.init(document.getElementById("chart2"));
      this.myChart3 = this.$echarts.init(document.getElementById("chart3"));
      this.myChart4 = this.$echarts.init(document.getElementById("chart4"));
      // 指定图表的配置项和数据
      //散点图
      let tempData2 = null;
      if (
        this.formInline.value3 === "高血压" &&
        this.formInline.value4 === "血压" &&
        this.formInline.value5 === "糖尿病" &&
        this.formInline.value6 === "血糖"
      ) {
        tempData2 = this.dotData;
      }
      if (
        this.formInline.value3 === "高血压" &&
        this.formInline.value4 === "血脂" &&
        this.formInline.value5 === "肺癌" &&
        this.formInline.value6 === "年龄"
      ) {
        tempData2 = this.dotData2;
      }
      let option1 = {
        title: {
          text: "散点图",
          left: "center",
        },
        xAxis: {},
        yAxis: {},
        color: "#75AAF2",
        series: [
          {
            symbolSize: 20,
            data: tempData2,
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
        title: {
          text: "热力图",
          left: "center",
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
      let tempData = null;
      console.log(this.formInline2);
      if (
        this.formInline2.value === "高血压" &&
        this.formInline2.value2 === "血压"
      ) {
        tempData = this.barData;
        console.log(tempData);
      }
      if (
        this.formInline2.value === "高血压" &&
        this.formInline2.value2 === "血脂"
      ) {
        tempData = this.barData2;
        console.log(tempData);
      }
      let option3 = {
        title: {
          text: "饼状分布图",
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
            data: tempData,
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
        title: {
          text: "关系图",
          left: "center",
        },
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
                y: 200,
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
                symbolSize: [5, 19],
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
      this.myChart1.setOption(option1);
      this.myChart2.setOption(option2);
      this.myChart3.setOption(option3);
      this.myChart4.setOption(option4);
    },
    resizeChart(id, stand) {
      switch (id) {
        case "card1":
          this.myChart1.resize(
            stand ? { width: 900, height: 600 } : { width: 600, height: 400 }
          );
          break;
        case "card2":
          this.myChart2.resize(
            stand ? { width: 1200, height: 600 } : { width: 800, height: 400 }
          );
          break;
        case "card3":
          this.myChart3.resize(
            stand ? { width: 900, height: 600 } : { width: 600, height: 400 }
          );
          break;
        case "card4":
          this.myChart4.resize(
            stand ? { width: 900, height: 600 } : { width: 600, height: 400 }
          );
          break;
        default:
          return;
      }
    },
    handleFullScreen(id) {
      //   let element = document.documentElement   //全屏容器
      let element = document.getElementById(id); //需要全屏容器的id
      this.resizeChart(id, !this.isFull.ok);
      if (this.isFull.ok) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {

        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.$set(this.isFull, "ok", !this.isFull.ok);
      this.fullscreen = !this.fullscreen;
    },
  },
  mounted() {
    this.drawChart();
    this.$nextTick(() => {
      let WindowBrowerHeight = window.innerHeight;
      if (this.WindowScreenHeight == WindowBrowerHeight) {
        this.fullscreen = true;
      } else {
        this.fullscreen = false;
      }
    });

    const initChart = () => {
      this.myChart1.resize({ width: 600, height: 400 });
      this.myChart2.resize({ width: 800, height: 400 });
      this.myChart3.resize({ width: 600, height: 400 });
      this.myChart4.resize({ width: 600, height: 400 });
    };
    const checkFull = () => {
      let isFull =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;
      if (isFull === undefined) isFull = false;
      return isFull;
    };
    const flag = this;
    window.onresize = function () {
      const fullDom = checkFull();
      if (!fullDom) {
        initChart();
        flag.$set(flag.isFull, "ok", false);
      }
    };
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
.zoomIn {
  width: 200%;
  height: 200%;
  transition: all 0.5s;
}

.chart-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 