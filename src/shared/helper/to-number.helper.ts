import _ from 'lodash';

interface toNumberOptions {
  min?: number;
  max?: number;
  default?: number;
}

export const toNumber = (
  stringNumber: string,
  options: toNumberOptions,
): number => {
  try {
    const value = _.toNumber(stringNumber);

    if (value <= (options?.min ?? 0)) {
      return options?.min || value;
    }

    if (value >= (options?.max ?? 0)) {
      return options?.max ?? value;
    }
  } catch (err) {
    if (options?.default) {
      return options.default;
    }

    return NaN;
  }
};
