<template>
  <div class="layout_container">
    <div
      class="layout_slider"
      :class="{ fold: commonData.fold ? true : false }"
    >
      <LogoComp></LogoComp>
      <!--  -->
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="#fff"
          active-text-color="greenyellow"
          :default-active="$route.path"
          :collapse="commonData.fold ? true : false"
        >
          <MenuComp :menuList="constantRoute" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: commonData.fold ? true : false }"
    >
      <TabbarComp></TabbarComp>
    </div>
    <div class="layout_main" :class="{ fold: commonData.fold ? true : false }">
      <RouterViewComp />
    </div>
  </div>
</template>
  
  <script setup>
import LogoComp from "@/components/layout/logo/index.vue";
import MenuComp from "@/components/layout/menu/index.vue";
import RouterViewComp from "@/components/layout/routerview/index.vue";
import TabbarComp from "@/components/layout/tabbar/index.vue";
import { constantRoute } from "@/config/routes.js";
import commonStore from "@/store/modules/commonStore.js";
const commonData = commonStore();
let $route = useRoute();
</script>
<script>
export default {
  name: "Main",
};
</script>
  <style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  // background-color: #fff;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: #fff;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-tabbar-height;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-tabbar-height);
      left: $base-tabbar-height;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    // background-color: #666;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-tabbar-height);
      left: $base-tabbar-height;
    }
  }
}
</style>

