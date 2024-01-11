<template>
  <div>
    <div id="maintest">
      <div>
        <div class="table1" >

          <p class="text">选择的原始数据:</p>
          <br />
          <el-table
            :data="dataChooseNow"
            style="width: auto"
            border
            :row-style="{ height: '33px', lineHeight: '10px', padding: '0px' }"
            :header-cell-style="{
              background: '#58AAFF',
              color: '#fff',
              lineHeight: '12px',
              padding: '0px',
              height: '34px',
              textAlign: 'center',
            }"
            stripe
          >
            <el-table-column
              v-for="(item, index) in dataColumn"
              :key="index"
              :label="item"
              :prop="item"
              width="150"
            >
            </el-table-column>
          </el-table>
      
          <br />
          <el-pagination
            background
            class="pagination"
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            :total="allPage"
          >
          </el-pagination>
        </div>
        <br />
        <div class="table1">
          <p class="text">处理后的数据:</p>
          <br />
          <el-table
            :data="dataNewNow"
            :max-height="tableHeight"
            border
            :row-style="{ height: '33px', lineHeight: '10px', padding: '0px' }"
            :header-cell-style="{
              background: '#58AAFF',
              color: '#fff',
              lineHeight: '12px',
              padding: '0px',
              height: '34px',
              textAlign: 'center',
            }"
          >
            <el-table-column
              v-for="(item, index) in dataNewColumns"
              :key="index"
              :label="item"
              :prop="item"
              width="150"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <div
          id="chart1"
          class="charts"
          style="width: 600px; height: 400px"
        ></div>
        <div
          id="chart2"
          class="charts"
          style="width: 700px; height: 400px"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getRequest } from "@/utils/api";
export default {
  name: "newData",
  props: [
    "dataChoose",
    "dataNew",
    "chartDatay",
    "columnName",
    "dataName",
    "dataNewColumns",
  ],
  data() {
    return {
      dataColumn: [],
      dataColumn2: [],
      currentPage: 1,
      pageSize: 10,
      allPage: 0,
      dataChooseNow: [],
      dataNewNow: [],
      tableHeight: 400,
    };
  },
  methods: {
    drawChart() {
      let myChart1 = echarts.init(document.getElementById("chart1"));
      let myChart2 = echarts.init(document.getElementById("chart2"));
      let option1 = {
        title: {
          text: "主成分分析得分",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: this.dataNewColumns,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.chartDatay,
            type: "bar",
            showBackground: true,
            color: "#75AAF2",
          },
        ],
      };
      let option2 = {
        title: {
          text: "不同算法结果对比",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: { left: "right" },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: ["执行算法前指标数", "执行算法后指标数"],
        },
        series: [
          {
            name: "PCA",
            type: "bar",
            data: [7, 6],
          },
          {
            name: "ICA",
            type: "bar",
            data: [7, 5],
          },
          {
            name: "因子分析",
            type: "bar",
            data: [7, 4],
          },
        ],
      };
      myChart1.setOption(option1);
      myChart2.setOption(option2);
    },
    dealdata() {

      this.dataColumn = this.columnName;
      this.allPage = this.dataChoose.total * 10;
      this.dataChooseNow = this.dataChoose.data;
      // this.allPage2=this.dataNew.total*10;
      // this.dataNewNow=this.dataNew.data;

      for (let i in this.dataNew[this.dataNewColumns[0]]) {
        var tempObj = {};
        for (let j in this.dataNewColumns) {
          tempObj[[this.dataNewColumns[j]]] =
            this.dataNew[this.dataNewColumns[j]][i];
        }
        this.dataNewNow.push(tempObj);
      }
      this.allPage2 = Object.keys(this.dataNew[this.dataNewColumns[0]]).length;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      getRequest(
        "/feature/getInfoBySelectedFiled?page=" +
          val +
          "&tableName=" +
          this.dataName +
          "&params=" +
          this.columnName
      ).then((response) => {
        this.dataChooseNow = response.data;
      });
    },
    // handleCurrentChange2(val) {
    //   this.currentPage2 = val;
    //   this
    // },
  },
  mounted() {
    this.drawChart();
    this.dealdata();
  },
};
</script>
<style scoped>
#maintest {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-table {
  width: auto;
}

.table1 {
   width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.charts {
  float: left;
  margin-top: 20px;
}
.text {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
</style>
