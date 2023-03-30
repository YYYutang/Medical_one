<template>
    <div>
        <div id="step" style="height: 550px;">
            <el-steps direction="vertical" :active="active">
                <el-step title="基本信息"></el-step>
                <el-step title="选择数据"></el-step>
                <el-step title="数据处理"></el-step>
                <el-step title="特征抽取"></el-step>
                <el-step title="模型算法"></el-step>
                <el-step title="模型预测"></el-step>
                <el-step title="模型评估"></el-step>
            </el-steps>
        </div>
        
<!--el-form的:model，el-form-item的prop只和验证相关-->

<!--======================================     基本信息表单      ======================================================-->
        <el-form class="form" :model="basicInfoForm.formData" :rules="basicInfoForm.rules" ref="basicInfoForm" label-position="top" v-show="basicInfoForm.isShow">
            <el-form-item label="模型名称" prop="name">
                <el-input v-model="basicInfoForm.formData.name"></el-input>
            </el-form-item>
            <el-form-item label="备注信息" prop="desc">
                <el-input type="textarea" v-model="basicInfoForm.formData.desc"></el-input>
            </el-form-item>
            <el-form-item label="模型类型">
                <el-radio-group v-model="basicInfoForm.formData.model_type" size="medium">
                    <el-radio class="radio"  label="1" border>聚类分析</el-radio>
                    <el-radio class="radio" label="2" border>关联规则挖掘</el-radio>
                    <el-radio class="radio" label="3" border>决策树</el-radio>
                    <el-radio class="radio" label="4" border>神经网络</el-radio>
                    <el-radio class="radio" label="5" border>支持向量机</el-radio>
                </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="submitForm(active)">下一步</el-button>
                <el-button @click="resetForm(active)">重置</el-button>
            </el-form-item>
        </el-form>

<!--======================================     选择数据表单      ======================================================-->
        <el-form class="form" :model="dataSelectForm.formData" :rules="dataSelectForm.rules" v-show="dataSelectForm.isShow" ref="dataSelectForm" label-position="top">
            <el-form-item label="选择数据表：" prop="selectedData">
                <el-radio-group v-model="dataSelectForm.formData.selectedData" size="medium" prop="selectedData">
                    <el-radio class="radio" label="1" border>ICU</el-radio>
                    <el-radio class="radio" label="2" border>肺癌</el-radio>
                    <el-radio class="radio" label="3" border>胃癌</el-radio>
                    <el-radio class="radio" label="4" border>糖尿病</el-radio>
                    <el-radio class="radio" label="5" border>乳腺癌</el-radio>
                    <el-radio class="radio" label="6" border>冠心病</el-radio>
                    <el-radio class="radio" label="7" border>阿尔兹海默症</el-radio>
                </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button @click="stepBack(active)">上一步</el-button>
                <el-button type="primary" @click="submitForm(active)">下一步</el-button>
            </el-form-item>
        </el-form>

<!--======================================     数据处理表单     =======================================================-->
        <el-form class="form" :model="dataProcessForm.formData" :rules="dataProcessForm.rules" v-show="dataProcessForm.isShow" ref="dataProcessForm" label-position="top">
            <el-form-item label="数据拆分方式：">
                <el-radio-group v-model="dataProcessForm.formData.splitMode" size="medium" prop="splitMode" @change="changeSplitMode(dataProcessForm.formData.splitMode)">
                    <el-radio label="proRate">按比例拆分</el-radio>
                    <el-radio label="random">随机拆分</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item id="slider" label="训练集占比：" v-show="dataProcessForm.sliderShow">
                <el-slider
                        v-model="dataProcessForm.formData.splitRate"
                        show-input
                        input-size="mini">
                </el-slider>
            </el-form-item>
            <el-form-item label="随机拆分种子：" v-show="dataProcessForm.randomSeedShow" prop="randomSeed">
                <el-input v-model="dataProcessForm.formData.randomSeed" placeholder="请输入拆分种子"></el-input>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button @click="stepBack(active)">上一步</el-button>
                <el-button type="primary" @click="submitForm(active)">下一步</el-button>
            </el-form-item>
        </el-form>

