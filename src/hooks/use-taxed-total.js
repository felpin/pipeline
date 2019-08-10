import { useCallback, useMemo } from 'react';

import { EUR, GBP } from '../contants/currency';

export default pipeline => {
  const getTaxedTotal = useCallback(
    currency =>
      pipeline
        .filter(item => item.currency === currency)
        .reduce((total, item) => total + item.taxedTotal, 0),
    [pipeline]
  );

  const taxedTotalEur = useMemo(() => Math.round(getTaxedTotal(EUR)), [getTaxedTotal]);
  const taxedTotalGbp = useMemo(() => Math.round(getTaxedTotal(GBP)), [getTaxedTotal]);

  return { taxedTotalEur, taxedTotalGbp };
};
