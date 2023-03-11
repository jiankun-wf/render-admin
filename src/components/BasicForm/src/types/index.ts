import type { FormItemRule, GridItemProps, ButtonProps, GridProps } from 'naive-ui';
import type { ComponentType } from './componentType';
import type { FormSize, LabelAlign, LabelPlacement, RequiredMarkPlacement } from './Rule';
import { CSSProperties, VNode } from 'vue';
import { FormActionType } from './formAction';

export interface FormProps {
  // 表单收集
  model?: Recordable;
  //   表单标签整体长度
  // 是否展示标签
  showLabel?: boolean;
  labelWidth?: number | string;
  labelAlign?: LabelAlign;
  labelPlacement?: LabelPlacement;
  //   表单子项
  schemas?: FormSchema[];
  //
  inline?: boolean;
  layout?: string;
  //   表单以及内部组件大小
  size: FormSize;
  //   是否展示功能Button组
  showActionButtonGroup?: boolean;
  // 是否展示重置按钮
  showResetButton?: boolean;
  //   重置按钮Props
  resetButtonOptions?: Partial<ButtonProps>;
  //   是否展示提交按钮
  showSubmitButton?: boolean;
  // 提交按钮props
  submitButtonOptions?: Partial<ButtonProps>;
  // 展示收起展开按钮
  showAdvancedButton?: boolean;
  // 提交按钮text
  submitButtonText?: string;
  // 重置按钮text
  resetButtonText?: string;
  //   行布局规则
  gridProps?: GridProps;
  //   行布局样式
  baseGridStyle?: CSSProperties;

  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  submitOnReset?: boolean;
  collapsedRows?: number;
  // 是否显示必填
  showRequireMark?: boolean;
  // 必填显示位置
  requireMarkPlacement?: RequiredMarkPlacement;
  // 是否展示校验反馈
  showFeedback?: boolean;
  validateMessages?: any;
}

export interface FormSchema<DefaultValue = unknown> {
  // 表单 将值收集到外层表单 model 对象的路径
  field: string;
  // 标签
  label?: string | VNode;
  // 是否展示标签
  showLabel: boolean;
  labelWidth?: number | string;
  labelAlign?: LabelAlign;
  labelPlacement: LabelPlacement;
  // 标签提示信息
  helpMessage?: string;
  //   标签提示信息样式
  helpMessageStyle?: CSSProperties;
  //   默认值
  defaultValue?: DefaultValue;
  //   component类型
  component?: ComponentType;
  //   组件属性
  componentProps?: Recordable | SchemaFunctionalProp<Recordable>;
  //   自定义组件插槽
  slot?: string;
  //   表单项规则
  rules?: FormItemRule | FormItemRule[];
  //   布局属性
  colProps?: GridItemProps;
  // validate
  size?: FormSize;
  // 是否展示（v-show）
  show?: boolean | SchemaFunctionalProp<boolean>;
  // 是否渲染（v-if）
  ifShow?: boolean | SchemaFunctionalProp<boolean>;
}

export type SchemaFunctionParams = {
  model: Recordable;
  field: string;
  values: Recordable;
  Action?: FormActionType;
};
export type SchemaFunctionalProp<T> = (CallBackParams: SchemaFunctionParams) => T;
