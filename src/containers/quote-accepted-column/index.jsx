import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ReactComponent as EuroIcon } from '../../assets/euro.svg';
import Column from '../../components/column';
import ColumnHeader from '../../components/column-header';
import CustomInfo from '../../components/custom-info';
import { QUOTE_ACCEPTED } from '../../contants/pipeline-status';
import useTaxedTotal from '../../hooks/use-taxed-total';
import { isLoadingSelector, makePipelineStatusItemsSelector } from '../../store/pipeline/selectors';
import ColumnCardWithPaymentStatus from '../column-card-with-payment-status';

const quoteAcceptedItemsSelector = makePipelineStatusItemsSelector(QUOTE_ACCEPTED);

const QuoteAcceptedColumn = () => {
  const isLoading = useSelector(isLoadingSelector);
  const quoteAcceptedItems = useSelector(quoteAcceptedItemsSelector);
  const { taxedTotalEur, taxedTotalGbp } = useTaxedTotal(quoteAcceptedItems);
  const { t } = useTranslation();

  const header = useMemo(
    () => (
      <ColumnHeader
        deals={quoteAcceptedItems.length}
        isLoading={isLoading}
        key="header"
        taxedTotalEur={taxedTotalEur}
        taxedTotalGbp={taxedTotalGbp}
        title={t('quoteAccepted')}
      />
    ),
    [quoteAcceptedItems.length, t, taxedTotalEur, taxedTotalGbp]
  );

  const renderItem = useCallback(item => {
    const { client, currency, daysOverdue, id, invoiceDue, paidAmount, taxedTotal } = item;
    return (
      <ColumnCardWithPaymentStatus
        addCustomInfoState
        client={client}
        currency={currency}
        customInfo={invoiceDue ? <CustomInfo date={invoiceDue} Icon={EuroIcon} /> : undefined}
        daysOverdue={daysOverdue}
        id={id}
        paidAmount={paidAmount}
        taxedTotal={taxedTotal}
      />
    );
  }, []);

  return <Column header={header} items={quoteAcceptedItems} renderItem={renderItem} />;
};

export default React.memo(QuoteAcceptedColumn);
