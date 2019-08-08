import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: ${props => props.theme.fontSize.medium};
`;

const Header = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title>{t('pipeline')}</Title>
    </div>
  );
};

export default React.memo(Header);
