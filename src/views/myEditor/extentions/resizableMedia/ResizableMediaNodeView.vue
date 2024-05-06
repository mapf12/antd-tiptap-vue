


<script setup lang="js">

import {computed, onMounted, ref, watch} from "vue";
import {NodeViewWrapper} from "@tiptap/vue-3";
import {resizableMediaActions} from "@/views/myEditor/extentions/resizableMedia/resizableMediaMenuUtil";


console.log("进入vue页面");

let props = defineProps({
    editor: {
      type: Object
    },
    node: {
      type: Object
    },
    decorations:{
      type: Object
    },
    selected:{
      type: Boolean
    },
    extension:{
      type: Object
    },
    getPos:{
        type:Function
    },
    updateAttributes:{
      type:Function
    },
    deleteNode:{
        type: Function
    },
    nodeViewProps:{
      type: Object
    }
})

onMounted(()=>{
  console.log("-----==顶顶顶顶=========",props.nodeViewProps);

})
const mediaType = computed(()=>{
  return props.node.attrs['media-type'];
})

const resizableImg = ref(null) // template ref

const aspectRatio = ref(0)

const proseMirrorContainerWidth = ref(0)

const mediaActionActiveState = ref();

const setMediaActionActiveStates = () => {
  const activeStates = {}

  for (const { tooltip, isActive } of resizableMediaActions) activeStates[tooltip] = !!isActive?.(props.node.attrs)

  mediaActionActiveState.value = activeStates
}

watch(
  () => props.node.attrs,
  () => setMediaActionActiveStates(),
  { deep: true }
)

const mediaSetupOnLoad = () => {
  // ! TODO: move this to extension storage
  const proseMirrorContainerDiv = document.querySelector('.ProseMirror')

  if (proseMirrorContainerDiv) proseMirrorContainerWidth.value = proseMirrorContainerDiv?.clientWidth

  // When the media has loaded
  if (!resizableImg.value) return

  if (mediaType.value === 'video') {
    // Aspect Ratio from its original size
    setTimeout(() => {
      aspectRatio.value = resizableImg.value.videoWidth / resizableImg.value.videoHeight

      // for the first time when video is added with custom width and height
      // and we have to adjust the video height according to it's width
      onHorizontalResize('left', 0)
    }, 200)
  } else {
    resizableImg.value.onload = () => {
      // Aspect Ratio from its original size
      aspectRatio.value = resizableImg.value.naturalWidth
      / resizableImg.value.naturalHeight

      onHorizontalResize('left', 0)
    }
  }

  setTimeout(() => setMediaActionActiveStates(), 200)
}

onMounted(() => mediaSetupOnLoad())

const isHorizontalResizeActive = ref(false)

const lastCursorX = ref(-1)


const limitWidthOrHeightToFiftyPixels = ({ width, height }) => width < 100 || height < 100

const startHorizontalResize = (e) => {
  isHorizontalResizeActive.value = true
  lastCursorX.value = e.clientX

  document.addEventListener('mousemove', onHorizontalMouseMove)
  document.addEventListener('mouseup', stopHorizontalResize)
}

const stopHorizontalResize = () => {
  isHorizontalResizeActive.value = false
  lastCursorX.value = -1

  document.removeEventListener('mousemove', onHorizontalMouseMove)
  document.removeEventListener('mouseup', stopHorizontalResize)
}

const onHorizontalResize = (directionOfMouseMove, diff) => {
  if (!resizableImg.value) {
    console.error('Media ref is undefined|null', { resizableImg: resizableImg.value })
    return
  }

  const currentMediaDimensions = {
    width: resizableImg.value.width,
    height: resizableImg.value.height,
  }

  const newMediaDimensions = {
    width: -1,
    height: -1,
  }

  if (directionOfMouseMove === 'left') {
    newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff)
  } else {
    newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff)
  }

  if (newMediaDimensions.width > proseMirrorContainerWidth.value) newMediaDimensions.width = proseMirrorContainerWidth.value

  newMediaDimensions.height = newMediaDimensions.width / aspectRatio.value

  if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return

  props.updateAttributes(newMediaDimensions)
}

