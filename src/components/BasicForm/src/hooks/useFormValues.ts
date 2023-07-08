import { ComputedRef } from 'vue';
import { readonly } from 'vue';
import { FormProps, FormSchema } from '../types';
import { unref } from 'vue';
import { getShow } from '../helper/render';
import { filterValueComponents } from '../helper';
import { watch } from 'vue';

export const useFormValues = ({
  formModel,
  getFormSchema: getSchema,
  props,
}: {
  formModel: Record<string, any>;
  getFormSchema: ComputedRef<FormSchema[]>;
  props: FormProps;
}) => {
  const setFieldValue = (key: string, value: any) => {
    formModel[key] = value;
    return { key, value, values: readonly(formModel) };
  };

  const setFieldsValue = (values: Record<string, any>) => {
    for (const key in values) {
      if (Reflect.has(values, key)) {
        setFieldValue(key, values[key]);
      }
    }
  };

  const resetFiledsValue = (values: Record<string, any>) => {
    for (const key in formModel) {
      Reflect.has(formModel, key) && Reflect.deleteProperty(formModel, key);
    }
    Object.assign(formModel, values);
  };

  const getFieldsValue = () => {
    const values: Record<string, any> = {};
    unref(getSchema).forEach((schema) => {
      const { field, component } = schema;
      const { getIfShow } = getShow(schema, formModel);
      if (!getIfShow) {
        return;
      }
      if (filterValueComponents.includes(component)) {
        return;
      }
      values[field] = formModel[field];
    });
    return values;
  };

  watch(
    () => props.model,
    (val) => {
      resetFiledsValue(val ?? {});
    }
  );

  return {
    setFieldValue,
    setFieldsValue,
    getFieldsValue,
    resetFiledsValue,
  };
};
