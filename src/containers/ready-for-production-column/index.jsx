import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ArrowForwardButtonIcon } from '../../assets/arrow-forward-button.svg';
import IconButton from '../../components/icon-button';
import Column from '../../components/column';
import ColumnHeader from '../../components/column-header';
import Container from '../../components/container';
import { IN_PRODUCTION, READY_FOR_PRODUCTION } from '../../contants/pipeline-status';
import useTaxedTotal from '../../hooks/use-taxed-total';
import { changeStatus } from '../../store/pipeline';
import { isLoadingSelector, makePipelineStatusItemsSelector } from '../../store/pipeline/selectors';
import ColumnCardWithPaymentStatus from '../column-card-with-payment-status';

const readyForProductionItemsSelector = makePipelineStatusItemsSelector(READY_FOR_PRODUCTION);

const ReadyForProductionColumn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const readyForProductionItems = useSelector(readyForProductionItemsSelector);
  const { taxedTotalEur, taxedTotalGbp } = useTaxedTotal(readyForProductionItems);
  const { t } = useTranslation();

  const createOnClickAction = useCallback(
    item => () => {
      dispatch(changeStatus(item.id, IN_PRODUCTION));
    },
    [dispatch]
  );

  const header = useMemo(
    () => (
      <ColumnHeader
        deals={readyForProductionItems.length}
        isLoading={isLoading}
        key="header"
        taxedTotalEur={taxedTotalEur}
        taxedTotalGbp={taxedTotalGbp}
        title={t('readyForProduction')}
      />
    ),
    [isLoading, readyForProductionItems.length, t, taxedTotalEur, taxedTotalGbp]
  );

  const renderItem = useCallback(
    item => (
      <ColumnCardWithPaymentStatus
        action={
          // There is a conflict between eslint rules, so one is disabled
          // eslint-disable-next-line react/jsx-wrap-multilines
          <IconButton ariaLabel={t('startProduction')} onClick={createOnClickAction(item)}>
            <ArrowForwardButtonIcon />
          </IconButton>
        }
        available={item.available}
        client={item.client}
        currency={item.currency}
        customInfo={<Container fontWeight="bold">{`${item.hoursSinceUpdated}h`}</Container>}
        daysOverdue={item.daysOverdue}
        declined={item.declined}
        paidAmount={item.paidAmount}
        id={item.id}
        taxedTotal={item.taxedTotal}
      />
    ),
    [createOnClickAction, t]
  );

  return <Column header={header} items={readyForProductionItems} renderItem={renderItem} />;
};

export default React.memo(ReadyForProductionColumn);
