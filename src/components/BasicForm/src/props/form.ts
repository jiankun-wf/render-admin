import type { ButtonProps, GridItemProps, GridProps } from 'naive-ui';
import type { FormSchema } from '../types';
import type { PropType, CSSProperties } from 'vue';
import type { FormSize, LabelPlacement, RequiredMarkPlacement } from '../types/Rule';

export const BasicFormPorps = {
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 'auto',
  },
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  //布局方式
  layout: {
    type: String,
    default: 'inline',
  },
  //是否展示为行内表单
  inline: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  //大小
  size: {
    type: String as PropType<FormSize>,
    default: 'medium',
  },
  //标签位置
  labelPlacement: {
    type: String as PropType<LabelPlacement>,
    default: 'left',
  },
  //是否显示操作按钮（查询/重置）
  showActionButtonGroup: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  // 显示重置按钮
  showResetButton: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  //重置按钮配置
  resetButtonOptions: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: { type: 'default' },
  },
  // 显示确认按钮
  showSubmitButton: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  // 确认按钮配置
  submitButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: { type: 'primary' },
  },
  //展开收起按钮
  showAdvancedButton: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  // 确认按钮文字
  submitButtonText: {
    type: String,
    default: '查询',
  },
  //重置按钮文字
  resetButtonText: {
    type: String,
    default: '重置',
  },
  //grid 配置
  gridProps: {
    type: Object as PropType<GridProps>,
    default: () => ({ cols: 24, collapsed: false, xGap: 12, yGap: 12 }),
  },
  //gi配置
  giProps: {
    type: Object as PropType<GridItemProps>,
    default: () => ({ span: 24 }),
  },
  //grid 样式
  baseGridStyle: {
    type: Object as PropType<CSSProperties>,
    required: false,
  },
  //是否折叠
  collapsed: {
    type: Boolean,
    default: false,
  },
  //默认展示的行数
  collapsedRows: {
    type: Number,
    default: 1,
  },

  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  requireMarkPlacement: {
    type: String as PropType<RequiredMarkPlacement>,
    default: 'left',
  },
};
