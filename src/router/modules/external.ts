import { RouteRecordRaw } from '/#/router';
import { Layout } from '@/router/constant';

const route: RouteRecordRaw[] = [
  {
    path: '/external',
    name: 'https://www.naiveui.com/zh-CN/os-theme',
    component: Layout,
    meta: {
      title: 'naive-ui在线',
      sort: 9,
      icon: 'LogoWebComponent',
      alwaysShow: false,
    },
  },
];

export default route;
