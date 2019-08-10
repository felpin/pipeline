import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import QuoteAcceptedColumn from '../../containers/quote-accepted-column';
import QuotePendingColumn from '../../containers/quote-pending-column';
import QuoteReadyColumn from '../../containers/quote-ready-column';
import { fetch } from '../../store/pipeline';

const PipelinePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  return (
    <>
      <QuotePendingColumn />
      <QuoteReadyColumn />
      <QuoteAcceptedColumn />
    </>
  );
};

export default React.memo(PipelinePage);
