<template>
  <div class="layout-header">
    <!--顶部菜单-->
    <div
      class="layout-header-left"
      v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
    >
      <div class="logo" v-if="navMode === 'horizontal'">
        <img :src="websiteConfig.logo" alt="" />
        <h2 v-show="!collapsed" class="title">{{ websiteConfig.title }}</h2>
      </div>
      <AsideMenu
        :collapsed="collapsed"
        v-model:location="getMenuLocation"
        @update:collapsed="handleUpdateCollapsed"
        :inverted="getInverted"
        mode="horizontal"
      />
    </div>
    <!--左侧菜单-->
    <div class="layout-header-left" v-else>
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
        v-if="false"
      >
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        v-if="headerSetting.isReload"
        @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item v-if="routeItem.meta.title">
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component
                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                  :is="routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component
                v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                :is="routeItem.meta.icon"
              />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="flex items-center gap-3 layout-header-right">
      <FullScreen />

      <UserDropDown />
      <ProjectSettingTrigger />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, toRefs, computed, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from '@vicons/antd';
  import { AsideMenu } from '@/layout/components/Menu';
  import { FullScreen, ProjectSettingTrigger, UserDropDown } from './utils';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { websiteConfig } from '@/config/website.config';

  const props = defineProps<{
    collapsed: boolean;
    inverted: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:collapsed', collapsed: boolean);
  }>();

  const { getNavMode, getNavTheme, getHeaderSetting, getMenuSetting, getCrumbsSetting } =
    useProjectSetting();

  const { navMode, headerSetting, crumbsSetting } = toRefs(
    reactive({
      navMode: getNavMode,
      headerSetting: getHeaderSetting,
      crumbsSetting: getCrumbsSetting,
    })
  );

  const getInverted = computed(() => {
    const navTheme = unref(getNavTheme);
    return ['light', 'header-dark'].includes(navTheme) ? props.inverted : !props.inverted;
  });

  const mixMenu = computed(() => {
    return unref(getMenuSetting).mixMenu;
  });

  const getMenuLocation = computed(() => {
    return 'header';
  });

  const router = useRouter();
  const route = useRoute();

  const generator: any = (routerMap) => {
    return routerMap.map((item) => {
      const currentMenu = {
        ...item,
        label: item.meta.title,
        key: item.name,
        disabled: item.path === '/',
      };
      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        // Recursion
        currentMenu.children = generator(item.children, currentMenu);
      }
      return currentMenu;
    });
  };

  const breadcrumbList = computed(() => {
    return generator(route.matched);
  });

  const dropdownSelect = (key) => {
    router.push({ name: key });
  };

  // 刷新页面
  const reloadPage = () => {
    router.push({
      path: '/redirect' + unref(route).fullPath,
    });
  };

  const handleUpdateCollapsed = (flag: boolean) => {
    emit('update:collapsed', flag);
  };
</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: @header-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;

        img {
          width: auto;
          height: 32px;
          margin-right: 10px;
        }

        .title {
          margin-bottom: 0;
        }
      }

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      .n-breadcrumb {
        display: inline-block;
      }

      &-menu {
        color: var(--text-color);
      }
    }

    &-trigger {
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }
    }

    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }

  .layout-header-light {
    background: #fff;
    color: #515a6e;

    .n-icon {
      color: #515a6e;
    }

    .layout-header-left {
      ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
        color: #515a6e;
      }
    }

    .layout-header-trigger {
      &:hover {
        background: #f8f8f9;
      }
    }
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }
</style>
