import PropTypes from 'prop-types';
import React from 'react';

import Container from './container';
import Date from './date';

const CustomInfo = ({ date, Icon }) => (
  <Container>
    <Icon />
    <Date>{date.slice(0, 10)}</Date>
  </Container>
);

CustomInfo.propTypes = {
  date: PropTypes.string.isRequired,
  // TODO: Validate this as a React forward ref type
  // eslint-disable-next-line react/forbid-prop-types
  Icon: PropTypes.object.isRequired,
};

export default React.memo(CustomInfo);
