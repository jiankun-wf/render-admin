import {
  computed,
  defineComponent,
  readonly,
  ref,
  unref,
  renderSlot,
  onMounted,
  reactive,
} from 'vue';
// props;
import { BasicFormPorps } from './props/form';
// utils;
import { deepMerge } from './helper/index';
import { getColProps, getShow } from './helper/render';
import { isFunction } from './helper/is';
// components
import { FormItem } from './components/FormItem';
import { NForm as Form, NGrid as Grid, NDivider, NGridItem, NSpin } from 'naive-ui';
// hooks
import { useFormRef } from './hooks/useFormRef';
import { useFormLoading } from './hooks/useFormLoading';
import { useFormDefaultValue } from './hooks/useFormDefaultValue';
import { useFormSchema } from './hooks/useFormSchema';
import { useFormValues } from './hooks/useFormValues';
import { useFormEvent } from './hooks/useFormEvent';
// types
import type { FormActionType } from './types/formAction';
import type { FormProps, FormSchema } from './types';

const BasicForm = defineComponent({
  name: 'NaiveBasicForm',
  props: BasicFormPorps,
  emits: [
    'register',
    'schema-change',
    'validate-error',
    'submit',
    'collapse-change',
    'reset',
    'clear-validate',
  ],
  setup(props, { attrs, emit, slots }) {
    // formModel
    const formModel = reactive<Record<string, any>>({});
    const formValues = readonly(formModel);
    const formPropsRef = ref<Partial<FormProps>>({});
    const schemaRef = ref<null | FormSchema[]>(null);
    const defaultValueRef = ref<Record<string, any>>({});

    // 是否为展开
    const gridCollapsed = ref(false);
    // form属性 合并
    const getFormProps = computed<Record<string, any>>(() => ({
      ...attrs,
      ...props,
      ...unref(formPropsRef),
    }));
    //  布局属性
    const getGridProps = computed(() => {
      const { gridProps = {}, baseGridStyle = undefined } = unref(getFormProps);
      return {
        ...gridProps,
        style: baseGridStyle,
        collapsed: unref(gridCollapsed),
      };
    });

    const getFormSchema = computed(() => {
      return unref(schemaRef) ?? (unref(getFormProps).schemas as FormSchema[]);
    });

    const [formRef, createFormRef] = useFormRef();

    const { setFieldsValue, setFieldValue, getFieldsValue } = useFormValues({
      formModel,
      formValues,
      getFormSchema,
      props,
    });

    // loading
    const { formLoading, setLoading } = useFormLoading(props);
    // defaultValue
    const [initDefault, isInitDefaultValue] = useFormDefaultValue({
      getSchema: getFormSchema,
      formModel,
      defaultValueRef,
    });

    const { addFormSchema, updateFormSchema, removeFormSchema, getFormSchemas, resetFormSchema } =
      useFormSchema({
        schemaRef,
        formProps: getFormProps,
        emit,
        defaultValue: defaultValueRef,
        initDefault,
        formModel,
        getSchema: getFormSchema,
        isInitDefaultValue,
      });

    const { validate, clearValidate, resetFields, validateFields } = useFormEvent({
      emit,
      formRef,
      formModel,
      formValues,
      defaultValueRef,
      getFieldsValue,
    });

    const setProps = async (formProps: Partial<FormProps>) => {
      formPropsRef.value = deepMerge(unref(formPropsRef) || {}, formProps);
    };

    const formActionType: Readonly<FormActionType> = {
      setProps: setProps.bind(null),
      setLoading: setLoading.bind(null),
      setFieldsValue: setFieldsValue.bind(null),
      addFormSchema: addFormSchema.bind(null),
      updateFormSchema: updateFormSchema.bind(null),
      removeFormSchema: removeFormSchema.bind(null),
      getFormSchemas: getFormSchemas.bind(null),
      resetFormSchema: resetFormSchema.bind(null),
      getFieldsValue: getFieldsValue.bind(null),
      validate: validate.bind(null),
      clearValidate: clearValidate.bind(null),
      resetFields: resetFields.bind(null),
      validateFields: validateFields.bind(null),
    };

    const renderDivider = (schema: FormSchema) => {
      const { colProps, component, label, componentProps = {} } = schema;

      const { getIfShow, getIsShow } = getShow(schema, formValues);
      const itemColProps = getColProps({ colProps, component, getIfShow });

      const title = isFunction(label) ? label() : label;

      return (
        <NGridItem
          {...itemColProps}
          key={schema.field}
          style={{ display: getIsShow ? undefined : 'none' }}
        >
          <NDivider {...componentProps}>{title}</NDivider>
        </NGridItem>
      );
    };

    //  内容渲染
    const renderFormItemContent = (schema: FormSchema) => {
      const { contentRender, field, colProps, component, slot } = schema;
      if (component === 'Divider') {
        return renderDivider(schema);
      }

      const { getIfShow, getIsShow } = getShow(schema, readonly(formModel));
      //  contentRender 为优先级最高的自定义渲染
      if (contentRender && isFunction(contentRender) && getIfShow) {
        return contentRender({
          model: formModel,
          values: formValues,
          field,
          action: formActionType,
          schema,
        });
      }

      const itemColProps = getColProps({ colProps, getIfShow, component });
      const itemSlots = slot && slots[slot] ? { [field]: slots[slot] } : {};

      return (
        <NGridItem
          {...itemColProps}
          key={schema.field}
          style={{ display: getIsShow ? undefined : 'none' }}
        >
          <FormItem
            schema={schema}
            setFormModel={setFieldValue}
            formModel={formModel}
            formValues={formValues}
            formActionType={formActionType}
          >
            {itemSlots}
          </FormItem>
        </NGridItem>
      );
    };

    onMounted(() => {
      emit('register', formActionType);
    });

    return () => (
      <Form {...unref(getFormProps)} ref={createFormRef as any} model={formModel}>
        <NSpin show={unref(formLoading)}>
          {/* 表单头部插槽 */}
          {slots.header && <div class="form-header">{renderSlot(slots, 'header')}</div>}
          {/* 布局表单渲染 */}
          <Grid {...unref(getGridProps)}>
            {unref(getFormSchema).map((schema) => renderFormItemContent(schema))}
          </Grid>
          {/* TODO 提交、重置、展开收缩 */}
          {/* .... */}
        </NSpin>
      </Form>
    );
  },
});

export default BasicForm;
