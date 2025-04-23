<template>
  <h1>测试页面bbb</h1>
  <video id="videoElement" width="640" height="480" autoplay controls>
    <source src="@/assets/a0.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <canvas
    id="drawingCanvas"
    width="640"
    height="480"
    style="position: absolute; top: 0; left: 0"
  ></canvas>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const video = document.getElementById("videoElement");
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");
  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = "red"; // 线条颜色
      ctx.lineWidth = 2; // 线条宽度
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
  });

  canvas.addEventListener("mouseout", () => {
    drawing = false;
  });
});
</script>
 ni 
<script>
export default {
  name: "SysRole",
};
</script>
<style lang="scss" scoped>
</style>