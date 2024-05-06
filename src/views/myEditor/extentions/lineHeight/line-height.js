import { Extension } from '@tiptap/core';
import { Editor } from '@tiptap/core';
import {
  createLineHeightCommand,
  transformCSStoLineHeight,
  transformLineHeightToCSS,
} from './line-heightUtils';
//import LineHeightDropdown from '@/components/MenuCommands/LineHeightDropdown.vue';

export const LineHeightOptions  = {
  types: [],
  lineHeights: []
}

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     lineHeight: {
//       setLineHeight: (lineHeight: string) => ReturnType;
//       unsetLineHeight: () => ReturnType;
//     };
//   }
// }

const LineHeight = Extension.create({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'list_item', 'todo_item'],
      lineHeights: ['100%', '115%', '150%', '200%', '250%', '300%'],
      // button: {
      //     component: LineHeightDropdown,
      //     componentProps: {
      //       editor,
      //     },
      // },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => {
              return transformCSStoLineHeight(element.style.lineHeight) || null;
            },
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }

              const cssLineHeight = transformLineHeightToCSS(
                attributes.lineHeight
              );

              return {
                style: `line-height: ${cssLineHeight};`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight: (lineHeight) => createLineHeightCommand(lineHeight),

      unsetLineHeight:
        () =>
        ({ commands }) => {
          return this.options.types.every((type) =>
            commands.resetAttributes(type, 'lineHeight')
          );
        },
    };
  },
});

export default LineHeight;
