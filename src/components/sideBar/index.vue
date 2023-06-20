<template>
  <div>
    <el-container class="con">
      <el-header class="header">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#ffd04b" background-color="#071135">
          <el-menu-item index="1" style="color:#5292D8;font-size:20px"
            ><i class="el-icon-box"></i>人群队列数据特征表征软件</el-menu-item
          >
          <!--            <template slot="title">当前服务器：</template>-->
          <el-menu-item index="2" style="float: right; color: #fff;font-size:14px"
            ><i class="el-icon-close"></i>退出登录</el-menu-item
          >
          <el-menu-item index="3" style="float: right; color: #fff;font-size:14px"
            ><i class="el-icon-user"></i>欢迎你，xx</el-menu-item
          >
          <el-menu-item index="4" style="float: right"
            ><i class="el-icon-question"></i
          ></el-menu-item>
          
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px" class="side">
          <el-menu
            default-active="1"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            background-color="#071135"
            text-color="#fff"
            active-text-color="#ffd04b"
              font-size="14px"
          >
            <el-menu-item index="/dash">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/dataManage">
              <i class="el-icon-s-data"></i>
              数据管理</el-menu-item
            >
            <el-menu-item index="/represent">
              <i class="el-icon-data-line"></i>
              疾病的特征性指标</el-menu-item
            >
            <el-menu-item index="/visualization">
              <i class="el-icon-s-custom"></i>疾病画像</el-menu-item
            >
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
        this.$alert(
          "病种的指标存在维度过多的问题，可能导致后续的分析作业效果不佳，本软件提供一个通过机器学习算法将多维的指标转化成低维指标的平台。",
          "软件介绍",
          {
            confirmButtonText: "确定",
            
          }
        );
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
/* .el-menu-demo.is-active {
  background-color: #333 !important;
  color: #ffd04b !important;
} */
/* .el-menu-demo{
  background-color: #071135; 
} */
.header {
  background-color: #071135;

  text-align: center;
  line-height: 60px;
}

.side {
  background-color: #071135;
  color: #333;
  /*text-align: center;*/
  /*line-height: 200px;*/
  height: calc(100vh - 60px);
}

.main {
  height: calc(100vh - 60px);
}
</style>
