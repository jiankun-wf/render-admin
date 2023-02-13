<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="(placement as any)">
    <n-drawer-content :title="title" :native-scrollbar="false">
      <div class="drawer">
        <n-divider title-placement="center">主题</n-divider>

        <div class="justify-center drawer-setting-item dark-switch">
          <n-tooltip placement="bottom">
            <template #trigger>
              <n-switch
                :value="designStore.getDarkTheme"
                @update-value="handleChangeDarkMode"
                class="dark-theme-switch"
              >
                <template #checked>
                  <n-icon size="14" color="#ffd93b">
                    <SunnySharp />
                  </n-icon>
                </template>
                <template #unchecked>
                  <n-icon size="14" color="#ffd93b">
                    <Moon />
                  </n-icon>
                </template>
              </n-switch>
            </template>
            <span>{{ designStore.darkTheme ? '深' : '浅' }}色主题</span>
          </n-tooltip>
        </div>

        <n-divider title-placement="center">系统主题</n-divider>

        <div class="drawer-setting-item align-items-top">
          <span
            class="theme-item"
            v-for="(item, index) in appThemeList"
            :key="index"
            :style="{ 'background-color': item }"
            @click="togTheme(item)"
          >
            <n-icon size="12" v-if="item === designStore.getAppTheme">
              <CheckOutlined />
            </n-icon>
          </span>
        </div>

        <n-divider title-placement="center">导航栏模式</n-divider>

        <div class="drawer-setting-item align-items-top">
          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-dark.svg"
                  @click="togNavMode('vertical')"
                  alt="左侧菜单模式"
                />
              </template>
              <span>左侧菜单模式</span>
            </n-tooltip>
            <n-badge dot type="success" v-show="settingStore.navMode === 'vertical'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-horizontal.svg"
                  alt="顶部菜单模式"
                  @click="togNavMode('horizontal')"
                />
              </template>
              <span>顶部菜单模式</span>
            </n-tooltip>
            <n-badge dot type="success" v-show="settingStore.navMode === 'horizontal'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-horizontal-mix.svg"
                  @click="togNavMode('horizontal-mix')"
                  alt="顶部菜单混合模式"
                />
              </template>
              <span>顶部菜单混合模式</span>
            </n-tooltip>
            <n-badge dot type="success" v-show="settingStore.navMode === 'horizontal-mix'" />
          </div>
        </div>

        <n-divider title-placement="center">导航栏风格</n-divider>

        <div class="drawer-setting-item align-items-top">
          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-dark.svg"
                  alt="暗色侧边栏"
                  @click="togNavTheme('dark')"
                />
              </template>
              <span>暗色侧边栏</span>
            </n-tooltip>
            <n-badge dot type="success" v-if="settingStore.navTheme === 'dark'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-light.svg"
                  alt="白色侧边栏"
                  @click="togNavTheme('light')"
                />
              </template>
              <span>白色侧边栏</span>
            </n-tooltip>
            <n-badge dot type="success" v-if="settingStore.navTheme === 'light'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/header-theme-dark.svg"
                  @click="togNavTheme('header-dark')"
                  alt="暗色顶栏"
                />
              </template>
              <span>暗色顶栏</span>
            </n-tooltip>
            <n-badge dot type="success" v-if="settingStore.navTheme === 'header-dark'" />
          </div>
        </div>
        <n-divider title-placement="center">界面功能</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 分割菜单 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :disabled="settingStore.getNavMode !== 'horizontal-mix'"
              :value="settingStore.getMenuSetting.mixMenu"
              @update:value="handleUpdateMixMenu"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 固定顶栏 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :value="settingStore.getHeaderSetting.fixed"
              @update:value="handleUpdateFixedHeader"
            />
          </div>
        </div>

        <!--        <div class="drawer-setting-item">-->
        <!--          <div class="drawer-setting-item-title">-->
        <!--            固定侧边栏-->
        <!--          </div>-->
        <!--          <div class="drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.menuSetting.fixed" />-->
        <!--          </div>-->
        <!--        </div>-->

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 固定多页签 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :value="settingStore.getMultiTabsSetting.fixed"
              @update:value="handleUpdateTagsViewFixed"
            />
          </div>
        </div>

        <n-divider title-placement="center">界面显示</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示重载页面按钮 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :value="settingStore.getHeaderSetting.isReload"
              @update:value="handleUpdateShowReload"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示面包屑导航 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :value="settingStore.getCrumbsSetting.show"
              @update:value="handleUpdateCrumbShow"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示面包屑显示图标 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :value="settingStore.getCrumbsSetting.showIcon"
              @update:value="handleUpdateCrumbShowIcon"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示多页签 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :value="settingStore.getMultiTabsSetting.show"
              @update:value="handleUpdateTagsViewShow"
            />
          </div>
        </div>
        <!-- 是否显示水印-->
        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 水印 </div>
          <div class="drawer-setting-item-action">
            <n-switch :value="settingStore.getWaterMark" @update:value="handleUpdateWaterMark" />
          </div>
        </div>

        <n-divider title-placement="center">动画</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 禁用动画 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :value="settingStore.getIsPageAnimate"
              @update:value="handleUpdateDisabledAnimation"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 动画类型 </div>
          <div class="drawer-setting-item-select">
            <n-select
              :value="settingStore.getPageAnimateType"
              :options="animateOptions"
              @update:value="handleUpdateAnimationType"
            />
          </div>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, unref, watch, computed } from 'vue';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { CheckOutlined } from '@vicons/antd';
  import { Moon, SunnySharp } from '@vicons/ionicons5';
  import { darkTheme } from 'naive-ui';
  import { animates as animateOptions } from '@/settings/animateSetting';

  export default defineComponent({
    name: 'ProjectSetting',
    components: { CheckOutlined, Moon, SunnySharp },
    props: {
      title: {
        type: String,
        default: '项目配置',
      },
      width: {
        type: Number,
        default: 280,
      },
    },
    setup(props) {
      const settingStore = useProjectSettingStore();
      const designStore = useDesignSettingStore();
      const state = reactive({
        width: props.width,
        title: props.title,
        isDrawer: false,
        placement: 'right',
        appThemeList: designStore.appThemeList,
      });

      watch(
        () => designStore.darkTheme,
        (to) => {
          settingStore.setNavTheme(to ? 'header-dark' : 'dark');
        }
      );

      const directionsOptions = computed(() => {
        return animateOptions.find((item) => item.value == unref(settingStore.pageAnimateType));
      });

      function openDrawer() {
        state.isDrawer = true;
      }

      function closeDrawer() {
        state.isDrawer = false;
      }

      function togNavTheme(theme) {
        if (settingStore.getNavTheme === theme) return;
        settingStore.setNavTheme(theme);
        if (settingStore.getNavMode === 'horizontal' && ['light'].includes(theme)) {
          settingStore.setNavTheme('dark');
        }
      }
      // 切换主题
      function togTheme(color: string) {
        if (designStore.getAppTheme === color) return;
        designStore.setAppTheme(color);
      }

      function togNavMode(mode) {
        if (mode === settingStore.getNavMode) return;
        settingStore.setNavMode(mode);
        settingStore.setMixMenu(false);
      }
      // 切换 暗黑模式
      const handleChangeDarkMode = (val: boolean) => {
        designStore.setDarkTheme(val);
      };
      // 是否 分割菜单
      const handleUpdateMixMenu = (flag: boolean) => {
        settingStore.setMixMenu(flag);
      };
      // 头部是否置顶
      const handleUpdateFixedHeader = (flag: boolean) => {
        settingStore.setFixedHeader(flag);
      };
      // 多页签 是否置顶
      const handleUpdateTagsViewFixed = (flag: boolean) => {
        settingStore.setFixedTagsView(flag);
      };
      // 是否显示重载按钮
      const handleUpdateShowReload = (flag: boolean) => {
        settingStore.setShowReload(flag);
      };
      // 面包屑 是否显示
      const handleUpdateCrumbShow = (flag: boolean) => {
        settingStore.setShowBreadCrumb(flag);
      };
      // 面包屑 图标是否显示
      const handleUpdateCrumbShowIcon = (flag: boolean) => {
        settingStore.setShowBreadCrumbIcon(flag);
      };
      // 多页签 是否显示
      const handleUpdateTagsViewShow = (flag: boolean) => {
        settingStore.setShowTagsView(flag);
      };
      //  更新是否水印
      const handleUpdateWaterMark = (flag: boolean) => {
        settingStore.setWaterMark(flag);
      };
      // 是否页面过渡动画
      const handleUpdateDisabledAnimation = (flag: boolean) => {
        settingStore.setDisabledAnimation(flag);
      };
      //  过渡动画类型切换
      const handleUpdateAnimationType = (value: string) => {
        settingStore.setAnimationType(value);
      };

      return {
        ...toRefs(state),
        settingStore,
        designStore,
        togNavTheme,
        togNavMode,
        togTheme,
        darkTheme,
        openDrawer,
        closeDrawer,
        animateOptions,
        directionsOptions,
        handleChangeDarkMode,
        handleUpdateFixedHeader,
        handleUpdateTagsViewFixed,
        handleUpdateShowReload,
        handleUpdateCrumbShow,
        handleUpdateCrumbShowIcon,
        handleUpdateTagsViewShow,
        handleUpdateMixMenu,
        handleUpdateWaterMark,
        handleUpdateDisabledAnimation,
        handleUpdateAnimationType,
      };
    },
  });
</script>

<style lang="less" scoped>
  .drawer {
    .n-divider:not(.n-divider--vertical) {
      margin: 10px 0;
    }

    &-setting-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      flex-wrap: wrap;

      &-style {
        display: inline-block;
        position: relative;
        margin-right: 16px;
        cursor: pointer;
        text-align: center;
      }

      &-title {
        flex: 1 1;
        font-size: 14px;
      }

      &-action {
        flex: 0 0 auto;
      }

      &-select {
        flex: 1;
      }

      .theme-item {
        width: 20px;
        min-width: 20px;
        height: 20px;
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 2px;
        margin: 0 5px 5px 0;
        text-align: center;
        line-height: 14px;

        .n-icon {
          color: #fff;
        }
      }
    }

    .align-items-top {
      align-items: flex-start;
      padding: 2px 0;
    }

    .justify-center {
      justify-content: center;
    }

    .dark-switch .n-switch {
      ::v-deep(.n-switch__rail) {
        background-color: #000e1c;
      }
    }
  }
</style>
