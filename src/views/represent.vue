<template>
  <div>
    <el-header>
      <div v-if="head1">
        <h3>任务设置</h3>
        <el-divider></el-divider>
      </div>
      <div>
        <el-tabs v-if="head2" v-model="activeName">
          <el-tab-pane label="原始数据统计分析" name="first"
            ><oldData :dataAll="dataAll" :head2="head2"> </oldData
          ></el-tab-pane>
          <el-tab-pane label="处理后数据统计分析" name="second"
            ><newData :dataChoose="dataChoose" :head2="head2"></newData
          ></el-tab-pane>
        </el-tabs>
      </div>
    </el-header>

    <el-container id="maintest">
      <div id="step" v-show="showStep">
        <el-steps :active="active" align-center>
          <el-step title="选择数据"></el-step>
          <el-step title="选择属性"></el-step>
          <el-step title="算法选择"></el-step>
        </el-steps>
      </div>
      <div id="stepcontain" v-show="showStep">
        <!--el-form的:model，el-form-item的prop只和验证相关-->
        <!--======================================     选择数据表单      ======================================================-->
        <el-form
          class="form"
          :model="dataSelectForm.formData"
          :rules="dataSelectForm.rules"
          v-show="dataSelectForm.isShow"
          ref="dataSelectForm"
          label-position="top"
        >
          <el-form-item label="选择数据表：" prop="selectedData">
            <el-row :gutter="10">
              <el-radio-group
                v-model="dataSelectForm.formData.selectedData"
                size="medium"
                prop="selectedData"
              >
                <el-col v-for="item in dataOptions" :key="item.id" :span="8">
                  <el-radio
                    class="radio"
                    :label="item.tableName"
                    border
                    style="margin-top: 20px"
                    >{{ item.tableName }}</el-radio
                  >
                </el-col>
              </el-radio-group>
            </el-row>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" @click="submitForm(active)"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
        <!--======================================     选择属性列表单      ======================================================-->
        <el-form
          class="form"
          :model="columnSelectForm.formData"
          :rules="columnSelectForm.rules"
          v-show="columnSelectForm.isShow"
          ref="columnSelectForm"
          label-position="top"
        >
          <el-form-item label="选择属性列：" prop="selectedData">
            <el-row :gutter="10">
              <el-checkbox-group
                v-model="columnSelectForm.formData.selectedData"
                size="medium"
                prop="selectedData"
              >
                <el-col
                  v-for="item in dataInOptions"
                  :key="item.columnName"
                  :span="6"
                >
                  <el-tooltip
                    effect="light"
                    :content="item.columnDesc"
                    placement="top"
                    style="margin-top: 20px"
                  >
                    <!--这里key和label要改-->
                    <el-checkbox
                      class="radio"
                      :label="item.columnName"
                      border
                      style="margin-top: 20px"
                      >{{ item.columnName }}</el-checkbox
                    >
                  </el-tooltip>
                </el-col>
              </el-checkbox-group>
            </el-row>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" @click="submitForm(active)"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>

        <!--======================================     算法选择表单     =======================================================-->
        <el-form
          class="form"
          :model="algoForm.formData"
          :rules="algoForm.rules"
          v-show="algoForm.isShow"
          ref="algoForm"
          label-position="top"
        >
          <el-form-item label="选择算法模型" prop="algoName">
            <el-radio-group
              v-model="algoForm.formData.algoName"
              size="mini"
              prop="selectedData"
            >
              <el-radio
                v-for="item in algoOptions"
                :key="item.algoName"
                :label="item.algoName"
                border
                >{{ item.algoName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <knn
              v-if="algoForm.formData.algoName == 'KNN'"
              @outputParams="outputParams"
            ></knn>
            <k-means v-if="algoForm.formData.algoName == 2"></k-means>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" @click="submitForm(active)"
              >完成</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-container>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
import knn from "@/components/algos/knn.vue";
import oldData from "@/components/outcomeShow/oldData.vue";
import newData from "@/components/outcomeShow/newData.vue";

export default {
  components: {
    knn,
    oldData,
    newData,
  },
  data() {
    return {
      activeName: 'first',
      head1: true,
      head2: false,
      showStep: true,
      dataOptions: [],
      dataInOptions: [],
      outComeData: [],
      algoOptions: [
        {
          id: 1,
          algoName: "PCA",
        },
        {
          id: 2,
          algoName: "因子分析",
        },
        {
          id: 3,
          algoName: "ICA",
        },
      ],
      value1: [],
      value2: [],
      formArray: ["dataSelectForm", "columnSelectForm", "algoForm"],
      active: 0,

      //数据选择-----------------------------------------------------------------------------------------------
      dataSelectForm: {
        isShow: true,
        formData: {
          selectedData: "",
        },
        rules: {
          selectedData: [
            { required: true, message: "请选择数据表", trigger: "blur" },
          ],
        },
      },
      //选择属性列-----------------------------------------------------------------------------------------------
      columnSelectForm: {
        isShow: false,
        formData: {
          selectedData: [],
        },
        rules: {
          selectedData: [
            { required: true, message: "请选择属性列", trigger: "blur" },
          ],
        },
      },

      //数据处理-----------------------------------------------------------------------------------------------
      algoForm: {
        isShow: false,
        formData: {
          algoName: "",
          params: [],
        },
        rules: {
          algoName: [
            { required: true, message: "请选择一个算法模型", trigger: "blur" },
          ],
        },
      },

      //模型算法-----------------------------------------------------------------------------------------------
      modelAlgoForm: {
        isShow: false,
        formData: {
          classifyMode: "0",
          regressMode: "0",
          predictMode: "0",
          clusterMode: "0",
        },
      },
      dataAll: [],
      dataChoose: [],
      dataNew: [],
    };
  },
  methods: {
    submitForm(stepIndex) {
      let formName = this.formArray[stepIndex];
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(stepIndex + "stepindex" + this.active + "active");
          if (stepIndex < 2) {
            this[formName].isShow = false;
            this.active++;
            let nextFormName = this.formArray[++stepIndex];
            this[nextFormName].isShow = true;
            if (this.active == 1) {
              let tableName = this.dataSelectForm.formData;
              getRequest("/feature/getAllFiled/" + tableName.selectedData).then(
                (response) => {
                  var temp = Object.keys(response.data);
                  var key = Object.values(response.data);

                  for (let i = 0; i < temp.length; i++) {
                    const obj = {
                      columnName: temp[i],
                      columnDesc: key[i],
                    };
                    this.dataInOptions.push(obj);
                  }
                }
              );
              const page = 1;
              getRequest(
                "/feature/getInfoByTableName?tableName=" +
                  tableName.selectedData +
                  "&page=" +
                  page
              ).then((response) => {
                this.dataAll = response;
              });
            }
          } else if (stepIndex == 2) {
            const page=1;
             getRequest("/feature/getInfoBySelectedFiled?page="+page+"&tableName="+this.dataSelectForm.formData.selectedData+"&params="+this.columnSelectForm.formData.selectedData).then((response)=>{
                this.dataChoose=response;
              })
            this.head1 = !this.head1;
            this.head2 = !this.head2;
            this.showStep = !this.showStep;
            // const params={
            //   modelTable:this.dataSelectForm.formData.selectedData,//模型选择的数据表表名
            //   modelColumn:this.columnSelectForm.formData.selectedData,//模型选择的属性列（数组）
            //   modelAlgo:this.algoForm.formData.algoName,//模型选择的算法名
            //   modelAlgoParams:this.algoForm.formData.params,//模型调节的参数（数组）
            // }

            // postRequest('diabete/fitModel',params).then(
            //   (response)=>{
            //     console.log(response)
            //     this.showChart=!this.showChart
            //     this.showStep=!this.showStep
            //     let tempc=Object.keys(response.data)
            //     console.log(tempc)
            //     var tempData=[]
            //     for(let i=0;i<tempc.length;i++){
            //       var tempObj={}
            //       tempObj.name=tempc[i];
            //       tempObj.value=response.data[tempc[i]]
            //       tempData.push(tempObj)
            //     }
            //     this.outComeData=tempData
            //     console.log(this.outComeData)
            //     this.drawChart()
            //   },
            // );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(stepIndex) {
      let formName = this.formArray[stepIndex];
      this.$refs[formName].resetFields();
    },
    stepBack(stepIndex) {
      if (this.active - 1 >= 0) {
        if (this.active == 1) {
          this.dataInOptions = [];
        }
        let formName = this.formArray[stepIndex];
        this[formName].isShow = false;
        this.active--;
        let preFormName = this.formArray[--stepIndex];
        this[preFormName].isShow = true;
      }
    },

    clearSample() {
      this.featureExtractForm.formData.sample = "";
    },
    getAllData() {
      var tempList = JSON.parse(this.$store.getters.getAllTableData);
      for (let i = 0; i < tempList.length; i++) {
        const obj = {
          tableName: tempList[i].tableName,
        };
        this.dataOptions.push(obj);
      }
    },
    outputParams(value) {
      this.algoForm.formData.params = value;
    },
  },
  mounted() {
    this.getAllData();
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
.table {
  float: left;
  margin-right: 20px;
}
.charts {
  float: left;
  margin-right: 20px;
  margin-top: 40px;
}
#button1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
#step {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 250px;
}
#stepcontain {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 44%;
  left: 34%;
}
</style>