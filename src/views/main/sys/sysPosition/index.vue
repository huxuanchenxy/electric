<template>
  <h1>测试页面3</h1>
  <div ref="imageWrapper" class="canvas_box">
    <video
      crossorigin
      width="640"
      height="360"
      src="@/assets/a0.mp4"
      autoplay
      muted
      loop
    ></video>
    <div>
      <p>这是文字</p>
    </div>
  </div>
  <button @click="screenshot">点击截图</button>
  <img :src="screenshotUrl" alt="" />
</template>

<script setup>
import html2canvas from "html2canvas";
let imageWrapper = ref(null); //要截图的区域元素
let screenshotUrl = ref(null); //最终截出的图片
// 截图
function screenshot() {
  console.log("^……");
  html2canvas(imageWrapper.value, {
    useCORS: true, // 使用跨域
  }).then((canvas) => {
    const imageDataURL = canvas.toDataURL("image/png");
    screenshotUrl.value = imageDataURL;
    console.log(screenshotUrl.value);
  });
}
</script>
<script>
export default {
  name: "SysPosition",
};
</script>
<style lang="scss" scoped>
</style>