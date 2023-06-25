import { type RouteRecordRaw as RouterRaw } from 'vue-router';

declare interface RouteMeta {
  show?: boolean;
  alwaysShow?: boolean;
  keepAlive?: boolean;
  sort?: string | number;
  icon?: string;
  title: string;
  permissions?: string | string[];
  activeMenu?: string;
}

export declare type RouteRecordRaw = RouterRaw & {
  meta: RouteMeta;
};
