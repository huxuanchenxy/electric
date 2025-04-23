<template>
  <div class="logo" v-if="logoSetting.logoHidden">
    <img :src="logoSetting.logo" alt="" />
    <p v-show="!commonData.fold"  >{{ logoSetting.title }}</p>
  </div>
</template>

<script setup>
//引入设置标题与logo这配置文件
import logoSetting from "@/config/logoSetting.js";
import commonStore from "@/store/modules/commonStore.js";
const commonData = commonStore();
</script>
<script>
export default {
  name: "LogoComp",
};
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px 10px 0 3px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
  
}
</style>