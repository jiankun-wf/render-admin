import { ref, unref, nextTick, onUnmounted, watch } from 'vue';
import { FormProps } from '../types';
import { gerRawProps } from '../helper';
import { FormActionType } from '../types/formAction';

export const useForm = (props?: FormProps): [any, FormActionType] => {
  const formInstance = ref<FormActionType | null>();

  const isLoaded = ref(false);

  const getForm = async () => {
    const form = unref(formInstance);

    if (!form) {
      await nextTick();
      return unref(formInstance);
    }

    return form;
  };

  const register = (formRef: FormActionType) => {
    if (unref(isLoaded) && unref(formInstance)) return;

    formInstance.value = formRef;
    isLoaded.value = true;

    watch(
      () => props,
      () => {
        props && formRef.setProps(gerRawProps(props));
      },
      {
        immediate: true,
        deep: true,
      }
    );

    onUnmounted(() => {
      formInstance.value = null;
      isLoaded.value = false;
    });
  };

  const formMethods = {
    setProps: async (props: Partial<FormProps>) => {
      const form = await getForm();
      form?.setProps(props);
    },
    setLoading: async (flag: boolean) => {
      const form = await getForm();
      form?.setLoading(flag);
    },
  };

  return [register, formMethods];
};