const onHorizontalMouseMove = (e) => {
  if (!isHorizontalResizeActive.value) return

  const { clientX } = e

  const diff = lastCursorX.value - clientX

  lastCursorX.value = clientX

  if (diff === 0) return

  const directionOfMouseMove = diff > 0 ? 'left' : 'right'

  onHorizontalResize(directionOfMouseMove, Math.abs(diff))
}

const isVerticalResizeActive = ref(false)

const lastCursorY = ref(-1)

const startVerticalResize = (e) => {
  isVerticalResizeActive.value = true
  lastCursorY.value = e.clientY

  document.addEventListener('mousemove', onVerticalMouseMove)
  document.addEventListener('mouseup', stopVerticalResize)
}

const stopVerticalResize = () => {
  isVerticalResizeActive.value = false
  lastCursorY.value = -1

  document.removeEventListener('mousemove', onVerticalMouseMove)
  document.removeEventListener('mouseup', stopVerticalResize)
}

const onVerticalMouseMove = (e) => {
  if (!isVerticalResizeActive.value) return

  const { clientY } = e

  const diff = lastCursorY.value - clientY

  lastCursorY.value = clientY

  if (diff === 0) return

  const directionOfMouseMove = diff > 0 ? 'up' : 'down'

  if (!resizableImg.value) {
    console.error('Media ref is undefined|null', { resizableImg: resizableImg.value })
    return
  }

  const currentMediaDimensions = {
    width: resizableImg.value.width,
    height: resizableImg.value.height,
  }

  const newMediaDimensions = {
    width: -1,
    height: -1,
  }

  if (directionOfMouseMove === 'up') {
    newMediaDimensions.height = currentMediaDimensions.height - Math.abs(diff)
  } else {
    newMediaDimensions.height = currentMediaDimensions.height + Math.abs(diff)
  }

  newMediaDimensions.width = newMediaDimensions.height * aspectRatio.value

  if (newMediaDimensions.width > proseMirrorContainerWidth.value) {
    newMediaDimensions.width = proseMirrorContainerWidth.value

    newMediaDimensions.height = newMediaDimensions.width / aspectRatio.value
  }

  if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return

  props.updateAttributes(newMediaDimensions)
}

const isFloat = computed(()=>!!props.node.attrs.dataFloat)

const isAlign = computed(() => !!props.node.attrs.dataAlign)

let popverClass = {padding: "4px"};
</script>

<template>
  <node-view-wrapper
    as="article"
    class="media-node-view flex pos-relative not-prose"
    :class="[`${isFloat && `f-${props.node.attrs.dataFloat}` || ''}`, `${isAlign && `align-${props.node.attrs.dataAlign}` || ''}`]"
  >
    <a-popover :overlayStyle = "popverClass" >
      <div class="fit_flex">
        <img
          v-if="mediaType === 'img'"
          v-bind="props.node.attrs"
          ref="resizableImg"
          class="rounded-lg"
          :class="[`${isFloat && `float-${props.node.attrs.dataFloat}` || ''}`, `${isAlign && `align-${props.node.attrs.dataAlign}` || ''}`]"
          draggable="true"
        >

        <video
          v-else-if="mediaType === 'video'"
          v-bind="node.attrs"
          ref="resizableImg"
          class="rounded-lg"
          :class="[`${isFloat && `float-${props.node.attrs.dataFloat}` || ''}`, `${isAlign && `align-${props.node.attrs.dataAlign}` || ''}`]"
          draggable="true"
          controls="true"
        >
          <source :src="props.node.attrs.src">
        </video>

        <div
          class="horizontal-resize-handle"
          :class="{ 'horizontal-resize-active': isHorizontalResizeActive }"
          title="Resize"
          @mousedown="startHorizontalResize"
          @mouseup="stopHorizontalResize"
        />

        <div
          class="vertical-resize-handle"
          :class="{ 'vertical-resize-active': isVerticalResizeActive }"
          title="Resize"
          @mousedown="startVerticalResize"
          @mouseup="stopVerticalResize"
        />
      </div>

      <template #content>
        <section class="image-actions-container">
          <button
            v-for="(mediaAction, i) in resizableMediaActions"
            :key="i"
            :content="mediaAction.tooltip"
            class="btn btn-sm btn-ghost image-action-button"
            @click="mediaAction.tooltip === 'Delete'
              ? props.deleteNode()
              : mediaAction.action(updateAttributes)
            "
          >
