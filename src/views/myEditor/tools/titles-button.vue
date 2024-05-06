<script setup>

import {reactive,ref} from "vue";

const {editor} = defineProps({
  editor: {
    type: Object
  }
});
let value1 = ref('')
const  menus = reactive([
  {
    code: "paraph",
    label: "正文"
  },
  {
    code: "h1",
    label: "标题1"
  },
  {
    code: "h2",
    label: "标题2"
  },
  {
    code: "h3",
    label: "标题3"
  },
  {
    code: "h4",
    label: "标题4"
  }
]);
value1.value = "paraph";

const handleSelects = key=>{
  console.log("ddd===",key);
}
</script>

<template>
  <a-select
    v-model:value="value1"
    size="small"
    :bordered = false
    dropdownClassName = "editor_select"
    style="font-size: 12px"
  >
    <a-select-option v-for="(item, index) in menus" :key="index" :value="item.code">
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<style scoped lang="less">
</style>
