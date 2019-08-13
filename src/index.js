/* eslint-disable react/jsx-filename-extension */
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import './i18n';
import store from './store';
import PipelinePage from './pages/pipeline';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
    font-family: 'Montserrat', sans-serif;
  }
`;

const theme = {
  color: {
    blue: '#0072ce',
    dark: '#333f48',
    green: '#18ad18',
    light: '#979ea2',
    red: '#f9423a',
  },
  fontSize: {
    medium: '16px',
    small: '12px',
  },
  fontWeight: {
    bold: 600,
    regular: 400,
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <PipelinePage />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
