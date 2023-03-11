import { computed, defineComponent, ref } from 'vue';
import { NForm as Form, NGrid as Grid, NGridItem } from 'naive-ui';
import { unref } from 'vue';
import { renderSlot } from 'vue';
import { BasicFormPorps } from './props/form';
import { reactive } from 'vue';
import { FormProps, FormSchema } from './types';
import { onMounted } from 'vue';
import { deepMerge } from '@/utils';

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
    const submitLoading = ref(false);

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
      const { schemas = [] } = unref(getFormProps);
      return schemas as FormSchema[];
    });

    const getRenderFormSchemas = computed(() => {
      return unref(getFormSchema).filter((schema) => {
        const { ifShow, field } = schema;
        if (typeof ifShow === 'boolean') {
          return ifShow;
        } else if (typeof ifShow === 'function') {
          return ifShow({ model: formModel, field, values: formModel });
        } else return true;
      });
    });

    // 生成ref
    const createFormRef = (_ref) => {
      formRef.value = _ref;
    };

    const setProps = (formProps: Partial<FormProps>) => {
      formPropsRef.value = deepMerge(unref(formPropsRef) || {}, formProps);
    };

    onMounted(() => {
      emit('register', {
        setProps,
      });
    });

    return () => (
      <Form {...unref(getFormProps)} ref={createFormRef}>
        {slots.header && renderSlot(slots, 'header')}
        <Grid {...unref(getGridProps)}>
          {unref(getRenderFormSchemas).map((schema) => (
            <NGridItem {...schema.colProps}>123</NGridItem>
          ))}
        </Grid>
      </Form>
    );
  },
});

export default BasicForm;
