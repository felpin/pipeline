import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from './container';
import Title from './title';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('pipeline')}</Title>
    </Container>
  );
};

export default React.memo(Header);
