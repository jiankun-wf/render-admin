<template>
  <NConfigProvider
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
    :katex="katex"
    :hljs="hljs"
  >
    <NWatermark
      v-if="getWaterMark"
      content="大家辛苦一下，一切都会有的"
      font-family="DingTalk_Step"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
      :z-index="100"
    />
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { zhCN, dateZhCN, darkTheme, NWatermark } from 'naive-ui';
  import { AppProvider } from '@/components/Application';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { lighten } from '@/utils';
  import katex from 'katex';
  import hljs from 'highlight.js/lib/core';
  import typescript from 'highlight.js/lib/languages/typescript';
  hljs.registerLanguage('typescript', typescript);

  const designStore = useDesignSettingStore();

  const projectSettingStore = useProjectSettingStore();

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const getThemeOverrides = computed(() => {
    const appTheme = designStore.appTheme;
    const lightenStr = lighten(designStore.appTheme, 6);
    return {
      common: {
        primaryColor: appTheme,
        primaryColorHover: lightenStr,
        primaryColorPressed: lightenStr,
        primaryColorSuppl: appTheme,
      },
      LoadingBar: {
        colorLoading: appTheme,
      },
    };
  });

  const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));

  const getWaterMark = computed(() => projectSettingStore.getWaterMark);
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
