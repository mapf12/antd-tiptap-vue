<script setup>
import { DownOutlined } from '@ant-design/icons-vue';
const {editor} = defineProps({
  editor: {
    type: Object
  }
});
// 格式化列表
const typeMap = new Map([
  ["bulletList", "toggleBulletList"],
  ["orderedList", "toggleOrderedList"],
]);
const dataset = [
  {
    listType: "bulletList",
    listStyleType: "circle",
  },
  {
    listType: "bulletList",
    listStyleType: "disc",
  },
  {
    listType: "bulletList",
    listStyleType: "square",
  },
  {
    listType: "orderedList",
    listStyleType: "decimal",
  },
  {
    listType: "orderedList",
    listStyleType: "lower-alpha",
  },
  {
    listType: "orderedList",
    listStyleType: "lower-roman",
  },
  {
    listType: "orderedList",
    listStyleType: "upper-alpha",
  },
  {
    listType: "orderedList",
    listStyleType: "upper-roman",
  },

];
const handleFormatList = (e) => {
  const {listType,listStyleType} = e;
  const toggleCommandName = typeMap.get(listType);
  if (!toggleCommandName) return;
  let chain = editor.chain().focus();
  // 开启列表类型
  if (!editor.isActive(listType)) {
    chain[toggleCommandName]().updateAttributes(listType, { listStyleType });
  }
  // 切换列表类型
  else if (editor.getAttributes(listType).listStyleType !== listStyleType) {
    chain.updateAttributes(listType, { listStyleType });
  }
  // 关闭列表类型
  else {
    chain[toggleCommandName]();
  }
  chain.run();
};

const  handleSelects = ({key})=>{
  console.log("d============",key);
  let obj = dataset[key];
  handleFormatList(obj);
}

</script>

<template>
  <a-dropdown
    style="font-size: 12px;"
    overlayClassName = "editor-dropdown"
  >
    <a class="ant-dropdown-link" style="color: black" @click.prevent>
      <a-space :size="4">
        <i class="ri-list-check"></i>
        <DownOutlined />
      </a-space>
    </a>
    <template #overlay>
      <a-menu @click="handleSelects">
        <a-menu-item key="0">
          <span>○ 大圆圈</span>
        </a-menu-item>
        <a-menu-item key="1">
          <span>● 小黑点</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span>■ 小方块</span>
        </a-menu-item>
        <a-menu-item key="3">
          <span>1,2,3...</span>
        </a-menu-item>
        <a-menu-item key="4">
          <span>a,b,c...</span>
        </a-menu-item>
        <a-menu-item key="5">
          <span>i,ii,iii...</span>
        </a-menu-item>
        <a-menu-item key="6">
          <span>A,B,C...</span>
        </a-menu-item>
        <a-menu-item key="7">
          <span>I,II,III...</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="less">

</style>
