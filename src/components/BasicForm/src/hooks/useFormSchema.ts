import { unref } from 'vue';
import { FormProps, FormSchema } from '../types';
import { Ref, ComputedRef } from 'vue';
import { watch } from 'vue';
import { deepMerge } from '../helper';
import { isArray, isObject, isString } from '../helper/is';

export const useFormSchema = ({
  schemaRef,
  formProps,
  emit,
  defaultValue,
  initDefault,
  formModel,
  getSchema,
  isInitDefaultValue,
}: {
  schemaRef: Ref<FormSchema[] | null>;
  formProps: Ref<FormProps>;
  emit: any;
  defaultValue: Ref<Record<string, any>>;
  initDefault: () => void;
  formModel: Record<string, any>;
  getSchema: ComputedRef<FormSchema[]>;
  isInitDefaultValue: Ref<boolean>;
}) => {
  // 追加formschema
  const addFormSchema = (schema: FormSchema | FormSchema[]) => {
    const schemas = unref(schemaRef) ?? (unref(formProps).schemas as FormSchema[]);
    const defaultValueN: Record<string, any> = {};
    if (isArray(schema)) {
      schemaRef.value = schemas.concat(schema);
      schema.forEach((v) => {
        formModel[v.field] = v.defaultValue ?? undefined;
        defaultValueN[v.field] = v.defaultValue ?? undefined;
      });
    } else {
      schemaRef.value = [...schemas, schema];
      formModel[schema.field] = schema.defaultValue ?? undefined;
      defaultValueN[schema.field] = schema.defaultValue ?? undefined;
    }
    defaultValue.value = { ...unref(defaultValue), defaultValueN };
    emit('schema-change');
  };
  //   更新某个或者某些formshcema
  const updateFormSchema = (schema: FormSchema | FormSchema[]) => {
    let updateData: Partial<FormSchema>[] = [];
    if (isObject(schema)) {
      updateData.push(schema as FormSchema);
    }
    if (Array.isArray(schema)) {
      updateData = [...schema];
    }

    const schemas: FormSchema[] = [];
    updateData.forEach((item) => {
      unref(getSchema).forEach((val) => {
        if (val.field === item.field) {
          const newSchema = deepMerge(val, item);
          schemas.push(newSchema as FormSchema);
        } else {
          schemas.push(val);
        }
      });
    });
    schemaRef.value = schemas;
    emit('schema-change');
  };
  //   重置formschema
  const resetFormSchema = (schemas: FormSchema[]) => {
    schemaRef.value = schemas;
    initDefault();
  };
  //   移除指定formschema
  const removeFormSchema = (field: string | string[]) => {
    if (!field) return;
    const schemas = unref(schemaRef) ?? (unref(formProps).schemas as FormSchema[]);

    if (isArray(field)) {
      schemaRef.value = schemas.filter((v) => {
        const isYou = field.findIndex((s) => s === v.field) > -1;
        if (isYou) {
          Reflect.deleteProperty(formModel, v.field);
          Reflect.deleteProperty(defaultValue.value, v.field);
        }
        return !isYou;
      });
    } else {
      schemaRef.value = schemas.filter((v) => v.field !== field);
      Reflect.deleteProperty(formModel, field);
      Reflect.deleteProperty(defaultValue.value, field);
    }
    emit('schema-change');
  };
  // 获取shcemas
  const getFormSchemas = (field?: string | string[]) => {
    const schemas = unref(schemaRef) ?? (unref(formProps).schemas as FormSchema[]);
    if (!field) return schemas;
    if (isString(field)) {
      return schemas.filter((v) => v.field === field);
    }
    return schemas.filter((v) => schemas.findIndex((s) => s.field === v.field) > -1);
  };

  watch(
    () => unref(formProps).schemas,
    (val) => {
      resetFormSchema(val ?? []);
    }
  );

  watch(getSchema, (schemas) => {
    if (unref(isInitDefaultValue)) {
      return;
    }
    schemas.length && initDefault();
  });

  return {
    addFormSchema,
    updateFormSchema,
    resetFormSchema,
    removeFormSchema,
    getFormSchemas,
  };
};
