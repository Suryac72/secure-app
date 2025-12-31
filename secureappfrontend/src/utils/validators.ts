export const validators = {
  isEmail: (value: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),

  isRequired: (value: string): boolean =>
    value.trim().length > 0
};
