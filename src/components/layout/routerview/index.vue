<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div>
        <component :is="Component" v-if="flag" />
      </div>
    </transition>
  </router-view>
</template>

<script setup>
import commonStore from "@/store/modules/commonStore.js";
const commonData = commonStore();
let flag = ref(true);
watch(
  () => commonData.refsh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>
<script>
export default {
  name: "RouterViewComp",
};
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  //   transform: rotate(0deg);
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  //   transform: rotate(360deg);
  transform: scale(1);
}
</style>