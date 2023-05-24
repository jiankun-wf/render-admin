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

const BasicForm = defineComponent({
  name: 'NaiveBasicForm',
  props: BasicFormPorps,
  emits: ['register'],
  setup(props, { attrs, emit, slots }) {
    // formModel
    const formRef = ref();
    const formModel = reactive<Record<string, any>>({});
    const formPropsRef = ref<Partial<FormProps>>({});
    const schemaRef = ref<null | FormSchema[]>(null);

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

    // const getRenderFormSchemas = computed(() => {
    //   return unref(getFormSchema).filter((schema) => {
    //     const { ifShow, field } = schema;
    //     if (typeof ifShow === 'boolean') {
    //       return ifShow;
    //     } else if (typeof ifShow === 'function') {
    //       return ifShow({ model: formModel, field, values: formModel });
    //     } else return true;
    //   });
    // });

    const renderFormItemContent = (schema: FormSchema) => {
      const { getIfShow } = getShow(schema, formModel);

      const span = getIfShow ? undefined : { span: 0 };

      return (
        <NGridItem {...schema.colProps} {...span} key={schema.field}>
          <FormItem schema={schema} setFormModel={setFormValue} formModel={formModel} />
        </NGridItem>
      );
    };

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

    watch(formPropsRef, () => {
      schemaRef.value = unref(formPropsRef).schemas ?? null;
    });

    onMounted(() => {
      emit('register', {
        setProps,
        setLoading,
      });
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
