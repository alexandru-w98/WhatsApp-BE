import { pipe, not } from 'ramda';
import isEmptyOrNil from './is-empty-or-nil';

const isNotEmptyOrNil = (val) => {
  return pipe(isEmptyOrNil, not)(val);
};

export default isNotEmptyOrNil;
