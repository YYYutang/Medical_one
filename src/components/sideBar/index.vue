<template>
  <div>
    <el-container class="con">
      <el-header class="header">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item style="color:black;"><i class="el-icon-box"></i>多病种关联关系挖掘工具软件</el-menu-item>
<!--            <template slot="title">当前服务器：</template>-->

          <el-menu-item style="float: right;"><i class="el-icon-close"></i>退出登录</el-menu-item>
          <el-menu-item style="float: right;"><i class="el-icon-user"></i>欢迎你，管理员</el-menu-item>
<!--          <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px" class="side">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
            <el-menu-item index="1">
<!--                <el-menu-item index="1-3">选项3</el-menu-item>-->
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>肺癌</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">肺癌早期风险预测</el-menu-item>
                <el-menu-item index="1-2">肺癌转移预测</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <app-main></app-main>
        </el-main>
      </el-container>
      <!--    <el-container v-show="$store.state.server.serverId==='0'">-->
      <!--    <h3 style="margin: 0 auto;color: red">请在顶部导航栏选择服务器！</h3>-->
      <!--    </el-container>-->
    </el-container>
  </div>
</template>

<script>
import AppMain from "@/components/AppMain";
export default {
  components: {AppMain},
  data() {
    return{
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>

<style scoped>
.el-icon-mobile-phone{
  color: white;
}
.el-menu-vertical-demo{
  /*解决侧边栏颜色无法撑起整个高度问题*/
  /*height: 100vh;*/
  /*解决侧边栏凸起问题*/
  border-right: none;
}
.header{
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
