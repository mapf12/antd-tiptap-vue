<script setup>
import {reactive, ref} from "vue";
const {editor} = defineProps({
  editor: {
    type: Object
  }
});


const visible = ref(false);

const formState = reactive({
  text: '',
  link: '',
});
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const showModal = () => {
  visible.value = true;
};
const handleOk = e => {
  console.log("dddddddd",formState);
  editor.commands.setLink({ href: formState.link, target: '_blank' })
  visible.value = false;
};


const handleLink = () => {
 // editor.commands.setEditLinkText({text:"超链接",link:"www.baidu.com"});
  showModal();
}

</script>

<template>
  <a-tooltip placement="bottom" color = "white" overlayClassName = "tooltip-class">
    <template #title>
      <span>链接</span>
    </template>
    <a-button type="link" class="mixButton" style="font-size: 12px" @click="handleLink">
      <i class="ri-link"></i>
    </a-button>
  </a-tooltip>

  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
<!--      <a-form-item-->
<!--        label="文本"-->
<!--        name="text"-->
<!--        :rules="[{ required: true, message: '请输入内容' }]"-->
<!--      >-->
<!--        <a-input v-model:value="formState.text" />-->
<!--      </a-form-item>-->

      <a-form-item
        label="链接"
        name="link"
        :rules="[{ required: true, message: '请输入链接' }]"
      >
        <a-input v-model:value="formState.link" />
      </a-form-item>
    </a-form>
  </a-modal>
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
