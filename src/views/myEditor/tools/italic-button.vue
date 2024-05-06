<script setup>

const {editor} = defineProps({
  editor: {
    type: Object
  }
});



</script>

<template>
  <a-tooltip placement="bottom" color = "white" overlayClassName = "tooltip-class">
    <template #title>
      <span>斜体</span>
    </template>
    <a-button
      type="link" class="mixButton"
      style="font-size: 12px"
      @click="editor.commands.toggleItalic()">
      <i class="ri-italic" />
    </a-button>
  </a-tooltip>
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
.tooltip-class{
  top: 28px;
  .ant-tooltip-inner{
    color: #333;
    font-size: 12px;
  }
}
</style>
