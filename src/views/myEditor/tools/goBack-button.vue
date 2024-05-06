<script setup>

const {editor} = defineProps({
  editor: {
    type: Object
  }
});

const handerBack = ()=>{
  editor.can().chain().focus().undo().run();
}
const handerForward = ()=>{
  editor.can().chain().focus().redo().run();
}
</script>

<template>
  <a-tooltip placement="bottom" color="white" overlayClassName="tooltip-class">
    <template #title>
      <span>撤销</span>
    </template>
    <a-button
      type="link"
      class="mixButton"
      style="font-size: 12px"
      @click="editor.commands.undo"
      :disabled="!editor.can().undo()">
      <i class="ri-arrow-go-back-fill"></i>
    </a-button>
  </a-tooltip>
  <a-tooltip placement="bottom" color="white" overlayClassName="tooltip-class" >
    <template #title>
      <span>重做</span>
    </template>
    <a-button
      type="link"
      class="mixButton"
      style="font-size: 12px"
      :disabled="!editor.can().redo"
      @click="editor.commands.redo">
      <i class="ri-arrow-go-forward-fill"></i>
    </a-button>
  </a-tooltip>
</template>

<style scoped lang="less">

.mixButton {
  border: none;
  color: #333;
  padding: 0px;
  padding-right: 16px;
}

</style>

<style lang="less">
.tooltip-class {
  top: 28px;

  .ant-tooltip-inner {
    color: #333;
    font-size: 12px;
  }
}
</style>
