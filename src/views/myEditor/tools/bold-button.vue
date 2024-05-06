<script setup>
const {editor} = defineProps({
  editor: {
    type: Object
  }
});
const handleBold = ()=>{
  editor.chain().focus().toggleBold().run()
}
</script>

<template>
  <a-tooltip placement="bottom" color = "white" overlayClassName = "tooltip-class">
    <template #title>
      <span>加粗</span>
    </template>
    <a-button type="link" class="mixButton" style="font-size: 12px" @click="handleBold">
      <i class="ri-bold" />
    </a-button>
  </a-tooltip>
</template>

<style scoped lang="less">

.mixButton{
  border: none;
  color: #333;
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
