import { ref, unref, nextTick, onUnmounted, watch } from 'vue';
import { gerRawProps } from '../helper';

import type { FormProps, FormSchema } from '../types';
import type { FormActionType } from '../types/formAction';

export const useForm = (props?: FormProps): [any, FormActionType] => {
  const formInstance = ref<FormActionType | null>();

  const isLoaded = ref(false);

  const getForm = async () => {
    const form = unref(formInstance);

    if (!form) {
      await nextTick();
      return unref(formInstance);
    }

    return form;
  };

  const register = (formRef: FormActionType) => {
    if (unref(isLoaded) && unref(formInstance)) return;

    formInstance.value = formRef;
    isLoaded.value = true;

    watch(
      () => props,
      () => {
        props && formRef.setProps(gerRawProps(props));
      },
      {
        immediate: true,
        deep: true,
      }
    );

    onUnmounted(() => {
      formInstance.value = null;
      isLoaded.value = false;
    });
  };

  const formMethods: FormActionType = {
    setProps: async (props: Partial<FormProps>) => {
      const form = await getForm();
      form?.setProps(props);
    },
    setLoading: async (flag: boolean) => {
      const form = await getForm();
      form?.setLoading(flag);
    },

    getFieldsValue: () => {
      return unref(formInstance)?.getFieldsValue() as Record<string, any>;
    },

    setFieldsValue: async (values: Record<string, any>) => {
      const form = await getForm();
      form?.setFieldsValue(values);
    },

    addFormSchema: async (schema: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form?.addFormSchema(schema);
    },

    removeFormSchema: async (name: string | string[]) => {
      const form = await getForm();
      form?.removeFormSchema(name);
    },

    updateFormSchema: async (schema: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form?.updateFormSchema(schema);
    },

    getFormSchemas: async (name?: string | string[]) => {
      const form = await getForm();
      const schemas = await form?.getFormSchemas(name);
      return schemas as FormSchema[];
    },

    resetFormSchema: async (schemas: FormSchema[]) => {
      const form = await getForm();
      return form?.resetFormSchema(schemas);
    },

    validate: async () => {
      const form = await getForm();
      return form?.validate() as Promise<Record<string, any>>;
    },

    validateFields: async (keys?: string | string[]) => {
      const form = await getForm();
      return form?.validateFields(keys) as Promise<boolean>;
    },

    resetFields: async () => {
      const form = await getForm();
      return form?.resetFields();
    },

    clearValidate: async () => {
      const form = await getForm();
      return form?.clearValidate();
    },
  };

  return [register, formMethods];
};
