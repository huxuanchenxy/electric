<template>
  <div style="position: relative">
    <video
      id="videoElement"
      width="640"
      height="480"
      style="position: absolute; top: 0; left: 0"
      autoplay
      controls
    >
      <source src="@/assets/a0.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div
      id="container"
      width="640"
      height="480"
      style="position: absolute; top: 0; left: 0"
    ></div>
  </div>
  <!-- <canvas
    id="drawingCanvas"
    width="640"
    height="480"
    style="position: absolute; top: 0; left: 0"
  ></canvas> -->
  <button @click="test" style="position: absolute; top: 500px; left: 0">ttt</button>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  
});

const clear = () => {};
const test = () => {
}
</script>

<style lang="scss" scoped>
</style>