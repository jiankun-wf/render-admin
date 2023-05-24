import { defineComponent, Fragment } from 'vue';
import { NFormItem, NTooltip } from 'naive-ui';
import { ComponentMap } from '../componentMap';
import { FormSchema, SetFormValue } from '../types';
import { Component } from '@/router/types';
import { ExclamationPointer } from './exclamation-pointer';

export const FormItem = defineComponent({
  name: 'NaiveFormItem',
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: true,
    },

    setFormModel: {
      type: Function as PropType<SetFormValue>,
      required: true,
    },

    formModel: {
      type: Object as PropType<Recordable>,
      required: true,
    },
  },
  setup(props, { slots: _slots }) {
    const handleUpdateForm = (val: any) => {
      const {
        setFormModel,
        schema: { field },
      } = props;
      setFormModel(field, val);
    };

    const renderComponent = () => {
      const {
        schema: { component, componentProps, field },
        formModel,
      } = props;
      const Component = ComponentMap.get(component) as Component;
      return (
        <Component {...componentProps} value={formModel[field]} onUpdate:value={handleUpdateForm} />
      );
    };

    const renderLabel = () => {
      const {
        label,
        helpMessage,
        helpMessageToolTipProps,
        helpMessageIcon: _Icon,
        helpMessageIconProps: _IconProps,
      } = props.schema;
      if (!label) return undefined;

      const labelBuild = () => {
        if (typeof label === 'function') {
          return label();
        }
        return label;
      };

      const build = () => {
        const label = labelBuild();

        if (!label) return undefined;
        if (!helpMessage) {
          return labelBuild();
        }
        return (
          <>
            {labelBuild()}
            <NTooltip {...helpMessageToolTipProps}>
              {{
                trigger: () =>  <ExclamationPointer />,
                default: () => helpMessage,
              }}
            </NTooltip>
          </>
        );
      };

      return build();
    };

    const renderContent = () => {
      const { field } = props.schema;

      return (
        <NFormItem {...props.schema} label={''} path={field}>
          {{
            label: () => renderLabel(),
            default: () => renderComponent(),
          }}
        </NFormItem>
      );
    };

    return () => <Fragment>{renderContent()}</Fragment>;
  },
});
