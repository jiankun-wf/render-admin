import { FormSchema } from '../types';

export const getShow = (schema: FormSchema, values: Recordable) => {
  // const { ifShow, show } = schema;
  const { ifShow } = schema;

  const GetIfShow = () => {
    if (typeof ifShow === 'boolean') {
      return ifShow;
    } else if (typeof ifShow === 'function') {
      return ifShow({ model: values, field: schema.field, values: values });
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
