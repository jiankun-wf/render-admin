import { Ref } from 'vue';
import { shallowRef, unref } from 'vue';

export const useFormDefaultValue = ({
  getSchema,
  formModel,
  defaultValueRef,
}): [() => void, Ref<boolean>] => {
  const isInitDefaultValue = shallowRef(false);

  const initDefault = () => {
    const schemas = unref(getSchema);
    const obj: Record<string, any> = {};
    schemas.forEach((item) => {
      const { defaultValue } = item;
      if (typeof defaultValue !== undefined && typeof defaultValue !== null) {
        obj[item.field] = defaultValue;
        formModel[item.field] = defaultValue;
      }
    });
    defaultValueRef.value = obj;
    isInitDefaultValue.value = true;
  };

  return [initDefault, isInitDefaultValue];
};
