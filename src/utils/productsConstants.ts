import { range } from 'lodash';

export const FILTER_OPTIONS = ['Front', 'Temple', 'Nosepad', 'Lens', 'Accessories'];

export const SPH_OPTIONS = range(-20, 20.25, 0.25).map((number) =>
  number > 0 ? `+${number.toFixed(2)}` : `${number.toFixed(2)}`
);

export const CYL_OPTIONS = range(-20, 0.25, 0.25).map((number) => `${number.toFixed(2)}`);
