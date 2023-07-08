<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="基础表单"> useForm 表单，用于向用户收集表单信息 </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm">
        <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
          <template #name="{ model, field }">
            {{ model[field] ?? '-' }}
          </template>
        </BasicForm>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/BasicForm/index';
  import { useMessage } from 'naive-ui';
  // import { onMounted } from 'vue';

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: '姓名',
      helpMessage: '这是一个提示',
      colProps: { span: 1 },
      componentProps: {
        placeholder: '请输入姓名',
      },
      rule: [{ required: false, message: '请输入姓名', trigger: ['blur'] }],
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
        onUpdateValue: (_, item) => {
          const { setFieldsValue } = action;
          setFieldsValue({ name: item.label });
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
      field: 'split',
      component: 'Divider',
      componentProps: {
        dashed: true,
        titlePlacement: 'center',
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

  const [register, { setLoading: _ }] = useForm({
    gridProps: { cols: 2, xGap: 10 },
    collapsedRows: 3,
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
</script>

<style lang="less" scoped>
  .BasicForm {
    width: 755px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
</style>
