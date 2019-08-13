import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as CompleteButtonIcon } from '../assets/complete-button.svg';
import IconButton from '../components/icon-button';
import Column from '../components/column';
import ColumnCard from '../components/column-card';
import ColumnHeader from '../components/column-header';
import { COMPLETED, SHIPPED } from '../contants/pipeline-status';
import useTaxedTotal from '../hooks/use-taxed-total';
import { changeStatus } from '../store/pipeline';
import { makePipelineStatusItemsSelector } from '../store/pipeline/selectors';
import getPaymentStatus from '../utils/get-payment-status';

const shippedItemsSelector = makePipelineStatusItemsSelector(SHIPPED);

const ShippedColumn = () => {
  const dispatch = useDispatch();
  const shippedItems = useSelector(shippedItemsSelector);
  const { taxedTotalEur, taxedTotalGbp } = useTaxedTotal(shippedItems);
  const { t } = useTranslation();

  const createOnClickAction = useCallback(
    item => () => {
      dispatch(changeStatus(item.id, COMPLETED));
    },
    [dispatch]
  );

  const header = useMemo(
    () => (
      <ColumnHeader
        deals={shippedItems.length}
        key="header"
        taxedTotalEur={taxedTotalEur}
        taxedTotalGbp={taxedTotalGbp}
        title={t('shipped')}
      />
    ),
    [shippedItems.length, t, taxedTotalEur, taxedTotalGbp]
  );

  const renderItem = useCallback(
    item => {
      const paymentState = getPaymentStatus(item);
      return (
        <ColumnCard
          action={
            // There is a conflict between eslint rules, so one is disabled
            // eslint-disable-next-line react/jsx-wrap-multilines
            <IconButton ariaLabel={t('completeOrder')} onClick={createOnClickAction(item)}>
              <CompleteButtonIcon />
            </IconButton>
          }
          client={item.client}
          currency={item.currency}
          id={item.id}
          manufacturer={item.manufacturer}
          state={paymentState}
          taxedTotal={item.taxedTotal}
        />
      );
    },
    [createOnClickAction, t]
  );

  return <Column header={header} items={shippedItems} renderItem={renderItem} />;
};

export default React.memo(ShippedColumn);
