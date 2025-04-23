<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <el-menu-item
      v-if="item.meta.isShowMenu && !item.children"
      :index="item.path"
      @click="goRoute"
    >
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon"></component>
      </el-icon> 
      <i
        class="el-icon iconfont"
        v-else-if="item.meta?.iconfont"
        :class="item.meta?.iconfont"
      ></i>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item
      v-else-if="item.name=='Layout'&&item.children?.length == 1 && item.children[0].meta.isShowMenu"
      :index="item.children[0].path"
      @click="goRoute"
    >
      <el-icon v-if="item.children[0].meta">
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <!-- <span
        class="iconfont el-icon"
        v-if="item.children[0].meta?.iconfont"
        v-html="item.children[0].meta?.iconfont"
      ></span> -->

      <i
        v-if="item.children[0].meta?.iconfont"
        class="el-icon iconfont"
        :class="item.children[0].meta?.iconfont"
      ></i>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu
      v-else-if="item.meta.isShowMenu "
      :index="item.path"
    >
      <template #title>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- <span
          class="iconfont el-icon"
          v-if="item.meta?.iconfont"
          v-html="item.meta?.iconfont"
        ></span> -->
        <i
          v-if="item.meta?.iconfont"
          class="el-icon iconfont "
          :class="item.meta?.iconfont"
        ></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <MenuComp :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>


<script setup>
// import { useRoute } from 'vue-router';
defineProps(["menuList"]);
let $router = useRouter();
const goRoute = (r) => {
  //   console.log("rrr__", r);
  $router.push(r.index);
};
</script>
<script>
export default {
  name: "MenuComp",
};
</script>

<style lang="scss" scoped></style>