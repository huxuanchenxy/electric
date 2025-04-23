<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <BreadcrumbComp />
    </div>
    <div class="tabbar_right">
      <SettingComp />
    </div>
  </div>
</template>

<script setup>
import BreadcrumbComp from "./breadcrumb/index.vue";
import SettingComp from "./setting/index.vue";
</script>
<script>
export default {
  name: "TabbarComp",
};
</script>
<style  scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  border-bottom: 1px solid yellowgreen;
  justify-content: space-between;
  // background-image: linear-gradient(
  //   to right,
  //   rgb(232, 223, 223),
  //   rgb(201, 178, 178),
  //   rgb(194, 165, 165)
  // );
  // background-image: linear-gradient(to right, #fff, #aaa, #ddd, #fff);
  .tabbar_left {
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>