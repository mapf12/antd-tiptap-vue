<template>
  <div class="tools_bar">

    <go-back-button :editor="editor"></go-back-button>
    <images-button :editor="editor"></images-button>
    <italic-button :editor="editor"></italic-button>
    <bold-button :editor="editor"></bold-button>
    <paintformat-button :editor="editor"></paintformat-button>
    <strikethrough-button :editor="editor"></strikethrough-button>
    <clear-format-button :editor="editor"></clear-format-button>
    <underline-button :editor="editor"></underline-button>
    <link-button :editor="editor"></link-button>
    <backgroud-color-button :editor="editor"></backgroud-color-button>
    <font-color-button :editor="editor"></font-color-button>
    <titles-button :editor="editor"></titles-button>
    <font-size-button :editor="editor"></font-size-button>
    <font-family-button :editor="editor"></font-family-button>
    <line-height-button :editor="editor" />
    <text-align-button :editor="editor"></text-align-button>
    <task-list-dropdown :editor="editor"></task-list-dropdown>
  </div>
</template>


<script setup>
import BoldButton from "@/views/myEditor/tools/bold-button.vue";
import LineHeightButton from "@/views/myEditor/tools/lineHeight-button.vue";
import TextAlignButton from "@/views/myEditor/tools/textAlign-button.vue";
import FontSizeButton from "@/views/myEditor/tools/fontSize-button.vue";
import TitlesButton from "@/views/myEditor/tools/titles-button.vue";
import TaskListDropdown from "@/views/myEditor/tools/taskList-dropdown.vue";
import ClearFormatButton from "@/views/myEditor/tools/clearFormat-button.vue";
import PaintformatButton from "@/views/myEditor/tools/paintformat-button.vue";
import UnderlineButton from "@/views/myEditor/tools/underline-button.vue";
import StrikethroughButton from "@/views/myEditor/tools/strikethrough-button.vue";
import LinkButton from "@/views/myEditor/tools/link-button.vue";
import FontFamilyButton from "@/views/myEditor/tools/fontFamily-button.vue";
import GoBackButton from "@/views/myEditor/tools/goBack-button.vue";
import BackgroudColorButton from "@/views/myEditor/tools/backgroudColor-button.vue";
import FontColorButton from "@/views/myEditor/tools/FontColor-button.vue";
import ImagesButton from "@/views/myEditor/tools/images-button.vue";
import ItalicButton from "@/views/myEditor/tools/italic-button.vue";



const props =  defineProps({
  editor:{
    type:Object
  }
})
</script>

<style lang="less" scoped>
.tools_bar{

}
</style>

<style lang="less">
.editor_select{
  font-size: 12px !important;

  .ant-select-item-option-content{
    font-size: 12px !important;
  }
}


.editor-dropdown{
  .ant-dropdown-menu-title-content{
    font-size: 12px !important;
  }
}

.color-picker{
  border: none;
  outline: none;
  background-color: transparent;
}
.color-picker:hover{
  cursor: pointer;
}

/* 颜色选择器 */
:deep(.picker) {
  position: relative;
  .color-lump {
    position: absolute;
    display: inline-block;
    height: 2px;
    width: 18px;
    left: 3px;
    bottom: 2px;
    border-radius: 1px;
  }
}
</style>
