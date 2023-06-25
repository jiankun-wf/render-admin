import { defineStore } from 'pinia';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types';
import { getUserInfo, login } from '@/api/system/user';
import { storage } from '@/utils/Storage';

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar?: string;
  permissions: any[];
  info: any;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string | undefined {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): object {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar?: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserName(name: string) {
      this.username = name;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // 登录
    async login(userInfo) {
      try {
        const response = await login(userInfo);
        const { expired, token } = response;
        const ex = expired ?? 7 * 24 * 60 * 60;
        storage.set(ACCESS_TOKEN, token, ex);
        this.setToken(token);
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    GetInfo() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const { permissionsList, avatar, userNickName } = res;
            if (permissionsList && permissionsList) {
              that.setPermissions(permissionsList);
            }
            that.setUserInfo(res);
            that.setAvatar(avatar);
            that.setUserName(userNickName);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo('');
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
      return Promise.resolve('');
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
