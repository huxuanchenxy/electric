<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button
    size="small"
    icon="Setting"
    @click="drawer = true"
    circle
  ></el-button>
  <!-- <el-popover placement="bottom" title="主题设置" width="300" trigger="click"> 
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" size="small" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          @change="changeDark"
          v-model="dark"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>    -->
  <!-- <img
    :src="userData.curUser?.avatar"
    alt=""
    style="width: 24px; height: 24px; margin: 0 10px"
  /> -->
  <!-- <el-color-picker v-model="color" size="small" /> -->
  <el-image
    ref="imageRef"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
    :src="userData.curUser?.avatar"
    :preview-src-list="[userData.curUser?.avatar]"
    :preview-teleported="true"
  />
  <el-dropdown style="margin-right: 10px">
    <span class="el-dropdown-link">
      {{ userData.curUser?.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-drawer
    v-model="drawer"
    :append-to-body="true"
    title="主题设置"
    size="256"
    :with-header="true"
  >
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          size="small"
          @change="setColor"
          show-alpha
          :predefine="predefineColors"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          @change="changeDark"
          v-model="dark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import commonStore from "@/store/modules/commonStore.js";
import userStore from "@/store/modules/userStore.js";
import { RemoveToken } from "@/utils/common.js";
const userData = userStore();
let commonData = commonStore();
//获取路由器对象
let $router = useRouter();
//获取路由对象
let $route = useRoute();
let dark = ref(false);
const updateRefsh = () => {
  commonData.refsh = !commonData.refsh;
};

const fullScreen = () => {
  let isFullScreen = document.fullscreenElement;
  if (!isFullScreen) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const logout = () => {
  userData.clearCurUserInfo();
  RemoveToken();
  $router.push({ path: "/login", query: { redirect: $route.path } });
};

//颜色组件组件的数据
const color = ref("409EFF"); // ref("rgba(255, 69, 0, 0.68)");
const drawer = ref(false);
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement;
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = "dark") : (html.className = "");
};

//主题颜色的设置
const setColor = () => {
  console.log("setColor", color.value);
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement;
  html.style.setProperty("--el-color-primary", color.value);
};
</script>
<script>
export default {
  name: "SettingComp",
};
</script>
<style lang="scss" scoped>
</style>