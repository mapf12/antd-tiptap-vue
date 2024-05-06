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
      <span>下划线</span>
    </template>
    <a-button
      type="link"
      class="mixButton"
      style="font-size: 12px"
      @click = "editor.commands.toggleUnderline()"
    >
      <i class="ri-underline"></i>
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
