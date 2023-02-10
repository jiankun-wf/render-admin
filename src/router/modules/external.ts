import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { LogoWebComponent } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const route: RouteRecordRaw[] = [
  {
    path: '/external',
    name: 'https://www.naiveui.com/zh-CN/os-theme',
    component: Layout,
    meta: {
      title: 'naive-ui在线',
      sort: 9,
      icon: renderIcon(LogoWebComponent),
    },
  },
];

export default route;
