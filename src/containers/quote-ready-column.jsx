import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Column from '../components/column';
import ColumnCard from '../components/column-card';
import ColumnHeader from '../components/column-header';
import { EUR, GBP } from '../contants/currency';
import { QUOTE_READY } from '../contants/pipeline-status';
import { makePipelineStatusItemsSelector } from '../store/pipeline/selectors';

const quoteReadyItemsSelector = makePipelineStatusItemsSelector(QUOTE_READY);

const QuoteReadyColumn = () => {
  const quoteReadyItems = useSelector(quoteReadyItemsSelector);
  const { t } = useTranslation();

  const getTaxedTotal = useCallback(
    currency =>
      quoteReadyItems
        .filter(item => item.currency === currency)
        .reduce((total, item) => total + item.taxedTotal, 0),
    [quoteReadyItems]
  );

  const taxedTotalEur = useMemo(() => getTaxedTotal(EUR), [getTaxedTotal]);
  const taxedTotalGbp = useMemo(() => getTaxedTotal(GBP), [getTaxedTotal]);

  const header = useMemo(
    () => (
      <ColumnHeader
        deals={quoteReadyItems.length}
        key="header"
        taxedTotalEur={taxedTotalEur}
        taxedTotalGbp={taxedTotalGbp}
        title={t('quoteReady')}
      />
    ),
    [quoteReadyItems.length, t, taxedTotalEur, taxedTotalGbp]
  );

  const renderItem = useCallback(item => <ColumnCard client={item.client} id={item.id} />, []);

  return <Column header={header} items={quoteReadyItems} renderItem={renderItem} />;
};

export default QuoteReadyColumn;
