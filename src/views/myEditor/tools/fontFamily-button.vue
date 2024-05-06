<script setup>

import {reactive, ref} from "vue";
const {editor} = defineProps({
  editor: {
    type: Object
  }
});

// 设置字体
const currentFamily = ref('宋体');
const currentFamilyList = reactive([
  {
    code: 'Arial',
    label: 'Arial',
  },
  {
    code: 'comic sans ms',
    label: 'Comic Sans Ms',
  },
  {
    code: 'courier new',
    label: 'Courier New',
  },
  {
    code: 'Georgia',
    label: 'Georgia',
  },
  {
    code: 'Helvetica',
    label: 'Helvetica',
  },
  {
    code: 'Impact',
    label: 'Impact',
  },
  {
    code: 'times new roman',
    label: 'Times New Roman',
  },
  {
    code: 'trebuchet ms',
    label: 'Trebuchet Ms',
  },
  {
    code: 'Verdana',
    label: 'Verdana',
  },
  {
    code: 'FangSong, 仿宋, FZFangSong-Z02S, STFangsong, fangsong',
    label: '仿宋',
  },
  {
    code: 'STFangsong, 华文仿宋, FangSong, FZFangSong-Z02S, fangsong',
    label: '华文仿宋',
  },
  {
    code: 'STSong, 华文宋体, SimSun',
    label: '华文宋体',
  },
  {
    code: 'STKaiti,华文楷体,KaiTi',
    label: '华文楷体',
  },
  {
    code: 'SimSun, 宋体',
    label: '宋体',
  },
  {
    code: 'microsoft yahei,pingfang sc,微软雅黑',
    label: '微软雅黑',
  },
  {
    code: 'KaiTi, 楷体, STKaiti',
    label: '楷体',
  },
  {
    code: 'kaiti sc',
    label: '楷体-简',
  },
  {
    code: 'SimHei, 黑体',
    label: '黑体',
  },
  {
    code: 'heiti sc',
    label: '黑体-简',
  },
  {
    code: 'FZHei-B01S',
    label: 'FZHei-B01S',
  },
  {
    code: 'FZFangSong-Z02S',
    label: 'FZFangSong-Z02S',
  },
  {
    code: 'FZKai-Z03S',
    label: 'FZKai-Z03S',
  }
]);
const handleSelects = key=>{
  console.log("ddd===",key);
  editor.commands.setFontFamily(key)

}
</script>

<template>
  <a-select
    v-model:value="currentFamily"
    size="small"
    :bordered = false
    dropdownClassName = "family_select"
    style="font-size: 12px;width: 85px"
    @change="handleSelects"
  >
    <a-select-option v-for="(item, index) in currentFamilyList" :key="index" :value="item.code">
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<style scoped lang="less">

.mixButton{
  border: none;
  color: #333;
  font-size: 12px;
  padding: 0px;
  padding-right: 16px;
}

</style>
<style lang="less">
.family_select{
  width: 120px !important;
}
</style>
