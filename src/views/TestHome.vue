<template>
  <div>
    <el-button @click="test">abc</el-button>
  </div>
</template>

<script setup>
import testApi from "@/http/testApi.js";
import md5 from "md5";
import { keyMd5 } from "@/utils/jslib.js";
const test = () => {
  let password = "Admin@ideXp2025";
  let pwdMd5 = md5(`${password}&key=${keyMd5}`);
  console.log("pwdMd5……", pwdMd5);

  let params = {
    username: "admin",
    password: pwdMd5,
  };
  testApi.login(params).then((res) => {
    console.log("testApi", res);
  });

  let para1 = {
    pageIndex: 0,
    pageSize: 0,
    id: "string",
    userLoginName: "string",
    userName: "string",
    password: "string",
    originalPwd: "string",
    mobilePhone: "string",
    sex: "string",
    status: 0,
    orderNum: 0,
    createDate: "2025-01-10T05:49:00.566Z",
  };
//   testApi.saveSysUser(params).then((res) => {
//     console.log("testApi post--", res);
//   });
};
</script>

<style lang="scss" scoped>
</style>