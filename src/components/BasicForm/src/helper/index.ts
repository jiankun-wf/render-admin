import { unref } from 'vue';
import { isObject } from './is';
import { ComponentType } from '../types/componentType';

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function gerRawProps(props: Record<string, any>) {
  const raw: Record<string, any> = {};

  Object.keys(props).forEach((key) => {
    raw[key] = unref(props[key]);
  });

  return raw;
}

export const filterValueComponents: ComponentType[] = ['Divider'];
