<script setup>
import {ref} from "vue";
const {editor} = defineProps({
  editor: {
    type: Object
  }
});
let value1 = ref('')
value1.value = "left";

const handleChange = (value,option)=>{
  console.log("ddd===",value);
  editor.commands.setTextAlign(value);
}
</script>

<template>
  <a-select
    v-model:value="value1"
    size="small"
    :bordered = false
    @change = "handleChange"
    dropdownClassName = "editor_select"
    style="font-size: 12px"
  >
    <a-select-option value="left">
      <a-space :size=4>
        <i class="ri-align-left ri-sm"></i>
        <span>左对齐</span>
      </a-space>
    </a-select-option>
    <a-select-option value="right">
      <a-space :size=4>
        <i class="ri-align-right ri-sm"></i>
        <span>右对齐</span>
      </a-space>

    </a-select-option>
    <a-select-option value="center">
      <a-space :size=4>
        <i class="ri-align-center ri-sm"></i>
        <span>居中对齐</span>
      </a-space>

    </a-select-option>
    <a-select-option value="justify">
      <a-space :size=4>
        <i class="ri-align-justify ri-sm"></i>
        <span>两端对齐</span>
      </a-space>
    </a-select-option>
  </a-select>
</template>

<style scoped lang="less">
</style>
