import PropTypes from 'prop-types';
import React from 'react';

import IconButton from '../icon-button';

import Container from './container';

const IconButtonSet = ({ data }) => (
  <Container>
    {data.map(item => (
      <IconButton key={item.ariaLabel} {...item} />
    ))}
  </Container>
);

IconButtonSet.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(IconButton.propTypes)).isRequired,
};

export default React.memo(IconButtonSet);
