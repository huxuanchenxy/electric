<template>
  <div class="login_container">
    <el-row>
      <el-col :span="16" :xs="0"></el-col>
      <el-col :span="8" :xs="24">
        <!-- 登录的表单 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Welcome</h1>
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
              @click.enter="login()"
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
import userStore from "@/store/modules/userStore.js";
import { ElMsg, ElNotific, SetToken, getTime, keyMd5 } from "@/utils/common.js";
import { Lock, User } from "@element-plus/icons-vue";
import md5 from "md5";
const userData = userStore();
let loginForms = ref();
let $router = useRouter();
let $route = useRoute();
let loading = ref(false);
let loginForm = reactive({ username: "admin", password: "admin" });
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

//登录按钮回调
const login = async () => {
  await loginForms.value.validate();
  loading.value = true;
  let { username, password } = loginForm;
  let pwdmd5 = md5(`${password}&key=${keyMd5}`);
  //console.log("pwdMd5……", pwdmd5);
  let params = {
    username: username,
    password: pwdmd5,
  };

  let res = {
    code: 200,
    data: {
      user: {
        userId: 1,
        avatar:
          "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        username: "admin",
        password: "c92f873259adb59a4f27235364675a50",
        desc: "平台管理员",
        roles: ["平台管理员"],
        buttons: ["cuser.detail"],
        routes: ["home"],
        token: "Admin Token",
      },
      token: "Admin Token",
    },
  };
  if (res.code == 200) {
    //console.log("res.code^……", res);
    SetToken(res.data?.token);
    userData.setCurUsreInfo(res.data?.user);
    let redirect = $route.query?.redirect;
    ElNotific("欢迎登录", `hi,${getTime()}好`);
    $router.push({ path: redirect || "/" });
  } else {
    ElMsg("用户名和密码不正确", "error");
  }
  // api.login(params).then(
  //   (res) => {
  //     loading.value = false;
  //     if (res.code == 200) {
  //       console.log("res.code^……", res);
  //       SetToken(res.data?.token);
  //       userData.setCurUsreInfo(res.data?.user);
  //       let redirect = $route.query?.redirect;
  //       ElNotific("欢迎登录", `hi,${getTime()}好`);
  //       $router.push({ path: redirect || "/" });
  //     } else {
  //       ElMsg("用户名和密码不正确", "error");
  //     }
  //   },
  //   (x) => {
  //     loading.value = false;
  //     ElMsg("远程服务器异常，请联系管理员", "error");
  //   }
  // );
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