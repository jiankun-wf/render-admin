import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { LogoIonic } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/frame',
    name: 'Frame',
    redirect: '/frame/naive-ui',
    component: Layout,
    meta: {
      title: '内嵌页面',
      sort: 8,
      icon: renderIcon(LogoIonic),
    },
    children: [
      {
        path: 'naive-ui',
        name: 'NaiveUi',
        meta: {
          title: 'naive-ui内嵌',
          frameSrc: 'https://www.naiveui.com/zh-CN/os-theme',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
