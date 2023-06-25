import * as IconsAntd from '@vicons/antd';
import * as Icons from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { h } from 'vue';

export const renderIcon = (iconName: string) => {
  if (Reflect.has(IconsAntd, iconName)) {
    return h(NIcon, null, { default: () => h(IconsAntd[iconName]) });
  }

  if (Reflect.has(Icons, iconName)) {
    return h(NIcon, null, { default: () => h(Icons[iconName]) });
  }
  return null;
};
