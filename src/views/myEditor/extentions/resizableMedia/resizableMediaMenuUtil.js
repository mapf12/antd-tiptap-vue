/* @unocss-include */
import { IconAlignCenter, IconAlignLeft, IconAlignRight, IconFloatLeft, IconFloatRight, IconDelete } from '../../styles/editorIcons'

export const resizableMediaActions = [
  {
    tooltip: 'Align left',
    action: (updateAttributes) => updateAttributes({
      dataAlign: 'left',
      dataFloat: null,
    }),
    icon: IconAlignLeft,
    isActive: (attrs) => attrs.dataAlign === 'left'
  },
  {
    tooltip: 'Align center',
    action: (updateAttributes) => updateAttributes({
      dataAlign: 'center',
      dataFloat: null,
    }),
    icon: IconAlignCenter,
    isActive: (attrs) => attrs.dataAlign === 'center'
  },
  {
    tooltip: 'Align right',
    action: (updateAttributes) => updateAttributes({
      dataAlign: 'right',
      dataFloat: null,
    }),
    icon: IconAlignRight,
    isActive: (attrs) => attrs.dataAlign === 'right'
  },
  {
    tooltip: 'Float left',
    action: (updateAttributes) => updateAttributes({
      dataAlign: null,
      dataFloat: 'left',
    }),
    icon: IconFloatLeft,
    isActive: (attrs) => attrs.dataFloat === 'left'
  },
  {
    tooltip: 'Float right',
    action: (updateAttributes) => updateAttributes({
      dataAlign: null,
      dataFloat: 'right',
    }),
    icon: IconFloatRight,
    isActive: (attrs) => attrs.dataFloat === 'right'
  },
  {
    tooltip: 'Delete',
    icon: IconDelete,
    delete: (deleteNode) => deleteNode()
  }
]
