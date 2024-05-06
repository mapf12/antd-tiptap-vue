<script setup>

import {ref} from "vue";
import {throttle} from "lodash-es";
const currentLineHeight = ref(1.5);
const lineHeightList = [1, 1.5, 1.6, 1.75, 2, 3, 4, 5];

const {editor} = defineProps({
  editor: {
    type: Object
  }
});

const handleSetLineHeight = (value) => {
  editor.chain().focus().setLineHeight(`${value}`).run();
};
//
// const handleUpdateLineHeight = ({ editor, transaction }) => {
//   let lineHeight = editor.getAttributes("paragraph")?.lineHeight;
//   if (!lineHeight) {
//     const pos = transaction.curSelection.from;
//     let node = editor.view.domAtPos(pos).node;
//     // eslint-disable-next-line no-constant-condition
//     while (true) {
//       if (node.tagName === "SECTION" && node.style.lineHeight) {
//         lineHeight = node.style.lineHeight;
//         break;
//       } else if (node === editor.view.dom) {
//         lineHeight = "1.5em"; // 默认行高
//         break;
//       }
//       node = node.parentNode;
//     }
//   }
//   currentLineHeight.value = +lineHeight.match(/\d+/)[0];
// };
//
// editor.on(
//   "transaction",
//   throttle(handleUpdateLineHeight, 240, { leading: false })
// );
</script>

<template>
  <a-select
    v-model:value="currentLineHeight"
    size="small"
    :bordered = false
    dropdownClassName = "editor_select"
    style="font-size: 12px"
    @change = "handleSetLineHeight"
  >
    <a-select-option v-for="(item, index) in lineHeightList" :key="index" :value="item">
      {{ item }}
    </a-select-option>
  </a-select>
</template>

<style scoped lang="less">

.mixButton{
  border: none;
  color: #333;
  font-size: 17px;
  padding: 0px;
  padding-right: 16px;
}

</style>
