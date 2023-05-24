import { shallowRef, watch } from 'vue';
import { FormProps } from '../types';
import { unref } from 'vue';

export const useFormLoading = (formProps: FormProps) => {
  const loading = shallowRef(formProps.loading ?? false);

  watch(
    () => formProps.loading,
    (val) => {
      loading.value = val ?? false;
    }
  );

  const setLoading = (flag: boolean) => {
    loading.value = flag;
  };

  const getLoading = () => {
    return unref(loading);
  };

  return { formLoading: loading, setLoading, getLoading };
};
