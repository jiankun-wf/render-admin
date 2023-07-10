import { FormValidationError } from 'naive-ui';

export type RequiredMarkPlacement = 'left' | 'right' | 'right-hanging';

export type FormSize = 'small' | 'medium' | 'large';

export type LabelAlign = 'left' | 'right';

export type LabelPlacement = 'left' | 'top';

export type ValidateError = {
  error: string;
  body: null | FormValidationError[];
  message: string;
};
