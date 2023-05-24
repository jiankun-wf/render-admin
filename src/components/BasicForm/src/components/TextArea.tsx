import { NInput } from 'naive-ui';
import { h } from 'vue';
import { defineComponent } from 'vue';

export const TextArea = defineComponent({
  name: 'TextArea',
  setup(_, { attrs, slots }) {
    return () => h(NInput, { ...attrs, type: 'textarea' }, slots);
  },
});
