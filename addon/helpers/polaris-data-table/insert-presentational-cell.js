import { helper } from '@ember/component/helper';

export function polarisDataTableInsertPresentationalCell([cells]) {
  let [fixedCell, ...rest] = cells;
  return [fixedCell, '', ...rest];
}

export default helper(polarisDataTableInsertPresentationalCell);
