import { defineComponent, ref, unref } from 'vue';
import { NAvatar, NDropdown, NIcon, NSpin, NTooltip, useDialog, useMessage } from 'naive-ui';
import { type DropdownOption } from 'naive-ui';
import { FullscreenOutlined, FullscreenExitOutlined, SettingOutlined } from '@vicons/antd';
import { default as ProjectSetting } from './ProjectSetting.vue';
import Avatar from '@/assets/images/cat.webp';

import { defineAsyncComponent } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TABS_ROUTES } from '@/store/mutation-types';

export const FullScreen = defineComponent({
  name: 'FullScreen',
  emits: ['fullscreen-change'],
  setup(_, { emit }) {
    const getisFullScreen = () => {
      return document.fullscreenElement !== null;
    };
    const isFull = ref(getisFullScreen());

    // 切换全屏图标
    const toggleFullscreenIcon = () => {
      isFull.value = document.fullscreenElement !== null;
      emit('fullscreen-change', unref(isFull));
    };

    // 监听全屏切换事件
    document.addEventListener('fullscreenchange', toggleFullscreenIcon);

    // 全屏切换
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    return () => (
      <div class="w-8 h-8 leading-8 text-center transition-colors duration-200 rounded cursor-pointer hover:bg-hovered-bg">
        <NTooltip>
          {{
            trigger: () => (
              <NIcon size={18}>
                {unref(isFull) ? (
                  <FullscreenExitOutlined onClick={toggleFullScreen} />
                ) : (
                  <FullscreenOutlined onClick={toggleFullScreen} />
                )}
              </NIcon>
            ),
            default: () => (unref(isFull) ? '退出全屏' : '开始全屏'),
          }}
        </NTooltip>
      </div>
    );
  },
});

export const ProjectSettingTrigger = defineComponent({
  name: 'ProjectSettingTrigger',
  setup() {
    const settingRef = ref();

    const createRef = (ref) => {
      settingRef.value = ref;
    };

    const handleOpenSetting = () => {
      unref(settingRef)?.openDrawer();
    };
    return () => (
      <div class="w-8 h-8 leading-8 text-center transition-colors duration-200 rounded cursor-pointer hover:bg-hovered-bg mr-2">
        <NTooltip>
          {{
            trigger: () => (
              <NIcon size={18}>
                <SettingOutlined onClick={handleOpenSetting} />
              </NIcon>
            ),
            default: () => '项目配置',
          }}
        </NTooltip>
        <ProjectSetting ref={createRef} />
      </div>
    );
  },
});

const delayResolve = (value: any, timeout: number) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, timeout);
  });
};

export const UserDropDown = defineAsyncComponent({
  loader: () =>
    delayResolve(
      defineComponent({
        name: 'UserMenu',
        setup() {
          const userStore = useUserStore();
          const { push, replace } = useRouter();
          const { fullPath } = useRoute();
          const message = useMessage();
          const dialog = useDialog();
          const getAvatar = computed(() => userStore.avatar ?? Avatar);
          const avatarOptions: DropdownOption[] = [
            {
              label: '个人设置',
              key: 1,
            },
            {
              type: 'divider',
            },
            {
              label: '退出登录',
              key: 2,
            },
          ];

          const doLogout = () => {
            dialog.info({
              title: '提示',
              content: '您确定要退出登录吗',
              positiveText: '确定',
              negativeText: '取消',
              onPositiveClick: () => {
                userStore.logout().then(() => {
                  message.success('成功退出登录');
                  // 移除标签页
                  localStorage.removeItem(TABS_ROUTES);
                  replace({
                    name: 'Login',
                    query: {
                      redirect: fullPath,
                    },
                  }).finally(() => location.reload());
                });
              },
              onNegativeClick: () => {},
            });
          };

          const avatarSelect = (key) => {
            switch (key) {
              case 1:
                push({ name: 'Setting' });
                break;
              case 2:
                doLogout();
                break;
            }
          };
          return () => (
            <NDropdown
              trigger="hover"
              showArrow
              options={avatarOptions}
              width={175}
              onSelect={avatarSelect}
            >
              <div class="flex flex-row items-center cursor-pointer">
                <NAvatar size={36} round src={unref(getAvatar)}></NAvatar>
                <span class="select-none ml-2">{userStore.username}</span>
              </div>
            </NDropdown>
          );
        },
      }),
      300
    ),
  delay: 300,
  errorComponent: NSpin,
  loadingComponent: NSpin,
});
