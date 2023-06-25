import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

export interface UserInfo {
  userNickName: string;
  userName: string;
  id: string;
  permissionsList: string[];
  avatar?: string;
  [key: string]: any;
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request<UserInfo>({
    url: '/wi-font/web/admin-user/user-info',
    method: 'GET',
  });
}

/**
 * @description: 用户登录
 */
export function login(data) {
  return http.request<{ token: string; expired: number }>({
    url: '/wi-font/web/admin-user/web-login',
    method: 'POST',
    data,
  });
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params,
  });
}
