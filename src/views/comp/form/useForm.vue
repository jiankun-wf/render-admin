<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="基础表单"> useForm 表单，用于向用户收集表单信息 </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm">
        <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
          <template #name="{ model, field }">
            <NInput v-model:value="model[field]" />
          </template>
        </BasicForm>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/BasicForm/index';
  import { useMessage, NInput } from 'naive-ui';
  // import { onMounted } from 'vue';

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: '姓名',
      defaultValue: 'PC',
      helpMessage: '这是一个提示',
      colProps: { span: 1 },
      componentProps: {
        placeholder: '请输入姓名',
      },
      show: false,
      rule: [{ required: true, message: '请输入姓名', key: 'name-required' }],
      slot: 'name',
    },
    {
      field: 'mobile',
      component: 'InputNumber',
      label: '手机',
      componentProps: {
        placeholder: '请输入手机号码',
        showButton: false,
        style: { width: '100%' },
      },
    },
    {
      field: 'split-line',
      label: '测试分割线',
      component: 'Divider',
      // colProps: { span: 1 },
    },
    {
      field: 'type',
      component: 'Select',
      label: '类型',
      colProps: { span: 1 },
      componentProps: ({ action }) => ({
        placeholder: '请选择类型',
        options: [
          {
            label: '舒适性',
            value: 1,
          },
          {
            label: '经济性',
            value: 2,
          },
        ],
        'onUpdate:value': (val, item) => {
          const { setFieldsValue, removeFormSchema } = action;
          setFieldsValue({ name: item.label });
          if (val === 2) {
            removeFormSchema('name2');
          }
        },
      }),
    },
    {
      field: 'makeDate',
      component: 'Rate',
      label: '星级',
      defaultValue: 4,
      componentProps: {
        type: 'date',
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
      ifShow: ({ values }) => {
        return values.type === 1;
      },
    },
    {
      field: 'test',
      component: 'ColorPicker',
      label: '颜色测试',
      defaultValue: '#FFFFFF',
      colProps: { span: 1 },
    },
  ];

  const message = useMessage();

  const [register, {}] = useForm({
    gridProps: { cols: 2, xGap: 10 },
    labelWidth: '100px',
    layout: 'horizontal',
    submitButtonText: '提交预约',
    schemas,
    showLabel: true,
    labelPlacement: 'left',
    inline: false,
    size: 'small',
  });

  function handleSubmit(values: Recordable) {
    console.log(values);
    message.success(JSON.stringify(values));
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }

  // onMounted(async () => {
  //   try {
  //     const values = await validate();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
</script>

<style lang="less" scoped>
  .BasicForm {
    width: 755px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
</style>
