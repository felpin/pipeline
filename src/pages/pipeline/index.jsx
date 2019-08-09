import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import QuotePendingColumn from '../../containers/quote-pending-column';
import { fetch } from '../../store/pipeline';

const PipelinePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  return <QuotePendingColumn />;
};

export default React.memo(PipelinePage);
