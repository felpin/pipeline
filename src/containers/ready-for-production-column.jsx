import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ArrowForwardButtonIcon } from '../assets/arrow-forward-button.svg';
import IconButton from '../components/icon-button';
import Column from '../components/column';
import ColumnCard from '../components/column-card';
import ColumnHeader from '../components/column-header';
import Container from '../components/container';
import { IN_PRODUCTION, READY_FOR_PRODUCTION } from '../contants/pipeline-status';
import useTaxedTotal from '../hooks/use-taxed-total';
import { changeStatus } from '../store/pipeline';
import { makePipelineStatusItemsSelector } from '../store/pipeline/selectors';

const readyForProductionItemsSelector = makePipelineStatusItemsSelector(READY_FOR_PRODUCTION);

const ReadyForProductionColumn = () => {
  const dispatch = useDispatch();
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
        key="header"
        taxedTotalEur={taxedTotalEur}
        taxedTotalGbp={taxedTotalGbp}
        title={t('readyForProduction')}
      />
    ),
    [readyForProductionItems.length, t, taxedTotalEur, taxedTotalGbp]
  );

  const renderItem = useCallback(
    item => (
      <ColumnCard
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
        customInfo={<Container fontWeight="bold">0h</Container>}
        declined={item.declined}
        id={item.id}
        taxedTotal={item.taxedTotal}
      />
    ),
    [createOnClickAction, t]
  );

  return <Column header={header} items={readyForProductionItems} renderItem={renderItem} />;
};

export default React.memo(ReadyForProductionColumn);
