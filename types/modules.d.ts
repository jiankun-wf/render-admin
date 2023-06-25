declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module 'virtual:*' {
  const result: any;
  export default result;
}

declare module 'element-resize-detector' {
  type ResizeInstance = {
    listenTo: (element: HTMLElement, handler: (...args: any[]) => void) => void;
  };

  const ResizeConstruct: {
    (): ResizeInstance;
  };

  export default ResizeConstruct;
}

declare module 'uuid' {
  export const v4: () => string;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
