import { isNil, isEmpty } from 'ramda';

const isEmptyOrNil = (val) => {
  return isNil(val) || isEmpty(val);
};

export default isEmptyOrNil;
