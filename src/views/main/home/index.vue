<template>
  <el-card>
    <div class="box">
      <el-image class="avatar" :src="userData.curUser?.avatar"></el-image>
      <div class="content">
        <h3 class="title">{{ getTime() }}好 {{ userData.curUser?.username }}</h3>
        <p class="subtitle">{{ logoSetting.title }}</p>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <svgIcon name="welcome" width="800px" height="500px"></svgIcon>
  </div>
</template>

<script setup>
import logoSetting from "@/config/logoSetting.js";
import userStore from "@/store/modules/userStore.js";
import { getTime } from "@/utils/common.js";
const userData = userStore();
</script>
<script>
export default {
  name: "Home",
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .content {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-top: 10px;
      margin-bottom: 30px;
    }
    .subtitle {
      font-style: italic;
      color: gray;
    }
  }
}
.bottom {
  margin-top:30px;
  display: flex;
  justify-content: center;
}
</style>