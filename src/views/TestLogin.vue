<template>
    <div class="login_container">
      <el-row>
        <el-col :span="16" :xs="0"></el-col>
        <el-col :span="8" :xs="24">
          <!-- 登录的表单 -->
          <el-form class="login_form" :model="loginForm" ref="loginForms">
            <h1>WelCome</h1>
            <h2>欢迎来到{{ logoSetting.title }}</h2>
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="loginForm.username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                :prefix-icon="Lock"
                v-model="loginForm.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                class="login_btn"
                type="primary"
                size="default"
                @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </template>
  
  
  <script setup>
  import logoSetting from "@/config/logoSetting.js";
  import testApi from "@/http/testApi.js";
  import useUser from "@/service/useUser.js";
  import { Lock, User } from "@element-plus/icons-vue";
  // import { reactive, ref } from "vue";
  // import { useRoute, useRouter } from "vue-router";
  //获取el-form组件
  let loginForms = ref();
  //获取路由器
  let $router = useRouter();
  //路由对象
  let $route = useRoute();
  //定义变量控制按钮加载效果
  let loading = ref(false);
  //收集账号与密码的数据
  let loginForm = reactive({ username: "admin", password: "atguigu123" });
  
  const { dogList, getDog, getA1 } = useUser();
  //登录按钮回调
  const login = async () => {
    //   let data = useUser.getDog();
    console.log("data", dogList);
    await getDog();
    console.log("dogList……", dogList);
    getA1();
    testApi.getMock().then((res) => {
      console.log("res^……", res);
    });
  
    let redirect = $route.query?.redirect;
    // $router.push({ path: redirect || "/" });
  };
  </script>
  
  <style scoped lang="scss">
  .login_container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/background.jpg") no-repeat;
    background-size: cover;
  
    .login_form {
      position: relative;
      width: 80%;
      top: 30vh;
      background: url("@/assets/images/login_form.png") no-repeat;
      background-size: cover;
      padding: 40px;
      border: 1px solid #888;
      border-radius: 15px;
  
      h1 {
        color: white;
        font-size: 40px;
      }
  
      h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0px;
      }
  
      .login_btn {
        width: 100%;
      }
    }
  }
  </style>