<!--            <InlineSvg :src="mediaAction.icon" />-->
            <img :src="mediaAction.icon" style = "display: block;width: 1.2em;height: 1.2em;vertical-align: middle;" />
          </button>
        </section>
      </template>
    </a-popover>
  </node-view-wrapper>

</template>

<style lang="less" scoped>
.media-node-view {
  position: relative;
  display: flex;


  &.f-left {
     float: left;
  }

  &.f-right {
    float: right;
  }

  &.align-left {
    //@apply justify-start
    display: flex;
    justify-content: flex-start;

  }

  &.align-center {
    //@apply justify-center
    display: flex;
    justify-content: center;

  }

  &.align-right {
    //@apply justify-end
    display: flex;
  justify-content: flex-end;

  }
.fit_flex{
  display: flex;
  position: relative;
  width: fit-content;
}
  .horizontal-resize-handle,
  .vertical-resize-handle:hover{
     //g-blue-200 z-50 opacity-50
    --tw-bg-opacity: 1;
    background-color: rgb(191 219 254 / var(--tw-bg-opacity));
}

  .horizontal-resize-handle {
    //@apply h-full w-2 top-0 right-0 cursor-col-resize
    top: 0px;
    right: 0px;
    height: 100%;
    width: .5rem;
    cursor: col-resize;
    position: absolute;
    z-index: 50;
    opacity: .5;
  }

  .vertical-resize-handle {
    //@apply w-full h-2 bottom-0 left-0 cursor-row-resize
    bottom: 0px;
    left: 0px;
    height: .5rem;
    width: 100%;
    cursor: row-resize;
    position: absolute;
    z-index: 50;
    opacity: .5;
  }
}

.image-actions-container {
  //@apply flex gap-1
  display: flex;
  flex: 1;
  button{
    margin-left: 0px;
    background-color: transparent;
    border-color: transparent;
  }
}

.media-actions-container {
  padding: 4px !important;
  width: fit-content !important;
}
</style>





<!--<template>-->
<!--  <node-view-wrapper class="vue-component">-->
<!--    <span class="label">Vue Component</span>-->

<!--    <div class="content">-->
<!--      <button @click="increase">-->
<!--        测试111 {{ node.attrs.count }} times.-->
<!--      </button>-->
<!--    </div>-->
<!--  </node-view-wrapper>-->
<!--</template>-->

<!--<script>-->
<!--import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'-->

<!--export default {-->
<!--  components: {-->
<!--    NodeViewWrapper,-->
<!--  },-->

<!--  props: nodeViewProps,-->

<!--  methods: {-->
<!--    increase() {-->
<!--      this.updateAttributes({-->
<!--        count: this.node.attrs.count + 1,-->
<!--      })-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style lang="less">-->
<!--.vue-component {-->
<!--  background: #FAF594;-->
<!--  border: 3px solid #0D0D0D;-->
<!--  border-radius: 0.5rem;-->
<!--  margin: 1rem 0;-->
<!--  position: relative;-->
<!--}-->

<!--.label {-->
<!--  margin-left: 1rem;-->
<!--  background-color: #0D0D0D;-->
<!--  font-size: 0.6rem;-->
<!--  letter-spacing: 1px;-->
<!--  font-weight: bold;-->
<!--  text-transform: uppercase;-->
<!--  color: #fff;-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  padding: 0.25rem 0.75rem;-->
<!--  border-radius: 0 0 0.5rem 0.5rem;-->
<!--}-->

<!--.content {-->
<!--  margin-top: 1.5rem;-->
<!--  padding: 1rem;-->
<!--}-->
<!--</style>-->
