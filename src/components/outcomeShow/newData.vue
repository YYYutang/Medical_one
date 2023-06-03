<template>
  <div>
    <div id="maintest">
      <div>
        <div class="table1" >
          <p>选择的原始数据:</p>
          <br />
          <el-table
            :data="dataChooseNow"
            style="width:auto"
            border
          >
            <el-table-column
              v-for="(item, index) in dataColumn"
              :key="index"
              :label="item"
              :prop="item"
              fixed
              width="150"
            >
            </el-table-column>
          </el-table>
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
        <div class="table1">
          <p>处理后的数据:</p>
          <br />
          <el-table
            :data="dataNewNow"
            style="width: auto"
            height="400"
            border
          >
            <el-table-column
              v-for="(item, index) in dataNewColumns"
              :key="index"
              :label="item"
              :prop="item"
              fixed
              width="150"
            >
            </el-table-column>
          </el-table>
            <el-pagination
          background
          class="pagination"
          layout="prev, pager, next"
          :current-page="currentPage2"
          :page-size="pageSize"
          @current-change="handleCurrentChange2"
          :total="allPage2"
        >
        </el-pagination>
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
  props: ["dataChoose", "dataNew","columnName","dataName","dataNewColumns"],
  data() {
    return {
      dataColumn: [],
      dataColumn2: [],
      currentPage: 1,
      currentPage2:1,
      pageSize: 10,
      allPage:0,
      allPage2:0,
      dataChooseNow:[],
      dataNewNow:[],
    };
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
          data: ["主成分1", "主成分2", "主成分3", "主成分4", "主成分5", "主成分6", "主成分7","主成分8","主成分9","主成分10"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [5.6,7.8,5.9,8,9,7.8,8.4,9.6,8.8,9.4],
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
    dealdata() {

      this.dataColumn = Object.keys(this.dataChoose.data[0]);
      this.allPage = this.dataChoose.total*10;
      this.dataChooseNow=this.dataChoose.data;
      // this.allPage2=this.dataNew.total*10;
      // this.dataNewNow=this.dataNew.data;


      console.log(this.dataNew);

      
      for(let i in this.dataNew[this.dataNewColumns[0]]){
        var tempObj={};
        for(let j in this.dataNewColumns){
         tempObj[[this.dataNewColumns[j]]]=this.dataNew[this.dataNewColumns[j]][i]
         
      }
        this.dataNewNow.push(tempObj)
      }
        

    },
    handleCurrentChange(val){
      this.currentPage=val;
      getRequest(
              "/feature/getInfoBySelectedFiled?page=" +
                val +
                "&tableName=" +
                this.dataName +
                "&params=" +
                this.columnName
            ).then((response) => {
                this.dataChooseNow=response.data;

              });
            },
            handleCurrentChange2(val){
      this.currentPage2=val;
      getRequest(
              
            ).then((response) => {
                this.dataNewnow=response.data;

              });
            },
            
  },
  mounted() {
    this.drawChart();
    this.dealdata();
  },
};
</script>
<style>
#maintest {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.table1 {

 width:auto;
  margin-left: 20px;
    flex-direction: column;
  justify-content: center;
  align-items: center;
}
.charts {
  float: left;
  margin-top: 20px;
}

</style>
