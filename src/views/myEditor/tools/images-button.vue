<script setup>
import {ref} from "vue";
import {message, Upload} from "ant-design-vue";
const {editor} = defineProps({
  editor: {
    type: Object
  }
});

const fileList = ref([]);

const spinning = ref(false);

const handleRemove = file => {
  const index = fileList.value.indexOf(file)
  const newFileList = fileList.value.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
}
const beforeUpload = file => {
  debugger;
  console.log("上传图片==========",file)
  spinning.value = true;
  let fileType = file.name.slice(file.name.lastIndexOf(".") + 1)
  if (["png", "jpg", "gif"].indexOf(fileType) == -1) {
    message.error(`${file.name} 文件类型有误, 请重新上传图片`)
    return true
  } else {
    // fileList.value = [...fileList.value, file];
    setTimeout(() => {
      handleUpload();
    }, 100)
    return false
  }
}

//上传按钮点击事件
const handleUpload = async () => {
  // importMindData({
  //   files: fileList.value,
  //   value: '123'
  // }).then((res) => {
  //   if (res.STATUS === '0000' && res.RSP.RSP_CODE === '1') {
  //     spinning.value = false;
  //     const xmindJson = JSON.parse(res.RSP.VALID_DESC);
  //     localStorage.setItem('mind', res.RSP.VALID_DESC);
  //     console.log('xmindJson==========', xmindJson);
  //   }
  //});
  const url = window.prompt('URL')
  if (url) {
    //editor.chain().focus().setImage({ width: 300,height:400,display: 'right' ,src: url }).run()

    editor.commands.setMedia({
      src: 'https://img2.baidu.com/it/u=3369130612,2858330241&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
      'media-type': 'img',

      alt: 'Something else',
      title: '美景',
      width: '200',
      height: '300',
    })
    //editor.commands.updateAttributes('image', { width: 300,height:400,display: 'right' ,src:url })
  }
};
</script>

<template>
<div style="width: 24px;display: inline-block">
  <a-tooltip placement="bottom" color = "white" overlayClassName = "tooltip-class">
    <template #title>
      <span>上传图片</span>
    </template>
    <a-upload
      :before-upload="beforeUpload"
      :maxCount="1"
      v-model:file-list="fileList"
      @remove="handleRemove"
      :showUploadList = "false"
    >
      <a-button class="mixButton">
        <i class="ri-image-line"></i>
      </a-button>
    </a-upload>
  </a-tooltip>
</div>
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
