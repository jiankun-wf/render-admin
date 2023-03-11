import { provide, inject } from 'vue';

const key = Symbol('formContext');

export function createFormContext(instance) {
  provide(key, instance);
}

export function useFormContext() {
  return inject(key);
}
