import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ArrowForwardButtonIcon } from '../assets/arrow-forward-button.svg';
import IconButton from '../components/icon-button';
import Column from '../components/column';
import ColumnCard from '../components/column-card';
import ColumnHeader from '../components/column-header';
import CustomInfo from '../components/custom-info';
import { ReactComponent as DeliveryIcon } from '../assets/delivery.svg';
import { IN_PRODUCTION, SHIPPED } from '../contants/pipeline-status';
import useTaxedTotal from '../hooks/use-taxed-total';
import { changeStatus } from '../store/pipeline';
import { makePipelineStatusItemsSelector } from '../store/pipeline/selectors';
import getPaymentStatus from '../utils/get-payment-status';

const inProductionItemsSelector = makePipelineStatusItemsSelector(IN_PRODUCTION);

const InProductionColumn = () => {
  const dispatch = useDispatch();
  const inProductionItems = useSelector(inProductionItemsSelector);
  const { taxedTotalEur, taxedTotalGbp } = useTaxedTotal(inProductionItems);
  const { t } = useTranslation();

  const createOnClickAction = useCallback(
    item => () => {
      dispatch(changeStatus(item.id, SHIPPED));
    },
    [dispatch]
  );

  const header = useMemo(
    () => (
      <ColumnHeader
        deals={inProductionItems.length}
        key="header"
        taxedTotalEur={taxedTotalEur}
        taxedTotalGbp={taxedTotalGbp}
        title={t('inProduction')}
      />
    ),
    [inProductionItems.length, t, taxedTotalEur, taxedTotalGbp]
  );

  const renderItem = useCallback(
    item => {
      const {
        client,
        currency,
        daysSinceProductionReadyAt,
        id,
        manufacturer,
        productionReadyAt,
        taxedTotal,
      } = item;
      const paymentState = getPaymentStatus(item);

      return (
        <ColumnCard
          action={
            // There is a conflict between eslint rules, so one is disabled
            // eslint-disable-next-line react/jsx-wrap-multilines
            <IconButton ariaLabel={t('shipItem')} onClick={createOnClickAction(item)}>
              <ArrowForwardButtonIcon />
            </IconButton>
          }
          client={client}
          currency={currency}
          customInfo={
            productionReadyAt ? (
              <CustomInfo date={productionReadyAt} Icon={DeliveryIcon} />
            ) : (
              undefined
            )
          }
          id={id}
          manufacturer={manufacturer}
          state={paymentState}
          taxedTotal={taxedTotal}
          warning={
            daysSinceProductionReadyAt
              ? t('shippingLate', { count: daysSinceProductionReadyAt })
              : undefined
          }
        />
      );
    },
    [createOnClickAction, t]
  );

  return <Column header={header} items={inProductionItems} renderItem={renderItem} />;
};

export default React.memo(InProductionColumn);
