<template>
  <el-dialog
    :title="title"
    v-model="diagObj.diagVisible"
    width="60%"
    top="2vh"
    :modal-append-to-body="false"
  >
    <template #header="">
      <div class="my-header">
        <h1 style="font-size: 20px">{{ title }}</h1>
      </div>
    </template>
    <el-form
      ref="eveFormRef"
      :model="diagSettingObj"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="视频地址" prop="videoaddr">
        <el-input
          v-model="diagSettingObj.videoaddr"
          placeholder="请输入视频地址"
        />
      </el-form-item>
      <el-form-item label="视频" v-if="diagSettingObj.videoaddr.length > 0">
        <div style="display: flex; align-items: end">
          <video
            id="videoElement"
            ref="videoRef"
            width="640"
            height="360"
            style="margin: 0; padding: 0"
            autoplay
            controls
            crossorigin="anonymous"
          >
            <source :src="diagSettingObj.videoaddr" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <el-button type="primary" @click="setting" style="margin-left: 15px"
            >设置监控范围</el-button
          >
        </div>
      </el-form-item>

      <el-form-item label="监控区域" prop="monitorarea">
        <el-select
          v-model="diagSettingObj.monitorarea"
          placeholder="请输入监控区域"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="监控坐标" prop="monitorcoordinate">
        <el-input
          v-model="diagSettingObj.monitorcoordinate"
          placeholder="请输入监控坐标"
        />
      </el-form-item>
      <el-form-item label="监控开始时间" prop="monitorstartdate">
        <el-time-picker
          v-model="diagSettingObj.monitorstartdate"
          placeholder="请输入监控开始时间"
        />
      </el-form-item>
      <el-form-item label="监控结束时间" prop="monitorenddate">
        <el-time-picker
          v-model="diagSettingObj.monitorenddate"
          placeholder="请输入监控结束时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="diagObj.diagVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(eveFormRef)"
          >确 定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <DiagSetting
    v-if="diagSettingObj.diagVisible"
    v-model:diagSettingObj="diagSettingObj"
    @closed="diagSettingColse"
  ></DiagSetting>
</template>

<script setup>
import api from "@/http/sysApi.js";
import { ElMsg } from "@/utils/common.js";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import DiagSetting from "./diagSetting.vue";
let title = ref("新增监控配置");
const options = [
  { value: "多边形内侧", label: "多边形内侧" },
  { value: "多边形外侧", label: "多边形外侧" },
];
const diagSettingObj = ref({
  diagVisible: false,
  monitorarea: "多边形内侧",
  videoaddr: "http://10.89.34.166:8800/src/assets/a0.mp4",
  monitorarea: "",
  monitorcoordinate: "",
  monitorstartdate: "",
  monitorenddate: "",
  images: "",
});
const { diagObj } = defineProps({
  diagObj: {
    type: Object,
  },
});
const eveFormRef = ref();
// const eveForm = ref({

// });

// const validateName = (rule, value, callback) => {
//   if (!reg.test(value)) {
//     //callback(new Error("名称必须使用字母、数字、下划线,首字符必须是字母"));
//     callback(new Error("名称必须使用字母、数字、下划线,首字符必须是字母"));
//   } else {
//     let tmpIndex = -1;
//     if (eveForm.value?.key != "") {
//       // tmpIndex = currentObjList.value?.findIndex(
//       //   (item) => item.text === value && item.key != eveForm.value?.key
//       // );
//       tmpIndex = var_event_NameExist(value, eveForm.value?.key);
//     } else {
//       //tmpIndex = currentObjList.value?.findIndex((item) => item.text === value);
//       tmpIndex = var_event_NameExist(value, "");
//     }
//     if (tmpIndex < 0) callback();
//     else callback(new Error("名称已存在"));
//   }
// };
// const var_event_NameExist = (value, key) => {
//   let tmpIndex = -1;
//   for (let v in moduleObj.interface) {
//     let existIndex = -1;
//     if (moduleObj?.interface[v]) {
//       existIndex = tmpIndex = isNameExist(value, key, moduleObj.interface[v]);
//       if (existIndex >= 0) {
//         tmpIndex = existIndex;
//         break;
//       }
//     }
//   }
//   return tmpIndex;
// };

// const isNameExist = (value, key, varList) => {
//   let tmpIndex = -1;
//   if (key != "") {
//     tmpIndex = varList?.findIndex(
//       (item) => item.text === value && item.key != key
//     );
//   } else {
//     tmpIndex = varList?.findIndex((item) => item.text === value);
//   }
//   return tmpIndex;
// };
const rules = reactive({
  videoaddr: [{ required: true, message: "请输入视频地址", trigger: "blur" }],
  monitorarea: [{ required: true, message: "请输入监控区域", trigger: "blur" }],
  monitorcoordinate: [
    { required: true, message: "请输入监控坐标", trigger: "blur" },
  ],
  monitorstartdate: [
    { required: true, message: "请输入监控开始时间", trigger: "blur" },
  ],
  monitorenddate: [
    { required: true, message: "请输入监控结束时间", trigger: "blur" },
  ],
});

const onSubmit = async (formEl) => {
  console.log("diagSettingObj^…………", diagSettingObj.value);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      diagSettingObj.id = uuidv4();
      // diagSettingObj.monitorstartdate = "";
      // diagSettingObj.monitorenddate = "";
      api.saveMonitor(diagSettingObj.value).then((res) => {
        // console.log("res……", res.list);
        ElMsg("保存成功");
      });
    }
  });
};

onMounted(() => {});

const videoRef = ref();

const setting = () => {
  html2canvas(videoRef.value, {
    useCORS: true, // 使用跨域
  }).then((canvas) => {
    const imageDataURL = canvas.toDataURL("image/png");

    diagSettingObj.value.diagVisible = true;
    diagSettingObj.value.imageUrl = imageDataURL;
  });
};

const diagSettingColse = () => {
  console.log("diag close", diagSettingObj.value);
};
</script>

<style  scoped>
</style>