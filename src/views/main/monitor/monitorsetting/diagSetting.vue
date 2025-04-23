<template>
  <el-dialog
    :title="title"
    v-model="diagSettingObj.diagVisible"
    width="60%"
    top="2vh"
    :modal-append-to-body="false"
  >
    <template #header="">
      <div class="my-header">
        <h1 style="font-size: 20px">{{ title }}</h1>
      </div>
    </template>

    <div style="position: relative" ref="targetElement">
      <img style="width: 640px; height: 360px" :src="diagSettingObj.imageUrl" />
      <div
        id="container"
        style="position: absolute; top: 0; left: 0; width: 640px; height: 360px"
      ></div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        监控区域：
        <el-select
          style="width: 150px"
          v-model="diagSettingObj.monitorarea"
          placeholder="请输入监控区域"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          /> </el-select
        >&nbsp;
        <el-button type="primary" @click="clear()">清 除</el-button>
        <el-button @click="diagSettingObj.diagVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useEventListener } from "@vueuse/core";
import { StageGraph } from "./js/graph.js";
let graph;
let title = ref("监控区域设置");
const options = [
  // { value: "全屏", label: "全屏" },
  { value: "多边形内侧", label: "多边形内侧" },
  { value: "多边形外侧", label: "多边形外侧" },
];

const { diagSettingObj } = defineProps({
  diagSettingObj: {
    type: Object,
  },
});
// const eveFormRef = ref();
// const eveForm = ref({
//   videoaddr: "",
//   monitorarea: "",
//   monitorcoordinate: "",
//   monitorstartdate: "",
//   monitorenddate: "",
// });
const targetElement = ref(null);
useEventListener(targetElement, "contextmenu", (event) => {
  event.preventDefault();
});
const onSubmit = () => {
  let data = graph.getData();
  diagSettingObj.monitorcoordinate = data; 
  diagSettingObj.diagVisible = false;
};

onMounted(() => {
  nextTick(() => {
    graph = new StageGraph("container");
    let data = diagSettingObj?.monitorcoordinate;
    // let data =
    //   "[[305,130.00000826517794,509,140.00000890096086,480,281.0000178655,162,217.00001379648933]]";
    graph.setData(data);
  });

  
});

const clear = () => {
  graph.clearData();
};

// onUnmounted(() => {
//   console.log("^^^……onUnmounted……");
//   document.removeEventListener("contextmenu", (event) => {
//     event.preventDefault();
//   });
// });
</script>

<style  scoped>
</style>