<!--======================================     特征抽取表单     =======================================================-->
        <el-form class="form" :model="featureExtractForm.formData" :rules="featureExtractForm.rules" v-show="featureExtractForm.isShow" ref="featureExtractForm" label-position="top">
            <el-form-item label="表名">
                <el-select v-model="featureExtractForm.formData.tableName" placeholder="请选择" @change="clearSample" prop="tableName">
                    <el-option
                            v-for="item in featureExtractForm.formData.nameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="样本值">
                <el-select v-model="featureExtractForm.formData.sample" placeholder="请选择" prop="sample">
                    <el-option
                            v-for="item in featureExtractForm.formData.sampleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="处理方式：">
                <el-radio-group v-model="featureExtractForm.formData.processMode" size="medium">
                    <el-radio label='0'>离散</el-radio>
                    <el-radio label='1'>随机</el-radio>
                    <el-radio label='2'>离散+随机</el-radio>
                </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button @click="stepBack(active)">上一步</el-button>
                <el-button type="primary" @click="submitForm(active)">下一步</el-button>
            </el-form-item>
        </el-form>

<!--======================================     模型算法表单    ========================================================-->
        <el-form class="form" :model="modelAlgoForm.formData" :rules="modelAlgoForm.rules" v-show="modelAlgoForm.isShow" ref="modelAlgoForm" label-position="top">
            <el-form-item label="分类模型：">
                <el-radio-group v-model="modelAlgoForm.formData.classifyMode" size="medium">
                    <el-radio label='0'>逻辑回归二分类</el-radio>
                    <el-radio label='1'>贝叶斯二分类</el-radio>
                    <el-radio label='2'>决策树</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="回归模型：">
                <el-radio-group v-model="modelAlgoForm.formData.regressMode" size="medium">
                    <el-radio label='0'>逻辑回归</el-radio>
                    <el-radio label='1'>神经网络</el-radio>
                    <el-radio label='2'>CART</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="预测模型：">
                <el-radio-group v-model="modelAlgoForm.formData.predictMode" size="medium">
                    <el-radio label='0'>自回归</el-radio>
                    <el-radio label='1'>灰度预测</el-radio>
                    <el-radio label='2'>深度学习</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="聚类模型：">
                <el-radio-group v-model="modelAlgoForm.formData.clusterMode" size="medium">
                    <el-radio label='0'>K-means</el-radio>
                    <el-radio label='1'>DIANA</el-radio>
                    <el-radio label='2'>谱聚类</el-radio>
                </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button @click="stepBack(active)">上一步</el-button>
                <el-button type="primary" @click="submitForm(active)">下一步</el-button>
            </el-form-item>
        </el-form>

<!--======================================     模型预测表单     =======================================================-->
        <el-form class="form" :model="modelForecastForm.formData" :rules="modelForecastForm.rules" v-show="modelForecastForm.isShow" ref="modelForecastForm" label-position="top">
            <img src="../../assets/model.png" alt="可视化建模示意图">
            <br>
            <el-form-item style="margin-left: 120px">
                <el-button @click="stepBack(active)">上一步</el-button>
                <el-button type="primary" @click="submitForm(active)">下一步</el-button>
            </el-form-item>
        </el-form>

<!--======================================     模型评估表单      ======================================================-->
        <el-form id="modelEvaluateForm" :model="modelEvaluateForm.formData" :rules="modelEvaluateForm.rules" v-show="modelEvaluateForm.isShow" ref="modelEvaluateForm" label-position="top">
            <img src="../../assets/modelEvaluate.png" alt="模型评估中">
            <br>
            <el-form-item style="margin-left: 200px">
                <el-button @click="stepBack(active)">上一步</el-button>
                <router-link to="/modelManage">
                    <el-button type="primary" id="done">完成</el-button>
                </router-link>
            </el-form-item>
        </el-form>

    </div>

</template>



