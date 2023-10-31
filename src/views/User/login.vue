<template>
  <div>
    <el-form
      element-loading-text="正在登陆..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      class="loginContainer"
    >
      <h3 class="loginTitle">系统登陆</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          auto-complete="false"
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          auto-complete="false"
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-button type="primary" style="width: 100%" @click="submitlogin"
        >登录</el-button
      >
      <el-button
        style="width: 100%; margin-top: 20px; margin-left: 0px"
        @click="register"
        >注册</el-button
      >
       <el-button type="primary" style="width: 100%;margin-top: 20px; margin-left: 0px" @click="returnToMain" plain>返回</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { postRequest, getRequest } from "@/utils/api";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loading: false,
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    returnToMain(){
       window.location.href ='http://10.16.48.219:8000/' ;
    },
    submitlogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          postRequest("/user/login", this.loginForm).then((resp) => {
            if (resp) {
              this.loading = false;
              console.log(resp);
              if (resp.code == "200") {
                this.$router.replace("/first");
                 sessionStorage.setItem("user", this.loginForm.username);
              
              }
                // const tokenStr = resp.obj.tokenHead + resp.obj.token;
               

              //   postRequest("/getrole", this.loginForm.id).then((resp) => {
              //     if (resp[0].nameZh === "管理员") {
              //       this.$router.replace("/portal");
              //     } else {
              //       this.$router.replace("/home");
              //     }
              //   });
            }
          });
        } else {
          this.$message.error("请输入所有字段");
          return false;
        }
      });
    },
    register() {
      this.$router.replace("/register");
    },
  },
};
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: white;
  border: 1px solid #eaeaee;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 0px auto 40px auto;
  text-align: center;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>  