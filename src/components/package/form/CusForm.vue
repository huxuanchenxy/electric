<template>
  <div>
    <div>
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :model="modelValue" ref="elFormRef">
      <template v-for="item in formItems" :key="item.label">
        <el-form-item :label="item.label" :prop="item.field">
          <template v-if="item.type == 'input'">
            <el-input
              v-model="modelValue[item.field]"
              :placeholder="item.placeholder"
            />
          </template>
          <template v-else-if="item.type == 'select'">
            <el-select
              :placeholder="item.placeholder"
              v-model="modelValue[item.field]"
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </template>
          <template v-else-if="item.type == 'date'">
            <el-date-picker
              type="date"
              v-model="modelValue[item.field]"
              :placeholder="item.placeholder"
            />
          </template>
          <template v-else-if="item.type == 'switch'">
            <el-switch v-model="modelValue[item.field]" />
          </template>
        </el-form-item>
      </template>
    </el-form>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  // formConfig: {
  //     type: Object
  // }
  modelValue: {
    type: Object,
  },
  labelWidth: {
    type: String,
    default: "120px",
  },
  formItems: {
    type: Array,
  },
});
const elFormRef = ref();
onMounted(() => {
  //console.log("prop", props, props.labelWidth);
});
const formRest = () => {
  console.log("dfasf");
  elFormRef.value.resetFields();
};
defineExpose({
  formRest,
});
</script>
<script>
export default {
  name: "CusFormComp",
};
</script>
<style scoped></style>