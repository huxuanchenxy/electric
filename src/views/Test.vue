<template>
  <div>
    <MyForm v-bind="TestData" v-model="formData" ref="myFormRef">
      <template #header>
        <h1>注册</h1>
      </template>
      <template #footer>
        <el-form-item>
          <el-button @click="submit">提交</el-button>
          <el-button @click="reset">取消</el-button>
        </el-form-item>
      </template>
    </MyForm>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import MyForm from "@/components/package/form/CusForm.vue";
 import TestData from "@/components/package/test.js";
let formItems = TestData.formItems;

let myFormRef = ref();

const formDataInit = {};
formItems.map((item) => {
  formDataInit[item.field] = "";
});

let formData = ref(formDataInit);
onMounted(() => {});
const reset = () => {
  myFormRef.value.formRest();
  // formItems.map((item) => {
  //   formDataInit[item.field] = "";
  // });
  // formData.value = formDataInit;
};
const submit = () => {
  console.log("submit:", formData.value);
};
</script>

<style   scoped>
</style>