import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import ResizableMediaNodeView from './ResizableMediaNodeView.vue'

export const IMAGE_INPUT_REGEX = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const VIDEO_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export const ResizableMedia = Node.create({
  name: 'resizableMedia',

  addOptions () {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    }
  },

  inline: false,

  group: 'block',

  draggable: true,

  addAttributes () {
    return {
      src: {
        default: null,
      },
      'media-type': {
        default: null
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: '100%',
      },
      height: {
        default: 'auto'
      },
      dataAlign: {
        default: 'left' // 'left' | 'center' | 'right'
      },
      dataFloat: {
        default: null // 'left' | 'right'
      },
    }
  },

  selectable: true,

  parseHTML () {
    return [
      {
        tag: 'img[src]:not([src^="data:"])',
        getAttrs: el => ({
          src: (el).getAttribute('src'),
          'media-type': 'img'
        })
      },
      {
        tag: 'video',
        getAttrs: el => ({
          src: (el).getAttribute('src'),
          'media-type': 'video'
        }),
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    const { 'media-type': mediaType } = HTMLAttributes

    if (mediaType === 'img') {
      return [ 'img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes) ]
    } else if (mediaType === 'video') {
      return [
        'video',
        { controls: 'true', style: 'width: 100%', ...HTMLAttributes },
        [ 'source', HTMLAttributes ]
      ]
    }

    if (!mediaType) console.error('TiptapMediaExtension-renderHTML method: Media Type not set, going default with image')

    return [ 'img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes) ]
  },

  addCommands () {
    return {
      setMedia: options => ({ commands }) => {
        const { 'media-type': mediaType } = options

        if (mediaType === 'img') {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        } else if (mediaType === 'video') {
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...options,
              controls: 'true'
            },
          })
        }

        if (!mediaType) console.error('TiptapMediaExtension-setMedia: Media Type not set, going default with image')

        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },

  addNodeView () {
    console.log("进入vue页面====================",ResizableMediaNodeView);

    return VueNodeViewRenderer(ResizableMediaNodeView)
  },

  addInputRules () {
    return [
      nodeInputRule({
        find: IMAGE_INPUT_REGEX,
        type: this.type,
        getAttributes: match => {
          const [ , , alt, src, title ] = match

          return {
            src,
            alt,
            title,
            'media-type': 'img'
          }
        },
      }),
      nodeInputRule({
        find: VIDEO_INPUT_REGEX,
        type: this.type,
        getAttributes: (match) => {
          const [ ,, src ] = match

          return {
            src,
            'media-type': 'video'
          }
        },
      })
    ]
  },
 })





// import { mergeAttributes, Node } from '@tiptap/core'
// import { VueNodeViewRenderer } from '@tiptap/vue-3'
//
// import ResizableMediaNodeView from './ResizableMediaNodeView.vue'
//
//
// export const ResizableMedia = Node.create({
//   name: 'resizableMedia',
//
//   group: 'block',
//
//   atom: true,
//
//   addAttributes() {
//     return {
//       count: {
//         default: 0,
//       },
//     }
//   },
//
//   // parseHTML() {
//   //   return [
//   //     {
//   //       tag: 'vue-component',
//   //     },
//   //   ]
//   // },
//   //
//   // renderHTML({ HTMLAttributes }) {
//   //   return ['vue-component', mergeAttributes(HTMLAttributes)]
//   // },
//
//     parseHTML () {
//     return [
//       {
//         tag: 'img[src]:not([src^="data:"])',
//         getAttrs: el => ({
//           src: (el).getAttribute('src'),
//           'media-type': 'img'
//         })
//       },
//       {
//         tag: 'video',
//         getAttrs: el => ({
//           src: (el).getAttribute('src'),
//           'media-type': 'video'
//         }),
//       },
//     ]
//   },
//
//   renderHTML ({ HTMLAttributes }) {
//     const { 'media-type': mediaType } = HTMLAttributes
//
//     if (mediaType === 'img') {
//       return [ 'img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes) ]
//     } else if (mediaType === 'video') {
//       return [
//         'video',
//         { controls: 'true', style: 'width: 100%', ...HTMLAttributes },
//         [ 'source', HTMLAttributes ]
//       ]
//     }
//
//     if (!mediaType) console.error('TiptapMediaExtension-renderHTML method: Media Type not set, going default with image')
//
//     return [ 'img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes) ]
//   },
//     addCommands () {
//     return {
//       setMedia: options => ({ commands }) => {
//         const { 'media-type': mediaType } = options
//
//         if (mediaType === 'img') {
//           return commands.insertContent({
//             type: this.name,
//             attrs: options,
//           })
//         } else if (mediaType === 'video') {
//           return commands.insertContent({
//             type: this.name,
//             attrs: {
//               ...options,
//               controls: 'true'
//             },
//           })
//         }
//
//         if (!mediaType) console.error('TiptapMediaExtension-setMedia: Media Type not set, going default with image')
//
//         return commands.insertContent({
//           type: this.name,
//           attrs: options,
//         })
//       },
//     }
//   },
//
//   addNodeView() {
//     console.log("ddd===============");
//     return VueNodeViewRenderer(ResizableMediaNodeView)
//   },
// })
