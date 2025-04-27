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
      <span>电厂：</span>
      <el-select
        v-model="selectedPlant"
        placeholder="请选择发电厂"
        @change="loadPlantData"
        clearable
        filterable
      >
        <el-option
          v-for="plant in plants"
          :key="plant.dictCode"
          :label="plant.dictLabel"
          :value="plant.dictValue"
        />
      </el-select>
      <span>时间范围：</span>
      <el-date-picker
        v-model="eldatetime"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 100%; max-width: 360px;"
        align="right">
      </el-date-picker>
      <span>时间跨度(s)：</span>
      <el-input
        class="duration-input"
        v-model="durationSecond"
        placeholder="Enter duration in seconds"
        type="number"
      />
    </div>
    <div class="select-area">
      <span class="promptspan">文件路径：</span>
      <el-input
        v-model="path"
        placeholder="请输入服务器文件路径"
        type="text"
      />
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
                <span class="item-name">{{ element.name }}({{element.no}})</span>
                <el-switch
                    v-model="element.active"
                    disabled
                    >
                </el-switch>
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
              <div class="item-content">
                <span class="item-index">{{ index + 1 }}.</span>
                
                <!-- 显示模式 -->
                <span v-if="!element.editing" class="item-name">
                  {{ element.name }}({{element.no}})
                </span>
                
                <!-- 编辑模式 -->
                <el-input
                  v-else
                  v-model="element.editName"
                  size="small"
                  @keyup.enter="confirmEdit(element)"
                  style="flex: 1; margin-right: 10px;"
                  class="edit-input"
                />
                
                <!-- 操作按钮 -->
                <div class="item-actions">
                  <el-button
                    v-if="!element.editing"
                    type="text"
                    size="small"
                    @click="startEdit(element)"
                  >
                    编辑
                  </el-button>
                  <template v-else>
                    <el-button
                      type="text"
                      size="small"
                      @click="confirmEdit(element)"
                    >
                      确认
                    </el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="cancelEdit(element)"
                    >
                      取消
                    </el-button>
                  </template>
                  <el-switch
                    v-model="element.active">
                  </el-switch>
                </div>
              </div>
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
import api from "@/http/energyApi.js";
// 模拟电厂数据
const plants = ref([
]);

const durationSecond = ref(105);
const path = ref("");
const isDraggableDisabled = ref(true);
const selectedPlant = ref("");

