import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as CompleteButtonIcon } from '../../assets/complete-button.svg';
import IconButton from '../../components/icon-button';
import Column from '../../components/column';
import ColumnHeader from '../../components/column-header';
import { COMPLETED, SHIPPED } from '../../contants/pipeline-status';
import useTaxedTotal from '../../hooks/use-taxed-total';
import { changeStatus } from '../../store/pipeline';
import { isLoadingSelector, makePipelineStatusItemsSelector } from '../../store/pipeline/selectors';
import ColumnCardWithPaymentStatus from '../column-card-with-payment-status';

const shippedItemsSelector = makePipelineStatusItemsSelector(SHIPPED);

const ShippedColumn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
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
        isLoading={isLoading}
        key="header"
        taxedTotalEur={taxedTotalEur}
        taxedTotalGbp={taxedTotalGbp}
        title={t('shipped')}
      />
    ),
    [isLoading, shippedItems.length, t, taxedTotalEur, taxedTotalGbp]
  );

  const renderItem = useCallback(
    item => (
      <ColumnCardWithPaymentStatus
        action={
          // There is a conflict between eslint rules, so one is disabled
          // eslint-disable-next-line react/jsx-wrap-multilines
          <IconButton ariaLabel={t('completeOrder')} onClick={createOnClickAction(item)}>
            <CompleteButtonIcon />
          </IconButton>
        }
        client={item.client}
        currency={item.currency}
        daysOverdue={item.daysOverdue}
        id={item.id}
        manufacturer={item.manufacturer}
        paidAmount={item.paidAmount}
        taxedTotal={item.taxedTotal}
      />
    ),
    [createOnClickAction, t]
  );

  return <Column header={header} items={shippedItems} renderItem={renderItem} />;
};

export default React.memo(ShippedColumn);
