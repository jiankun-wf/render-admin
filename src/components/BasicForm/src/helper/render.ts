import type { GridItemProps } from 'naive-ui';
import type { FormSchema } from '../types';
import type { ComponentType } from '../types/componentType';

export const getShow = (schema: FormSchema, values: Recordable) => {
  // const { ifShow, show } = schema;
  const { ifShow } = schema;

  const GetIfShow = () => {
    if (typeof ifShow === 'boolean') {
      return ifShow;
    } else if (typeof ifShow === 'function') {
      return ifShow({ field: schema.field, values: values });
    } else return true;
  };

  // const GetIsShow = () => {
  //   if (typeof show === 'boolean') {
  //     return show;
  //   } else if (typeof show === 'function') {
  //     return show({ model: values, field: schema.field, values: values });
  //   } else return true;
  // };

  return { getIfShow: GetIfShow() };
  // return { getIfShow: GetIfShow(), getIsShow: GetIsShow() };
};

export const getColProps = ({
  component,
  getIfShow,
  colProps,
}: {
  component: ComponentType;
  getIfShow: boolean;
  colProps?: GridItemProps;
}): GridItemProps | undefined => {
  if (!getIfShow) return { span: 0 };

  if (component === 'Divider') {
    return { span: 24, offset: 0 };
  }

  return colProps;
};
