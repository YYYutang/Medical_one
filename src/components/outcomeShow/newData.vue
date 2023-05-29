<template>
  <div>
    <div>
      
      <div id="chart1" class="charts" style="width: 600px; height: 400px"></div>
      <div id="chart2" class="charts" style="width: 700px; height: 400px"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: "newData",
      props:['dataChoose'],
  data() {
    return {
      is:1,
    }
  },
  methods: {
    drawChart() {
      let myChart1 = echarts.init(document.getElementById("chart1"));
      let myChart2 = echarts.init(document.getElementById("chart2"));
      let option1 = {
        title: {
          text: "主成分分析",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            color: "#75AAF2",
          },
        ],
      };
      let option2 = {
        title: {
          text: "Precision-Recall分析",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          formatter: "Recall��{b} <br>Precision: {c}%",
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
      myChart1.setOption(option1);
      myChart2.setOption(option2);
    },
  },
  mounted(){
      this.drawChart();
  }
};
</script>
<style>
</style>
