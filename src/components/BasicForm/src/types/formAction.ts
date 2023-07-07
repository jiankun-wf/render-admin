import { FormProps, FormSchema } from '.';

export interface FormActionType {
  // 设置表单属性有关
  setProps: (formProps: Partial<FormProps>) => void;
  // 表单值有关
  setFieldsValue?: <T extends object>(values: T) => void;
  getFieldsValue?: () => Recordable;

  // 表单项有关
  addFormSchema: (schema: FormSchema | FormSchema[]) => void;
  removeFormSchema: (field: string | string[]) => void;
  updateFormSchema: (schema: FormSchema | FormSchema[]) => void;
  getFormSchemas: (name: string | string[]) => FormSchema[] | null;

  // 表单验证有关
  resetFields?: () => Promise<void>;
  validate?: (nameList?: any[]) => Promise<any>;
  clearValidate?: (name?: string | string[]) => Promise<void>;

  // 其他项
  setLoading: (flag: boolean) => void;
}
