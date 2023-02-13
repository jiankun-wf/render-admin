<template>
  <div class="console">
    <!--导航卡片-->
    <div>
      <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
        <n-grid-item v-for="(item, index) in iconList" :key="index">
          <NCard content-style="padding-top: 0;" size="small" :bordered="false">
            <template #footer>
              <div class="cursor-pointer">
                <p class="flex justify-center text-lg"
                  ><span>{{ item.title }}</span></p
                >
              </div>
            </template>
          </NCard>
        </n-grid-item>
      </n-grid>
    </div>

    <!--公式-->
    <Equations />
    <!-- 代码 -->
    <Code />
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getConsoleInfo } from '@/api/dashboard/console';
  import Equations from './components/Equation.vue';
  import Code from './components/Code.vue';
  // import { CountTo } from '@/components/CountTo/index';
  import {
    // CaretUpOutlined,
    // CaretDownOutlined,
    UsergroupAddOutlined,
    BarChartOutlined,
    ShoppingCartOutlined,
    AccountBookOutlined,
    CreditCardOutlined,
    MailOutlined,
    TagsOutlined,
    SettingOutlined,
  } from '@vicons/antd';

  const loading = ref(true);
  const visits = ref<any>({});
  const saleroom = ref<any>({});
  const orderLarge = ref<any>({});
  const volume = ref<Recordable>({});

  // 图标列表
  const iconList = [
    {
      icon: UsergroupAddOutlined,
      size: '32',
      title: '好',
      color: '#69c0ff',
      eventObject: {
        click: () => {},
      },
    },
    {
      icon: BarChartOutlined,
      size: '32',
      title: '好',
      color: '#69c0ff',
      eventObject: {
        click: () => {},
      },
    },
    {
      icon: ShoppingCartOutlined,
      size: '32',
      title: '学',
      color: '#ff9c6e',
      eventObject: {
        click: () => {},
      },
    },
    {
      icon: AccountBookOutlined,
      size: '32',
      title: '习',
      color: '#b37feb',
      eventObject: {
        click: () => {},
      },
    },
    {
      icon: CreditCardOutlined,
      size: '32',
      title: '天',
      color: '#ffd666',
      eventObject: {
        click: () => {},
      },
    },
    {
      icon: MailOutlined,
      size: '32',
      title: '天',
      color: '#5cdbd3',
      eventObject: {
        click: () => {},
      },
    },
    {
      icon: TagsOutlined,
      size: '32',
      title: '向',
      color: '#ff85c0',
      eventObject: {
        click: () => {},
      },
    },
    {
      icon: SettingOutlined,
      size: '32',
      title: '上',
      color: '#ffc069',
      eventObject: {
        click: () => {},
      },
    },
  ];

  onMounted(async () => {
    const data = await getConsoleInfo();
    visits.value = data.visits;
    saleroom.value = data.saleroom;
    orderLarge.value = data.orderLarge;
    volume.value = data.volume;
    loading.value = false;
  });
</script>

<style lang="less" scoped></style>
