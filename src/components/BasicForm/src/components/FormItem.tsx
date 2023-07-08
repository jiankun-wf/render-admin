import { defineComponent, Fragment, readonly, renderSlot } from 'vue';
import { NFormItem, NTooltip } from 'naive-ui';
import { ComponentMap } from '../componentMap';
import { ExclamationPointer } from './exclamation-pointer';

import type { Component } from '@/router/types';
import type { FormSchema, SetFormValue } from '../types';
import type { FormActionType } from '../types/formAction';

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
    formActionType: {
      type: Object as PropType<FormActionType>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const handleUpdateForm = (val: any) => {
      const {
        setFormModel,
        schema: { field },
      } = props;
      setFormModel(field, val);
    };

    const getComponentProps = () => {
      const {
        schema: { componentProps, field },
        formModel,
        formActionType,
      } = props;
      if (typeof componentProps === 'function') {
        return componentProps({
          model: formModel,
          values: readonly(formModel),
          field,
          action: formActionType,
          schema: props.schema,
        });
      }
      return componentProps;
    };

    const renderComponent = () => {
      const {
        schema: { component, field, slot },
        formModel,
        formActionType,
      } = props;
      const Component = ComponentMap.get(component) as Component;

      const componentProps = getComponentProps();

      if (slot && slots[slot]) {
        return renderSlot(slots, slot, {
          model: formModel,
          values: readonly(formModel),
          field,
          action: formActionType,
          schema: props.schema,
        });
      }

      return (
        <Component value={formModel[field]} onUpdate:value={handleUpdateForm} {...componentProps} />
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
          return label;
        }
        return (
          <>
            {label}
            <NTooltip {...helpMessageToolTipProps}>
              {{
                trigger: () => <ExclamationPointer />,
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
        <NFormItem {...props.schema} label="" path={field}>
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
