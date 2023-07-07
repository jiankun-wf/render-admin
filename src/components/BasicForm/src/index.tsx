import { computed, defineComponent, ref } from 'vue';
import { NForm as Form, NGrid as Grid, NGridItem, NSpin } from 'naive-ui';
import { unref } from 'vue';
import { renderSlot } from 'vue';
import { BasicFormPorps } from './props/form';
import { reactive } from 'vue';
import { FormProps, FormSchema, SetFormValue } from './types';
import { onMounted } from 'vue';
import { deepMerge } from '@/utils';
import { FormItem } from './components/FormItem';
import { watch } from 'vue';
import { useFormLoading } from './hooks/useFormLoading';
import { getShow } from './helper/render';
import { FormActionType } from './types/formAction';
import { useFormSchema } from './hooks/useFormSchema';
import { useFormDefaultValue } from './hooks/useFormDefaultValue';

const BasicForm = defineComponent({
  name: 'NaiveBasicForm',
  props: BasicFormPorps,
  emits: ['register', 'schema-change'],
  setup(props, { attrs, emit, slots }) {
    // formModel
    const formRef = ref();
    const formModel = reactive<Record<string, any>>({});
    const formPropsRef = ref<Partial<FormProps>>({});
    const schemaRef = ref<null | FormSchema[]>(null);
    const defaultValueRef = ref<Record<string, any>>({});

    // loading
    const { formLoading, setLoading } = useFormLoading(props);

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

    const renderFormItemContent = (schema: FormSchema) => {
      const { getIfShow } = getShow(schema, formModel);

      const span = getIfShow ? undefined : { span: 0 };

      return (
        <NGridItem {...schema.colProps} {...span} key={schema.field}>
          <FormItem
            schema={schema}
            setFormModel={setFormValue}
            formModel={formModel}
            formActionType={formActionType}
          />
        </NGridItem>
      );
    };

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

    const setFormValue: SetFormValue = (key: string, val: any) => {
      formModel[key] = val;
      return { key, val, values: formModel };
    };

    const setFieldsValue = (values: Record<string, any>) => {
      for (const key in values) {
        if (Reflect.has(values, key)) {
          setFormValue(key, values[key]);
        }
      }
    };

    const formActionType: Readonly<FormActionType> = {
      setProps: setProps.bind(null),
      setLoading: setLoading.bind(null),
      setFieldsValue: setFieldsValue.bind(null),
      addFormSchema,
      updateFormSchema,
      removeFormSchema,
      getFormSchemas,
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
