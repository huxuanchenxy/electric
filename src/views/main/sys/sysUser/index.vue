<template>
  <h1>测试页面1</h1>
  <div class="box">
    
    <video ref="videoRef" width="640" height="360" controls>
      <source src="@\assets\a0.mp4" type="video/mp4">
    </video>
    <button @click="captureFrame">截图</button>
    <canvas ref="canvasRef" style="display:none;"></canvas>
   
 
  </div>
</template>

<script setup> 
 
import { ref } from 'vue';
onMounted(() => {
  console.log("refrsh");
});
const videoRef = ref(null);
const canvasRef = ref(null); 
const captureFrame = () => {
  const canvas = canvasRef.value;
  const context = canvas.getContext('2d');
  const video = videoRef.value;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageUrl = canvas.toDataURL('image/png'); // 或者 'image/jpeg' 取决于你的需求
  console.log(imageUrl); // 显示图片的Data URL，可以在img标签中显示或下载
};
</script>
<script>
export default {
  name: "SysUser",
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 400px;
  // background-color: green;
}
</style>