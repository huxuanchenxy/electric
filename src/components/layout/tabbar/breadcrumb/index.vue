<template>
  <el-icon style="margin-right: 10px; cursor: pointer" @click="changeIcon">
    <component :is="commonData.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title !== ''"
      :to="item.path"
    >
      <el-icon v-if="item.meta.icon !== ''">
        <component :is="item.meta?.icon"></component>
      </el-icon>
      <i
        class="el-icon iconfont"
        v-else-if="item.meta?.iconfont"
        :class="item.meta?.iconfont"
      ></i>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import commonStore from "@/store/modules/commonStore.js";
const commonData = commonStore();
let $route = useRoute();
const changeIcon = () => {
  commonData.fold = !commonData.fold;
};
</script>
<script>
export default {
  name: "BreadcrumbComp",
};
</script>
<style lang="scss" scoped>
i {
  margin-right: 3px;
}
</style>