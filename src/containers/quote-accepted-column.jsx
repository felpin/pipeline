import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ReactComponent as EuroIcon } from '../assets/euro.svg';
import Column from '../components/column';
import ColumnCard from '../components/column-card';
import ColumnHeader from '../components/column-header';
import CustomInfo from '../components/custom-info';
import { QUOTE_ACCEPTED } from '../contants/pipeline-status';
import useTaxedTotal from '../hooks/use-taxed-total';
import { makePipelineStatusItemsSelector } from '../store/pipeline/selectors';
import getPaymentStatus from '../utils/get-payment-status';

const quoteAcceptedItemsSelector = makePipelineStatusItemsSelector(QUOTE_ACCEPTED);

const QuoteAcceptedColumn = () => {
  const quoteAcceptedItems = useSelector(quoteAcceptedItemsSelector);
  const { taxedTotalEur, taxedTotalGbp } = useTaxedTotal(quoteAcceptedItems);
  const { t } = useTranslation();

  const header = useMemo(
    () => (
      <ColumnHeader
        deals={quoteAcceptedItems.length}
        key="header"
        taxedTotalEur={taxedTotalEur}
        taxedTotalGbp={taxedTotalGbp}
        title={t('quoteAccepted')}
      />
    ),
    [quoteAcceptedItems.length, t, taxedTotalEur, taxedTotalGbp]
  );

  const renderItem = useCallback(
    item => {
      const { client, currency, daysOverdue, id, invoiceDue, taxedTotal } = item;
      const paymentState = getPaymentStatus(item);

      return (
        <ColumnCard
          client={client}
          currency={currency}
          customInfo={invoiceDue ? <CustomInfo date={invoiceDue} Icon={EuroIcon} /> : undefined}
          id={id}
          state={paymentState}
          taxedTotal={taxedTotal}
          warning={
            daysOverdue && paymentState === 'error'
              ? t('paymentOverdue', { count: daysOverdue })
              : undefined
          }
        />
      );
    },
    [t]
  );

  return <Column header={header} items={quoteAcceptedItems} renderItem={renderItem} />;
};

export default React.memo(QuoteAcceptedColumn);
