import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../components/header';
import InProductionColumn from '../../containers/in-production-column';
import QuoteAcceptedColumn from '../../containers/quote-accepted-column';
import QuotePendingColumn from '../../containers/quote-pending-column';
import QuoteReadyColumn from '../../containers/quote-ready-column';
import ReadyForProductionColumn from '../../containers/ready-for-production-column';
import ShippedColumn from '../../containers/shipped-column';
import { fetch } from '../../store/pipeline';

const PipelinePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  return (
    <>
      <Header />
      <QuotePendingColumn />
      <QuoteReadyColumn />
      <QuoteAcceptedColumn />
      <ReadyForProductionColumn />
      <InProductionColumn />
      <ShippedColumn />
    </>
  );
};

export default React.memo(PipelinePage);
