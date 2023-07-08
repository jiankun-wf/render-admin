import {
  computed,
  defineComponent,
  readonly,
  ref,
  watch,
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
import { NForm as Form, NGrid as Grid, NGridItem, NSpin } from 'naive-ui';
// hooks
import { useFormLoading } from './hooks/useFormLoading';
import { useFormDefaultValue } from './hooks/useFormDefaultValue';
import { useFormSchema } from './hooks/useFormSchema';
import { useFormValues } from './hooks/useFormValues';
// types
import type { FormActionType } from './types/formAction';
import type { FormProps, FormSchema } from './types';

const BasicForm = defineComponent({
  name: 'NaiveBasicForm',
  props: BasicFormPorps,
  emits: ['register', 'schema-change', 'validate-error', 'submit', 'collapse-change'],
  setup(props, { attrs, emit, slots }) {
    // formModel
    const formRef = ref();
    const formModel = reactive<Record<string, any>>({});
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

    const { setFieldsValue, setFieldValue, getFieldsValue } = useFormValues({
      formModel,
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

    const { addFormSchema, updateFormSchema, removeFormSchema, getFormSchemas } = useFormSchema({
      schemaRef,
      formProps: getFormProps,
      emit,
      defaultValue: defaultValueRef,
      initDefault,
      formModel,
      getSchema: getFormSchema,
      isInitDefaultValue,
    });

    // 生成ref
    const createFormRef = (_ref) => {
      formRef.value = _ref;
    };

    const setProps = (formProps: Partial<FormProps>) => {
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
      getFieldsValue: getFieldsValue.bind(null),
    };

    //  内容渲染
    const renderFormItemContent = (schema: FormSchema) => {
      const { contentRender, field, colProps, component } = schema;

      const { getIfShow } = getShow(schema, readonly(formModel));
      //  contentRender 为优先级最高的自定义渲染
      if (contentRender && isFunction(contentRender) && getIfShow) {
        return contentRender({
          model: formModel,
          values: readonly(formModel),
          field,
          action: formActionType,
          schema,
        });
      }

      const itemColProps = getColProps({ colProps, getIfShow, component });

      return (
        <NGridItem {...itemColProps} key={schema.field}>
          <FormItem
            schema={schema}
            setFormModel={setFieldValue}
            formModel={formModel}
            formActionType={formActionType}
          >
            {{
              ...slots,
            }}
          </FormItem>
        </NGridItem>
      );
    };

    watch(formPropsRef, () => {
      schemaRef.value = unref(formPropsRef).schemas ?? [];
    });

    onMounted(() => {
      emit('register', formActionType);
    });

    return () => (
      <Form {...unref(getFormProps)} ref={createFormRef} model={formModel}>
        <NSpin show={unref(formLoading)}>
          {/* 表单头部插槽 */}
          {slots.header && <div class="form-header">{renderSlot(slots, 'header')}</div>}
          {/* 布局表单渲染 */}
          <Grid {...unref(getGridProps)}>
            {unref(getFormSchema).map((schema) => renderFormItemContent(schema))}
          </Grid>
        </NSpin>
      </Form>
    );
  },
});

export default BasicForm;
