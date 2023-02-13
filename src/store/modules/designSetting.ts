import { defineStore } from 'pinia';
import { store } from '@/store';
import designSetting from '@/settings/designSetting';
import { DARK_MODE, PRIMARY_COLOR } from '@/settings/constant';
import { storage } from '@/utils/Storage';

const { darkTheme, appTheme, appThemeList } = designSetting;

interface DesignSettingState {
  //深色主题
  darkTheme: boolean;
  //系统风格
  appTheme: string;
  //系统内置风格
  appThemeList: string[];
}

export const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: (): DesignSettingState => ({
    darkTheme: storage.get(DARK_MODE) || darkTheme,
    appTheme: storage.get(PRIMARY_COLOR) || appTheme,
    appThemeList,
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme;
    },
    getAppTheme(): string {
      return this.appTheme;
    },
    getAppThemeList(): string[] {
      return this.appThemeList;
    },
  },
  actions: {
    setDarkTheme(darkTheme: boolean) {
      this.darkTheme = darkTheme;
      storage.set(DARK_MODE, darkTheme, null);
    },
    setAppTheme(appTheme: string) {
      this.appTheme = appTheme;
      storage.set(PRIMARY_COLOR, appTheme, null);
    },
  },
});

// Need to be used outside the setup
export function useDesignSettingWithOut() {
  return useDesignSettingStore(store);
}
