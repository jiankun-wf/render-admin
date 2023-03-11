import { defineComponent, unref } from 'vue';
import { computed } from 'vue';
import {
  zhCN,
  dateZhCN,
  darkTheme,
  NWatermark,
  NConfigProvider,
  GlobalThemeOverrides,
} from 'naive-ui';
import { AppProvider } from '@/components/Application';
import { useDesignSettingStore } from '@/store/modules/designSetting';
import { useProjectSettingStore } from '@/store/modules/projectSetting';
import { lighten } from '@/utils';
import katex from 'katex';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import './styles/index.less';
import { RouterView } from 'vue-router';
const App = defineComponent({
  name: 'RootApp',
  setup() {
    const designStore = useDesignSettingStore();
    const projectSettingStore = useProjectSettingStore();

    const getThemeOverrides = computed<GlobalThemeOverrides>(() => {
      const appTheme = designStore.appTheme;
      const lightenStr = lighten(designStore.appTheme, 6);
      return {
        common: {
          primaryColor: appTheme,
          primaryColorHover: lightenStr,
          primaryColorPressed: lightenStr,
          primaryColorSuppl: appTheme,
          infoColor: appTheme,
          infoColorHover: lightenStr,
          infoColorPressed: lightenStr,
          infoColorSuppl: appTheme,
        },
        LoadingBar: {
          colorLoading: appTheme,
        },
      };
    });

    const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));

    const getWaterMark = computed(() => projectSettingStore.getWaterMark);

    const waterMarkConfig = {
      content: '大家辛苦一下，一切都会有的',
      fontFamily: 'DingTalk_Step',
      fontSize: 16,
      lineHeight: 16,
      width: 384,
      height: 384,
      xOffset: 12,
      yOffset: 60,
      rotate: -15,
      zIndex: 100,
    };

    return () => (
      <NConfigProvider
        locale={zhCN}
        theme={unref(getDarkTheme)}
        theme-overrides={unref(getThemeOverrides)}
        date-locale={dateZhCN}
        katex={katex}
        hljs={hljs}
      >
        {unref(getWaterMark) && <NWatermark cross fullscreen {...waterMarkConfig} />}
        <AppProvider>
          <RouterView />
        </AppProvider>
      </NConfigProvider>
    );
  },
});

export default App;
