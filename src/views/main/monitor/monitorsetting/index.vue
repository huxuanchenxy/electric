<template>
  <div class="container">
    <!-- 加载等待画面 -->
    <el-dialog
      v-model="loading"
      title="处理中"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="loading-content">
        <el-progress
          type="circle"
          :percentage="progress"
          :status="progressStatus"
        />
        <p class="loading-text">{{ loadingText }}</p>
      </div>
    </el-dialog>

    <!-- <el-page-header title="" class="page-header">
      <template #content>
        <h1>下拉单选区域</h1>
      </template>
    </el-page-header> -->

    <!-- 下拉选择电厂 -->
    <div class="select-area">
      <el-select
        v-model="selectedPlant"
        placeholder="请选择发电厂"
        @change="loadPlantData"
        clearable
        filterable
        style="width: 300px"
      >
        <el-option
          v-for="plant in plants"
          :key="plant"
          :label="plant"
          :value="plant"
        />
      </el-select>
    </div>

    <div class="content-area">
      <!-- 原始列表区域 -->
      <el-card class="original-list">
        <template #header>
          <h2>变更前的列</h2>
        </template>
        <div class="scrollable-list">
          <draggable
            v-model="plantData"
            item-key="id"
            :class="{ 'disabled-drag': isDraggableDisabled }"
            :disabled="isDraggableDisabled"
          >
            <template #item="{ element, index }">
              <div class="draggable-item-disabled">
                <span class="item-index">{{ index + 1 }}.</span>
                <span class="item-name">{{ element.name }}</span>
              </div>
            </template>
          </draggable>
        </div>
      </el-card>

      <!-- 可变更列表区域 -->
      <el-card class="editable-list">
      <template #header>
        <h2>变更后的列</h2>
      </template>
      <div class="scrollable-list">
        <draggable 
          v-model="editablePlantData" 
          item-key="id"
          @end="onDragEnd"
        >
          <template #item="{ element, index }">
            <div class="draggable-item">
              <el-icon class="drag-handle"><Menu /></el-icon>
              <span class="item-content">
                <span class="item-index">{{ index + 1 }}.</span>
                <span class="item-name">{{ element.name }}</span>
              </span>
            </div>
          </template>
        </draggable>
      </div>
    </el-card>
    </div>

    <!-- 按钮区域 -->
    <div class="button-area">
      <el-button type="primary" @click="importCSV" :loading="importLoading">
        <el-icon class="el-icon--left"><Upload /></el-icon>
        导入
      </el-button>
      <el-button type="success" @click="exportCSV" :loading="exportLoading">
        <el-icon class="el-icon--left"><Download /></el-icon>
        导出
      </el-button>
      <el-button type="warning" @click="confirmChanges">
        <el-icon class="el-icon--left"><Check /></el-icon>
        保存
      </el-button>
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        accept=".csv"
        style="display: none"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Upload, Download, Check, Menu } from "@element-plus/icons-vue";
import draggable from "vuedraggable";
// 模拟电厂数据
const plants = ref([
  "平山电厂",
  "石洞口电厂",
  "外高桥电厂",
  "吴泾电厂",
  "漕泾电厂",
]);

const isDraggableDisabled = ref(true);
const selectedPlant = ref("");

// 模拟电厂业务数据
const tableHeaders = ref([
  "二氧化氮入口浓度(6%氧量)",
  "炉膛出口烟气氧量平均值",
  "3#机组反应器L进出口烟气差压",
  "3#机组反应器R进出口烟气差压",
  "3#机组反应器入口02含量",
  "3#机组反应器入口烟气流量(皮托管)",
  "LDC发电机实发功率",
  "Axyz",
  "Aklm",
  "Anop",
  "Aqrs",
  "Atuv",
  "Awxy",
  "Azab",
  "Acde",
  "Afgh",
  "Aijk",
  "Almn",

]);

const plantData = ref([]);
const editablePlantData = ref([]);
const loading = ref(false);
const importLoading = ref(false);
const exportLoading = ref(false);
const fileInput = ref(null);
const progress = ref(0);
const progressStatus = ref("");
const loadingText = ref("处理中，请稍候...");

// 页面加载时获取电厂列表
onMounted(() => {
  // 模拟API调用
  setTimeout(() => {
    console.log("加载电厂列表");
  }, 500);
});

// 加载电厂数据
const loadPlantData = () => {
  if (!selectedPlant.value) return;

  loading.value = true;
  progress.value = 0;
  loadingText.value = `正在加载 ${selectedPlant.value} 的数据...`;

  // 模拟加载进度
  const interval = setInterval(() => {
    progress.value += Math.floor(Math.random() * 10) + 5;
    if (progress.value >= 100) {
      clearInterval(interval);
      progress.value = 100;
      generateMockData();
    }
  }, 200);
};

