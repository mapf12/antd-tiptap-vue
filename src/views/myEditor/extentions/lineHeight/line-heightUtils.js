import {
  TextSelection,
  AllSelection,
  EditorState,
  Transaction,
} from '@tiptap/pm/state';
import { Node, NodeType } from '@tiptap/pm/model';

export const LINE_HEIGHT_100 = 1;
export const DEFAULT_LINE_HEIGHT = '150%';

export const ALLOWED_NODE_TYPES = [
  'paragraph',
  'heading',
  'list_item',
  'todo_item',
];

const NUMBER_VALUE_PATTERN = /^\d+(.\d+)?$/;

export function isLineHeightActive(
  state,
  lineHeight
) {
  const { selection, doc } = state;
  const { from, to } = selection;

  let keepLooking = true;
  let active = false;

  doc.nodesBetween(from, to, (node) => {
    const nodeType = node.type;
    const lineHeightValue = node.attrs.lineHeight || DEFAULT_LINE_HEIGHT;

    if (ALLOWED_NODE_TYPES.includes(nodeType.name)) {
      if (keepLooking && lineHeight === lineHeightValue) {
        keepLooking = false;
        active = true;

        return false;
      }
      return nodeType.name !== 'list_item' && nodeType.name !== 'todo_item';
    }
    return keepLooking;
  });

  return active;
}

export function transformLineHeightToCSS(value) {
  if (!value) return '';

  let strValue = String(value);

  if (NUMBER_VALUE_PATTERN.test(strValue)) {
    const numValue = parseFloat(strValue);
    strValue = String(Math.round(numValue * 100)) + '%';
  }

  return parseFloat(strValue) * LINE_HEIGHT_100 + '%';
}

export function transformCSStoLineHeight(value) {
  if (!value) return '';
  if (value === DEFAULT_LINE_HEIGHT) return '';

  let strValue = value;

  if (NUMBER_VALUE_PATTERN.test(value)) {
    const numValue = parseFloat(value);
    strValue = String(Math.round(numValue * 100)) + '%';
    if (strValue === DEFAULT_LINE_HEIGHT) return '';
  }

  return parseFloat(strValue) / LINE_HEIGHT_100 + '%';
}

const SetLineHeightTask  = {
  node : null,
  nodeType: null,
  pos: 0
}

export function setTextLineHeight(
  tr,
  lineHeight
) {
  const { selection, doc } = tr;

  if (!selection || !doc) return tr;

  if (
    !(selection instanceof TextSelection || selection instanceof AllSelection)
  ) {
    return tr;
  }

  const { from, to } = selection;

  const tasks = [];
  const lineHeightValue =
    lineHeight && lineHeight !== DEFAULT_LINE_HEIGHT ? lineHeight : null;

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type;
    if (ALLOWED_NODE_TYPES.includes(nodeType.name)) {
      const lineHeight = node.attrs.lineHeight || null;
      if (lineHeight !== lineHeightValue) {
        tasks.push({
          node,
          pos,
          nodeType,
        });
      }
      return nodeType.name !== 'list_item' && nodeType.name !== 'todo_item';
    }
    return true;
  });

  if (!tasks.length) return tr;

  tasks.forEach((task) => {
    const { node, pos, nodeType } = task;
    let { attrs } = node;

    attrs = {
      ...attrs,
      lineHeight: lineHeightValue,
    };

    tr = tr.setNodeMarkup(pos, nodeType, attrs, node.marks);
  });

  return tr;
}

export function createLineHeightCommand(lineHeight) {
  return ({ state, dispatch }) => {
    const { selection } = state;
    let { tr } = state;
    tr = tr.setSelection(selection);

    tr = setTextLineHeight(tr, lineHeight);

    if (tr.docChanged) {
      dispatch && dispatch(tr);
      return true;
    }

    return false;
  };
}
