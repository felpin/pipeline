import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../components/header';
import { fetch } from '../../store/pipeline';

const PipelinePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch());
  }, []);

  return <Header />;
};

export default React.memo(PipelinePage);
