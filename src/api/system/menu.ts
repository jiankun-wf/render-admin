import { http } from '@/utils/http/axios';

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  //  return http.request({
  //    url: '/menus',
  //    method: 'GET',
  //  });
  return Promise.resolve([
    {
      path: '/about',
      name: 'about',
      component: 'Layout',
      meta: {
        sort: 10,
        isRoot: true,
        activeMenu: 'about_index',
        icon: 'ProjectOutlined',
      },
      children: [
        {
          path: 'index',
          name: `about_index`,
          meta: {
            title: '关于项目',
            activeMenu: 'about_index',
          },
          component: '/about/index',
        },
      ],
    },
    {
      path: '/comp',
      name: 'comp',
      component: 'Layout',
      redirect: '/comp/table',
      meta: {
        title: '组件示例',
        icon: 'WalletOutlined',
        sort: 8,
      },
      children: [
        {
          path: 'table',
          name: `comp_table`,
          redirect: '/comp/table/basic',
          component: 'ParentLayout',
          meta: {
            title: '表格',
          },
          children: [
            {
              path: 'basic',
              name: `comp_table_basic`,
              meta: {
                title: '基础表格',
              },
              component: '/comp/table/basic',
            },
            {
              path: 'editCell',
              name: `comp_table_editCell`,
              meta: {
                title: '单元格编辑',
              },
              component: '/comp/table/editCell',
            },
            {
              path: 'editRow',
              name: `comp_table_editRow`,
              meta: {
                title: '整行编辑',
              },
              component: '/comp/table/editRow',
            },
          ],
        },
        {
          path: 'form',
          name: `comp_form`,
          redirect: '/comp/form/basic',
          component: 'ParentLayout',
          meta: {
            title: '表单',
          },
          children: [
            {
              path: 'basic',
              name: `comp_form_basic`,
              meta: {
                title: '基础使用',
              },
              component: '/comp/form/basic',
            },
            {
              path: 'useForm',
              name: `useForm`,
              meta: {
                title: 'useForm',
              },
              component: '/comp/form/useForm',
            },
          ],
        },
        {
          path: 'upload',
          name: `comp_upload`,
          meta: {
            title: '上传图片',
          },
          component: '/comp/upload/index',
        },
        {
          path: 'richtext',
          name: `richtext`,
          meta: {
            title: '富文本',
          },
          component: '/comp/richtext/vue-quill',
        },
        {
          path: 'drag',
          name: `Drag`,
          meta: {
            title: '拖拽',
          },
          component: '/comp/drag/index',
        },
      ],
    },
  ]);
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
  return http.request({
    url: '/menu/list',
    method: 'GET',
    params,
  });
}
