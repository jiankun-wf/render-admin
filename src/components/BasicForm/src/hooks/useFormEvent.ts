import { unref } from 'vue';
import type { FormInst } from 'naive-ui';
import type { Ref } from 'vue';
import type { ValidateError } from '../types/Rule';
import { isArray, isString } from '../helper/is';

export const useFormEvent = ({
  emit,
  formRef,
  formValues,
  formModel,
  defaultValueRef,
  getFieldsValue,
}: {
  emit: Function;
  formRef: Ref<FormInst | null>;
  formValues: Record<string, any>;
  formModel: Record<string, any>;
  defaultValueRef: Record<string, any>;
  getFieldsValue: () => Record<string, any>;
}) => {
  const validate = async () => {
    const form = unref(formRef);
    return new Promise<Record<string, any>>((resolve, reject) => {
      if (!form) {
        reject({ error: 'instance error', message: 'not found form instance', body: null });
        return;
      }
      form.validate((errors) => {
        if (!errors) {
          resolve(getFieldsValue());
        } else {
          reject({ error: 'validate error', body: errors, message: 'validate not pass' });
        }
      });
    });
  };

  const validateFields = async (keys?: string | string[]) => {
    const form = unref(formRef);

    return new Promise<boolean | ValidateError>((resolve) => {
      if (!form) {
        resolve({ error: 'instance error', message: 'not found form instance', body: null });
        return;
      }
      form.validate(
        (errors) => {
          if (!errors) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        keys
          ? (rule) => {
              const { key } = rule;
              if (isString(key)) return keys === key;
              if (isArray(keys)) {
                return keys.findIndex((v) => v === key) > -1;
              }
              return true;
            }
          : undefined
      );
    });
  };

  const resetFields = async () => {
    Object.keys(formModel).forEach((key) => {
      formModel[key] = defaultValueRef.value[key];
    });
    clearValidate();
    emit('reset', formValues);
  };

  const clearValidate = async () => {
    const form = unref(formRef);
    if (!form) return;
    form?.restoreValidation();
    emit('clear-validate');
  };

  return {
    validate,
    resetFields,
    clearValidate,
    validateFields,
  };
};
