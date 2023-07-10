import { ref } from 'vue';
import type { Ref } from 'vue';
import type { FormInst } from 'naive-ui';

export const useFormRef = (): [Ref<FormInst | null>, (ref: FormInst) => void] => {
  const formRef = ref<FormInst | null>(null);

  const getRef = (ref: FormInst) => {
    formRef.value = ref;
  };

  return [formRef, getRef];
};
