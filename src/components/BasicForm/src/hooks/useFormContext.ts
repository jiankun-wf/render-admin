import { provide, inject } from 'vue';
import type { FormContext } from '../types';

const key = Symbol('formContext');

export function createFormContext(formContext: FormContext) {
  provide(key, formContext);
}

export function useFormContext() {
  return inject<FormContext>(key);
}
