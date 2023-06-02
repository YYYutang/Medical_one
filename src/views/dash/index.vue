<template>
  <div>
    <div class="topBigDiv">
      <div class="left">
        <el-card class="card">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>快捷入口</span>
          </div>
          <div class="quickEntryBox">
            <div v-for="(item, index) in quickEntry" :key="index">
              <div class="singleBox" @click="quickLink(index)">
                <img
                  :src="item.img"
                  class="imgStyle"
                  style="border-radius: 15px"
                />
                <div style="text-align: center">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="right">
        <el-card class="card">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>总体数据统计</span>
          </div>
          <!--            画图容器-->
          <div>
            <el-row :gutter="30">
              <el-col :span="6" id="data_sta">
                <div>
                  <el-progress type="circle" :percentage="100"></el-progress>
                  <el-statistic
                    title="数据总量"
                    group-separator=","
                    :value=dataAllNum
                  ></el-statistic>
                </div>
              </el-col>
              <el-col :span="6" id="data_sta">
                <div>
                  <el-progress type="circle" :percentage="100"></el-progress>
                  <el-statistic title="指标总量" :value=insAllNum>
                    <template slot="formatter">  </template>
                  </el-statistic>
                </div>
              </el-col>
              <el-col
                :span="6"
                id="data_sta"
              >
                <div>
                  <el-progress type="circle" :percentage=missingAll*100></el-progress>
                  <el-statistic
                    group-separator=","
                    :precision="2"
                    decimal-separator="."
                    :value=missingAll*100
                    title="总体缺失率"
                  >
                    <template slot="prefix"> </template>
                    <template slot="suffix"> </template>
                  </el-statistic>
                </div>
              </el-col>
              <el-col :span="6" id="data_sta">
                <div>
                  <el-progress type="circle" :percentage=effectiveall*100></el-progress>
                  <el-statistic title="总体有效率" :value=effectiveall*100>
                    <template slot="suffix"> </template>
                  </el-statistic>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
    <div class="bottomBigDiv">
      <div class="left">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>病种数据统计</span>
          </div>
          <div
            v-for="(item, index) in diseaseData"
            :key="index"
            style="margin-top: 10px"
          >
            <div style="text-align: center">
              <span>{{ item.name }}</span>
              <el-progress
                :text-inside="true"
                :stroke-width="28"
                :percentage="(item.num * 100) / patientNum"
                style="margin-top: 10px"
              ></el-progress>
            </div>
          </div>
        </el-card>
      </div>
      <div class="mid">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>系统数据信息</span>
          </div>
          <el-table :data="tableData2" stripe style="width: 100%" height="400">
            <el-table-column prop="tableName" label="数据表" width="100">
            </el-table-column>
            <el-table-column prop="tableOrigin" label="数据来源" width="180">
            </el-table-column>
            <el-table-column prop="tableSize" label="存储大小">
            </el-table-column>
            <el-table-column prop="tableDate" label="创建时间">
            </el-table-column>
          </el-table>

        </el-card>
      </div>
      <div class="right">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>系统登录信息</span>
          </div>
            <div id="login" style="width: 500px; height: 400px"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest } from "@/utils/api";
import storage from "@/utils/storage";
export default {
  name: "index",
  data() {
    return {
      mychart: {},
      tableData2: [],
      dataAllNum:0,
      insAllNum:0,
      missingAll:0,
      effectiveall:0,
      line: null,
      patientNum: 200,
      quickEntry: [
        {
          title: "数据表管理",
          img: require("../../assets/dataManage.png"),
          router: "/dataManage",
        },
        {
          title: "疾病的特征性指标",
          img: require("../../assets/mutipile.png"),
          router: "/represent.vue",
        },
        {
          title: "疾病画像",
          img: require("../../assets/feiai.png"),
          router: "/visualization.vue",
        },
        { title: "其他功能", img: require("../../assets/other.png") },
      ],
      diseaseData: [
        {
          name: "胃癌",
          num: 30,
        },
        {
          name: "糖尿病",
          num: 23,
        },
        {
          name: "肺癌",
          num: 56,
        },
        {
          name: "乳腺癌",
          num: 12,
        },
        {
          name: "高血压",
          num: 22,
        },
      ],
    };
  },
  methods: {
    quickLink(index) {
      console.log(this.quickEntry[index].router);
      this.$router.replace(this.quickEntry[index].router);
    },
    chart1() {
      var chartDom = document.getElementById("login");
      this.mychart = this.$echarts.init(chartDom);

      var option;
      option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            color: " #75AAF2",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };

      option && this.mychart.setOption(option);
    },
    getAllData() {
      getRequest("/index/getAllData").then((response) => {
        if (response) {
          storage.set("allTableData", JSON.stringify(response.data));
          this.$store.commit("setAllTableData", storage.get("allTableData"));
        } else {
          console.log(response.status);
        }
        var tempList = JSON.parse(this.$store.getters.getAllTableData);
        for (let i = 0; i < tempList.length; i++) {
          const obj = {
            tableName: tempList[i].tableName,
            tableOrigin: tempList[i].tableOrigin,
            tableSize: tempList[i].tableSize,
            tableDate: tempList[i].startTime,
          };
          this.tableData2.push(obj);
        }
      });
    },
    getStatis(){
      getRequest("/index/getStatisticaldData").then((response)=>{
        this.dataAllNum=response.data['数据总量'];
        this.insAllNum=response.data['指标总量'];
        this.missingAll=response.data['总体缺失率'];
        this.effectiveall=response.data['总体有效率'];
      })
    }
  },
  mounted() {
    this.chart1();
    this.getStatis();
    const that = this;
    this.mychart.resize();
    window.addEventListener("resize", () => {
      that.mychart.resize();
    });
    this.getAllData();
  },
};
</script>

<style scoped>
.topBigDiv {
  box-sizing: border-box;
  height: 30vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topBigDiv .left {
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
.topBigDiv .right {
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
.topBigDiv .left .quickEntryBox {
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.topBigDiv .left .quickEntryBox .singleBox {
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  width: 80px;
  height: 80px;
  border-radius: 20%;
}
.topBigDiv .left .quickEntryBox .imgStyle {
  width: 90%;
  height: 90%;
}
.bottomBigDiv {
  box-sizing: border-box;
  height: 55vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.bottomBigDiv .left {
  box-sizing: border-box;
  height: 100%;
  width: 33%;
}
.bottomBigDiv .mid {
  box-sizing: border-box;
  height: 100%;
  width: 33%;
}
.bottomBigDiv .right {
  box-sizing: border-box;
  height: 100%;
  width: 33%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.lineStyle {
  color: rgb(100, 172, 231);
  font-weight: 40;
}
.card {
  padding: 0;
  height: 100%;
}
.like {
  cursor: pointer;
  font-size: 20px;
  display: inline-block;
}
#data_sta {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
