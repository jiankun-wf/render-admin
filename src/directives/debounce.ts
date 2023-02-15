/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from 'vue';
interface ElType extends HTMLElement {
  __eventHandler__: () => any;
}
const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const { value, modifiers, arg } = binding;
    if (typeof value !== 'function') {
      throw 'callback must be a function';
    }
    const delay = Number(arg || 300);
    let timer: NodeJS.Timeout | null = null;
    el.__eventHandler__ = function () {
      if (timer) {
        clearInterval(timer);
      }
      timer = setTimeout(() => {
        value();
      }, delay);
    };
    const eventNames = new Set(Object.keys(modifiers));
    eventNames.forEach((eventName) => {
      if (modifiers[eventName] === true) {
        el.addEventListener(eventName, el.__eventHandler__);
      }
    });
  },
  beforeUnmount(el: ElType, binding: DirectiveBinding) {
    const { modifiers } = binding;
    const eventNames = new Set(Object.keys(modifiers));
    eventNames.forEach((eventName) => {
      if (modifiers[eventName] === true) {
        el.removeEventListener(eventName, el.__eventHandler__);
      }
    });
  },
};

export default debounce;
