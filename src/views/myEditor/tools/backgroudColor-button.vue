<script setup>
import {computed, onMounted, ref} from "vue";
import { Pickr } from "../plugins/pickr/index.js";
import {throttle} from "lodash-es";
const {editor} = defineProps({
  editor: {
    type: Object
  }
});

// 文字颜色
const colorPickerRef1 = ref(); // picker按钮
const colorLumpRef = ref(); // 颜色块
let picker; // 颜色选择器对象

const value1 = ref('#d42a2a')
let styles = computed(()=>{
  return  "color:" + value1.value +";font-weight: 700;";
})

const COLOR_LIST = [
  "#ffffff",
  "#ffacaa",
  "#fffb00",
  "#73fa79",
  "#78acfe",
  "#d7aba9",
  "#ffda51",
  "#00d5ff",
  "#888888",
  "#7a4442",
  "#ff4c00",
  "#ffa900",
  "#3da742",
  "#000000",
];
onMounted(() => {
  // 创建颜色选择器
  picker = Pickr.create({
    el: colorPickerRef1.value,
    theme: "monolith",
    useAsButton: true,
    swatches: COLOR_LIST,
    components: {
      preview: true,
      hue: true,
      interaction: {
        input: true,
        save: true,
      },
    },
    i18n: { "btn:save": "确认" },
  });

  // 保存颜色设置
  picker.on("save", (color, instance) => {
    instance.hide();
    const hexValue = color.toHEXA().toString();
    console.log("字体颜色=============",hexValue);
    editor.commands.toggleHighlight({ color: hexValue })
    value1.value = hexValue;
    colorLumpRef.value.style.backgroundColor = hexValue;
  });
});

//回显颜色状态
const handleUpdateColorState = ({ editor }) => {
  const colorValue = editor.getAttributes("textStyle").color;
  if (colorValue) {
    picker.setColor(colorValue, true);
    colorLumpRef.value.style.backgroundColor = colorValue;
    value1.value = colorValue;
  } else {
    picker.setColor(null, true);
    colorLumpRef.value.style.backgroundColor = "transparent";
    value1.value = "#d42a2a";
  }
};
editor.on(
  "transaction",
  throttle(handleUpdateColorState, 240, { leading: false })
);
</script>

<template>
  <a-tooltip placement="bottom" color = "white" overlayClassName = "tooltip-class">
    <template #title>
      <span>填充</span>
    </template>
    <button ref="colorPickerRef1" class="picker color-picker">
      <i class="ri-paint-fill" :style="styles" ></i>
      <i ref="colorLumpRef" class="color-lump"></i>
    </button>
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
