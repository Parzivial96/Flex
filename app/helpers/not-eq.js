import { helper } from '@ember/component/helper';

export default helper(function notEq([leftSide, rightSide]) {
  return leftSide != rightSide;
});
