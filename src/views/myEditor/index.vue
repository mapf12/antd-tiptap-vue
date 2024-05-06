<!--
1.
npm install remixicon --save
import 'remixicon/fonts/remixicon.css'
使用
<i class="ri-admin-line"></i>
2.
npm install @simonwep/pickr



-->

<template>
  <div class="continer" v-if="editor">
    <a-row class="header">
      <tools-bar :editor="editor" ></tools-bar>
    </a-row>
    <a-row class="content">
      <a-col :span="6">目录
      </a-col>
      <a-col :span="12">
        <div class="editor_content">
          <div ref="editorContent" class="editor-container" id = "editorContainer1">
            <editor-content :editor="editor" />
            <div class="footer"></div>
          </div>
        </div>
      </a-col>
      <a-col :span="6">模板</a-col>
    </a-row>
  </div>
</template>

<script setup>
import '@/views/myEditor/styles/tiptap-appmsg.css'
import {EditorContent, useEditor} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import ToolsBar from "@/views/myEditor/toolsBar.vue";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {Highlight} from "@tiptap/extension-highlight";
import {Link} from "@tiptap/extension-link";
import {Underline} from "@tiptap/extension-underline";
import BulletList from "tiptap-extension-bullet-list/src/bulletList";
import OrderedList from "tiptap-extension-ordered-list/src/orderedList";
import {FontFamily} from "@tiptap/extension-font-family";
import {FontSize} from "tiptap-extension-font-size";
import {Placeholder} from "@tiptap/extension-placeholder";
import {TextAlign} from "@tiptap/extension-text-align";
import {FloatingMenu} from "@tiptap/extension-floating-menu";
import LineHeight from "@/views/myEditor/extentions/lineHeight/line-height";
import {Video} from "@/views/myEditor/extentions/vedio/vedio";
import {BubbleMenu} from "@tiptap/extension-bubble-menu";
import {ResizableMedia} from "@/views/myEditor/extentions/resizableMedia/resizableMedia";
import {Editor} from "@tiptap/core";



const onUpdate = ({editor})=> {
  let output;
  // if (props.output === 'html') {
  //   output = editor.getHTML();
  // } else {
  //   output = editor.getJSON();
  // }
  output = editor.getHTML();
  console.log("内容更新",output);
  // emit('update:content', output);
  //
  // emit('onUpdate', output, editor);
};

//const editor = new Editor({
const editor = useEditor({
  content: "",
  extensions: [
    StarterKit.configure({
      bulletList: false,
      orderedList: false,
      codeBlock: false,
    }),
    ResizableMedia,
    TextStyle,
    Color.configure({
      types: ["textStyle"],
    }),
    Highlight.configure({
      multicolor: true,
      HTMLAttributes: {
        class: 'custom-class',
      }
    }),
    //Link.configure({openOnClick: false, HTMLAttributes: {rel: ""}}),
    LineHeight,
    Link,
    Image,
    Video,

    Underline,
    BubbleMenu,
    BulletList.configure({ HTMLAttributes: { class: "list-paddingleft-1" } }),
    OrderedList.configure({
      HTMLAttributes: { class: "list-paddingleft-1" },
    }),
    FloatingMenu.configure({
      pluginKey: 'bubbleMenuOne',
      element: document.querySelector('.menu-one'),
    }),
    FloatingMenu.configure({
      pluginKey: 'bubbleMenuTwo',
      element: document.querySelector('.menu-two'),
    }),
    FontFamily,
    FontSize,
    Placeholder.configure({
      // Use a placeholder:
      placeholder: '请输入正文或者/空格插入内容',
      // Use different placeholders depending on the node type:
      // placeholder: ({ node }) => {
      //   if (node.type.name === 'heading') {
      //     return 'What’s the title?'
      //   }


      //   return 'Can you add some further context?'
      // },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),

  ],
  autofocus: false,
  editable: true,
  onUpdate,
});

//provide('myeditor', editor);



</script>


<style scoped lang="less">
.continer {
  margin: 0;
  height: 100vh;
  background-color: #f3f5f7;

  .header {
    background-color: #ffffff;
    padding: 0px 24px;
    height: 44px;
    line-height: 44px;
    color: #000000E0;
    font-size: 12px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }

  .content {
    height: 91%;

    .editor_content {
      background-color: #ffffff;
      height: 100%;
      box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 10px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px;
    }
  }
}
</style>
