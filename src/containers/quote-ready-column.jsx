import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as AcceptIcon } from '../assets/accept-button.svg';
import { ReactComponent as InvoiceIcon } from '../assets/invoice.svg';
import { ReactComponent as RefuseIcon } from '../assets/refuse-button.svg';
import IconButtonSet from '../components/icon-button-set';
import Column from '../components/column';
import ColumnCard from '../components/column-card';
import ColumnHeader from '../components/column-header';
import CustomInfo from '../components/custom-info';
import { QUOTE_ACCEPTED, QUOTE_READY, QUOTE_REFUSED } from '../contants/pipeline-status';
import useTaxedTotal from '../hooks/use-taxed-total';
import { changeStatus } from '../store/pipeline';
import { makePipelineStatusItemsSelector } from '../store/pipeline/selectors';

const quoteReadyItemsSelector = makePipelineStatusItemsSelector(QUOTE_READY);

const QuoteReadyColumn = () => {
  const dispatch = useDispatch();
  const quoteReadyItems = useSelector(quoteReadyItemsSelector);
  const { taxedTotalEur, taxedTotalGbp } = useTaxedTotal(quoteReadyItems);
  const { t } = useTranslation();

  const createActionItemData = useCallback(
    item => {
      const onAccept = () => {
        dispatch(changeStatus(item.id, QUOTE_ACCEPTED));
      };

      const onRefuse = () => {
        dispatch(changeStatus(item.id, QUOTE_REFUSED));
      };

      return [
        { ariaLabel: t('acceptQuote'), children: <AcceptIcon />, onClick: onAccept },
        { ariaLabel: t('refuseQuote'), children: <RefuseIcon />, onClick: onRefuse },
      ];
    },
    [dispatch, t]
  );

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

  const renderItem = useCallback(
    item => (
      <ColumnCard
        action={<IconButtonSet data={createActionItemData(item)} />}
        client={item.client}
        currency={item.currency}
        customInfo={<CustomInfo date={item.updatedAt} Icon={InvoiceIcon} />}
        id={item.id}
        taxedTotal={item.taxedTotal}
      />
    ),
    [createActionItemData]
  );

  return <Column header={header} items={quoteReadyItems} renderItem={renderItem} />;
};

export default React.memo(QuoteReadyColumn);
