import { defineStore } from 'pinia';
import { store } from '@/store';
import projectSetting from '@/settings/projectSetting';
import type { IheaderSetting, ImenuSetting, ImultiTabsSetting, IcrumbsSetting } from '/#/config';
import { storage } from '@/utils/Storage';
import * as CONSTANT_KEY from '@/settings/constant';

const {
  navMode,
  navTheme,
  isMobile,
  headerSetting,
  showFooter,
  menuSetting,
  multiTabsSetting,
  crumbsSetting,
  permissionMode,
  isPageAnimate,
  pageAnimateType,
  waterMark,
} = projectSetting;

const {
  NAV_MODE,
  NAV_STYLE,
  SPLIT_MENU,
  FIXED_HEADER_TOP,
  FIXED_TAGS_VIEW,
  SHOW_RELOAD,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  SHOW_TAGS_VIEW,
  SHOW_WATER_MARK,
  DISABLED_ANIMATION,
  ANIMATION_TYPE,
  IS_MOBILE,
} = CONSTANT_KEY;

interface ProjectSettingState {
  navMode: string; //导航模式
  navTheme: string; //导航风格
  headerSetting: IheaderSetting; //顶部设置
  showFooter: boolean; //页脚
  menuSetting: ImenuSetting; //多标签
  multiTabsSetting: ImultiTabsSetting; //多标签
  crumbsSetting: IcrumbsSetting; //面包屑
  permissionMode: string; //权限模式
  isPageAnimate: boolean; //是否开启路由动画
  pageAnimateType: string; //路由动画类型
  isMobile: boolean; // 是否处于移动端模式
  // 水印
  waterMark: boolean;
}

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode: storage.get(NAV_MODE) ?? navMode,
    navTheme: storage.get(NAV_STYLE) ?? navTheme,
    isMobile: storage.get(IS_MOBILE) ?? isMobile,
    headerSetting: {
      ...headerSetting,
      fixed: storage.get(FIXED_HEADER_TOP) ?? headerSetting.fixed,
      isReload: storage.get(SHOW_RELOAD) ?? headerSetting.isReload,
    },
    showFooter,
    menuSetting: {
      ...menuSetting,
      mixMenu: storage.get(SPLIT_MENU) ?? menuSetting.mixMenu,
    },
    multiTabsSetting: {
      ...multiTabsSetting,
      fixed: storage.get(FIXED_TAGS_VIEW) ?? multiTabsSetting.fixed,
      show: storage.get(SHOW_TAGS_VIEW) ?? multiTabsSetting.show,
    },
    crumbsSetting: {
      ...crumbsSetting,
      show: storage.get(SHOW_BREADCRUMB) ?? crumbsSetting.show,
      showIcon: storage.get(SHOW_BREADCRUMB_ICON) ?? crumbsSetting.showIcon,
    },
    permissionMode,
    isPageAnimate: storage.get(DISABLED_ANIMATION) ?? isPageAnimate,
    pageAnimateType: storage.get(ANIMATION_TYPE) ?? pageAnimateType,
    waterMark: storage.get(SHOW_WATER_MARK) ?? waterMark,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
    getNavTheme(): string {
      return this.navTheme;
    },
    getIsMobile(): boolean {
      return this.isMobile;
    },
    getHeaderSetting(): IheaderSetting {
      return this.headerSetting;
    },
    getShowFooter(): boolean {
      return this.showFooter;
    },
    getMenuSetting(): ImenuSetting {
      return this.menuSetting;
    },
    getMultiTabsSetting(): ImultiTabsSetting {
      return this.multiTabsSetting;
    },
    getCrumbsSetting(): IcrumbsSetting {
      return this.crumbsSetting;
    },
    getPermissionMode(): string {
      return this.permissionMode;
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate;
    },
    getPageAnimateType(): string {
      return this.pageAnimateType;
    },
    getWaterMark(): boolean {
      return this.waterMark;
    },
  },
  actions: {
    setNavMode(value: string): void {
      this.navMode = value;
      storage.set(NAV_MODE, value, null);
    },
    setNavTheme(value: string): void {
      this.navTheme = value;
      storage.set(NAV_STYLE, value, null);
    },
    setMixMenu(value: boolean): void {
      this.menuSetting.mixMenu = value;
      storage.set(SPLIT_MENU, value);
    },
    setFixedHeader(flag: boolean): void {
      this.headerSetting.fixed = flag;
      storage.set(FIXED_HEADER_TOP, flag, null);
    },
    setFixedTagsView(flag: boolean): void {
      this.multiTabsSetting.fixed = flag;
      storage.set(FIXED_TAGS_VIEW, flag, null);
    },
    setShowReload(flag: boolean): void {
      this.headerSetting.isReload = flag;
      storage.set(SHOW_RELOAD, flag, null);
    },
    setShowBreadCrumb(flag: boolean): void {
      this.crumbsSetting.show = flag;
      storage.set(SHOW_BREADCRUMB, flag, null);
    },
    setShowBreadCrumbIcon(flag: boolean): void {
      this.crumbsSetting.showIcon = flag;
      storage.set(SHOW_BREADCRUMB_ICON, flag, null);
    },
    setShowTagsView(flag: boolean): void {
      this.multiTabsSetting.show = flag;
      storage.set(SHOW_TAGS_VIEW, flag, null);
    },
    setIsMobile(value: boolean): void {
      this.isMobile = value;
      storage.set(IS_MOBILE, value, null);
    },
    setWaterMark(flag: boolean) {
      this.waterMark = flag;
      storage.set(SHOW_WATER_MARK, flag, null);
    },
    setDisabledAnimation(flag: boolean): void {
      this.isPageAnimate = flag;
      storage.set(DISABLED_ANIMATION, flag, null);
    },

    setAnimationType(value: string): void {
      this.pageAnimateType = value;
      storage.set(ANIMATION_TYPE, value, null);
    },
  },
});

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store);
}
