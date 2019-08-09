import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import QuoteReadyColumn from '../../containers/quote-ready-column';
import QuotePendingColumn from '../../containers/quote-pending-column';
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
    </>
  );
};

export default React.memo(PipelinePage);
