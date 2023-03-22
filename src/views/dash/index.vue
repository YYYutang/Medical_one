<template>
  <div>
    <div class="topBigDiv">
      <div class="left">
        <el-card class="card">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>快捷入口</span>
          </div>
          <div class="quickEntryBox">
            <div v-for="(item,index) in fakeEntry" :key="index">
              <div class="singleBox" @click="test(index)"><img src="../../assets/logo.png" class="imgStyle">
                <div style="text-align: center">{{item}}</div>
              </div>

            </div>
          </div>
        </el-card>
      </div>
      <div class="right">
        <el-card class="card">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>系统模型信息</span>
            <!--            画图容器-->
            <div id="entry" style="height: 150px;"></div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="bottomBigDiv">
      <div class="left">1</div>
      <div class="mid">2</div>
      <div class="right">3</div>
    </div>
  </div>
</template>

<script>
import {Line} from "@antv/g2plot";

export default {
  name: "index",
  data() {
    return {
      fakeData : [{
        "Date": "2010-01",
        "scales": 1998
      },
        {
          "Date": "2010-02",
          "scales": 1850
        },
        {
          "Date": "2010-03",
          "scales": 1720
        },
        {
          "Date": "2010-04",
          "scales": 1818
        },
        {
          "Date": "2010-05",
          "scales": 1920
        }],
      line: null,
      fakeEntry: ['数据表管理','模型管理','多病种关联关系挖掘','疾病预测','其他功能']
    }
  },
  methods: {
    initFakeGraph() {
      this.line = new Line('entry', {
        data : this.fakeData,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          // type: 'timeCat',
          tickCount: 5,
        },
      });

      this.line.render();
    },
    test(index) {
      this.$message.success(`点到我了,我是第${index + 1}个`)
    }
  },
  mounted() {
    this.initFakeGraph()
  }
}
</script>

<style scoped>
.topBigDiv{
  border: 1px red solid;
  box-sizing: border-box;
  height: 30vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topBigDiv .left{
  border: 1px red solid;
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
.topBigDiv .right{
  border: 1px red solid;
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
.topBigDiv .left .quickEntryBox{
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.topBigDiv .left .quickEntryBox .singleBox{
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  width: 80px;
  height: 80px;
  border-radius: 20%;
}
.topBigDiv .left .quickEntryBox .imgStyle{
  width: 90%;
  height: 90%;
}
.bottomBigDiv{
  border: 1px blue solid;
  box-sizing: border-box;
  height: 55vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.bottomBigDiv .left{
  border: 1px blue solid;
  box-sizing: border-box;
  height: 100%;
  width: 33%;
}
.bottomBigDiv .mid{
  border: 1px blue solid;
  box-sizing: border-box;
  height: 100%;
  width: 33%;
}
.bottomBigDiv .right{
  border: 1px blue solid;
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
  clear: both
}
.lineStyle {
  color: blue;
  font-weight: 40;
}
.card{
  padding: 0;
  border: 1px grey solid;
  height: 100%;
}
</style>