// 模拟电厂业务数据
const tableHeaders = ref([
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
onMounted( async() => {
  // 模拟API调用
  // setTimeout(() => {
  //   console.log("加载电厂列表");
    
  // }, 500);
  await loadPlantList();
});


const loadPlantList =  async () => {
  let res = await api.nox_company();
  // console.log("loadPlantList……", res);
    if(res.code == 200)
    {
      plants.value = res.data;
    }else
    {
      ElMessage.error('nox_company:' + res.msg);
    }
};

const loadcsvmap =  async () => {
  let res = await api.csvmap({company:selectedPlant.value});
  // console.log("loadcsvmap……", res);
    if(res.code == 200)
    {
      tableHeaders.value = res.data;
      ElMessage.success(`成功加载 ${selectedPlantLabel.value} 的数据`);
    }else
    {
      ElMessage.error('csvmap:' + res.msg);
    }
};



const selectedPlantLabel = computed(() => {
  const found = plants.value.find(plant => plant.dictValue === selectedPlant.value);
  return found ? found.dictLabel : '';
});

const formattedDates = computed(() => {
  if (!eldatetime.value || eldatetime.value.length !== 2) return null;
  
  return {
    start: formatDate(eldatetime.value[0]),
    end: formatDate(eldatetime.value[1])
  };
});

const formatDate = (date) => {
  if (!date) return '';
  const pad = (num) => num.toString().padStart(2, '0');
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 加载电厂数据
const loadPlantData = async() => {
  if (!selectedPlant.value) return;
  await generateData();
};

const generateData = async () => {
  await loadcsvmap();
  plantData.value = tableHeaders.value.map((item, index) => ({
    name: item.colName,
    no:item.no,
    active: item.status.toString() == '1' ? true: false,
  }));

  editablePlantData.value = tableHeaders.value.map((item, index) => ({
    id: item.id,
    name: item.colName,
    no:item.no,
    col: item.col,
    editing: false, 
    editName: '',
    active: item.status.toString() == '1' ? true: false,
    sort: item.sort,
    company: item.company,
    type: item.type,
    status: item.status,
  }));

};

// 开始编辑
const startEdit = (item) => {
  item.editing = true
  item.editName = item.name
}

// 确认编辑
const confirmEdit = (item) => {
  if (!item.editName.trim()) {
    ElMessage.warning('名称不能为空')
    return
  }
  item.name = item.editName
  item.editing = false
}

// 取消编辑
const cancelEdit = (item) => {
  item.editing = false
}
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
  if (!eldatetime.value) {
    ElMessage.warning("请选择开始和结束时间");
    return;
  }

  let res = await api.toCsv({
    company: selectedPlant.value,
    startTime: formattedDates.value.start,
    endTime: formattedDates.value.end,
    durationSecond: durationSecond.value,
    path: path.value,
  });
  if(res.code == 200)
  {
    ElMessage.success(`操作成功，文件较大，请耐心等待...`);
  }else
  {
    ElMessage.error('toCsv:' + res.msg);
  }
  // exportLoading.value = true;
  // loading.value = true;
  // progress.value = 0;
  // progressStatus.value = "";
  // loadingText.value = "正在准备导出数据...";

  // // 模拟导出进度
  // const interval = setInterval(() => {
  //   progress.value += Math.floor(Math.random() * 5) + 1;
  //   if (progress.value >= 100) {
  //     clearInterval(interval);
  //     progress.value = 100;
  //     progressStatus.value = "success";
  //     loadingText.value = "导出完成!";

  //     setTimeout(() => {
  //       console.log("导出数据:", {
  //         originalData: plantData.value,
  //         editableData: editablePlantData.value,
  //       });

  //       exportLoading.value = false;
  //       loading.value = false;
  //       ElMessage.success("导出成功");
  //     }, 1000);
  //   }
  // }, 100);
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

    // loading.value = true;
    // progress.value = 0;
    // progressStatus.value = "";
    // loadingText.value = "正在保存数据...";

    editablePlantData.value = editablePlantData.value.map((item, index) => ({
      id: item.id,
      colName: item.name,
      col: item.col,
      active: item.active,
      sort: index + 1,
      company: item.company,
      type: item.type,
      status: item.active ? '1' : '0',
    }));
    let res = await api.csvmapall(editablePlantData.value);
    if(res.code == 200)
    {
      ElMessage.success(`成功保存 ${selectedPlantLabel.value} 的数据`);
      generateData();
    }

  } catch (err) {
    console.log("取消保存",err);
  }
};


// 拖拽结束事件
const onDragEnd = () => {
  // console.log("新顺序:", editablePlantData.value);
  // 这里可以添加保存顺序的逻辑
};


const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

const value1 = ref([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]);
const eldatetime = ref('');
</script>

<style scoped>
.container {
  max-width: 1400px;
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

/* .select-area {
  margin: 20px 0;
} */

.select-area {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
}

.select-area .promptspan
{
  width: 100px;
}

/* .select-area .el-date-picker {
  flex: 1;
} */

.select-area .duration-input {
  width: 100px;
}

.select-area .el-select {
  width: 150px;
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
  padding: 8px 15px;
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
  padding: 8px 15px;
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
  margin-right: 0px;
  color: #606266;
  min-width: 20px;
}

.item-name {
  flex: 1;
  color: #303133;
}

/* 拖拽时的样式 */
.sortable-chosen {
  background-color: #b0b1b3;
}

.sortable-ghost {
  opacity: 0.5;
  background: #a1d4ec;
}



.item-content {
  display: flex;
  align-items: center; /* 垂直居中 */
  width: 100%;
  gap: 8px; /* 元素之间的间距 */
}





.edit-input {
  flex: 1; /* 输入框占据剩余空间 */
  margin-right: 10px;
}

.item-actions {
  margin-left: auto; /* 关键：使操作按钮靠右 */
  white-space: nowrap; /* 防止按钮换行 */
}
</style>
