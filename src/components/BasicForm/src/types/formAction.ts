import { FormProps } from '.';

export interface FormActionType {
  submit?: () => Promise<any>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  setFieldsValue?: <T = Recordable>(values: T) => Promise<void>;
  clearValidate?: (name?: string | string[]) => Promise<void>;
  getFieldsValue?: () => Recordable;
  resetFields?: () => Promise<void>;
  validate?: (nameList?: any[]) => Promise<any>;
  updateSchema?: () => Promise<void>;
}