<script scoped>
    export default {
        name: "importModel",
        data() {
            return {
                formArray: ['basicInfoForm','dataSelectForm','dataProcessForm','featureExtractForm','modelAlgoForm','modelForecastForm','modelEvaluateForm'],
                active: 0,
                //基本信息-----------------------------------------------------------------------------------------------
                basicInfoForm: {
                    isShow: true,
                    formData: {
                        name: '',
                        desc: '',
                        model_type: '1',
                    },
                    rules: {
                            name: [
                                {required: true, message: '请输入模型名称', trigger: 'blur'},
                            ],
                            desc: [
                                {required: true, message: '请填写备注信息', trigger: 'blur'}
                            ]
                    },
                },

                //数据选择-----------------------------------------------------------------------------------------------
                dataSelectForm: {
                    isShow: false,
                    formData: {
                        selectedData: '',
                    },
                    rules: {
                        selectedData: [
                            {required: true, message: '请选择数据表', trigger: 'blur'},
                        ],
                    },
                },

                //数据处理-----------------------------------------------------------------------------------------------
                dataProcessForm: {
                    isShow: false,
                    sliderShow: true,
                    randomSeedShow: false,
                    formData: {
                        splitMode: 'proRate',
                        splitRate: 50,
                        randomSeed: 'null',
                    },
                    rules: {
                        randomSeed: [
                            {required: true, message: '拆分种子不能为空', trigger: 'blur'},
                        ],
                    },
                },

                //特征抽取-----------------------------------------------------------------------------------------------
                featureExtractForm: {
                  isShow: false,
                  formData: {
                      tableName: '',
                      sample: '',
                      processMode: '0',
                      nameOptions: [{
                          value: '1',
                          label: '表1',
                      },{
                          value: '2',
                          label: '表2',
                      },{
                          value: '3',
                          label: '表3',
                      },{
                          value: '4',
                          label: '表4',
                      },],

                      sampleOptions: [{
                          value: '311a',
                          label: '311a',
                      },{
                          value: 'cd654',
                          label: 'cd654',
                      },{
                          value: '684s',
                          label: '684s',
                      },{
                          value: 'h826',
                          label: 'h826',
                      }],
                  },
                  rules: {
                      tableName: [
                          {required: true, message: '请选择表名', trigger: 'blur'},
                      ],
                      sample: [
                          {required: true, message: '请选择样本值', trigger: 'blur'}
                      ],
                  }
                },

                //模型算法-----------------------------------------------------------------------------------------------
                modelAlgoForm: {
                    isShow: false,
                    formData:{
                        classifyMode: '0',
                        regressMode: '0',
                        predictMode: '0',
                        clusterMode: '0',
                    }
                },

                //模型预测-----------------------------------------------------------------------------------------------
                modelForecastForm: {
                    isShow: false,
                    formData: {

                    },
                },

                //模型评估-----------------------------------------------------------------------------------------------
                modelEvaluateForm:{
                    isShow: false,
                    formData: {

                    },
                },
            };
        },
        methods: {
            submitForm(stepIndex) {
                // console.log(this[formName].formData.name),
                let formName = this.formArray[stepIndex];
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!\n' +
                            '模型名称：' + this[formName].formData.name + '\n' +
                            '备注信息：' + this[formName].formData.desc + '\n' +
                            '模型类型：' + this[formName].formData.model_type);

                        if(stepIndex < 7) {
                            this[formName].isShow = false;
                            this.active++;
                            let nextFormName = this.formArray[++stepIndex];
                            this[nextFormName].isShow = true;
                            console.log('当前表单名字：'+ formName + '\n' + '下一个表单名字：' + nextFormName);
                            console.log('当前表单状态：'+ this[formName].isShow + '\n' + '下一个表单状态：' + this[nextFormName].isShow);
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(stepIndex) {
                let formName = this.formArray[stepIndex];
                this.$refs[formName].resetFields();
            },
            stepBack(stepIndex) {
                let formName = this.formArray[stepIndex];
                this[formName].isShow = false;
                this.active--;
                let preFormName = this.formArray[--stepIndex];
                this[preFormName].isShow = true;
            },

            changeSplitMode(splitMode) {
                if(splitMode == 'random'){
                    this.dataProcessForm.sliderShow = false;
                    this.dataProcessForm.randomSeedShow = true;
                    this.dataProcessForm.formData.randomSeed = '';//配合rule防止seed为空
                }
                else {
                    this.dataProcessForm.randomSeedShow = false;
                    this.dataProcessForm.sliderShow = true;
                    this.dataProcessForm.formData.randomSeed = 'null';//选择’按比例拆分‘不需要seed，设为null绕过rule
                }
            },

            clearSample() {
              this.featureExtractForm.formData.sample = '';
            },
        }
    }
</script>

<style>
    #step{
        display: inline-block;
        margin-top: 10px;
    }

    .form{
        width: 400px;
        float: right;
        margin-top: 10px;
        margin-right: 65%;
        display:flex;
        flex-direction: column;
        justify-content:center;
    }

    #slider{
        width: 400px;
    }
    /*el-radio-group{*/
    /*    width: 150px;*/
    /*    display: flex;*/
    /*    */
    /*}*/

    #modelEvaluateForm{
        width: 600px;
        float: right;
        margin-top: 10px;
        margin-right: 50%;
    }

    #done{
        margin-left: 11px;
    }

    .radio{
        width: 140px;
        height: 36px;
        margin-bottom: 6px;
        margin-left: 0px !important;
    }
    ::v-deep .el-radio__label{

    }
</style>
