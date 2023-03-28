<template>
  <div>
    <el-container class="con">
      <el-header class="header">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" style="color: cornflowerblue"
            ><i class="el-icon-box"></i>多病种关联关系挖掘工具软件</el-menu-item
          >
          <!--            <template slot="title">当前服务器：</template>-->
          <el-menu-item index="2" style="float: right"
            ><i class="el-icon-close"></i>退出登录</el-menu-item
          >
          <el-menu-item index="3" style="float: right"
            ><i class="el-icon-user"></i>欢迎你，xx</el-menu-item
          >
          <el-menu-item index="4" style="float: right"
            ><i class="el-icon-question"></i
          ></el-menu-item>
          <!--          <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
          <!--          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px" class="side">
          <el-menu
            default-active="1"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
          >
            <el-menu-item index="/dash">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>肺癌</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/earlyLung">肺癌早期风险预测</el-menu-item>
                <el-menu-item index="/metastasis">肺癌转移预测</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppMain from "@/components/AppMain";
export default {
  components: { AppMain },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      dialogVisible: false,
    };
  },
  methods: {
    handleSelect(key) {
      if (key == 4) {
        this.$alert("多病种之间具有复杂关联关系，同时多种疾病可能存在某些相同的病征。本软件采用机器学习方法来挖掘多病种之间的复杂关联关系。本软件根据不同疾病的不同使用场景，能够完成数据选择，数据处理，特征选择，模型设置，模型预测等功能。", "软件介绍", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-icon-mobile-phone {
  color: white;
}
.el-menu-vertical-demo {
  /*解决侧边栏颜色无法撑起整个高度问题*/
  /*height: 100vh;*/
  /*解决侧边栏凸起问题*/
  border-right: none;
}
.header {
  /*background-color: #B3C0D1;*/
  color: #333;
  text-align: center;
  line-height: 60px;
}

.side {
  /*background-color: #071135;*/
  color: #333;
  /*text-align: center;*/
  /*line-height: 200px;*/
  height: calc(100vh - 60px);
}

.main {
  height: calc(100vh - 60px);
}
</style>