const generateMockData = () => {
  // 生成模拟数据
  // const mockData = [];
  // for (let i = 0; i < 50; i++) {
  //   const row = {};
  //   tableHeaders.value.forEach((header, index) => {
  //     row[`col${index}`] = `${header}数据${i + 1}`;
  //   });
  //   mockData.push(row);
  // }

  // plantData.value = mockData;
  plantData.value = tableHeaders.value.map((item, index) => ({
    id: index + 1,
    name: item,
  }));

  editablePlantData.value = tableHeaders.value.map((item, index) => ({
    id: index + 1,
    name: item,
  }));

  setTimeout(() => {
    loading.value = false;
    ElMessage.success(`成功加载 ${selectedPlant.value} 的数据`);
  }, 500);
};

// 导入CSV
const importCSV = () => {
  if (!selectedPlant.value) {
    ElMessage.warning("请先选择发电厂");
    return;
  }
  fileInput.value.click();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  importLoading.value = true;
  loadingText.value = `正在导入 ${file.name}...`;
  progress.value = 0;
  progressStatus.value = "";

  // 模拟大文件处理进度
  const interval = setInterval(() => {
    progress.value += Math.floor(Math.random() * 5) + 1;
    if (progress.value >= 100) {
      clearInterval(interval);
      progress.value = 100;
      progressStatus.value = "success";
      loadingText.value = "导入完成!";

      setTimeout(() => {
        // 重置文件输入
        event.target.value = "";
        importLoading.value = false;
        loading.value = false;
        ElMessage.success(`成功导入 ${file.name}`);
      }, 1000);
    }
  }, 100);
};

// 导出CSV
const exportCSV = async () => {
  if (!selectedPlant.value) {
    ElMessage.warning("请先选择发电厂");
    return;
  }

  exportLoading.value = true;
  loading.value = true;
  progress.value = 0;
  progressStatus.value = "";
  loadingText.value = "正在准备导出数据...";

  // 模拟导出进度
  const interval = setInterval(() => {
    progress.value += Math.floor(Math.random() * 5) + 1;
    if (progress.value >= 100) {
      clearInterval(interval);
      progress.value = 100;
      progressStatus.value = "success";
      loadingText.value = "导出完成!";

      setTimeout(() => {
        console.log("导出数据:", {
          originalData: plantData.value,
          editableData: editablePlantData.value,
        });

        exportLoading.value = false;
        loading.value = false;
        ElMessage.success("导出成功");
      }, 1000);
    }
  }, 100);
};

// 确认更改
const confirmChanges = async () => {
  if (!selectedPlant.value) {
    ElMessage.warning("请先选择发电厂");
    return;
  }

  try {
    await ElMessageBox.confirm("确定要保存当前列表的更改吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    loading.value = true;
    progress.value = 0;
    progressStatus.value = "";
    loadingText.value = "正在保存数据...";

    // 模拟保存进度
    const interval = setInterval(() => {
      progress.value += Math.floor(Math.random() * 10) + 5;
      if (progress.value >= 100) {
        clearInterval(interval);
        progress.value = 100;
        progressStatus.value = "success";
        loadingText.value = "保存成功!";

        setTimeout(() => {
          console.log("保存数据:", {
            originalData: plantData.value,
            editableData: editablePlantData.value,
          });

          loading.value = false;
          ElMessage.success("保存成功");
        }, 1000);
      }
    }, 200);
  } catch (err) {
    console.log("取消保存");
  }
};


// 拖拽结束事件
const onDragEnd = () => {
  console.log("新顺序:", editablePlantData.value);
  // 这里可以添加保存顺序的逻辑
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
}

.page-header {
  margin-bottom: 20px;
}

h1,
h2 {
  color: #303133;
  margin: 0;
}

.select-area {
  margin: 20px 0;
}

.content-area {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.original-list,
.editable-list {
  flex: 1;
}

.button-area {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.loading-text {
  margin-top: 20px;
  font-size: 16px;
  color: #606266;
}

.drag-handle {
  cursor: move;
}

/* 可拖动列表样式 */
.scrollable-list {
  max-height: 600px;
  overflow-y: auto;
}

.draggable-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: move;
}

.draggable-item-disabled {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  transition: all 0.3s;
}

.draggable-item:hover {
  background-color: #f5f7fa;
}

.drag-handle {
  margin-right: 10px;
  cursor: move;
  color: #909399;
}

.item-index {
  margin-right: 10px;
  color: #606266;
  min-width: 30px;
}

.item-name {
  flex: 1;
  color: #303133;
}

/* 拖拽时的样式 */
.sortable-chosen {
  background-color: #f5f7fa;
}

.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

:deep(.disabled-drag .drag-handle) {
  cursor: not-allowed !important;
}
</style>
