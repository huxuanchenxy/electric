<template>
  <svgIcon name="唐装" width="100px" height="100px"></svgIcon>
  <div class="box">
    <h1>App根组件</h1>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>





<!-- <template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#001529" text-color="#fff">
          <Menu :menuList="constantRoute" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">22</div>
    <div class="layout_main">
      33
      <p style="height: 1000px; background-color: aquamarine">我是一个段落</p>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/layout/logo/index.vue'
import Menu from '@/components/layout/menu/index.vue'
import { constantRoute } from "@/config/routes.js"
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: red;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: #fff;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: cyan;
    top: 0px;
    left: $base-menu-width;
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
  }
}
</style> -->