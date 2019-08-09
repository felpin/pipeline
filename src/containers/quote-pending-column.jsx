import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Column from '../components/column';
import ColumnCard from '../components/column-card';
import ColumnHeader from '../components/column-header';
import { QUOTE_PENDING } from '../contants/pipeline-status';
import { makePipelineStatusItemsSelector } from '../store/pipeline/selectors';

const quotePendingItemsSelector = makePipelineStatusItemsSelector(QUOTE_PENDING);

const QuotePendingColumn = () => {
  const quotePendingItems = useSelector(quotePendingItemsSelector);
  const { t } = useTranslation();

  const header = useMemo(
    () => (
      <ColumnHeader
        deals={quotePendingItems.length}
        key="header"
        showTotals={false}
        title={t('quotePending')}
      />
    ),
    [quotePendingItems.length, t]
  );

  const renderItem = useCallback(item => <ColumnCard client={item.client} id={item.id} />, []);

  return <Column header={header} items={quotePendingItems} renderItem={renderItem} />;
};

export default QuotePendingColumn;
