<script setup>

import {ref} from "vue";
import {throttle} from "lodash-es";
const {editor} = defineProps({
  editor: {
    type: Object
  }
});
// 设置字号
const currentFontsize = ref(14);
const fontsizeList = [12, 14, 15, 16, 17, 18, 20, 24];

const handleSetFontsize = (size) => {
  console.log("d===============",size);
  // 将选中内容加上超链接
  editor.chain().focus().setFontSize(`${size}px`).run();
  currentFontsize.value = size;
};

// 字号状态回显
const handleUpdateFontsizeState = ({ editor, transaction }) => {

  let fontSizeValue = editor.getAttributes("textStyle").fontSize;
  if (!fontSizeValue) {
    const pos = transaction.curSelection.from;
    let node = editor.view.domAtPos(pos).node;
    while (node.nodeType !== 1) {
      node = node.parentNode;
    }
    fontSizeValue = window.getComputedStyle(node).fontSize;
  }

    let aa = fontSizeValue.match(/\d+/);
    if(aa){
      console.log("字号回显==============",editor)
      console.log("字号回显111==============",transaction)
      currentFontsize.value = fontSizeValue.match(/\d+/)[0];


  }
};
editor.on(
  "transaction",
  throttle(handleUpdateFontsizeState, 240, { leading: false })
);
</script>

<template>
  <a-select
    v-model:value="currentFontsize"
    size="small"
    :bordered = false
    dropdownClassName = "editor_select"
    style="font-size: 12px"
    @change="handleSetFontsize"
  >
    <a-select-option v-for="(item, index) in fontsizeList" :key="index" :value="item">
      {{ item + 'px' }}
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
