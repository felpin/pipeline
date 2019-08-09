import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  border-bottom: 1px solid #dddee1;
  padding: 12px;
`;

const Title = styled.h1`
  color: ${props => props.theme.color.dark};
  font-size: ${props => props.theme.fontSize.medium};
`;

const Header = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('pipeline')}</Title>
    </Container>
  );
};

export default React.memo(Header);
