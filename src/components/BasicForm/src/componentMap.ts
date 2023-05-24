import { type ComponentType } from './types/componentType';
import { type Component } from 'vue';
import {
  NInput,
  NSelect,
  NRate,
  NInputNumber,
  NDatePicker,
  NRadio,
  NRadioGroup,
  NCheckbox,
  NCheckboxGroup,
  NSlider,
  NSwitch,
  NTreeSelect,
  NTimePicker,
  NMention,
  NColorPicker,
  NCascader,
  NAutoComplete,
  NDynamicTags,
  NDivider,
  NDynamicInput,
} from 'naive-ui';
import { TextArea } from './components/TextArea';

const ComponentMap = new Map<ComponentType, Component>();

ComponentMap.set('Input', NInput);
ComponentMap.set('Select', NSelect);
ComponentMap.set('Rate', NRate);
ComponentMap.set('TextArea', TextArea);
ComponentMap.set('InputNumber', NInputNumber);
ComponentMap.set('DatePicker', NDatePicker);
ComponentMap.set('Radio', NRadio);
ComponentMap.set('RadioGroup', NRadioGroup);
ComponentMap.set('RadioButtonGroup', NRadioGroup);
ComponentMap.set('CheckBox', NCheckbox);
ComponentMap.set('CheckBoxGroup', NCheckboxGroup);
ComponentMap.set('Slider', NSlider);
ComponentMap.set('Switch', NSwitch);
ComponentMap.set('TreeSelect', NTreeSelect);
ComponentMap.set('Transfer', NDatePicker);
ComponentMap.set('TimePicker', NTimePicker);
ComponentMap.set('Mention', NMention);
ComponentMap.set('ColorPicker', NColorPicker);
ComponentMap.set('Cascader', NCascader);
ComponentMap.set('AutoComplete', NAutoComplete);
ComponentMap.set('DynamicTags', NDynamicTags);
ComponentMap.set('DynamicInput', NDynamicInput);
ComponentMap.set('Divider', NDivider);

export { ComponentMap };
